import React, { useEffect } from "react";
import gsap from "gsap";
import "./Navbar.css";
import { Dropdown } from "react-bootstrap";

const Navbar = () => {
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
          {/* <span className="way4track-text ms-2">WAY4TRACK</span> */}
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
            <a className="nav-link active" aria-current="page" href="#">
              Home
            </a>
            <a className="nav-link" href="#">
              About
            </a>
            <a className="nav-link" href="#">
              Contact
            </a>
            <a className="nav-link" href="#">
              Blog
            </a>
            <a className="nav-link" href="/products">
              Products
            </a>
            <a className="nav-link" href="/cart">
              Cart
            </a>

            {/* Login Dropdown Fixed */}
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
                <Dropdown.Item href="#">Way4Track Login</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
