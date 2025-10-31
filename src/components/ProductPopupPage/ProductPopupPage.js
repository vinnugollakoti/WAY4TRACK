import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "../../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
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

  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [isAIS, setIsAIS] = useState(false);

  useEffect(() => {
    setIsAIS(device.name.includes("AIS"));
    
    // Set default network based on device configuration (same logic as first component)
    const { network2gAmt, network4gAmt } = device;
    let defaultNetwork = null;
    if (network2gAmt === 0) defaultNetwork = "2G";
    else if (network4gAmt === 0) defaultNetwork = "4G";
    
    setSelectedNetwork(defaultNetwork);
  }, [device]);

  useEffect(() => {
    if (cartItem) {
      setSelectedRelayer(cartItem.relayer || null);
      setSelectedNetwork(cartItem.network || null);
      setSelectedSubscription(cartItem.subscription || null);
      setQuantity(cartItem.quantity);
      setSelectedState(cartItem.state || null);
      setSelectedCity(cartItem.city || null);
    }
  }, [cartItem]);

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
    let price = Math.round(
      (device.amount || 100) * (1 - (device.discount || 0) / 100)
    );

    if (selectedRelayer) price += parseInt(selectedRelayer) || 0;

    if (selectedNetwork === "2G") {
      price += parseInt(device.network2gAmt) || 0;
    } else if (selectedNetwork === "4G") {
      price += parseInt(device.network4gAmt) || 0;
    }

    if (selectedSubscription === "monthly") {
      price += parseInt(device.subscriptionMonthlyAmt) || 0;
    } else if (selectedSubscription === "yearly") {
      price += parseInt(device.subscriptionYearlyAmt) || 0;
    }

    if (isAIS && selectedCityInfo?.price) {
      price += parseInt(selectedCityInfo.price) || 0;
    }

    return price * quantity;
  };

  const handleAddToCart = async () => {
    if (isAIS && (!selectedState || !selectedCity)) {
      toast.error("Please select your state and city");
      return;
    }

    // Check if network selection is required (same logic as first component)
    const allNetworkZeroOrExcluded =
      (device.network2gAmt === undefined || device.network2gAmt === -1) &&
      (device.network4gAmt === undefined || device.network4gAmt === -1);

    const allSubscriptionZero =
      (!device.subscriptionMonthlyAmt || device.subscriptionMonthlyAmt === 0) &&
      (!device.subscriptionYearlyAmt || device.subscriptionYearlyAmt === 0);

    if (device.isNetwork && !allNetworkZeroOrExcluded && !selectedNetwork) {
      toast.error("Please select a network option before adding to cart");
      return;
    }

    if (device.isSubscription && !allSubscriptionZero && !selectedSubscription) {
      toast.error("Please select a subscription option before adding to cart");
      return;
    }

    const totalAmount = calculateTotalAmount();

    const cartData = {
      deviceId: device.id,
      product: { selectedDevice: device }, // Match structure of first component
      quantity,
      clientId: clientDbId,
      totalAmount: totalAmount,
      price: calculateTotalAmount() / quantity,
      name: device.name,
      model: device.model,
      discount: device.discount || 0,
      network: selectedNetwork,
      relayer: selectedRelayer,
      subscription: selectedSubscription,
      state: selectedState,
      city: selectedCity,
    };

    if (cartItem && cartItem.id) cartData.id = cartItem.id;

    try {
      await addToCart(cartData);
      toast.success("Product added to cart!");
    } catch (error) {
      console.error("Failed to add to cart:", error);
      toast.error("Failed to add product to cart");
    }
  };

  const handleBuyNow = () => {
    // First validate all required selections
    if (isAIS && (!selectedState || !selectedCity)) {
      toast.error("Please select your state and city");
      return;
    }

    // Check if network selection is required
    const allNetworkZeroOrExcluded =
      (device.network2gAmt === undefined || device.network2gAmt === -1) &&
      (device.network4gAmt === undefined || device.network4gAmt === -1);

    const allSubscriptionZero =
      (!device.subscriptionMonthlyAmt || device.subscriptionMonthlyAmt === 0) &&
      (!device.subscriptionYearlyAmt || device.subscriptionYearlyAmt === 0);

    if (device.isNetwork && !allNetworkZeroOrExcluded && !selectedNetwork) {
      toast.error("Please select a network option before adding to cart");
      return;
    }

    if (device.isSubscription && !allSubscriptionZero && !selectedSubscription) {
      toast.error("Please select a subscription option before adding to cart");
      return;
    }

    // If all validations pass, add to cart and navigate
    handleAddToCart();
    navigate("/cart");
  };

  return (
    <div className="ProductPopupPage-container">
      <Toaster position="top-left" reverseOrder={false} />

      <div className="ProductPopupPage-header">
        <img
          src={device.image?.[0] || "/images/placeholder-product.png"}
          alt={device.name}
          className="ProductPopupPage-image"
          onError={(e) => (e.target.src = "/images/placeholder-product.png")}
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

      {/* === RELAYER === */}
      {device.isRelay && device.relayAmt > 0 && (
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
              Relayer – ₹{device.relayAmt}
            </button>
          </div>
        </div>
      )}

      {/* === NETWORK === */}
      {device.isNetwork &&
        !(device.network2gAmt === -1 && device.network4gAmt === -1) && (
          <div className="ProductPopupPage-section">
            <label className="ProductPopupPage-label">Network Options:</label>
            <div className="ProductPopupPage-options">
              {/* 2G Option */}
              {device.network2gAmt !== -1 && (
                <button
                  className={`ProductPopupPage-button ${
                    selectedNetwork === "2G" ? "ProductPopupPage-selected" : ""
                  }`}
                  onClick={() =>
                    device.network2gAmt > 0 &&
                    setSelectedNetwork((prev) => (prev === "2G" ? null : "2G"))
                  }
                  disabled={device.network2gAmt === 0}
                >
                  2G – ₹
                  {device.network2gAmt === 0 ? "Included" : device.network2gAmt}
                </button>
              )}

              {/* 4G Option */}
              {device.network4gAmt !== -1 && (
                <button
                  className={`ProductPopupPage-button ${
                    selectedNetwork === "4G" ? "ProductPopupPage-selected" : ""
                  }`}
                  onClick={() =>
                    device.network4gAmt > 0 &&
                    setSelectedNetwork((prev) => (prev === "4G" ? null : "4G"))
                  }
                  disabled={device.network4gAmt === 0}
                >
                  4G – ₹
                  {device.network4gAmt === 0 ? "Included" : device.network4gAmt}
                </button>
              )}
            </div>
          </div>
        )}

      {/* === SUBSCRIPTION === */}
      {device.isSubscription &&
        (device.subscriptionMonthlyAmt > 0 ||
          device.subscriptionYearlyAmt > 0) && (
          <div className="ProductPopupPage-section">
            <label className="ProductPopupPage-label">Subscription:</label>
            <div className="ProductPopupPage-options">
              {device.subscriptionMonthlyAmt > 0 && (
                <button
                  className={`ProductPopupPage-button ${
                    selectedSubscription === "monthly" ? "ProductPopupPage-selected" : ""
                  }`}
                  onClick={() =>
                    setSelectedSubscription((prev) =>
                      prev === "monthly" ? null : "monthly"
                    )
                  }
                >
                  Monthly – ₹{device.subscriptionMonthlyAmt}
                </button>
              )}
              {device.subscriptionYearlyAmt > 0 && (
                <button
                  className={`ProductPopupPage-button ${
                    selectedSubscription === "yearly" ? "ProductPopupPage-selected" : ""
                  }`}
                  onClick={() =>
                    setSelectedSubscription((prev) =>
                      prev === "yearly" ? null : "yearly"
                    )
                  }
                >
                  Yearly – ₹{device.subscriptionYearlyAmt}
                </button>
              )}
            </div>
          </div>
        )}

      {/* === LOCATION (AIS ONLY) === */}
      {isAIS && (
        <div className="ProductPopupPage-section">
          <label className="ProductPopupPage-label">Location (AIS Only):</label>
          <div className="ProductPopupPage-options">
            <select
              className="ProductPopupPage-select"
              value={selectedState || ""}
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
              value={selectedCity || ""}
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

      {/* === QUANTITY === */}
      <div className="ProductPopupPage-section">
        <label className="ProductPopupPage-label">Quantity:</label>
        <div className="ProductPopupPage-quantity-controls">
          <button
            onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
            className="ProductPopupPage-quantity-btn"
          >
            -
          </button>
          <span className="ProductPopupPage-quantity-value">{quantity}</span>
          <button
            onClick={() => setQuantity((prev) => prev + 1)}
            className="ProductPopupPage-quantity-btn"
          >
            +
          </button>
        </div>
      </div>

      {/* === ACTIONS === */}
      <div className="ProductPopupPage-actions">
        <button
          onClick={handleAddToCart}
          className="ProductPopupPage-add-cart-button"
          disabled={isBuyDisabled}
        >
          Add to cart
        </button>
        <button
          onClick={handleBuyNow}
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