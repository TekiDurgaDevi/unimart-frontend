// src/components/About.jsx  (or pages/About.jsx – keep your current location)
import "../styles/about.css";

function About() {
  return (
    <>
      {/* ================= ABOUT SECTION ================= */}
      <section className="about-section" id="about">
        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1654931800100-2ecf6eee7c64?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="About UniMart"
          />
        </div>

        <div className="about-content">
          <h2>We Are UniMart</h2>
          <p>
            UniMart is a student focused marketplace where you can buy and sell
            books, gadgets, and study essentials. Connect directly with sellers,
            get affordable prices, and make student life easier.
          </p>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <div className="footer-box">
          <h3>Contact Us</h3>
          <p>📍 Campus Location</p>
          <p>📞 +91 94XXXXXXXX</p>
          <p>✉️ unimart@gmail.com</p>
        </div>

        <div className="footer-box">
          <h3>UniMart</h3>
          <p>
            Making student buying & selling simple, fast, and reliable.
          </p>

          <div className="social-icons">
            <span>🌐</span>
            <span>📘</span>
            <span>📸</span>
            <span>🔗</span>
          </div>
        </div>

        <div className="footer-box">
          <h3>Online Marketplace</h3>
          <p>🛒 Buy & sell from anywhere</p>
        </div>
      </footer>
    </>
  );
}

export default About;
