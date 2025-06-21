require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Product = require("./models/Product");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  });

app.get("/", (req, res) => {
  res.send("API is running!");
});

// ✅ Get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error("GET /api/products error:", err.message);
    res.status(500).json({ message: "Failed to fetch products", error: err.message });
  }
});

// ✅ Get product by ID
app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) res.json(product);
    else res.status(404).json({ message: "Product not found" });
  } catch (err) {
    console.error("GET /api/products/:id error:", err.message);
    res.status(500).json({ message: "Error retrieving product", error: err.message });
  }
});

// ✅ Add a new product
app.post("/api/products", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (err) {
    console.error("POST /api/products error:", err.message);
    res.status(500).json({ message: "Failed to add product", error: err.message });
  }
});

// ✅ Update a product
app.put("/api/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Product updated successfully" });
  } catch (err) {
    console.error("PUT /api/products/:id error:", err.message);
    res.status(500).json({ message: "Failed to update product", error: err.message });
  }
});

// ✅ Delete a product
app.delete("/api/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("DELETE /api/products/:id error:", err.message);
    res.status(500).json({ message: "Failed to delete product", error: err.message });
  }
});

// ✅ 404 fallback
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
