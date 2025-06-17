const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

const DATA_DIR = path.join(__dirname, "data");
const DATA_PATH = path.join(DATA_DIR, "product.json");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(DATA_PATH)) {
  fs.writeFileSync(DATA_PATH, "[]", "utf-8");
}

app.use(cors());
app.use(express.json());

const readProduct = () => {
  try {
    const data = fs.readFileSync(DATA_PATH, "utf-8");
    return JSON.parse(data || "[]");
  } catch (err) {
    return [];
  }
};

const writeProduct = (data) => {
  try {
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {}
};

app.get('/', (req, res) => {
  res.send('Product API is running!');
});

app.get('/api/products', (req, res) => {
  const products = readProduct();
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const products = readProduct();
  const product = products.find(p => p.id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

app.post('/api/products', (req, res) => {
  const { name, description, image, price, category, rating } = req.body;

  if (!name || !price || !image || !description) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const products = readProduct();

  const newProduct = {
    id: Date.now().toString(),
    name,
    description,
    image,
    price,
    category: category || "Uncategorized",
    rating: rating || "0"
  };

  products.push(newProduct);
  writeProduct(products);
  res.status(201).json(newProduct);
});

app.put('/api/products/:id', (req, res) => {
  const products = readProduct();
  const id = req.params.id;
  const index = products.findIndex(p => p.id === id);

  if (index !== -1) {
    products[index] = { ...products[index], ...req.body };
    writeProduct(products);
    res.json({ message: "Product updated successfully" });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

app.delete('/api/products/:id', (req, res) => {
  const products = readProduct();
  const newProducts = products.filter(p => p.id !== req.params.id);

  if (newProducts.length !== products.length) {
    writeProduct(newProducts);
    res.json({ message: "Product deleted successfully" });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`);
});
