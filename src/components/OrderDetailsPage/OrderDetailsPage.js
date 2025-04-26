import React from "react";
import CheckoutSteps from "../CheckoutSteps/CheckoutSteps";
import "./OrderDetailsPage.css";

const dummyCartItems = [
  {
    id: 1,
    name: "Vehicle Tracker X1",
    price: 4500,
    quantity: 1,
  },
  {
    id: 2,
    name: "Personal GPS Watch",
    price: 7500,
    quantity: 2,
  },
  {
    id: 3,
    name: "Bike GPS Tracker Mini",
    price: 3200,
    quantity: 1,
  },
  {
    id: 4,
    name: "Smart Pet Tracker Collar",
    price: 2800,
    quantity: 1,
  },
  {
    id: 5,
    name: "Asset Tracker Pro",
    price: 5100,
    quantity: 3,
  },
  {
    id: 6,
    name: "Fleet Management Tracker",
    price: 9500,
    quantity: 1,
  },
  {
    id: 7,
    name: "Magnetic GPS Tracker",
    price: 3999,
    quantity: 2,
  },
  {
    id: 8,
    name: "Smart Luggage Tracker",
    price: 2899,
    quantity: 1,
  },
  {
    id: 9,
    name: "Child Safety GPS Band",
    price: 4600,
    quantity: 1,
  },
  {
    id: 10,
    name: "Drone Location Tracker",
    price: 8800,
    quantity: 1,
  },
];

function OrderDetailsPage() {
  const total = dummyCartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const address = JSON.parse(localStorage.getItem("shippingAddress"));

  return (
    <div className="order-details-container">
      <CheckoutSteps currentStep={3} />
      <h1 className="title">Order Confirmation</h1>

      <div className="order-details-grid">
        {/* Left: Order Items */}
        <div className="order-left">
          <h2>Order Items</h2>
          {dummyCartItems.map((item) => (
            <div key={item.id} className="order-item">
              <p>
                {item.name} (x{item.quantity}) - ₹{item.price * item.quantity}
              </p>
            </div>
          ))}
        </div>

        {/* Right: Address + Summary */}
        <div className="order-right">
          <div className="order-section">
            <h2>Shipping Address</h2>
            {address ? (
              <p>
                {address.fullName}
                <br />
                {address.phone}
                <br />
                {address.street}, {address.city}, {address.state} -{" "}
                {address.zip}
              </p>
            ) : (
              <p>No address provided.</p>
            )}
          </div>

          <div className="order-section summary">
            <h2>Summary</h2>
            <p>Total Items: {dummyCartItems.length}</p>
            <p>Total Price: ₹{total}</p>
            <button className="place-order">Place Order</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsPage;
