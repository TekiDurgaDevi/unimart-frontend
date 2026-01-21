import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/auth.css";
import axios from "axios";
import { toast } from "react-toastify";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://unimart-backend2.vercel.app/api/auth/forgot-password",
        {
          email,
        }
      );

      toast.success("Email verified. Reset your password.");
      navigate("/reset-password", { state: { email } });
    } catch (err) {
      toast.error("User not found ❌");
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
            "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('https://plus.unsplash.com/premium_photo-1682310193065-94993d338835?q=80&w=1212&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="auth-card">
          <h1>Forgot Password</h1>

          <form className="auth-form" onSubmit={submitHandler}>
            <input
              type="email"
              placeholder="Enter your email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />

            <button type="submit">Continue</button>
          </form>
        </div>
      </section>
    </>
  );
}

export default ForgotPassword;
