import React, { useState, useEffect, useContext } from "react";
import "./Bike.css";
import "./Mining.css";
import toast, { Toaster } from "react-hot-toast";
import { CartContext } from "../../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import "./SpecialProduct.css"
import AIS140Availability from "../../contexts/AIS140Availabilities"

const SpecialProduct = ({ websiteData }) => {
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [selectedRelayer, setSelectedRelayer] = useState(null);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [isAIS, setIsAIS] = useState(false);


  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
  if (!websiteData || !websiteData[3]?.device?.[0]) return;

  const foundProduct = websiteData[3];
  const selectedDevice = foundProduct.device[0];

  setProduct({ ...foundProduct, selectedDevice });
  setSelectedImage(selectedDevice.image?.[0]);

  // Auto-select default network if one is included (₹0)
  const { network2gAmt, network4gAmt } = selectedDevice;
  if (network2gAmt === 0) setSelectedNetwork("2G");
  else if (network4gAmt === 0) setSelectedNetwork("4G");

  setIsAIS(selectedDevice.name.includes("AIS")); // detect AIS
}, [websiteData]);


  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const selectedCityInfo = isAIS
  ? AIS140Availability[selectedState]?.find(city => city.name === selectedCity)
  : null;

  const getFinalPrice = (networkOverride = selectedNetwork) => {
    const device = product?.selectedDevice;
    if (!device) return 0;

    let price = Math.round(
      (device.amount || 0) * (1 - (device.discount || 0) / 100)
    );

    if (selectedRelayer) price += parseInt(selectedRelayer) || 0;

    if (networkOverride === "2G") price += parseInt(device.network2gAmt) || 0;
    if (networkOverride === "4G") price += parseInt(device.network4gAmt) || 0;

    if (selectedSubscription === "monthly") price += parseInt(device.subscriptionMonthlyAmt) || 0;
    if (selectedSubscription === "yearly") price += parseInt(device.subscriptionYearlyAmt) || 0;

    if (selectedCityInfo?.price) price += parseInt(selectedCityInfo.price) || 0;

    return price * quantity; // multiply by quantity
  };


  const handleAddToCart = () => {
    const device = product?.selectedDevice;
    if (!device) return;

    let resolvedNetwork = selectedNetwork;
    if (!resolvedNetwork) {
      if (device.network2gAmt === 0) resolvedNetwork = "2G";
      else if (device.network4gAmt === 0) resolvedNetwork = "4G";
    }

    const allNetworkZeroOrExcluded =
      (device.network2gAmt === undefined || device.network2gAmt === -1) &&
      (device.network4gAmt === undefined || device.network4gAmt === -1);

    const allSubscriptionZero =
      (!device.subscriptionMonthlyAmt || device.subscriptionMonthlyAmt === 0) &&
      (!device.subscriptionYearlyAmt || device.subscriptionYearlyAmt === 0);

    if (device.isNetwork && !allNetworkZeroOrExcluded && !resolvedNetwork) {
      toast.error("Please select a network option before adding to cart");
      return;
    }

    if (device.isSubscription && !allSubscriptionZero && !selectedSubscription) {
      toast.error("Please select a subscription option before adding to cart");
      return;
    }

    const price = getFinalPrice(resolvedNetwork);

    const cartItem = {
      deviceId: device.id,
      product,
      quantity,
      clientId: localStorage.getItem("client_db_id"),
      totalAmount: getFinalPrice(),
      price: getFinalPrice() / quantity,
      name: device.name,
      model: device.model,
      discount: device.discount || 0,
      network: selectedNetwork,
      relayer: selectedRelayer,
      subscription: selectedSubscription,
      state: selectedState,
      city: selectedCity,
    };


    addToCart(cartItem);
    toast.success("Product added to cart!");
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedCity(""); // reset city when state changes
  };

  const handleCityChange = (e) => setSelectedCity(e.target.value);

  if (!product) return null;
  const device = product.selectedDevice;

  return (
    <div className="mining-product">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Image Section */}
      <div className="mining-product-gallery">
        <div className="mining-product-thumbnails">
          {device?.image?.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Thumbnail ${i}`}
              className={`thumbnail ${selectedImage === img ? "active" : ""}`}
              onClick={() => setSelectedImage(img)}
              onError={(e) => (e.target.src = "/images/placeholder-product.png")}
            />
          ))}
        </div>

        <div className="mining-product-main">
          <img
            src={selectedImage || device?.image?.[0]}
            alt="Main product"
            className="main-image"
            onError={(e) => (e.target.src = "/images/placeholder-product.png")}
          />
        </div>
      </div>

      {/* Product Details */}
      <div className="mining-product-details">
        <h2 className="mining-product-title-h2">
          {device?.name} {device?.model}
        </h2>

        <div className="mining-product-features">
          <ul>
            {device?.points?.slice(0, 4)?.map((p, i) => (
              <li key={i}>{p.title}</li>
            ))}
          </ul>
        </div>


        <div className="special-options-css">
        {/* Options */}
        <div className="extra-product-details">
          {/* Relayer Option */}
          {device?.isRelay && device?.relayAmt > 0 && (
            <div className="extra-detail-card">
              <h3 className="option-headings">Relayer Option</h3>
              <div className="option-btns">
                <button
                  className={`option-btn ${
                    selectedRelayer === device?.relayAmt ? "active" : ""
                  }`}
                  onClick={() =>
                    setSelectedRelayer((prev) =>
                      prev === device?.relayAmt ? null : device?.relayAmt
                    )
                  }
                >
                  Relayer – ₹{device?.relayAmt}
                </button>
              </div>
            </div>
          )}

          {/* Network Options */}
          {device?.isNetwork && (
            <div className="extra-detail-card">
              <h3 className="option-headings">Network Options</h3>
              <div className="option-btns">
                {device?.network2gAmt !== -1 && (
                  <button
                    className={`option-btn ${
                      selectedNetwork === "2G" ? "active" : ""
                    }`}
                    onClick={() =>
                      device.network2gAmt > 0 &&
                      setSelectedNetwork((prev) => (prev === "2G" ? null : "2G"))
                    }
                    disabled={device.network2gAmt === 0}
                  >
                    2G – ₹
                    {device.network2gAmt === 0
                      ? "Included"
                      : device.network2gAmt}
                  </button>
                )}

                {device?.network4gAmt !== -1 && (
                  <button
                    className={`option-btn ${
                      selectedNetwork === "4G" ? "active" : ""
                    }`}
                    onClick={() =>
                      device.network4gAmt > 0 &&
                      setSelectedNetwork((prev) => (prev === "4G" ? null : "4G"))
                    }
                    disabled={device.network4gAmt === 0}
                  >
                    4G – ₹
                    {device.network4gAmt === 0
                      ? "Included"
                      : device.network4gAmt}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Subscription Options */}
          {device?.isSubscription &&
            (device?.subscriptionMonthlyAmt > 0 ||
              device?.subscriptionYearlyAmt > 0) && (
              <div className="extra-detail-card">
                <h3 className="option-headings">Subscription</h3>
                <div className="option-btns">
                  {device?.subscriptionMonthlyAmt > 0 && (
                    <button
                      className={`option-btn ${
                        selectedSubscription === "monthly" ? "active" : ""
                      }`}
                      onClick={() => setSelectedSubscription("monthly")}
                    >
                      Monthly – ₹{device?.subscriptionMonthlyAmt}
                    </button>
                  )}
                  {device?.subscriptionYearlyAmt > 0 && (
                    <button
                      className={`option-btn ${
                        selectedSubscription === "yearly" ? "active" : ""
                      }`}
                      onClick={() => setSelectedSubscription("yearly")}
                    >
                      Yearly – ₹{device?.subscriptionYearlyAmt}
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* AIS CHANGES */}
            {isAIS && (
                <div className="extra-detail-card">
                  <h3 className="option-headings">Location (AIS Only)</h3>
                  <div className="option-btns">
                    <select
                      value={selectedState || ""}
                      onChange={handleStateChange}
                    >
                      <option value="">Select State</option>
                      {Object.keys(AIS140Availability).map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>

                    <select
                      value={selectedCity || ""}
                      onChange={handleCityChange}
                      disabled={!selectedState}
                    >
                      <option value="">Select City</option>
                      {selectedState && AIS140Availability[selectedState].map(city => (
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
                      <strong>Available:</strong> {selectedCityInfo.availability ? "Yes" : "No"}
                    </div>
                  )}
                </div>
              )}

        </div>

        {/* Final Price */}
        <div className="special-product-final-price">
          <p>
            Total Price : ₹ <strong>{getFinalPrice()}</strong>
          </p>
        </div>

        {/* Quantity & Buttons */}
        <div className="mining-product-quantity">
          <div className="mining-product-quantity-controls">
            <div className="mining-product-quantity-selector">
              <div className="mining-product-quantity-value">
                <p>{quantity}</p>
              </div>
              <div className="mining-product-quantity-btns">
                <div className="mining-product-quantity-btns-container">
                  <button className="quantity-up" onClick={incrementQuantity}>
                    <img
                      className="arrow-up"
                      src="/images/up-arrows.png"
                      alt="Increase quantity"
                    />
                  </button>
                  <button className="quantity-down" onClick={decrementQuantity}>
                    <img
                      className="arrow-down"
                      src="/images/arrow-down-sign-to-navigate.png"
                      alt="Decrease quantity"
                    />
                  </button>
                </div>
              </div>
            </div>
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="buy-it-now-btn" onClick={handleBuyNow}>
              Buy it now
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default SpecialProduct;
