import React from "react";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";

import Navbar from "./Navbar";
import "./ProductOverview.css";
import DemoSection from "./DemoSection"

function ProductsOverview({ websiteData }) {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [stateData, setData] = useState(null);
  const [selectedNetwork, setSelectedNetwork] = useState("4G"); // Default network
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
    const price = Math.round((device.amount || 100) * (1 - (device.discount || 0) / 100));
    console.log(device.id)
    if (!device.id) {
      alert("Invalid device. Please try again.");
      return;
    }

    const cartItem = {
      deviceId: device.id,
      product: stateData,
      quantity: quantity,
      clientId: localStorage.getItem("client_db_id"),
      totalAmount: price * quantity,
      network: selectedNetwork,
      name: device.name,
      price: price,
      model: device.model,
      discount: device.discount || 0
    };

    addToCart(cartItem);
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
  return (
    <div className="product-overview-body">
      <Navbar />
      <div className="mining-product">
        <div className="mining-product-img">
          <img src={stateData?.device[0]?.image} alt="" />
        </div>
        <div className="mining-product-details">
          <div className="mining-product-title">
            <h2 className="mining-product-title-h2">
              {stateData?.device[0]?.name}  {stateData?.device[0]?.model}
            </h2>
          </div>
          <div className="product-price-section">
            <span className="product-price">
              ₹{Math.round((stateData?.device[0]?.amount || 100) * (1 - (stateData?.device[0]?.discount || 0) / 100))}
            </span>

            {stateData?.device[0]?.discount > 0 && (
              <span className="product-old-price">
                ₹{stateData?.device[0]?.amount || 100}
              </span>
            )}
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
              <div className="mining-product-network-label">
                <p>Network Support SIM:</p>
              </div>
              <div className="mining-product-network-btns">
                <div className="mining-product-network-btn">
                  <button>2G</button>
                </div>
                <div className="mining-product-network-btn">
                  <button>4G</button>
                </div>
              </div>
            </div>
            <div className="mining-product-final-price">
              {/* <p>Rs. {stateData?.device[0]?.amount}</p> */}
              <p>Rs. {Math.round((stateData?.device[0]?.amount || 100) * (1 - (stateData?.device[0]?.discount || 0) / 100))}</p>
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
                      src={stateData.amenities[startIndex].image}
                      alt={stateData.amenities[startIndex].name || "Feature"}
                      onError={(e) => {
                        e.target.src = "/images/placeholder-icon.png";
                      }}
                    />
                  </div>
                  <div className="mining-feature-title">
                    <p>{stateData.amenities[startIndex].name || "Advanced Feature"}</p>
                  </div>
                  <div className="mining-feature-desc">
                    <p>{stateData.amenities[startIndex].desc}</p>
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
                            src={stateData.amenities[startIndex + 1].image}
                            alt={stateData.amenities[startIndex + 1].name}
                            onError={(e) => {
                              e.target.src = "/images/placeholder-icon.png";
                            }}
                          />
                        </div>
                        <div className="mining-feature-top-title">
                          <p>{stateData.amenities[startIndex + 1].name}</p>
                        </div>
                      </div>
                      <div className="mining-feature-top-desc">
                        <p>{stateData.amenities[startIndex + 1].desc}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mining-feature-bottom">
                  {stateData?.amenities?.[startIndex + 2] && (
                    <div className="mining-feature-card">
                      <div className="mining-feature-card-icon">
                        <img
                          src={stateData.amenities[startIndex + 2].image}
                          alt={stateData.amenities[startIndex + 2].name}
                          onError={(e) => {
                            e.target.src = "/images/placeholder-icon.png";
                          }}
                        />
                      </div>
                      <div className="mining-feature-card-title">
                        <p>{stateData.amenities[startIndex + 2].name}</p>
                      </div>
                      <div className="mining-feature-card-desc">
                        <p>{stateData.amenities[startIndex + 2].desc}</p>
                      </div>
                    </div>
                  )}

                  {stateData?.amenities?.[startIndex + 3] && (
                    <div className="mining-feature-card">
                      <div className="mining-feature-card-icon">
                        <img
                          src={stateData.amenities[startIndex + 3].image}
                          alt={stateData.amenities[startIndex + 3].name}
                          onError={(e) => {
                            e.target.src = "/images/placeholder-icon.png";
                          }}
                        />
                      </div>
                      <div className="mining-feature-card-title">
                        <p>{stateData.amenities[startIndex + 3].name}</p>
                      </div>
                      <div className="mining-feature-card-desc">
                        <p>{stateData.amenities[startIndex + 3].desc}</p>
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
          {stateData?.application?.slice(0, 6).map((app, index) => (
            <div key={app.id || index} className="mining-benefit-card">
              <div className="mining-benefit-icon">
                <img
                  src={app.image}
                  alt={app.name}
                  onError={(e) => {
                    e.target.src = "/images/placeholder-icon.png";
                  }}
                />
              </div>
              <div className="mining-benefit-title">
                <h3>{app.name}</h3>
              </div>
              <div className="mining-benefit-desc">
                {app.desc}
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
