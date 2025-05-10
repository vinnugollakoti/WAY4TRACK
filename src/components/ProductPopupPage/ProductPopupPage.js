import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "../../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import "./ProductPopupPage.css";

const ProductPopupPage = ({ device }) => {
  const { cartItems, addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  console.log(device, "deviceccccc");

  const cartItem = cartItems.find((item) => item.device.id === device.id);

  const [accessory, setAccessory] = useState("Without Relay");
  const [network, setNetwork] = useState("Airtel");
  const [subscription, setSubscription] = useState("monthly");
  const [quantity, setQuantity] = useState(1);

  console.log(cartItem, "cartItem");

  useEffect(() => {
    if (cartItem) {
      setAccessory(cartItem.isRelay ? "With Relay" : "Without Relay");
      setNetwork(cartItem.network);
      setSubscription(cartItem.subscription);
      setQuantity(cartItem.quantity);
    }
  }, [cartItem]);

  const calculateTotalAmount = () => {
    let base = device.amount;
    if (accessory === "With Relay") base += device.relayAmt;
    if (subscription === "monthly") base += device.subscriptionMonthlyAmt;
    else if (subscription === "yearly") base += device.subscriptionYearlyAmt;

    const discounted =
      base - ((device.amount + device.relayAmt) * device.discount) / 100;
    return discounted * quantity;
  };

  const handleBuyItem = () => {
    const totalAmount = calculateTotalAmount();

    const buyNowData = {
      deviceId: device.id,
      name: device.name,
      image: device.image,
      quantity: quantity,
      isRelay: accessory === "With Relay",
      network: network,
      subscription: subscription,
      totalAmount: totalAmount.toString(),
    };

    localStorage.setItem("buyNowItem", JSON.stringify(buyNowData));

    navigate("/cart");
  };

  // Add to cart
  const handleAddToCart = async () => {
    const totalAmount = calculateTotalAmount();

    localStorage.removeItem("buyNowItem");
    const cartData = {
      deviceId: device.id,
      name: device.name,
      quantity: quantity,
      isRelay: accessory === "With Relay",
      network: network,
      subscription: subscription,
      totalAmount: totalAmount.toString(),
    };

    if (cartItem && cartItem.id) {
      cartData.id = cartItem.id;
    }

    try {
      await addToCart(cartData);
      console.log("Sent cart");
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  return (
    <div className="ProductPopupPage-container">
      <div className="ProductPopupPage-header">
        <img
          src={device.image}
          alt={device.name}
          className="ProductPopupPage-image"
        />
        <div className="ProductPopupPage-details">
          <h2 className="ProductPopupPage-title">{device.name}</h2>
          <p className="ProductPopupPage-subtitle">{device.description}</p>
          <div className="productPopupPage-price-container">
            <p className="ProductPopupPage-price-original">
              Rs.{device.amount}.00/-
            </p>
            <p className="ProductPopupPage-price-discounted">
              Rs.{calculateTotalAmount().toFixed(2)}
            </p>
          </div>
          <p className="ProductPopupPage-tax-info">Tax included.</p>
        </div>
      </div>

      <div className="ProductPopupPage-section">
        <label className="ProductPopupPage-label">Accessories:</label>
        <div className="ProductPopupPage-options">
          {["Without Relay", "With Relay"].map((opt) => (
            <button
              key={opt}
              onClick={() => setAccessory(opt)}
              className={`ProductPopupPage-button ${
                accessory === opt ? "ProductPopupPage-selected" : ""
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="ProductPopupPage-section">
        <label className="ProductPopupPage-label">Network:</label>
        <div className="ProductPopupPage-options">
          {["Airtel"].map((opt) => (
            <button
              key={opt}
              onClick={() => setNetwork(opt)}
              className={`ProductPopupPage-button ${
                network === opt ? "ProductPopupPage-selected" : ""
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="ProductPopupPage-section">
        <label className="ProductPopupPage-label">Subscription:</label>
        <div className="ProductPopupPage-subscription-options">
          {["monthly", "yearly"].map((type) => (
            <button
              key={type}
              onClick={() => setSubscription(type)}
              className={`ProductPopupPage-subscription-button ${
                subscription === type ? "ProductPopupPage-selected" : ""
              }`}
            >
              {type} Subscription
            </button>
          ))}
        </div>
      </div>

      <div className="ProductPopupPage-section">
        <label className="ProductPopupPage-label">Quantity:</label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="ProductPopupPage-quantity-input"
        />
      </div>

      <div className="ProductPopupPage-actions">
        <button
          onClick={handleAddToCart}
          className="ProductPopupPage-add-cart-button"
        >
          Add to cart
        </button>
        <button
          onClick={handleBuyItem}
          className="ProductPopupPage-buy-now-button"
        >
          Buy it now
        </button>
      </div>
    </div>
  );
};

export default ProductPopupPage;
