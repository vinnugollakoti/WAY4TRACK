import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CheckoutSteps from "../CheckoutSteps/CheckoutSteps";
import { CartContext } from "../../contexts/CartContext";
import ApiService, { initialAuthState } from "../Services/ApiServices";
import PromoCode from "../Promocode/Promocode";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../New_Templates/Navbar";
import Footer from "../New_Templates/Footer";
import "./OrderDetailsPage.css";
import { FaMinus, FaPlus } from "react-icons/fa";

function OrderDetailsPage() {
  const location = useLocation();
  const { cartItems, setCartItems, addToCart, removeFromCart } = useContext(CartContext);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [selectedPromoDetails, setSelectedPromoDetails] = useState(null);
  const { deliveryAddress, billingAddress, isBuyNow, orderItems } = location.state || {};
  const navigate = useNavigate();
  const clientId = Number(localStorage.getItem("client_db_id"));

  const displayedItems = isBuyNow ? orderItems : cartItems;

  const displayedItemsNormalized = displayedItems.map((item) => {
    if (isBuyNow) {
      return {
        ...item,
        device: {
          name: item.name,
          model: item.model,
          id: item.deviceId,
          image: item.image,
          relayAmt: item.relayAmt,
          network2gAmt: item.network2gAmt,
          network4gAmt: item.network4gAmt,
          subscriptionMonthlyAmt: item.subscriptionMonthlyAmt,
          subscriptionYearlyAmt: item.subscriptionYearlyAmt,
        },
      };
    }
    return item;
  });

  const toNumber = (val) => Number(val) || 0;

  const updateQuantity = async (itemId, change) => {
    const cartItem = cartItems.find((item) => item.id === itemId);
    if (!cartItem) return;
    const updatedQuantity = (cartItem?.quantity || 1) + change;
    if (updatedQuantity < 1) return;

    const updatedCartData = {
      ...cartItem,
      id: itemId,
      quantity: updatedQuantity,
      clientId: cartItem.client.id,
      deviceId: cartItem.device.id,
    };

    try {
      await addToCart(updatedCartData);
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  const getTotalAmount = () =>
    displayedItems.reduce((acc, item) => acc + toNumber(item.totalAmount), 0) - promoDiscount;

  const calculateItemTotal = (item) => toNumber(item.totalAmount);

  return (
    <div className="order-details-container">
      <Navbar />
      <CheckoutSteps currentStep={3} />
      <h1 className="title">Order Confirmation</h1>

      <div className="order-details-grid">
        {/* Left: Order Items */}
        <div className="order-left">
          {displayedItemsNormalized.length > 0 ? (
            displayedItemsNormalized.map((item) => (
              <div key={item.id} className="cart-item" style={{ marginBottom: "20px" }}>
                <img
                  src={item.device.image?.[0] || "/images/default.jpg"}
                  alt={item.device.name}
                  className="cart-image"
                />
                <div className="cart-item-text">
                  <div className="cart-item-header">
                    <span className="cart-header">{item.device.name}</span>
                    <span className="cart-price">₹{calculateItemTotal(item)}</span>
                  </div>
                  <div className="cart-item-details">
                    {item.device.relayAmt > 0 && (
                      <p>Accessories: {item.isRelay ? "With Relay" : "Without Relay"}</p>
                    )}
                    {(item.device.network2gAmt > 0 || item.device.network4gAmt > 0) && (
                      <p>Network: {item.network || "N/A"}</p>
                    )}
                    {(item.device.subscriptionMonthlyAmt > 0 || item.device.subscriptionYearlyAmt > 0) && (
                      <p>Subscription: {item.subscription || "N/A"}</p>
                    )}
                    <p>{item.device.model}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>

                </div>
              </div>
            ))
          ) : (
            <p>No items in cart.</p>
          )}
        </div>

        {/* Right: Summary */}
        <div className="order-right">
          <PromoCode
            totalAmount={getTotalAmount()}
            onApply={(discount, promoDetails) => {
              setPromoDiscount(discount);
              setSelectedPromoDetails(promoDetails);
            }}
          />
          <div className="order-section">
            <h2>Shipping Address</h2>
            {deliveryAddress ? (
              <p>
                {deliveryAddress.name}
                <br />
                {deliveryAddress.phoneNumber}
                <br />
                {deliveryAddress.city}, {deliveryAddress.state}, {deliveryAddress.country} - {deliveryAddress.pin}
              </p>
            ) : (
              <p>No address provided.</p>
            )}
          </div>

          <div className="order-section">
            <h2>Billing Address</h2>
            {billingAddress ? (
              <p>
                {billingAddress.name}
                <br />
                {billingAddress.phoneNumber}
                <br />
                {billingAddress.city}, {billingAddress.state}, {billingAddress.country} - {billingAddress.pin}
              </p>
            ) : (
              <p>No address provided.</p>
            )}
          </div>

          <div className="order-section summary">
            <h2>Summary</h2>
            <p>Total Items: {displayedItems.length}</p>
            <p>Total Price: ₹{getTotalAmount() + promoDiscount}</p>
            {promoDiscount > 0 && <p style={{ color: "green" }}>Promo Discount: -₹{promoDiscount.toFixed(2)}</p>}
            <p><strong>Final Amount: ₹{getTotalAmount().toFixed(2)}</strong></p>
            <button
              className="place-order"
              onClick={() => toast.success("Place order logic here")}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
      <Toaster />
      <Footer />
    </div>
  );
}

export default OrderDetailsPage;
