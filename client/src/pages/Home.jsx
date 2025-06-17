import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(stored);
  }, []);

  const handleDelete = (id) => {
    const updated = products.filter((p) => p.id !== id);
    localStorage.setItem("products", JSON.stringify(updated));
    setProducts(updated);
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {products.length === 0 ? (
        <p className="text-center col-span-full text-lime-400">No products added yet.</p>
      ) : (
        products.map((product) => (
          <ProductCard key={product.id} product={product} onDelete={handleDelete} />
        ))
      )}
    </div>
  );
}

export default Home;