import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartQuantity, setQuantity] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("client_id");
    if (token) setIsLoggedIn(true);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="navbar">
      <div className="nav-container">

        {/* Logo */}
        <div className="nav-logo">
          <span className="logo">Way4Track</span>
        </div>

        {/* Hamburger Menu Icon */}
        <div className="hamburger" onClick={toggleMenu}>
          <span className={`bar ${isMenuOpen ? 'active' : ''}`}></span>
          <span className={`bar ${isMenuOpen ? 'active' : ''}`}></span>
          <span className={`bar ${isMenuOpen ? 'active' : ''}`}></span>
        </div>

        {/* Main Navigation */}
        <div className={`nav-content ${isMenuOpen ? 'active' : ''}`}>
          <ul className="menu-list">
            <li className="menu-item" onClick={() => navigate("/")}>Home</li>
            <li className="menu-item" onClick={() => navigate("/about")}>About</li>
            <li className="menu-item" onClick={() => navigate("/contactus")}>Contact</li>
            <li className="menu-item" onClick={() => navigate("/Careers")}>Career</li>
            <li className="menu-item" onClick={() => navigate("/products")}>Products</li>
          </ul>

          <div className="actions">
            <div className="cart" onClick={() => navigate("/ncart")}>
              🛒 <p className='cart-quantity'>{cartQuantity}</p>
            </div>

            {isLoggedIn ? (
              <div className="profile" onClick={() => navigate("/my-profile")}>
                <img 
                  src="/profile-icon.png" 
                  alt="Profile" 
                  className="profile-icon"
                />
              </div>
            ) : (
              <>
                <button className="login-btn" onClick={() => navigate("/login")}>Login</button>
                <button className="get-started-btn" onClick={() => navigate("/signup")}>Sign Up</button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
