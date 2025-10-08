import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "../../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import "./ProductPopupPage.css";
import AIS140Availability from "../../contexts/AIS140Availabilities";

const ProductPopupPage = ({ device }) => {
  const { cartItems, addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const cartItem = cartItems.find((item) => item.device?.id === device.id);

  const [selectedRelayer, setSelectedRelayer] = useState(null);
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const clientDbId = localStorage.getItem("client_db_id");

  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [isAIS, setIsAIS] = useState(false);

useEffect(() => {
  setIsAIS(device.name.includes("AIS"));
}, [device.name]);


  useEffect(() => {
    if (cartItem) {
      setSelectedRelayer(cartItem.isRelay ? device.relayAmt : null);
      setSelectedNetwork(cartItem.network || null);
      setSelectedSubscription(cartItem.subscription || null);
      setQuantity(cartItem.quantity);
    }
  }, [cartItem, device.relayAmt]);

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedCity("");
  };

  const handleCityChange = (e) => setSelectedCity(e.target.value);

  const selectedCityInfo = AIS140Availability[selectedState]?.find(
    (city) => city.name === selectedCity
  );

  const isBuyDisabled = isAIS
    ? !selectedState || !selectedCity || !selectedCityInfo?.availability
    : false;

  const calculateTotalAmount = () => {
    let price = device.amount || 0;

    if (device.isRelay && selectedRelayer) price += parseInt(selectedRelayer) || 0;

    if (device.isNetwork && selectedNetwork) {
      if (selectedNetwork === "2G") price += parseInt(device.network2gAmt) || 0;
      else if (selectedNetwork === "4G") price += parseInt(device.network4gAmt) || 0;
    }

    if (device.isSubscription && selectedSubscription) {
      if (selectedSubscription === "monthly")
        price += parseInt(device.subscriptionMonthlyAmt) || 0;
      else if (selectedSubscription === "yearly")
        price += parseInt(device.subscriptionYearlyAmt) || 0;
    }

    // apply discount
    if (device.discount) price = price * (1 - device.discount / 100);

    return price * quantity;
  };

  const handleAddToCart = async () => {
    const totalAmount = calculateTotalAmount();

    const cartData = {
      deviceId: device.id,
      name: device.name,
      quantity,
      isRelay: device.isRelay && !!selectedRelayer,
      network: device.isNetwork ? selectedNetwork : null,
      subscription: device.isSubscription ? selectedSubscription : null,
      totalAmount: totalAmount.toString(),
      clientId: clientDbId,
    };

    if (cartItem && cartItem.id) cartData.id = cartItem.id;

    try {
      await addToCart(cartData);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  const handleBuyItem = () => {
    handleAddToCart();
    navigate("/cart");
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

      {device.isRelay && (
        <div className="ProductPopupPage-section">
          <label className="ProductPopupPage-label">Relayer Option:</label>
          <div className="ProductPopupPage-options">
            <button
              className={`ProductPopupPage-button ${
                selectedRelayer === device.relayAmt ? "ProductPopupPage-selected" : ""
              }`}
              onClick={() =>
                setSelectedRelayer((prev) =>
                  prev === device.relayAmt ? null : device.relayAmt
                )
              }
            >
              {selectedRelayer === device.relayAmt ? "Relayer Selected" : "Select Relayer"} – ₹{device.relayAmt}
            </button>
          </div>
        </div>
      )}

      {device.isNetwork && (
        <div className="ProductPopupPage-section">
          <label className="ProductPopupPage-label">Network Options:</label>
          <div className="ProductPopupPage-options">
            <button
              className={`ProductPopupPage-button ${
                selectedNetwork === "2G" ? "ProductPopupPage-selected" : ""
              }`}
              onClick={() => setSelectedNetwork("2G")}
            >
              2G – ₹{device.network2gAmt}
            </button>
            <button
              className={`ProductPopupPage-button ${
                selectedNetwork === "4G" ? "ProductPopupPage-selected" : ""
              }`}
              onClick={() => setSelectedNetwork("4G")}
            >
              4G – ₹{device.network4gAmt}
            </button>
          </div>
        </div>
      )}

      {isAIS && (
        <div className="ProductPopupPage-section">
          <label className="ProductPopupPage-label">Location:</label>
          <div className="ProductPopupPage-options">
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

          {selectedCityInfo && (
            <div style={{ marginTop: "10px" }}>
              <strong>Price:</strong> ₹{selectedCityInfo.price} <br />
              <strong>Available:</strong>{" "}
              {selectedCityInfo.availability ? "Yes" : "No"}
            </div>
          )}
        </div>
      )}

      {device.isSubscription && (
        <div className="ProductPopupPage-section">
          <label className="ProductPopupPage-label">Subscription:</label>
          <div className="ProductPopupPage-subscription-options">
            <button
              className={`ProductPopupPage-subscription-button ${
                selectedSubscription === "monthly" ? "ProductPopupPage-selected" : ""
              }`}
              onClick={() => setSelectedSubscription("monthly")}
            >
              Monthly – ₹{device.subscriptionMonthlyAmt}
            </button>
            <button
              className={`ProductPopupPage-subscription-button ${
                selectedSubscription === "yearly" ? "ProductPopupPage-selected" : ""
              }`}
              onClick={() => setSelectedSubscription("yearly")}
            >
              Yearly – ₹{device.subscriptionYearlyAmt}
            </button>
          </div>
        </div>
      )}

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
