require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Product = require("./models/product");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process if connection fails
  });

app.get("/", (req, res) => {
  res.send("API is running!");
});

// get all products
app.get("/api/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// get product by id
app.get("/api/products/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if(product) res.json(product);
  else res.status(404).json({ message: "product not found" });
});

// add a new product
app.post("/api/products", async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.status(201).json({ message: "Product added successfully", product: newProduct });
});

// update an existing product
app.put("/api/products/:id", async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Product updated successfully" });
});

// delete a product
app.delete("/api/products/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted successfully" });
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});