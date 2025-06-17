import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductCard({ product, onDelete }) {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu(!showMenu);
  const handleEdit = () => navigate(`/edit/${product.id}`);

  return (
    <div
      className="relative bg-gray-800 text-yellow-300 border border-gray-700 rounded-xl p-4 shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:z-10"
    >
      {/* Three Dots */}
      <div className="absolute top-2 right-2 z-20">
        <button
          className="text-yellow-400 text-xl font-bold"
          onClick={toggleMenu}
        >
          ⋮
        </button>
        {showMenu && (
          <div className="absolute right-0 mt-2 w-28 bg-gray-900 border border-gray-600 rounded shadow-lg z-30">
            <button
              onClick={handleEdit}
              className="block w-full px-4 py-2 text-left text-yellow-300 hover:bg-gray-700"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(product.id)}
              className="block w-full px-4 py-2 text-left text-red-400 hover:bg-gray-700"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-contain bg-gray-700 rounded-md mb-3"
      />

      {/* Product Info */}
      <h2 className="text-xl font-semibold">{product.name}</h2>
      <p className="text-yellow-200 text-md">₹{product.price}</p>
      <p className="text-sm text-yellow-300">Rating: {product.rating} / 5</p>
      <p className="text-sm text-yellow-400 mb-2">{product.description}</p>
    </div>
  );
}

export default ProductCard;
