import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "../../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import "./ProductPopupPage.css";
import AIS140Availability from "../../contexts/AIS140Availabilities";

const ProductPopupPage = ({ device }) => {
  const { cartItems, addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  console.log(device, "device");

  const cartItem = cartItems.find((item) => item.device?.id === device.id);

  const [accessory, setAccessory] = useState("Without Relay");
  const [network, setNetwork] = useState("Airtel");
  const [subscription, setSubscription] = useState("monthly");
  const [quantity, setQuantity] = useState(1);
  const clientDbId = localStorage.getItem("client_db_id");

  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [isAIS, setIsAIS] = useState(false);

  useEffect(() => {
    setIsAIS(device.name.startsWith("AIS"));
  }, [device.name]);


  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setSelectedCity(""); // reset city when state changes
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const selectedCityInfo = AIS140Availability[selectedState]?.find(
    (city) => city.name === selectedCity
  );
  const isBuyDisabled = isAIS
    ? !selectedState || !selectedCity || !selectedCityInfo?.availability
    : false;

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
      clientId: clientDbId,
    };

    if (cartItem && cartItem.id) {
      cartData.id = cartItem.id;
    }
    try {
      await addToCart(cartData);
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
              className={`ProductPopupPage-button ${accessory === opt ? "ProductPopupPage-selected" : ""
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
              className={`ProductPopupPage-button ${network === opt ? "ProductPopupPage-selected" : ""
                }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {
        isAIS &&
        <div className="ProductPopupPage-section">
          <label className="ProductPopupPage-label">Location:</label>
          <div className="ProductPopupPage-options">
            {/* State dropdown */}
            <select
              className="ProductPopupPage-select"
              value={selectedState}
              onChange={handleStateChange}
            >
              <option value="">Select State</option>
              {Object.keys(AIS140Availability).map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>

            {/* City dropdown */}
            <select
              className="ProductPopupPage-select"
              value={selectedCity}
              onChange={handleCityChange}
              disabled={!selectedState}
            >
              <option value="">Select City</option>
              {selectedState &&
                AIS140Availability[selectedState].map((city) => (
                  <option
                    key={city.name}
                    value={city.name}
                    disabled={!city.availability}
                  >
                    {city.name} {city.availability ? "" : "(Unavailable)"}
                  </option>
                ))}
            </select>
          </div>

          {/* Show price and availability */}
          {selectedCityInfo && (
            <div style={{ marginTop: "10px" }}>
              <strong>Price:</strong> ₹{selectedCityInfo.price} <br />
              <strong>Available:</strong>{" "}
              {selectedCityInfo.availability ? "Yes" : "No"}
            </div>
          )}
        </div>
      }

      <div className="ProductPopupPage-section">
        <label className="ProductPopupPage-label">Subscription:</label>
        <div className="ProductPopupPage-subscription-options">
          {["monthly", "yearly"].map((type) => (
            <button
              key={type}
              onClick={() => setSubscription(type)}
              className={`ProductPopupPage-subscription-button ${subscription === type ? "ProductPopupPage-selected" : ""
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

      <div className="ProductPopupPage-actions" >
        <button
          onClick={handleAddToCart}
          className="ProductPopupPage-add-cart-button"
          disabled={isBuyDisabled}
        >
          Add to cart
        </button>
        <button
          onClick={handleBuyItem}
          className="ProductPopupPage-buy-now-button"
          disabled={isBuyDisabled}
        >
          Buy it now
        </button>
      </div>
    </div>
  );
};

export default ProductPopupPage;
