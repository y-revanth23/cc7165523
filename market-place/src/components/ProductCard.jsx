import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-700 shadow-md rounded-xl p-4 text-white border border-gray-600 relative">
      <h2 className="text-xl font-semibold">{product.name}</h2>
      <p><strong>Price:</strong> ₹{product.price}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Description:</strong> {product.description}</p>

      <button
        onClick={() => navigate(`/edit/${product.id}`)}
        className="absolute top-2 right-2 bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded"
      >
        Edit
      </button>
    </div>
  );
}

export default ProductCard;
