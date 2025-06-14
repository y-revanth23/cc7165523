import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductForm from "../Components/ProductForm";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    // Make sure to compare id as the same type (string)
    const prod = products.find(p => p.id.toString() === id);
    if (prod) {
      setProduct(prod);
    } else {
      alert("Product not found");
      navigate("/");
    }
  }, [id, navigate]);

  const handleUpdate = (updatedProduct) => {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const updatedProducts = products.map((p) =>
      p.id.toString() === id ? updatedProduct : p
    );
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    navigate("/");
  };

  return (
    <div>
      {product ? (
        <ProductForm existingProduct={product} onUpdate={handleUpdate} />
      ) : (
        <p>Loading product...</p>
      )}
    </div>
  );
}

export default EditProduct;
