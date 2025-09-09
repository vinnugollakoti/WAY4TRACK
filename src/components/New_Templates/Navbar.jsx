import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <li className="menu-item">Home</li>
            <li className="menu-item">About</li>
            <li className="menu-item">Contact</li>
            <li className="menu-item">Blog</li>
            <li className="menu-item">Career</li>
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
            <button className="login-btn">Login</button>
            <button className="get-started-btn">Get Started</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;