// Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/auth.css";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    const re =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validatePassword(formData.password)) {
      setError("Password requirements not met.");
      toast.error("Weak password ❌");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      toast.error("Passwords do not match ❌");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "https://unimart-backend2-production.up.railway.app/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        toast.error(data.message || "Registration failed ❌");
        return;
      }

      // ✅ SAVE PROFILE DATA (FRONTEND ONLY)
      localStorage.setItem(
        "profile",
        JSON.stringify({
          name: formData.name,
          email: formData.email,
          createdAt: new Date().toISOString(),
          totalProducts: 0,
          activeListings: 0,
        })
      );

      toast.success("Registration successful ✅");
      navigate("/login");
    } catch (err) {
      setError("Server error.");
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
            "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('https://plus.unsplash.com/premium_photo-1676422354018-4726ac6f50aa?q=80&w=1367&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="auth-card">
          <h1>Register</h1>

          <form className="auth-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              onChange={handleChange}
            />
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
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              onChange={handleChange}
            />

            {error && <p style={{ color: "white" }}>{error}</p>}

            <button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </section>
    </>
  );
}

export default Register;
