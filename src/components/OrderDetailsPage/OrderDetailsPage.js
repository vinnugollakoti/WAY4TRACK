import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CheckoutSteps from "../CheckoutSteps/CheckoutSteps";
import { CartContext } from "../../contexts/CartContext";
import ApiService, { initialAuthState } from "../Services/ApiServices";

import "./OrderDetailsPage.css";

function OrderDetailsPage() {
  const location = useLocation();
  const { cartItems, updateQuantity, removeFromCart } = useContext(CartContext);
  const { deliveryAddress, billingAddress, isBuyNow, orderItems } =
    location.state || {};
  const companyCode = initialAuthState.companyCode;
  const unitCode = initialAuthState.unitCode;
  const clientId = Number(localStorage.getItem("client_db_id"));
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

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
        },
      };
    }
    return item;
  });

  const total = displayedItems.reduce(
    (sum, item) => sum + Number(item.totalAmount),
    0
  );

  const handleQuantityChange = (id, type) => {
    updateQuantity(id, type === "inc" ? 1 : -1);
  };

  const createOrderPayload = () => {
    if (!deliveryAddress || !billingAddress) {
      // Handle the case where the addresses are missing
      alert("Please provide both delivery and billing addresses.");
      return;
    }
    const orderItems = displayedItemsNormalized.map((item) => ({
      name: item.device.name,
      qty: item.quantity,
      amount: item.totalAmount,
      deviceId: item.device.id,
      is_relay: item.isRelay,
      network: item.network,
      subscriptionType: item.subscription,
      desc: item.device.model,
    }));

    const orderDate = new Date();
    const deliveryDate = new Date(orderDate);
    deliveryDate.setDate(orderDate.getDate() + 4);

    return {
      name: "Mahesh",
      totalAmount: total,
      paymentStatus: "pending",
      orderDate: orderDate.toISOString(),
      deliveryAddressId: JSON.stringify(deliveryAddress.id),
      buildingAddressId: JSON.stringify(billingAddress.id),
      subscription: "pending",
      clientId,
      companyCode,
      unitCode,
      orderItems,
      delivaryDate: deliveryDate.toISOString(),
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
        if (!isBuyNow) {
          for (const item of displayedItemsNormalized) {
            await removeFromCart(item.id);
          }
        }

        localStorage.removeItem("buyNowItem");
        navigate("/orders", { state: { order: response.data } });
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
          {displayedItemsNormalized.length > 0 ? (
            displayedItemsNormalized.map((item) => (
              <div key={item.id} className="cart-card">
                <div className="cart-card-inner">
                  <div className="cart-image-wrapper">
                    <img
                      src={item?.device?.image}
                      alt={item?.device?.name}
                      className="cart-image"
                    />
                  </div>
                  <div className="cart-info">
                    <h2 className="cart-name">{item?.device?.name}</h2>
                    <p>
                      Accessories:{" "}
                      {item.isRelay ? "With Relay" : "Without Relay"}
                    </p>
                    <p>Subscription: {item.subscription} subscription</p>
                    <p>Network: {item.network}</p>
                    <p>Rs. {item.totalAmount}</p>
                    {/* {!isBuyNow && ( */}
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
                    {/* )} */}
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
            {deliveryAddress ? (
              <p>
                {deliveryAddress.name}
                <br />
                {deliveryAddress.phoneNumber}
                <br />
                {deliveryAddress.city}, {deliveryAddress.state},{" "}
                {deliveryAddress.country} - {deliveryAddress.pin}
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
                {billingAddress.city}, {billingAddress.state},{" "}
                {billingAddress.country} - {billingAddress.pin}
              </p>
            ) : (
              <p>No address provided.</p>
            )}
          </div>

          <div className="order-section summary">
            <h2>Summary</h2>
            <p>Total Items: {displayedItems.length}</p>
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
