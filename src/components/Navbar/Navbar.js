import React, { useEffect, useContext, useState, useRef } from "react";
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

  useEffect(() => {
    const fadeInElements = () => {
      if (navbarRef.current) {
        navbarRef.current.style.opacity = 1;
        navbarRef.current.style.transform = 'translateY(0)';
      }
      if (logoRef.current) {
        setTimeout(() => {
          logoRef.current.style.opacity = 1;
          logoRef.current.style.transform = 'scale(1)';
        }, 200);
      }
      navItemsRef.current.forEach((item, index) => {
        if (item) {
          setTimeout(() => {
            item.style.opacity = 1;
            item.style.transform = 'translateY(0)';
          }, 300 + (index * 100));
        }
      });
      if (cartRef.current && userRef.current) {
        setTimeout(() => {
          cartRef.current.style.opacity = 1;
          cartRef.current.style.transform = 'scale(1)';
          userRef.current.style.opacity = 1;
          userRef.current.style.transform = 'scale(1)';
        }, 600);
      }
    };

    if (navbarRef.current) navbarRef.current.style.opacity = 0;
    if (navbarRef.current) navbarRef.current.style.transform = 'translateY(-20px)';
    if (logoRef.current) logoRef.current.style.opacity = 0;
    if (logoRef.current) logoRef.current.style.transform = 'scale(0.8)';
    navItemsRef.current.forEach(item => {
      if (item) {
        item.style.opacity = 0;
        item.style.transform = 'translateY(-10px)';
      }
    });
    if (cartRef.current) cartRef.current.style.opacity = 0;
    if (cartRef.current) cartRef.current.style.transform = 'scale(0.8)';
    if (userRef.current) userRef.current.style.opacity = 0;
    if (userRef.current) userRef.current.style.transform = 'scale(0.8)';

    setTimeout(fadeInElements, 100);
  }, []);

  useEffect(() => {
    if (totalQuantity > 0) {
      const badgeEl = document.querySelector('.cart-badge');
      if (badgeEl) {
        badgeEl.style.animation = 'badgePop 0.3s forwards';
      }
    }
  }, [totalQuantity]);

  const handleLogout = () => {
    if (userRef.current) {
      userRef.current.style.opacity = 0.5;
      userRef.current.style.transform = 'scale(0.8)';
      setTimeout(() => {
        localStorage.removeItem("client_id");
        localStorage.removeItem("client_db_id");
        localStorage.removeItem("client_phone");
        if (userRef.current) {
          userRef.current.style.opacity = 1;
          userRef.current.style.transform = 'scale(1)';
        }
        navigate("/");
      }, 300);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    const mobileMenu = document.querySelector('.navbar-mobile-menu');
    if (mobileMenu) {
      if (!mobileMenuOpen) {
        mobileMenu.classList.add('open');
        document.body.classList.add('menu-open');
      } else {
        mobileMenu.classList.remove('open');
        document.body.classList.remove('menu-open');
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const mobileMenu = document.querySelector('.navbar-mobile-menu');
      const hamburger = document.querySelector('.navbar-toggler');
      if (mobileMenuOpen && mobileMenu && hamburger &&
          !mobileMenu.contains(event.target) &&
          !hamburger.contains(event.target)) {
        setMobileMenuOpen(false);
        mobileMenu.classList.remove('open');
        document.body.classList.remove('menu-open');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen]);

  return (
    <>
      <nav 
        className={`navbar fixed-top navbar-expand-lg ${scrolled ? 'navbar-scrolled' : ''}`}
        ref={navbarRef}
      >
        <div className="container">
          <a className="navbar-brand" href="/" ref={logoRef}>
            <div className="logo-container d-flex align-items-center">
              <img src="/images/logo.png" alt="Way4Track" className="img-fluid logo-img" />
              <span className="brand-text d-none d-md-inline">Way4Track</span>
            </div>
          </a>

          <div className="d-flex align-items-center order-lg-2">
            <div className="nav-link cart-link me-3" onClick={onCartClick} ref={cartRef}>
              <FaShoppingCart />
              {totalQuantity > 0 && <span className="cart-badge">{totalQuantity}</span>}
            </div>

            <div className="user-menu me-3 me-lg-0" ref={userRef}>
              {isAuthenticated ? (
                <Dropdown>
                  <Dropdown.Toggle className="user-toggle">
                    <div className="avatar-container">
                      <FaRegUserCircle className="user-icon" />
                    </div>
                    <FaAngleDown className="dropdown-arrow d-none d-lg-inline" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="/my-profile">My Profile</Dropdown.Item>
                    <Dropdown.Item href="/orders">My Orders</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Dropdown>
                  <Dropdown.Toggle className="login-toggle">
                    <span className="d-none d-lg-inline">Login</span>
                    <FaRegUserCircle className="d-inline d-lg-none" />
                    <FaAngleDown className="dropdown-arrow d-none d-lg-inline" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#">Way4Track Prime Login</Dropdown.Item>
                    <Dropdown.Item href="/login">Way4Track Login</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </div>

            <button
              className="navbar-toggler"
              type="button"
              onClick={toggleMobileMenu}
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          <div className="collapse navbar-collapse order-lg-1" id="navbarNav">
            <div className="navbar-nav ms-auto">
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
            </div>
          </div>
        </div>
      </nav>

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
              <a className="mobile-nav-link" href="/my-profile" onClick={() => setMobileMenuOpen(false)}>My Profile</a>
              <a className="mobile-nav-link" href="/orders" onClick={() => setMobileMenuOpen(false)}>My Orders</a>
              <div className="mobile-nav-link logout-link" onClick={() => {
                handleLogout();
                setMobileMenuOpen(false);
              }}>
                Logout
              </div>
            </>
          ) : (
            <>
              <a className="mobile-nav-link" href="#" onClick={() => setMobileMenuOpen(false)}>Way4Track Prime Login</a>
              <a className="mobile-nav-link" href="/login" onClick={() => setMobileMenuOpen(false)}>Way4Track Login</a>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
