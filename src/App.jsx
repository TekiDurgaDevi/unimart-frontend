import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddProduct from "./pages/AddProduct";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import ProductDetails from "./pages/ProductDetails";
import MyProducts from "./pages/MyProducts";
import EditProduct from "./pages/EditProduct";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsAuthenticated(true);
  }, []);

  return (
    <BrowserRouter>
      <Navbar
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
        toastStyle={{ backgroundColor: "#16a34a", color: "white" }}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />

        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/about" element={<About />} />
        <Route path="/my-products" element={<MyProducts />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />

        {/* ✅ UPDATED ROUTES */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
