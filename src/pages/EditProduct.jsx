import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import "../styles/addproduct.css"; // ✅ reuse Sell Item styles

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    condition: "",
    image: null,
  });

  const [currentImage, setCurrentImage] = useState("");

  // ================================
  // FETCH PRODUCT DETAILS
  // ================================
  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await fetch(
        `https://unimart-backend2.vercel.app/api/products/${id}`
      );
      const data = await res.json();

      if (!res.ok) {
        toast.error("Failed to load product");
        return;
      }

      setFormData({
        title: data.title,
        price: data.price,
        category: data.category,
        condition: data.condition,
        image: null,
      });

      setCurrentImage(data.image);
    } catch (error) {
      toast.error("Server error");
    }
  };

  // ================================
  // HANDLE FORM CHANGE
  // ================================
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ================================
  // UPDATE PRODUCT
  // ================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login again");
      return;
    }

    const updateData = new FormData();
    updateData.append("title", formData.title);
    updateData.append("price", formData.price);
    updateData.append("category", formData.category);
    updateData.append("condition", formData.condition);

    if (formData.image) {
      updateData.append("image", formData.image);
    }

    try {
      const res = await fetch(
        `https://unimart-backend2.vercel.app/api/products/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: updateData,
        }
      );

      if (!res.ok) {
        toast.error("Failed to update product");
        return;
      }

      toast.success("Product updated successfully ✅");
      navigate("/my-products");
    } catch (error) {
      toast.error("Server error");
    }
  };

  return (
    <>
      <Navbar />

      <section className="sell-page">
        <div className="sell-card">
          <h1>Edit Product</h1>

          {/* 🖼️ CURRENT IMAGE */}
          {currentImage && (
            <img
              src={`https://unimart-backend2.vercel.app/${currentImage}`}
              alt="Current"
              style={{
                width: "100%",
                borderRadius: "12px",
                marginBottom: "16px",
              }}
            />
          )}

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
              placeholder="Category"
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

            <button type="submit">Update Product</button>
          </form>
        </div>
      </section>
    </>
  );
}

export default EditProduct;
