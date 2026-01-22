import Navbar from "../components/Navbar";
import "../styles/products.css";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  // ✅ Cart stores full product objects
  const [cartItems, setCartItems] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  const searchRef = useRef(null);

  // 🔹 LOAD PRODUCTS
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/products/public", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  // 🔹 SAVE CART TO LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // 🔹 CLOSE SEARCH ON OUTSIDE CLICK
  useEffect(() => {
    function handleClickOutside(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🔄 ADD / REMOVE FROM CART (FIXED)
  const toggleCart = (product) => {
    const existing = cartItems.find(
      (item) => item._id === product._id
    );

    if (existing) {
      // remove
      setCartItems(cartItems.filter((item) => item._id !== product._id));
    } else {
      // add
      setCartItems([
        ...cartItems,
        { ...product, quantity: 1 },
      ]);
    }
  };

  return (
    <>
      <Navbar />

      <section className="products-hero">
        {/* HEADER */}
        <div className="products-header">
          <h1 className="products-heading">Products</h1>

          <div className="search-wrapper" ref={searchRef}>
            <button
              className="search-toggle"
              onClick={() => setShowSearch((prev) => !prev)}
            >
              🔍
            </button>

            {showSearch && (
              <input
                type="text"
                className="search-input"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
            )}
          </div>
        </div>

        {/* PRODUCTS GRID */}
        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => {
              const isInCart = cartItems.some(
                (item) => item._id === product._id
              );

              return (
                <div className="product-card" key={product._id}>
                  <img
                    src={`http://localhost:5000/${product.image}`}
                    alt={product.title}
                  />

                  <h3>{product.title}</h3>
                  <p className="product-price">₹{product.price}</p>

                  <div className="product-actions">
                    <Link
                      to={`/products/${product._id}`}
                      className="product-btn"
                    >
                      View
                    </Link>

                    <button
                      className={`cart-btn ${isInCart ? "added" : ""}`}
                      onClick={() => toggleCart(product)}
                      title={
                        isInCart
                          ? "Remove from Cart"
                          : "Add to Cart"
                      }
                    >
                      {isInCart ? "✔" : "🛒"}
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="no-products">No products found.</p>
          )}
        </div>
      </section>
    </>
  );
}

export default Products;
