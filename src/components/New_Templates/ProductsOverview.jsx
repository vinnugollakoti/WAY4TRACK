import React from "react";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import toast, { Toaster } from "react-hot-toast";

import Navbar from "./Navbar";
import "./ProductOverview.css";
import DemoSection from "./DemoSection"

function ProductsOverview({ websiteData }) {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [stateData, setData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  
  const [selectedNetwork, setSelectedNetwork] = useState(null); // Default network
  const [selectedRelayer, setSelectedRelayer] = useState(null);
  const [selectedSubscription, setSelectedSubscription] = useState(null);


  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const product = websiteData.find((item) => item.id === parseInt(id));
    setData(product);
    console.log(product);
  }, [id, websiteData]);


const handleAddToCart = () => {
  if (!stateData || !stateData.device || stateData.device.length === 0) return;

  const device = stateData?.device[0];

  // Validation: If network option is required
  if (device.isNetwork && !selectedNetwork) {
    toast.error("Please select a network option before adding to cart");
    return;
  }

  // Validation: If subscription option is required
  if (device.isSubscription && !selectedSubscription) {
    toast.error("Please select a subscription option before adding to cart");
    return;
  }

  const price = getFinalPrice();

  if (!device.id) {
    toast.error("Invalid device. Please try again.");
    return;
  }

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
    network: selectedNetwork,
    relayer: selectedRelayer, // may be null (optional)
    subscription: selectedSubscription
  };

  addToCart(cartItem);
  toast.success("Product added to cart!");
};


  const handleBuyNow = () => {
    handleAddToCart();
    // Navigate to checkout or cart page
    navigate('/cart');
  };

  // Quantity control functions
  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const getFinalPrice = () => {
  if (!stateData?.device?.[0]) return 0;
  const device = stateData.device[0];

  let price = Math.round((device.amount || 100) * (1 - (device.discount || 0) / 100));

  // Add relayer
  if (selectedRelayer) {
    price += parseInt(selectedRelayer) || 0;
  }

  // Add network
  if (selectedNetwork === "2G") {
    price += parseInt(device.network2gAmt) || 0;
  } else if (selectedNetwork === "4G") {
    price += parseInt(device.network4gAmt) || 0;
  }

  // Add subscription
  if (selectedSubscription === "monthly") {
    price += parseInt(device.subscriptionMonthlyAmt) || 0;
  } else if (selectedSubscription === "yearly") {
    price += parseInt(device.subscriptionYearlyAmt) || 0;
  }

  return price;
};

  return (
    <div className="product-overview-body">
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <div className="mining-product">
        <div className="mining-product-gallery">
          {/* Thumbnails */}
          <div className="mining-product-thumbnails">
            {stateData?.device[0]?.image?.map((img, index) => (
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

          {/* Main Image */}
          <div className="mining-product-main">
            <img
              src={selectedImage || stateData?.device[0]?.image?.[0]}
              alt="Main product"
              className="main-image"
              onError={(e) => (e.target.src = "/images/placeholder-product.png")}
            />
          </div>
        </div>

        <div className="mining-product-details">
          <div className="mining-product-title">
            <h2 className="mining-product-title-h2">
              {stateData?.device[0]?.name}  {stateData?.device[0]?.model}
            </h2>
          </div>
          
          <div className="mining-product-features">
            <ul>
              <li>
                {stateData?.device[0]?.description}
              </li>
            </ul>
          </div>
          <div className="mining-product-order">
            <div className="mining-product-option">
              <div className="extra-product-details">

              {/* Relayer */}
              {stateData?.device[0]?.isRelay && (
              <div className="extra-detail-card">
                <h3 className="option-headings">Relayer Option</h3>
                <div className="option-btns">
                  <button
                    className={`option-btn ${
                      selectedRelayer === stateData?.device[0]?.relayAmt ? "active" : ""
                    }`}
                    onClick={() =>
                      setSelectedRelayer(prev =>
                        prev === stateData?.device[0]?.relayAmt ? null : stateData?.device[0]?.relayAmt
                      )
                    }
                  >
                    Relayer – ₹{stateData?.device[0]?.relayAmt}
                  </button>
                </div>
              </div>
            )}



              {/* Network */}
              {stateData?.device[0]?.isNetwork && (
                <div className="extra-detail-card">
                  <h3  className="option-headings">Network Options</h3>
                  <div className="option-btns">
                    <button
                      className={`option-btn ${selectedNetwork === "2G" ? "active" : ""}`}
                      onClick={() => setSelectedNetwork("2G")}
                    >
                      2G – ₹{stateData?.device[0]?.network2gAmt}
                    </button>
                    <button
                      className={`option-btn ${selectedNetwork === "4G" ? "active" : ""}`}
                      onClick={() => setSelectedNetwork("4G")}
                    >
                      4G – ₹{stateData?.device[0]?.network4gAmt}
                    </button>
                  </div>
                </div>
              )}

              {/* Subscription */}
              {stateData?.device[0]?.isSubscription && (
                <div className="extra-detail-card">
                  <h3  className="option-headings">Subscription</h3>
                  <div className="option-btns">
                    <button
                      className={`option-btn ${selectedSubscription === "monthly" ? "active" : ""}`}
                      onClick={() => setSelectedSubscription("monthly")}
                    >
                      Monthly – ₹{stateData?.device[0]?.subscriptionMonthlyAmt}
                    </button>
                    <button
                      className={`option-btn ${selectedSubscription === "yearly" ? "active" : ""}`}
                      onClick={() => setSelectedSubscription("yearly")}
                    >
                      Yearly – ₹{stateData?.device[0]?.subscriptionYearlyAmt}
                    </button>
                  </div>
                </div>
              )}

            </div>

              {/* <div className="mining-product-network-label">
                <p>Network Support SIM:</p>
              </div>
              <div className="mining-product-network-btns">
                <div className="mining-product-network-btn">
                  <button>2G</button>
                </div>
                <div className="mining-product-network-btn">
                  <button>4G</button>
                </div>
              </div> */}
            </div>
            <div className="mining-product-final-price">
            <p className="productoverview-price">Total Price : ₹ <strong className="total-price">{getFinalPrice()}</strong></p>
          </div>

            <div className="mining-product-quantity">
              {/* <div className="mining-product-quantity-label">
                <p>Quantity</p>
              </div> */}
              <div className="mining-product-quantity-controls">
                <div className="mining-product-quantity-selector">
                  <div className="mining-product-quantity-value">
                    <p>{quantity}</p>
                  </div>
                  <div className="mining-product-quantity-btns">
                    <div className="mining-product-quantity-btns-container">
                      <button
                        className="quantity-up"
                        onClick={incrementQuantity}
                      >
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
                <button onClick={handleAddToCart} className="add-to-cart-btn">Add to Cart</button>
                <button onClick={handleBuyNow} className="buy-it-now-btn">Buy it now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mining-specification-title">
        <h1>{stateData?.device[0]?.name}</h1>
      </div>

      <div className="mining-features">
        {(() => {
          const startIndex = stateData?.layoutType === "theme1" ? 3 : 0;

          return (
            <>
              {/* Left side */}
              {stateData?.amenities?.[startIndex] && (
                <div className="mining-feature-left">
                  <div className="mining-feature-icon">
                    <img
                      src={stateData?.device[0]?.points[0]?.file}
                      alt={stateData?.device[0]?.points[0]?.title || "Feature"}
                      onError={(e) => {
                        e.target.src = "/images/placeholder-icon.png";
                      }}
                    />
                  </div>
                  <div className="mining-feature-title">
                    <p>{stateData?.device[0]?.points[0]?.title || "Advanced Feature"}</p>
                  </div>
                  <div className="mining-feature-desc">
                    <p>{stateData?.device[0]?.points[0]?.desc}</p>
                  </div>
                </div>
              )}

              {/* Right side */}
              <div className="mining-feature-right">
                {stateData?.amenities?.[startIndex + 1] && (
                  <div className="mining-feature-top">
                    <div className="mining-feature-top-content">
                      <div className="mining-feature-top-icon">
                        <div>
                          <img
                            src={stateData?.device[0]?.points[1]?.file}
                            alt={stateData?.device[0]?.points[1]?.title}
                            onError={(e) => {
                              e.target.src = "/images/placeholder-icon.png";
                            }}
                          />
                        </div>
                      </div>
                      <div className="mining-feature-top-title">
                          <p>{stateData?.device[0]?.points[1]?.title}</p>
                        </div>
                      <div className="mining-feature-top-desc">
                        <p>{stateData?.device[0]?.points[1]?.desc}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mining-feature-bottom">
                  {stateData?.amenities?.[startIndex + 2] && (
                    <div className="mining-feature-card">
                      <div className="mining-feature-card-icon">
                        <img
                          src={stateData?.device[0]?.points[2]?.file}
                          alt={stateData?.device[0]?.points[2]?.title}
                          onError={(e) => {
                            e.target.src = "/images/placeholder-icon.png";
                          }}
                        />
                      </div>
                      <div className="mining-feature-card-title">
                        <p>{stateData?.device[0]?.points[2]?.title}</p>
                      </div>
                      <div className="mining-feature-card-desc">
                        <p>{stateData?.device[0]?.points[2]?.desc}</p>
                      </div>
                    </div>
                  )}

                  {stateData?.amenities?.[startIndex + 3] && (
                    <div className="mining-feature-card">
                      <div className="mining-feature-card-icon">
                        <img
                          src={stateData?.device[0]?.points[3]?.file}
                          alt={stateData?.device[0]?.points[3]?.title}
                          onError={(e) => {
                            e.target.src = "/images/placeholder-icon.png";
                          }}
                        />
                      </div>
                      <div className="mining-feature-card-title">
                        <p>{stateData?.device[0]?.points[3]?.title}</p>
                      </div>
                      <div className="mining-feature-card-desc">
                        <p>{stateData?.device[0]?.points[3]?.desc}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          );
        })()}
      </div>


      <div className="mining-benefits-section">
        <h2 className="mining-benefits-header">
          Benefits of {stateData?.device[0]?.name}
        </h2>
       <div className="mining-benefits-grid">
      {stateData?.device?.[0]?.points?.slice(4, 10).map((point, index) => (
        <div key={index} className="mining-benefit-card">
          <div className="mining-benefit-icon">
            <img
              src={point.file}
              alt={point.title}
              onError={(e) => {
                e.target.src = "/images/placeholder-icon.png";
              }}
            />
          </div>
          <div className="mining-benefit-title">
            <h3>{point.title}</h3>
          </div>
          <div className="mining-benefit-desc">
            {point.desc}
          </div>
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
          <button className="view-more-btn" onClick={() => { navigate('/products') }}>
            <span>View more</span>
            <div className="view-more-icon">
              <img src="/images/Arrow 11.png" alt="arrow" />
            </div>
          </button>
        </div>
      </div>
      <div className="mining-product-images">
        <div className="mining-product-image-card">
          <img
            src="/images/Rectangle 89.png"
            alt="AIS-140 GPS mining tracker"
          />
          <p className="image-heading">AIS-140 GPS mining tracker</p>
        </div>
        <div className="mining-product-image-card">
          <img src="/images/Rectangle 90.png" alt="Lite GPS Tracker" />
          <p className="image-heading">Lite GPS Tracker</p>
        </div>
        <div className="mining-product-image-card">
          <img src="/images/Rectangle 91.png" alt="Magnetic GPS tracker" />
          <p className="image-heading">Magnetic GPS tracker</p>
        </div>
        <div className="mining-product-image-card">
          <img src="/images/Rectangle 92.png" alt="Fuel Monitoring Tracker" />
          <p className="image-heading">Fuel Monitoring Tracker</p>
        </div>
      </div>
      <DemoSection />
    </div>
  );
}

export default ProductsOverview;
