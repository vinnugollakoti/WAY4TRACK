import React, { useState, useEffect, useContext } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import toast, { Toaster } from "react-hot-toast";
import AIS140Availability from "../../contexts/AIS140Availabilities"

import Navbar from "./Navbar";
import Footer from "./Footer";
import "./ProductOverview.css";
import DemoSection from "./DemoSection";
import HomepageProducts from "./HomepageProducts";

function ProductsOverview({ websiteData }) {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const deviceId = queryParams.get("deviceId");

  const [quantity, setQuantity] = useState(1);
  const [stateData, setData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [selectedRelayer, setSelectedRelayer] = useState(null);
  const [selectedSubscription, setSelectedSubscription] = useState(null);

  // AIS140 states
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [isAIS, setIsAIS] = useState(false);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const product = websiteData.find((item) => item.id === parseInt(id));
    if (!product) return;

    const selectedDevice =
      product.device.find((d) => d.id === parseInt(deviceId)) ||
      product.device[0];

    setData({ ...product, selectedDevice });

    // check if device name contains AIS
    setIsAIS(selectedDevice.name.includes("AIS"));

    const { network2gAmt, network4gAmt } = selectedDevice;
    let defaultNetwork = null;
    if (network2gAmt === 0) defaultNetwork = "2G";
    else if (network4gAmt === 0) defaultNetwork = "4G";

    setSelectedNetwork(defaultNetwork);
  }, [id, deviceId, websiteData]);

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

  const handleAddToCart = () => {
    if (!stateData?.selectedDevice) return;
    const device = stateData.selectedDevice;

    if (isAIS && (!selectedState || !selectedCity)) {
      toast.error("Please select your state and city");
      return;
    }

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
      product: stateData,
      quantity,
      clientId: localStorage.getItem("client_db_id"),
      totalAmount: price * quantity,
      price,
      name: device.name,
      model: device.model,
      discount: device.discount || 0,
      network: resolvedNetwork,
      relayer: selectedRelayer,
      subscription: selectedSubscription,
      state: selectedState,   // added
      city: selectedCity,     // added
    };

    addToCart(cartItem);
    toast.success("Product added to cart!");
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const getFinalPrice = (networkOverride = selectedNetwork) => {
    const device = stateData?.selectedDevice;
    if (!device) return 0;

    let price = Math.round(
      (device.amount || 100) * (1 - (device.discount || 0) / 100)
    );

    if (selectedRelayer) price += parseInt(selectedRelayer) || 0;

    if (networkOverride === "2G") {
      price += parseInt(device.network2gAmt) || 0;
    } else if (networkOverride === "4G") {
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

    return price;
  };



  const device = stateData?.selectedDevice;

  return (
    <div className="product-overview-body">
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />

      <div className="mining-product">
        <div className="mining-product-gallery">
          <div className="mining-product-thumbnails">
            {device?.image?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index}`}
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

        <div className="mining-product-details">
          <div className="mining-product-title">
            <h2 className="mining-product-title-h2">
              {device?.name} {device?.model}
            </h2>
          </div>

          <div className="mining-product-features">
            <ul>
              <li>{device?.description}</li>
            </ul>
          </div>

          <div className="mining-product-order">
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
              {/* Network Options */}
{device?.isNetwork &&
  !(
    device?.network2gAmt === -1 && device?.network4gAmt === -1
  ) && (
    <div className="extra-detail-card">
      <h3 className="option-headings">Network Options</h3>
      <div className="option-btns">
        {/* 2G Option */}
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

        {/* 4G Option */}
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

                {/* AIS CONSITIONS */}
                {isAIS && (
                    <div className="extra-detail-card">
                      <h3 className="option-headings">Location (AIS Only)</h3>
                      <div className="option-btns">
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
            </div>

            <div className="mining-product-final-price">
              <p className="productoverview-price">
                Total Price : ₹ <strong className="total-price">{getFinalPrice() * quantity}</strong>
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
                <button onClick={handleAddToCart} className="add-to-cart-btn">
                  Add to Cart
                </button>
                <button onClick={handleBuyNow} className="buy-it-now-btn">
                  Buy it now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mining-specification-title">
        <h1>{device?.name}</h1>
      </div>

      <div className="mining-features">
        {(() => {
          const startIndex = stateData?.layoutType === "theme1" ? 3 : 0;
          return (
            <>
              {device?.points?.[0] && (
                <div className="mining-feature-left">
                  <div className="">
                    <img
                      src={device?.points[0]?.file}
                      alt={device?.points[0]?.title}
                      onError={(e) => (e.target.src = "/images/placeholder-icon.png")}
                    />
                  </div>
                  <div className="mining-feature-title">
                    <p>{device?.points[0]?.title}</p>
                  </div>
                  <div className="mining-feature-desc">
                    <p>{device?.points[0]?.desc}</p>
                  </div>
                </div>
              )}

              <div className="mining-feature-right">
                {device?.points?.[1] && (
                  <div className="mining-feature-top">
                    <div className="mining-feature-top-content">
                      <div className="mining-feature-top-icon">
                        <img
                          src={device?.points[1]?.file}
                          alt={device?.points[1]?.title}
                          onError={(e) =>
                            (e.target.src = "/images/placeholder-icon.png")
                          }
                        />
                        <div className="mining-feature-top-title">
                          <p>{device?.points[1]?.title}</p>
                        </div>
                      </div>
                      <div className="mining-feature-top-desc">
                        <p>{device?.points[1]?.desc}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mining-feature-bottom">
                  {device?.points?.slice(2, 4).map((point, i) => (
                    <div key={i} className="mining-feature-card">
                      <div className="">
                        <img
                          src={point.file}
                          alt={point.title}
                          onError={(e) =>
                            (e.target.src = "/images/placeholder-icon.png")
                          }
                        />
                      </div>
                      <div className="mining-feature-card-title">
                        <p>{point.title}</p>
                      </div>
                      <div className="mining-feature-card-desc">
                        <p>{point.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          );
        })()}
      </div>

      <div className="mining-benefits-section">
        <h2 className="mining-benefits-header">Benefits of {device?.name}</h2>
        <div className="mining-benefits-grid">
          {device?.points?.slice(4, 10).map((point, index) => (
            <div key={index} className="mining-benefit-card">
              <div className="mining-benefit-icon">
                <img
                  src={point.file}
                  alt={point.title}
                  onError={(e) => (e.target.src = "/images/placeholder-icon.png")}
                />
              </div>
              <div className="mining-benefit-title">
                <h3>{point.title}</h3>
              </div>
              <div className="mining-benefit-desc">{point.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mining-view-more-section">
        <div className="mining-view-more-text">
          <h1>
            Want to see more ? <br />
            Check our remaining products
          </h1>
        </div>
        <div className="mining-view-more">
          <button className="view-more-btn" onClick={() => navigate("/products")}>
            <span>View more</span>
            <div className="view-more-icon">
              <img src="/images/Arrow 11.png" alt="arrow" />
            </div>
          </button>
        </div>
      </div>

      <HomepageProducts />

      <DemoSection />
      <Footer />
    </div>
  );
}

export default ProductsOverview;
