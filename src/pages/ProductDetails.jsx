import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/productDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) {
    return <p style={{ color: "white", textAlign: "center" }}>Loading...</p>;
  }

  return (
    <>
      <Navbar />

      <section className="product-details">
        <div className="product-details-card">
          <img
            src={`http://localhost:5000/${product.image}`}
            alt={product.title}
            className="details-image"
          />


          <div className="product-info">
            <h2>{product.title}</h2>
            <p className="price">₹{product.price}</p>

            <p><strong>Condition:</strong> {product.condition}</p>
            <p><strong>Category:</strong> {product.category}</p>

            <p className="description">{product.description}</p>

            <div className="seller-box">
              <h3>Seller Details</h3>
              <p><strong>Name:</strong> {product.seller?.name}</p>

              {/* ✅ ONLY THIS PART CHANGED */}
              <p>
                <strong>Email:</strong>{" "}
                <a
                  href={`mailto:${product.seller?.email}?subject=Interested in ${product.title}`}
                  className="email-link"
                  title="Contact Seller"
                >
                  📧 Contact Seller
                </a>
              </p>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductDetails;
