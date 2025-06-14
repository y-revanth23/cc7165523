import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function ProductForm({ onAdd, onUpdate, existingProduct }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  // If editing, load existing product data into form state
  useEffect(() => {
    if (existingProduct) {
      setForm(existingProduct);
    }
  }, [existingProduct]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.price) {
      return alert("Name and Price are required");
    }
    if (id) {
      // editing existing product
      onUpdate({ ...form, id });
    } else {
      // adding new product
      onAdd({ ...form, id: Date.now().toString() });
    }
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-700 p-6 rounded-lg max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-white">
        {id ? "Edit Product" : "Add New Product"}
      </h2>

      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={form.name}
        onChange={handleChange}
        className="w-full p-2 mb-3 rounded"
        required
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        className="w-full p-2 mb-3 rounded"
        required
      />

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        className="w-full p-2 mb-3 rounded"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full p-2 mb-3 rounded"
        rows={4}
      />

      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        {id ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
}

export default ProductForm;
