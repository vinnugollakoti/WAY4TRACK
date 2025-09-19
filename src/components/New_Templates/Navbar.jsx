import React, { useState } from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <div className="nav-logo">
          <span className="logo">Way4Track</span>
        </div>

        {/* Hamburger Menu Icon - Only visible on mobile */}
        <div className="hamburger" onClick={toggleMenu}>
          <span className={`bar ${isMenuOpen ? 'active' : ''}`}></span>
          <span className={`bar ${isMenuOpen ? 'active' : ''}`}></span>
          <span className={`bar ${isMenuOpen ? 'active' : ''}`}></span>
        </div>

        {/* Main Navigation Content */}
        <div className={`nav-content ${isMenuOpen ? 'active' : ''}`}>
          <ul className="menu-list">

            <li className="menu-item" onClick={() => navigate("/")}>Home</li>

            <li className="menu-item" onClick={() => navigate("/about")}>About</li>
            <li className="menu-item" onClick={() => navigate("/contactus")}>Contact</li>
            <li className="menu-item" onClick={() => navigate("/blogs")}>Blog</li>
            <li className="menu-item" onClick={() => navigate("/Careers")}>Career</li>
            <li className="menu-item dropdown">
              Products <span className="arrow">▼</span>
              <ul className="dropdown-menu">
                <li>GPS Cameras</li>
                <li>Mining Trackers</li>
                <li>General GPS Trackers</li>
              </ul>
            </li>
          </ul>

          <div className="actions">
            <div className="cart">🛒</div>
            <button className="login-btn" onClick={() => navigate("/login")}>Login</button>
            <button className="get-started-btn" onClick={() => navigate("/login")}>Sign Up</button>
            {/* <button className="get-started-btn">Get Started</button> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;