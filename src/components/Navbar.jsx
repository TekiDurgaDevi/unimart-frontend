// Navbar.jsx
import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/navbar.css";
import { toast } from "react-toastify";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const menuRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  // Scroll spy (ONLY on home page)
  useEffect(() => {
    if (location.pathname !== "/") return;

    const handleScroll = () => {
      const about = document.getElementById("about");
      if (!about) return;

      const scrollPos = window.scrollY + 120;
      if (scrollPos >= about.offsetTop) {
        setActiveSection("about");
      } else {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    toast.success("Logged out successfully 👋");
    navigate("/login");
  };

  /* 🔥 LOGO → HARD REFRESH (UNCHANGED) */
  const handleLogoClick = () => {
    window.location.reload();
  };

  /* ✅ HOME → SCROLL TO TOP */
  const handleHomeClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 50);
    }
  };

  const handleAboutClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document
          .getElementById("about")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document
        .getElementById("about")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo" onClick={handleLogoClick}>
          UniMart
        </div>

        <div className="nav-right">
          <ul className="nav-links">
            <li>
              <span
                onClick={handleHomeClick}
                className={activeSection === "home" ? "active" : ""}
              >
                Home
              </span>
            </li>

            <li>
              <span
                onClick={handleAboutClick}
                className={activeSection === "about" ? "active" : ""}
              >
                About
              </span>
            </li>
          </ul>

          {!isAuthenticated && (
            <div className="auth-combined-btn">
              <span onClick={() => navigate("/login")} className="auth-link">
                Login
              </span>
              <span className="slash"> / </span>
              <span onClick={() => navigate("/register")} className="auth-link">
                Register
              </span>
            </div>
          )}

          {isAuthenticated && (
            <span
              className="three-dot-icon"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ⋮
            </span>
          )}
        </div>
      </nav>

      {isAuthenticated && menuOpen && (
        <div className="three-dot-menu" ref={menuRef}>
          <div onClick={() => navigate("/profile")}>Profile</div>
          <div onClick={() => navigate("/my-products")}>My Products</div>
          <div onClick={() => navigate("/cart")}>Cart</div>

          <div className="menu-divider"></div>

          <div className="logout-item" onClick={handleLogout}>
            Logout
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
