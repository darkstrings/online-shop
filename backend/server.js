import dotenv from "dotenv";
dotenv.config();
import express from "express";
import products from "./data/products.js";
import connectDB from "./config/db.js";

const port = process.env.PORT || 5000;
// The || is for if something doesn't work with the.env file
// The frontend is deployed on port 3000 so we're doing 5000 here
// If there's a mongo connection error, check the allowed IPs

connectDB();
const app = express();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  // ie: http://localhost:5000/api/products/1
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
