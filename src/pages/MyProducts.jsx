import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import "../styles/myProducts.css";

function MyProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyProducts();
  }, []);

  const fetchMyProducts = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://unimart-backend2-production.up.railway.app/api/products/my/products",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setProducts(data);
    } catch (error) {
      toast.error("Failed to load your products");
    }
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `https://unimart-backend2-production.up.railway.app/api/products/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        toast.success("Product deleted");
        fetchMyProducts();
      } else {
        toast.error("Failed to delete product");
      }
    } catch (error) {
      toast.error("Server error while deleting");
    }
  };

  return (
    <>
      <Navbar />

      <section className="products-page">
        <h1 className="products-title">My Products</h1>

        {products.length === 0 ? (
          <p className="no-products">You haven’t posted any items yet.</p>
        ) : (
          <div className="products-grid">
            {products.map((p) => (
              <div className="product-card" key={p._id}>
                <img
                  src={`https://unimart-backend2-production.up.railway.app/${p.image}`}
                  alt={p.title}
                />

                <div className="product-info">
                  <h3>{p.title}</h3>
                  <p className="price">₹{p.price}</p>
                  <p className="category">{p.category}</p>

                  <div className="product-actions">
                    <button
                      className="edit-btn"
                      onClick={() => navigate(`/edit-product/${p._id}`)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deleteProduct(p._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default MyProducts;
