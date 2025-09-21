import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import './OrderPlaced.css';
import Navbar from './Navbar';
import Footer from './Footer';

const OrderPlaced = () => {
  useEffect(() => {
    // Confetti animation
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  return (
<div>
    <Navbar />
  <div className="order-placed-container">
    <div className="order-placed-content">
      <div className="checkmark-wrapper">
        <svg viewBox="0 0 52 52" className="checkmark-icon">
          <circle className="checkmark-circle" cx="25" cy="24" r="22" />
          <path className="checkmark" d="M14 27 L22 35 L38 19" />
        </svg>
      </div>
      <h2 className="text-success mb-3">Your Order Has Been Placed Successfully!</h2>
      <p className="lead">Thank you for shopping with us 🎉</p>

      <div className="order-summary">
        <h5>Order Summary</h5>
        <p>Order ID: <strong>#123456</strong></p>
        <p>Estimated Delivery: <strong>3-5 business days</strong></p>
      </div>

      <div className="button-group mt-4">
        <Link
            to="/my-profile"
            state={{ activeTab: "orders" }}
            className="btn btn-primary me-2 order-placed-btn"
            >
            Go to My Orders
            </Link>
        <Link to="/" className="btn btn-outline-secondary order-placed-btn">
          Back to Home
        </Link>
      </div>
    </div>
  </div>
  <Footer />
  </div>
);

};

export default OrderPlaced;
