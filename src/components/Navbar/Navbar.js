import React, { useEffect, useContext, useState, useRef } from "react";
import gsap from "gsap";
import "./Navbar.css";
import { Dropdown } from "react-bootstrap";
import { CartContext } from "../../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { 
  FaRegUserCircle, 
  FaShoppingCart, 
  FaBars, 
  FaTimes,
  FaAngleDown
} from "react-icons/fa";

const Navbar = ({ onCartClick }) => {
  const { cartItems } = useContext(CartContext || { cartItems: [] });
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const isAuthenticated = !!localStorage.getItem("client_id");
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navbarRef = useRef(null);
  const navItemsRef = useRef([]);
  const logoRef = useRef(null);
  const cartRef = useRef(null);
  const userRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Initial animation
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    // Initial state - off screen
    gsap.set(navbarRef.current, { y: -100, opacity: 0 });
    gsap.set(logoRef.current, { scale: 0.8, opacity: 0 });
    gsap.set(navItemsRef.current, { y: -40, opacity: 0 });
    gsap.set(userRef.current, { scale: 0.8, opacity: 0 });
    gsap.set(cartRef.current, { scale: 0.8, opacity: 0 });
    
    // Animate in sequence
    tl.to(navbarRef.current, { y: 0, opacity: 1, duration: 0.5 })
      .to(logoRef.current, { scale: 1, opacity: 1, duration: 0.4 }, "-=0.2")
      .to(navItemsRef.current, { 
        y: 0, 
        opacity: 1, 
        duration: 0.4, 
        stagger: 0.1 
      }, "-=0.2")
      .to([cartRef.current, userRef.current], { 
        scale: 1, 
        opacity: 1, 
        duration: 0.4,
        stagger: 0.1
      }, "-=0.3");
  }, []);

  // Cart badge animation
  useEffect(() => {
    if (totalQuantity > 0) {
      const badgeEl = document.querySelector('.cart-badge');
      if (badgeEl) {
        gsap.from(badgeEl, {
          scale: 0,
          duration: 0.3,
          ease: "back.out(1.7)"
        });
      }
    }
  }, [totalQuantity]);

  const handleLogout = () => {
    // Logout animation
    gsap.to(userRef.current, {
      scale: 0.8,
      opacity: 0.5,
      duration: 0.3,
      onComplete: () => {
        localStorage.removeItem("client_id");
        localStorage.removeItem("client_db_id");
        localStorage.removeItem("client_phone");
        
        // Reset animation
        gsap.to(userRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.3
        });
        
        navigate("/");
      }
    });
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    
    // Animation for mobile menu
    if (!mobileMenuOpen) {
      gsap.to('.navbar-mobile-menu', {
        x: 0,
        duration: 0.4,
        ease: "power2.out"
      });
    } else {
      gsap.to('.navbar-mobile-menu', {
        x: '100%',
        duration: 0.3,
        ease: "power2.in"
      });
    }
  };

  return (
    <nav 
      className={`navbar navbar-expand-lg ${scrolled ? 'navbar-scrolled' : ''}`}
      ref={navbarRef}
    >
      <div className="container d-flex justify-content-between align-items-center">
        {/* Logo */}
        <a className="navbar-brand logo d-flex align-items-center" href="/" ref={logoRef}>
          <div className="logo-container">
            <img
              src="/images/logo.png"
              alt="Way4Track"
              className="img-fluid logo-img"
            />
            <span className="brand-text d-none d-md-inline">Way4Track</span>
          </div>
        </a>
        
        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
        
        {/* Desktop Navigation */}
        <div className={`collapse navbar-collapse justify-content-end ${mobileMenuOpen ? 'show' : ''}`}>
          <div className="navbar-nav nav-content d-flex align-items-center">
            {['Home', 'About', 'Contact', 'Blog', 'Careers', 'Products'].map((item, index) => (
              <a 
                key={index}
                className="nav-link" 
                href={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase() === 'blog' ? 'bloglist' : item.toLowerCase()}`}
                ref={el => navItemsRef.current[index] = el}
              >
                {item}
              </a>
            ))}
            
            {/* Cart Icon */}
            <div 
              className="nav-link cart-link" 
              onClick={onCartClick}
              ref={cartRef}
            >
              <FaShoppingCart />
              {totalQuantity > 0 && (
                <span className="cart-badge">{totalQuantity}</span>
              )}
            </div>

            {/* User Menu */}
            <div className="user-menu" ref={userRef}>
              {isAuthenticated ? (
                <Dropdown>
                  <Dropdown.Toggle className="user-toggle">
                    <div className="avatar-container">
                      <FaRegUserCircle className="user-icon" />
                    </div>
                    <FaAngleDown className="dropdown-arrow" />
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="user-dropdown-menu">
                    <Dropdown.Item href="/my-profile" className="dropdown-item">
                      My Profile
                    </Dropdown.Item>
                    <Dropdown.Item href="/orders" className="dropdown-item">
                      My Orders
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout} className="dropdown-item logout-item">
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Dropdown>
                  <Dropdown.Toggle className="login-toggle">
                    Login <FaAngleDown className="dropdown-arrow" />
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="login-dropdown-menu">
                    <Dropdown.Item href="#" className="dropdown-item">
                      Way4Track Prime Login
                    </Dropdown.Item>
                    <Dropdown.Item href="/login" className="dropdown-item">
                      Way4Track Login
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div className={`navbar-mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-content">
            {['Home', 'About', 'Contact', 'Blog', 'Careers', 'Products'].map((item, index) => (
              <a 
                key={index}
                className="mobile-nav-link" 
                href={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase() === 'blog' ? 'bloglist' : item.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            
            <div className="mobile-nav-link" onClick={() => {
              onCartClick();
              setMobileMenuOpen(false);
            }}>
              Cart {totalQuantity > 0 && <span className="mobile-cart-badge">{totalQuantity}</span>}
            </div>
            
            {isAuthenticated ? (
              <>
                <a className="mobile-nav-link" href="/my-profile" onClick={() => setMobileMenuOpen(false)}>
                  My Profile
                </a>
                <a className="mobile-nav-link" href="/orders" onClick={() => setMobileMenuOpen(false)}>
                  My Orders
                </a>
                <div className="mobile-nav-link logout-link" onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}>
                  Logout
                </div>
              </>
            ) : (
              <>
                <a className="mobile-nav-link" href="#" onClick={() => setMobileMenuOpen(false)}>
                  Way4Track Prime Login
                </a>
                <a className="mobile-nav-link" href="/login" onClick={() => setMobileMenuOpen(false)}>
                  Way4Track Login
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;