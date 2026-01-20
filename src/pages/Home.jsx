import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import About from "./About";
import "../styles/hero.css";
import { toast } from "react-toastify";

const slides = [
  {
    image:
      "https://images.pexels.com/photos/7054725/pexels-photo-7054725.jpeg", // burger
    title: "Buy",
    desc: "Buy books and essentials at student friendly prices.",
  },
  {
    image:
      "https://images.pexels.com/photos/6969326/pexels-photo-6969326.jpeg", // books
    title: "Sell",
    desc: "Sell what you don’t need and earn what you need.",
  },
  {
    image:
      "https://images.pexels.com/photos/5412500/pexels-photo-5412500.jpeg", // students
    title: "Save",
    desc: "Save money and make student life simpler.",
  },
];

function Home() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  // AUTO SLIDE CHANGE
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const isLoggedIn = () => !!localStorage.getItem("token");

  const handleSearchProducts = () => {
    if (!isLoggedIn()) {
      toast.warn("Please login to search products 🔒");
      return;
    }
    navigate("/products");
  };

  const handlePostItem = () => {
    if (!isLoggedIn()) {
      toast.warn("Please login to post an item 🔒");
      return;
    }
    navigate("/add-product");
  };

  return (
    <>
      <Navbar />

      {/* ================= HERO SLIDER ================= */}
      <section className="navy-hero">
        {/* BACKGROUND SLIDES */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`hero-slide ${index === current ? "active" : ""}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        ))}

        {/* OVERLAY */}
        <div className="hero-overlay"></div>

        {/* CONTENT */}
        <div className="navy-content">
          <h1 className="navy-title">
            <span>{slides[current].title}</span>
            <span>Sell</span>
            <span className="accent">Save</span>
          </h1>

          <p className="navy-desc">{slides[current].desc}</p>

          <div className="navy-actions">
            <button className="navy-btn primary" onClick={handleSearchProducts}>
              🔍 Search Products
            </button>

            <button className="navy-btn secondary" onClick={handlePostItem}>
              ➕ Post an Item
            </button>
          </div>
        </div>

        {/* DOTS */}
        <div className="hero-dots">
          {slides.map((_, index) => (
            <span
              key={index}
              className={index === current ? "dot active" : "dot"}
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <About />
    </>
  );
}

export default Home;
