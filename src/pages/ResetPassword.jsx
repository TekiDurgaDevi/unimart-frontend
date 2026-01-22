import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import "../styles/auth.css";
import { toast } from "react-toastify";

function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  const resetHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://unimart-backend2-production.up.railway.app/api/auth/reset-password",
        {
          email,
          password,
        }
      );

      toast.success("Password reset successful 🎉");
      navigate("/login");
    } catch (err) {
      toast.error("Reset failed ❌");
    }
  };

  if (!email) return null;

  return (
    <>
      <Navbar />

      {/* ✅ BACKGROUND IMAGE USING DIRECT URL */}
      <section
        className="auth-page"
        style={{
          minHeight: "100vh",
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('https://plus.unsplash.com/premium_photo-1682309533795-3d416c624cac?q=80&w=1212&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="auth-card">
          <h1>Reset Password</h1>

          <form className="auth-form" onSubmit={resetHandler}>
            <input
              type="password"
              placeholder="New password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Reset Password</button>
          </form>
        </div>
      </section>
    </>
  );
}

export default ResetPassword;
