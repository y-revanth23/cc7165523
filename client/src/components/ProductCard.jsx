import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/productCardAnimation.css"; // Make sure this CSS exists

function ProductCard({ product, onDelete }) {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu((prev) => !prev);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`/edit/${product._id}`);
    setShowMenu(false);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(product._id);
    setShowMenu(false);
  };

  return (
    <div
      className="product-card border border-gray-700 rounded-2xl p-4 text-yellow-400 relative cursor-pointer"
    >
      <div className="animated-glow"></div>

      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-contain bg-white rounded-xl mb-3 z-10 relative"
      />
      <h2 className="text-lg font-semibold z-10 relative">{product.name}</h2>
      <p className="z-10 relative">₹{product.price}</p>
      <p className="text-sm z-10 relative">Rating: {product.rating} / 5</p>
      <p className="text-sm mb-3 z-10 relative">{product.description}</p>

      <div className="absolute top-3 right-3 z-10">
        <button
          onClick={toggleMenu}
          className="text-yellow-400 hover:text-yellow-200 text-xl font-bold"
        >
          ⋮
        </button>

        {showMenu && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute right-0 mt-2 w-28 border border-gray-600 rounded-md shadow-lg z-20 bg-black"
          >
            <button
              onClick={handleEdit}
              className="block w-full px-4 py-2 text-sm text-yellow-400 text-left hover:text-yellow-200"
            >
              ✏️ Edit
            </button>
            <button
              onClick={handleDelete}
              className="block w-full px-4 py-2 text-sm text-red-500 text-left hover:text-red-400"
            >
              🗑️ Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
