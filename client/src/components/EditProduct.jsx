import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductForm from './ProductForm';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(() => navigate('/'));
  }, [id, navigate]);

  const handleUpdate = async (updatedProduct) => {
    await fetch(`http://localhost:5000/api/products/${id}`, {
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