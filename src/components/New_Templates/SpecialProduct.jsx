import React, { useState, useEffect } from "react";
import "./Bike.css";
import "./Mining.css";

const SpecialProduct = ({ websiteData }) => {
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!websiteData || !websiteData[3]?.device?.[0]) return;

    const foundProduct = websiteData[3];
    const selectedDevice = foundProduct.device[0];

    console.log("FOUND:", foundProduct);
    console.log("SELECTED DEVICE:", selectedDevice);

    setProduct({ ...foundProduct, selectedDevice });
    setSelectedImage(selectedDevice.image?.[0]);
  }, [websiteData]);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const getFinalPrice = () => {
    const device = product?.selectedDevice;
    if (!device) return 0;
    let price = Math.round(
      (device.amount || 0) * (1 - (device.discount || 0) / 100)
    );
    if (selectedNetwork === "2G") price += parseInt(device.network2gAmt) || 0;
    if (selectedNetwork === "4G") price += parseInt(device.network4gAmt) || 0;
    if (selectedSubscription === "monthly")
      price += parseInt(device.subscriptionMonthlyAmt) || 0;
    if (selectedSubscription === "yearly")
      price += parseInt(device.subscriptionYearlyAmt) || 0;
    return price * quantity;
  };

  if (!product) return null;
  const device = product.selectedDevice;

  return (
    <div className="mining-product">
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
              style={{ cursor: "pointer" }}
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
        <div className="mining-product-title">
          <h2 className="mining-product-title-h2">
            {device?.name} {device?.model}
          </h2>
        </div>

        <div className="mining-product-price">
          <p>₹ {getFinalPrice()}</p>
        </div>

        <div className="mining-product-features">
          <ul>
            {device?.points?.slice(0, 4)?.map((p, i) => (
              <li key={i}>{p.title}</li>
            ))}
          </ul>
        </div>


        {/* Options */}
        <div className="mining-product-order">

        {/* Relayer Option */}
        {device?.isRelay && device?.relayAmt > 0 && (
          <div className="extra-detail-card">
            <h3 className="option-headings">Relayer Option</h3>
            <div className="option-btns">
              <button
                className={`option-btn ${
                  selectedNetwork === "relay" ? "active" : ""
                }`}
                onClick={() =>
                  setSelectedNetwork((prev) => (prev === "relay" ? null : "relay"))
                }
              >
                Relayer – ₹{device.relayAmt}
              </button>
            </div>
          </div>
        )}

          {/* Network Options */}
          {(device?.network2gAmt > 0 || device?.network4gAmt > 0) && (
            <div className="extra-detail-card">
              <h3 className="option-headings">Network Options</h3>
              <div className="option-btns">
                {device?.network2gAmt > 0 && (
                  <button
                    className={`option-btn ${
                      selectedNetwork === "2G" ? "active" : ""
                    }`}
                    onClick={() =>
                      setSelectedNetwork((prev) => (prev === "2G" ? null : "2G"))
                    }
                  >
                    2G – ₹{device.network2gAmt}
                  </button>
                )}
                {device?.network4gAmt > 0 && (
                  <button
                    className={`option-btn ${
                      selectedNetwork === "4G" ? "active" : ""
                    }`}
                    onClick={() =>
                      setSelectedNetwork((prev) => (prev === "4G" ? null : "4G"))
                    }
                  >
                    4G – ₹{device.network4gAmt}
                  </button>
                )}
              </div>
            </div>
          )}


          {device?.isSubscription && (
            <div className="extra-detail-card">
              <h3 className="option-headings">Subscription</h3>
              <div className="option-btns">
                {device.subscriptionMonthlyAmt > 0 && (
                  <button
                    className={`option-btn ${
                      selectedSubscription === "monthly" ? "active" : ""
                    }`}
                    onClick={() => setSelectedSubscription("monthly")}
                  >
                    Monthly – ₹{device.subscriptionMonthlyAmt}
                  </button>
                )}
                {device.subscriptionYearlyAmt > 0 && (
                  <button
                    className={`option-btn ${
                      selectedSubscription === "yearly" ? "active" : ""
                    }`}
                    onClick={() => setSelectedSubscription("yearly")}
                  >
                    Yearly – ₹{device.subscriptionYearlyAmt}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Quantity & Actions */}
          <div className="mining-product-final-price">
            <p>
              Total Price: ₹ <strong>{getFinalPrice()}</strong>
            </p>
          </div>

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
  );
};

export default SpecialProduct;
