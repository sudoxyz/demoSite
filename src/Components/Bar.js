import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

const Bar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scroll, setScroll] = useState(false);
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/":
      document.title = "CSS - Home";
      break;
      case "/about":
      document.title = "CSS - About Us";
      break;
      case "/contact":
      document.title = "CSS - Contact Us";
      break;
      case "/blog":
      document.title = "CSS - Blog";
      break;
      default:
      document.title = "CSS - Cyber Security Solutions";
      break;
    }
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 10);
    });
  });

  

  

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      <nav className={`${scroll ? "sticky-navbar" : ""} top-navbar `}>
        <div className="logo">
          <img src={logo} alt="Logo" className="logo-img" />
          Cyber Security Solutions
        </div>
        <button
          className="hamburger"
          onClick={handleMenuToggle}
          aria-label="Toggle menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        <ul className={`nav-links${menuOpen ? " open" : ""}`}>
          <li>
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setMenuOpen(false)}>
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>
              Contact
            </Link>
          </li>
          <li>
            <Link to="/blog" onClick={() => setMenuOpen(false)}>
              Blog
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Bar;
