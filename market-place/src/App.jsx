import './App.css';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-900 text-white">
        <nav className="w-full bg-gray-800 shadow-md">
          <div className="max-w-5xl mx-auto flex justify-between items-center px-6 py-4">
            <h1 className="text-2xl font-bold text-white">
              E Commerce
            </h1>
            <div className="space-x-6">
              <Link
                to="/"
                className="text-blue-400 hover:text-blue-600 font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                to="/add"
                className="text-blue-400 hover:text-blue-600 font-medium transition-colors"
              >
                Add Product
              </Link>
            </div>
          </div>
        </nav>
        <main className="flex-1 flex justify-center items-start">
          <div className="w-full max-w-5xl bg-gray-800 rounded-lg shadow p-8 mt-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add" element={<AddProduct />} />
              <Route path="/edit/:id" element={<EditProduct />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
