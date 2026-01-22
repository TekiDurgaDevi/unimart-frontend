import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import "../styles/addproduct.css";

function AddProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    condition: "",
    image: null,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // ❌ Image missing
    if (!formData.image) {
      toast.error("Please upload a product image");
      return;
    }

    // 🔒 Login check
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to sell an item");
      return;
    }

    const productData = new FormData();
    productData.append("title", formData.title);
    productData.append("price", formData.price);
    productData.append("category", formData.category);
    productData.append("condition", formData.condition);
    productData.append("image", formData.image);

    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: productData,
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to add product");
        return;
      }

      // ✅ SUCCESS TOAST
      toast.success("Product posted successfully 🎉");

      // ✅ REDIRECT TO PRODUCTS
      setTimeout(() => {
        navigate("/products");
      }, 1500);

      setFormData({
        title: "",
        price: "",
        category: "",
        condition: "",
        image: null,
      });
    } catch (err) {
      toast.error("Server error. Try again later.");
    }
  };

  return (
    <>
      <Navbar />

      <section className="sell-page">
        <div className="sell-card">
          <h1>Sell an Item</h1>

          <form className="sell-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Product Title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="price"
              placeholder="Price (₹)"
              value={formData.price}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="category"
              placeholder="Category (Books, Gadgets)"
              value={formData.category}
              onChange={handleChange}
              required
            />

            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              required
            >
              <option value="">Select Condition</option>
              <option value="New">New</option>
              <option value="Used">Used</option>
            </select>

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
            />

            {error && <p className="error-text">{error}</p>}

            <button type="submit">Post Item</button>
          </form>
        </div>
      </section>
    </>
  );
}

export default AddProduct;
