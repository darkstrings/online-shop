import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
const port = process.env.PORT || 5000;
// The || is for if something doesn't work with the.env file
// The frontend is deployed on port 3000 so we're doing 5000 here
// If there's a mongo connection error, check the allowed IPs
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

connectDB();
const app = express();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
