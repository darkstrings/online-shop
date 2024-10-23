import path from "path";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
const port = process.env.PORT || 5000;
// The || is for if something doesn't work with the.env file
// The frontend is deployed on port 3000 so we're doing 5000 here
// If there's a mongo connection error, check the allowed IPs
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import uploadRoutes from "./routes/uploadRoutes.js";

connectDB();
const app = express();

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/api/config/paypal", (req, res) => {
  res.send({ clientID: process.env.PAYPAL_CLIENT_ID });
});

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);

app.use("/api/uploads", uploadRoutes);
const __dirname = path.resolve(); //to get the path to the current directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  // Set static server to serve files
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  // Set server to serve index.html
  // This is so that the frontend can be deployed
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
