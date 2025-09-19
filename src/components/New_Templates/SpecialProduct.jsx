import React from 'react'
import "./Bike.css"
import "./Mining.css"

import { useState, useEffect, useRef } from "react";


const SpecialProduct = () => {
  const [quantity, setQuantity] = useState(1);
  // Quantity control functions
  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };
  return (
    <div className="mining-product">
      <div className="mining-product-img">
        <img src="/images/miningProductImage.png" alt="" />
      </div>
      <div className="mining-product-details">
        <div className="mining-product-title">
          <h2 className="mining-product-title-h2">
            AIS-140 Mining GPS Tracker – Government Approved | Real-Time
            Tracking | SOS Button | Dual SIM | 4 Hours Backup Battery
          </h2>
        </div>
        <div className="mining-product-price">
          <p>Rs. 3,999.00 - Rs. 4,990.00</p>
        </div>
        <div className="mining-product-features">
          <ul>
            <li>
              AIS-140 Certified & Govt Approved – Mandatory for commercial
              vehicles
            </li>
            <li>
              Real-Time Tracking & SOS Alerts – Safer rides, instant
              notifications
            </li>
            <li>Dual SIM / 2G & 4G Connectivity – Always stay connected</li>
            <li>4 Hours Backup Battery – Reliable even during power cuts</li>
          </ul>
        </div>
        <div className="mining-product-order">
          <div className="mining-product-option">
            <div className="mining-product-network-label">
              <p>Network Support SIM:</p>
            </div>
            <div className="mining-product-network-btns">
              <div className="mining-product-network-btn">
                <button className="mining-product-network-btn-1">2G</button>
              </div>
              <div className="mining-product-network-btn">
                <button className="mining-product-network-btn-1">4G</button>
              </div>
            </div>
          </div>
          <div className="mining-product-final-price">
            <p>Rs. 3,999.00</p>
          </div>
          <div className="mining-product-quantity">
            <div className="mining-product-quantity-controls">
              <div className="mining-product-quantity-selector">
                <div className="mining-product-quantity-value">
                  <p>{quantity}</p>
                </div>
                <div className="mining-product-quantity-btns">
                  <div className="mining-product-quantity-btns-container">
                    <button
                      className="quantity-up"
                      onClick={incrementQuantity}
                    >
                      <img
                        className="arrow-up"
                        src="/images/up-arrows.png"
                        alt="Increase quantity"
                      />
                    </button>
                    <button
                      className="quantity-down"
                      onClick={decrementQuantity}
                    >
                      <img
                        className="arrow-down"
                        src="/images/arrow-down-sign-to-navigate.png"
                        alt="Decrease quantity"
                      />
                    </button>
                  </div>
                </div>
              </div>
              <button className="add-to-cart-btn">Add to Cart</button>
              <button className="buy-it-now-btn">Buy it now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpecialProduct
