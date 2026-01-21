// Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/auth.css";
import { toast } from "react-toastify";

function Login({ setIsAuthenticated }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        "https://unimart-backend2.vercel.app/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        toast.error(data.message || "Login failed ❌");
        return;
      }

      localStorage.setItem("token", data.token);

      localStorage.setItem(
        "profile",
        JSON.stringify({
          name: "UniMart User",
          email: formData.email,
          createdAt: new Date().toISOString(),
          totalProducts: 0,
          activeListings: 0,
        })
      );

      if (setIsAuthenticated) setIsAuthenticated(true);

      toast.success("Login successful 🎉");
      navigate("/");
    } catch (err) {
      setError("Server error. Try again later.");
      toast.error("Server error 🚨");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      {/* ✅ BACKGROUND IMAGE USING DIRECT URL */}
      <section
        className="auth-page"
        style={{
          minHeight: "100vh",
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('https://plus.unsplash.com/premium_photo-1764547067692-ee303e078c68?q=80&w=1103&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="auth-card">
          <h1>Login</h1>

          <form className="auth-form" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={handleChange}
            />

            <p
              style={{ cursor: "pointer", textAlign: "right" }}
              onClick={() => navigate("/forgot-password")}
            >
              Forgot password?
            </p>

            {error && <p style={{ color: "white" }}>{error}</p>}

            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="auth-switch">
            Don’t have an account?{" "}
            <span
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>
        </div>
      </section>
    </>
  );
}

export default Login;
