import React, { useState, useEffect, useContext } from "react";
import "./Navbar.css";
import { useNavigate, useLocation } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartQuantity, setQuantity] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
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
    window.scrollTo(0,0)
    navigate("/");
  };

  // Function to handle external login redirects
  const handleExternalLogin = (url) => {
    window.open(url, '_blank');
    setShowLoginDropdown(false);
    setIsMenuOpen(false);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="nav-container">
          {/* Logo */}
          <div className="nav-logo" onClick={() => window.location.href = "/"}>
            <span className="logo">WAY4TRACK</span>
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
                onClick={() => {navigate("/");  window.scrollTo(0,0)}}
              >
                Home
              </li>
              <li
                className={`menu-item ${isActive("/Careers") ? "active" : ""}`}
                onClick={() => {navigate("/Careers");  window.scrollTo(0,0)}}
              >
                Career
              </li>
              <li
                className={`menu-item ${isActive("/blogs") ? "active" : ""}`}
                onClick={() => {navigate("/blogs");  window.scrollTo(0,0);}}
              >
                Blogs
              </li>
              <li
                className={`menu-item ${isActive("/products") ? "active" : ""}`}
                onClick={() => {navigate("/products");  window.scrollTo(0,0);}}
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
                       window.scrollTo(0,0);
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
              <div className="cart" onClick={() => { navigate("/cart");  window.scrollTo(0,0)}}>
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
                    <p onClick={() => {navigate("/my-profile");  window.scrollTo(0,0)}}>Profile</p>
                    <p onClick={handleLogout}>Logout</p>
                  </div>
                </div>
              ) : (
                <div className="login-options">
                  <button 
                    className="login-btn main-login"
                    onClick={() => {
                      navigate("/login");
                      window.scrollTo(0,0);
                    }}
                  >
                    Login
                  </button>
                  
                </div>
              )}
            </div>
            <div className="external-logins-container">
                    <button 
                      className="external-login-toggle"
                      onClick={() => setShowLoginDropdown(!showLoginDropdown)}
                    >
                      ⋮
                    </button>
                    <div className={`external-logins-dropdown ${showLoginDropdown ? 'active' : ''}`}>
                      <button 
                        className="external-login-btn online-login"
                        onClick={() => handleExternalLogin("https://way4trackonline.com/jsp/sharon_login.jsp")}
                      >
                        Way4Track Online
                      </button>
                      <button 
                        className="external-login-btn pro-login"
                        onClick={() => handleExternalLogin("https://way4trackpro.com/jsp/way4trackPro_login.jsp")}
                      >
                        Way4Track Pro
                      </button>
                      <button 
                        className="external-login-btn pro-login"
                        onClick={() => handleExternalLogin("https://way4tracksmartbus.com/jsp/sharontelematics_login.jsp")}
                      >
                        Way4Track Smartbus
                      </button>
                    </div>
                  </div>
          </div>
        </div>
      </nav>
      <div className="navbar-spacer"></div>
    </div>
  );
};

export default Navbar;