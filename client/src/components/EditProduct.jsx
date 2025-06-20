import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductForm from './ProductForm';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(() => navigate('/'));
  }, [id, navigate]);

  const handleUpdate = async (updatedProduct) => {
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProduct),
    });
    navigate('/');
  };

  return (
    <div>
      {product && <ProductForm onAdd={handleUpdate} initialData={product} />}
    </div>
  );
}

export default EditProduct;