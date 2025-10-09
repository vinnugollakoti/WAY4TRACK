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

  const handleLogout = () => {
    localStorage.removeItem("client_id");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div>
      <nav className="navbar">
        <div className="nav-container">
          {/* Logo */}
          <div className="nav-logo" onClick={() => window.location.href = "/"}>
            <span className="logo">way4track</span>
          </div>

          {/* Hamburger Menu */}
          <div className="hamburger" onClick={toggleMenu}>
            <span className={`bar ${isMenuOpen ? "active" : ""}`}></span>
            <span className={`bar ${isMenuOpen ? "active" : ""}`}></span>
            <span className={`bar ${isMenuOpen ? "active" : ""}`}></span>
          </div>

          {/* Navigation */}
          <div className={`nav-content ${isMenuOpen ? "active" : ""}`}>
            <ul className="menu-list">
              <li
                className={`menu-item ${isActive("/") ? "active" : ""}`}
                onClick={() => navigate("/")}
              >
                Home
              </li>
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

              {/* In mobile view, show profile & logout as simple list items */}
              {isLoggedIn && (
                <div className="mobile-profile-actions">
                  <li
                    className="menu-item"
                    onClick={() => {
                      navigate("/my-profile");
                      setIsMenuOpen(false);
                    }}
                  >
                    Profile
                  </li>
                  <li
                    className="menu-item"
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                  >
                    Logout
                  </li>
                </div>
              )}
            </ul>

            <div className="actions">
              <div className="cart" onClick={() => navigate("/cart")}>
                🛒 <p className="cart-quantity">{cartQuantity}</p>
              </div>

              {/* Desktop-only profile icon */}
              {isLoggedIn ? (
                <div className="profile-container desktop-only">
                  <img
                    src="/images/profile-logo.png"
                    alt="Profile"
                    className="profile-icon"
                  />
                  <div className="profile-dropdown">
                    <p onClick={() => navigate("/my-profile")}>Profile</p>
                    <p onClick={handleLogout}>Logout</p>
                  </div>
                </div>
              ) : (
                <button className="login-btn" onClick={() => navigate("/login")}>
                  Login
                </button>
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