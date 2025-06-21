import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products`);

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to fetch products: ${res.status} - ${errorText}`);
      }

      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Network or server error:", err.message);
      alert("Error fetching products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to delete product: ${res.status} - ${errorText}`);
      }

      fetchProducts(); // refresh list after deletion
    } catch (err) {
      console.error("Delete error:", err.message);
      alert("Failed to delete product.");
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {loading ? (
        <p className="text-center col-span-full text-yellow-300">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-center col-span-full text-lime-400">No products added yet.</p>
      ) : (
        products.map((product) => (
          <ProductCard key={product._id} product={product} onDelete={handleDelete} />
        ))
      )}
    </div>
  );
}

export default Home;
