import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";

function AddProduct() {
  const navigate = useNavigate();

  const handleAdd = async (product) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error adding product:", errorData);
        alert("Failed to add product: " + (errorData.message || response.statusText));
        return;
      }

      navigate("/");
    } catch (error) {
      console.error("Network or server error:", error);
      alert("An error occurred while adding the product.");
    }
  };

  return (
    <div>
      <ProductForm onAdd={handleAdd} />
    </div>
  );
}

export default AddProduct;
