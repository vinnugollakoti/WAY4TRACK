import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CheckoutSteps from "../CheckoutSteps/CheckoutSteps";
import { CartContext } from "../../contexts/CartContext";
import ApiService, { initialAuthState } from "../Services/ApiServices";

import "./OrderDetailsPage.css";

function OrderDetailsPage() {
  const location = useLocation();
  const { cartItems, updateQuantity } = useContext(CartContext);
  const { selectedAddress } = location.state || {};
  const companyCode = initialAuthState.companyCode;
  const unitCode = initialAuthState.unitCode;
  const clientId = Number(localStorage.getItem("client_db_id"));
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.totalAmount),
    0
  );

  const handleQuantityChange = (id, type) => {
    updateQuantity(id, type === "inc" ? 1 : -1);
  };

  const createOrderPayload = () => {
    const orderItems = cartItems.map((item) => ({
      name: item.device.name,
      qty: item.quantity,
      amount: item.totalAmount,
      deviceId: item.device.id,
      is_relay: item.isRelay,
      network: item.network,
      subscriptionType: item.subscription,
      desc: item.device.model,
    }));

    return {
      name: "Mahesh",
      totalAmount: total,
      paymentStatus: "pending",
      orderDate: new Date().toISOString(),
      deliveryAddress: JSON.stringify(selectedAddress.phoneNumber),
      subscription: "pending",
      clientId,
      companyCode,
      unitCode,
      orderItems,
    };
  };

  const placeOrder = async () => {
    setIsLoading(true);

    const payload = createOrderPayload();

    try {
      const response = await ApiService.post(
        "/order/handleCreateOrder",
        payload
      );

      if (response.status) {
        console.log("Order placed successfully:", response);
        navigate("/order-success", { state: { order: response.data } });
      } else {
        throw new Error("Failed to place order");
      }
    } catch (err) {
      console.error("Error placing order:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="order-details-container">
      <CheckoutSteps currentStep={3} />
      <h1 className="title">Order Confirmation</h1>

      <div className="order-details-grid">
        {/* Left: Order Items */}
        <div className="order-left">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.id} className="cart-card">
                <div className="cart-card-inner">
                  <div className="cart-image-wrapper">
                    <img
                      src={item.device.image}
                      alt={item.device.name}
                      className="cart-image"
                    />
                  </div>
                  <div className="cart-info">
                    <h2 className="cart-name">{item.device.name}</h2>
                    <p>
                      Accessories:{" "}
                      {item.isRelay ? "With Relay" : "Without Relay"}
                    </p>
                    <p>Subscription: {item.subscription} subscription</p>
                    <p>Network: {item.network}</p>
                    <p>Rs. {item.totalAmount}</p>
                    <div className="quantity-controls">
                      <button
                        className="qty-btn"
                        onClick={() => handleQuantityChange(item.id, "dec")}
                      >
                        -
                      </button>
                      <span className="qty-number">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => handleQuantityChange(item.id, "inc")}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No items in cart.</p>
          )}
        </div>

        {/* Right: Address + Summary */}
        <div className="order-right">
          <div className="order-section">
            <h2>Shipping Address</h2>
            {selectedAddress ? (
              <p>
                {selectedAddress.name}
                <br />
                {selectedAddress.phoneNumber}
                <br />
                {selectedAddress.city}, {selectedAddress.state},{" "}
                {selectedAddress.country} - {selectedAddress.pin}
              </p>
            ) : (
              <p>No address provided.</p>
            )}
          </div>

          <div className="order-section summary">
            <h2>Summary</h2>
            <p>Total Items: {cartItems.length}</p>
            <p>Total Price: ₹{total}</p>
            <button
              className="place-order"
              onClick={placeOrder}
              disabled={isLoading}
            >
              {isLoading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsPage;
