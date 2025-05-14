import React, { useEffect, useContext } from "react";
import gsap from "gsap";
import "./Navbar.css";
import { Dropdown } from "react-bootstrap";
import { CartContext } from "../../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";

const Navbar = ({ onCartClick }) => {
  const { cartItems } = useContext(CartContext);
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const isAuthenticated = !!localStorage.getItem("client_id");
  const navigate = useNavigate();

  useEffect(() => {
    gsap.from("nav.navbar", {
      x: -2000,
      duration: 1.2,
      clearProps: "all",
    });

    gsap.from(".navbar-brand, .nav-link, .login-link", {
      y: -100,
      stagger: 0.2,
      duration: 0.8,
      clearProps: "all",
    });
  }, []);

  const handleLogout = () => {
    // Remove user data from localStorage to log them out
    localStorage.removeItem("client_id");
    localStorage.removeItem("client_db_id");
    localStorage.removeItem("client_phone");

    // Redirect to login page after logging out
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container d-flex justify-content-between align-items-center">
        <a className="navbar-brand logo d-flex align-items-center" href="#">
          <img
            src="/images/logo.png"
            alt="logo"
            className="img-fluid logo-img"
            style={{ width: "50px", height: "50px" }}
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav nav-content d-flex align-items-center gap-3">
            <a className="nav-link active" aria-current="page" href="/">
              Home
            </a>
            <a className="nav-link" href="/about">
              About
            </a>
            <a className="nav-link" href="/contact">
              Contact
            </a>
            <a className="nav-link" href="/bloglist">
              Blog
            </a>
            <a className="nav-link" href="/hiring">
              Careers
            </a>
            <a className="nav-link" href="/products">
              Products
            </a>
            <span
              className="nav-link position-relative"
              role="button"
              onClick={onCartClick}
              style={{ cursor: "pointer" }}
            >
              Cart
              {totalQuantity > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: "0.7rem" }}
                >
                  {totalQuantity}
                </span>
              )}
            </span>

            {/* Conditional Rendering for Login or User Icon */}
            {isAuthenticated ? (
              <Dropdown className="login-link">
                <Dropdown.Toggle
                  variant="light"
                  id="dropdown-basic"
                  className="login-dropdown"
                  style={{ fontFamily: "roboto", cursor: "pointer" }}
                >
                  {/* <img
                    src="/images/user-icon.png"
                    alt="User"
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                    }}
                  /> */}
                  <FaRegUserCircle
                    style={{
                      width: "25px",
                      height: "25px",
                      borderRadius: "50%",
                    }}
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="/my-profile">Profile</Dropdown.Item>
                  <Dropdown.Item href="/orders">Orders</Dropdown.Item>
                  {/* <Dropdown.Item href="/payments">Payments</Dropdown.Item> */}
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              // Show login button if not authenticated
              <Dropdown className="login-link">
                <Dropdown.Toggle
                  variant="light"
                  id="dropdown-basic"
                  className="login-dropdown"
                  style={{ fontFamily: "roboto" }}
                >
                  Login
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#">Way4Track Prime Login</Dropdown.Item>
                  <Dropdown.Item href="/login">Way4Track Login</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
