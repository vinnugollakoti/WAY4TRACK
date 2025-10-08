import React, { useState, useEffect, useContext } from "react";
import "./Navbar.css";
import { useNavigate, useLocation } from "react-router-dom"; 
import { CartContext } from "../../contexts/CartContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartQuantity, setQuantity] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { cartItems } = useContext(CartContext || { cartItems: [] });

  const navigate = useNavigate();
  const location = useLocation(); 

  useEffect(() => {
    const token = localStorage.getItem("client_id");
    if (token) setIsLoggedIn(true);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    setQuantity(cartItems.length);
  }, [cartItems]);

  const isActive = (path) => location.pathname === path; 

  return (
    <div>
      <nav className="navbar">
        <div className="nav-container">
          {/* Logo */}

          <div className="nav-logo" onClick={() => window.location.href = "/"}>
            <span className="logo">way4track</span>
          </div>


          {/* Hamburger Menu Icon */}
          <div className="hamburger" onClick={toggleMenu}>
            <span className={`bar ${isMenuOpen ? "active" : ""}`}></span>
            <span className={`bar ${isMenuOpen ? "active" : ""}`}></span>
            <span className={`bar ${isMenuOpen ? "active" : ""}`}></span>
          </div>

          {/* Main Navigation */}
          <div className={`nav-content ${isMenuOpen ? "active" : ""}`}>
            <ul className="menu-list">
              <li
                className={`menu-item ${isActive("/") ? "active" : ""}`}
                onClick={() => navigate("/")}
              >
                Home
              </li>
              {/* <li className="menu-item" onClick={() => navigate("/about")}>About</li> */}
              {/* <li className="menu-item" onClick={() => navigate("/contactus")}>Contact</li> */}
              <li
                className={`menu-item ${isActive("/Careers") ? "active" : ""}`}
                onClick={() => navigate("/Careers")}
              >
                Career
              </li>
              <li
                className={`menu-item ${isActive("/products") ? "active" : ""}`}
                onClick={() => navigate("/products")}
              >
                Products
              </li>
            </ul>

            <div className="actions">
              <div className="cart" onClick={() => navigate("/cart")}>
                🛒 <p className="cart-quantity">{cartQuantity}</p>
              </div>

              {isLoggedIn ? (
                <div
                  className="profile"
                  onClick={() => navigate("/my-profile")}
                >
                  <img
                    src="/images/profile-logo.png"
                    alt="Profile"
                    className="profile-icon"
                  />
                </div>
              ) : (
                <>
                  <button
                    className="login-btn"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </button>
                  <button
                    className="get-started-btn"
                    onClick={() => navigate("/signup")}
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div className="navbar-spacer"></div>
    </div>
  );
};

export default Navbar;
