import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/cart.css";

function Cart() {
  const [cart, setCart] = useState([]);

  // LOAD CART
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // REMOVE ITEM
  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // TOTAL PRICE
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <Navbar />

      <section className="cart-page">
        <h1>My Cart</h1>

        {cart.length === 0 ? (
          <p className="empty">Your cart is empty 🛒</p>
        ) : (
          <div className="cart-wrapper">
            <div className="cart-list">
              {cart.map((item) => (
                <div className="cart-item" key={item._id}>
                  <img
                    src={`http://localhost:5000/${item.image}`}
                    alt={item.title}
                  />

                  <div className="cart-info">
                    <h3>{item.title}</h3>
                    <p>₹{item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="cart-actions">
                    <Link to={`/products/${item._id}`} className="view-btn">
                      View
                    </Link>

                    <button
                      className="remove-btn"
                      onClick={() => removeItem(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* TOTAL ONLY (NO CHECKOUT) */}
            <div className="cart-total">
              <h2>Total: ₹{totalPrice}</h2>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default Cart;
