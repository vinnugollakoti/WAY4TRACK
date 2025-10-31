import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import confetti from 'canvas-confetti';
import './OrderPlaced.css';
import Navbar from './Navbar';
import Footer from './Footer';

const OrderPlaced = () => {
  const location = useLocation();
  const { orderId, totalAmount } = location.state || {};

  useEffect(() => {
    // Multiple confetti bursts for better celebration effect
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // Since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  // Generate a random order ID if not provided
  const displayOrderId = orderId || `#${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  
  // Calculate estimated delivery date (3-5 business days from now)
  const getDeliveryDate = () => {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 4); // 4 days from now
    return deliveryDate.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="order-placed-page">
      <Navbar />
      <div className="order-placed-container">
        <div className="order-placed-content">
          <div className="success-animation">
            <div className="checkmark-wrapper">
              <svg viewBox="0 0 52 52" className="checkmark-icon">
                <circle className="checkmark-circle" cx="26" cy="26" r="25" />
                <path className="checkmark" d="M14 27 L22 35 L38 19" />
              </svg>
            </div>
            <div className="confetti-overlay"></div>
          </div>
          
          <div className="success-content">
            <h1 className="success-title">Order Confirmed!</h1>
            <p className="success-subtitle">Thank you for your purchase 🎉</p>
            
            <div className="order-details-card">
              <div className="detail-item">
                <span className="detail-label">Order ID:</span>
                <span className="detail-value">{displayOrderId}</span>
              </div>
              
              {totalAmount && (
                <div className="detail-item">
                  <span className="detail-label">Total Amount:</span>
                  <span className="detail-value">₹{totalAmount.toLocaleString()}</span>
                </div>
              )}
              
              <div className="detail-item">
                <span className="detail-label">Estimated Delivery:</span>
                <span className="detail-value">{getDeliveryDate()}</span>
              </div>
              
              <div className="delivery-note">
                📦 You'll receive a confirmation email shortly with tracking details
              </div>
            </div>

            <div className="next-steps">
              <h3>What's Next?</h3>
              <div className="steps-list">
                <div className="step">
                  <div className="step-icon">📧</div>
                  <div className="step-text">
                    <strong>Order Confirmation</strong>
                    <span>Check your email for order details</span>
                  </div>
                </div>
                <div className="step">
                  <div className="step-icon">🚚</div>
                  <div className="step-text">
                    <strong>Shipping Updates</strong>
                    <span>Track your package in real-time</span>
                  </div>
                </div>
                <div className="step">
                  <div className="step-icon">📦</div>
                  <div className="step-text">
                    <strong>Delivery</strong>
                    <span>Receive your order at your doorstep</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="action-buttons">
              <Link
                to="/my-profile"
                state={{ activeTab: "orders" }}
                className="btn-primary"
              >
                View My Orders
              </Link>
              <Link to="/products" className="btn-secondary">
                Continue Shopping
              </Link>
              <Link to="/" className="btn-outline">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderPlaced;