import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from "./pages/home";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./components/EditProduct";

function App() {
  return (
    <Router>
      <div className="h-full w-full flex flex-col bg-main text-white">
        <nav className="w-full bg-black/70 shadow-md">
          <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
            <h1 className="text-2xl font-bold text-White-500">E-Commerce</h1>
            <div className="space-x-6">
              <Link to="/" className="text-lime-400 hover:text-lime-300 font-medium">Home</Link>
              <Link to="/add" className="text-lime-400 hover:text-lime-300 font-medium">Add Product</Link>
            </div>
          </div>
        </nav>

        <main className="flex-1 flex justify-center items-start overflow-y-auto">
          <div className="w-full max-w-6xl bg-black/60 rounded-lg shadow p-8 mt-8 mb-8 mx-4">
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
