import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import "./Mining.css";
import SpecialProduct from "./SpecialProduct";

function Mining({ websiteData }) {
  const { id } = useParams();

  const [selectedTruckInfo, setSelectedTruckInfo] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [stateData, setData] = useState(null);

  useEffect(() => {
    const product = websiteData.find((item) => item.id === parseInt(id));
    setData(product);
    console.log(product);
  }, [id, websiteData]);

  // Quantity control functions
  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div className="mining-body">
      <Navbar />
      {/* Landing Section */}
      <div className="mining-hero">
        <img
          className="mining-hero-img"
          src={stateData?.blogImage}
          alt="Mining"
        />
      </div>

      {/* Header Content */}
      <div className="mining-intro">
        <div className="mining-intro-heading">
          <h1>Curious to know about {`${stateData?.name}`} ?</h1>
        </div>
        <div className="mining-intro-text">
          <p>{`${stateData?.shortDescription}`}</p>
        </div>
      </div>

      {/* Tracker Properties Section */}
      <div className="mining-features">
        {/* Left side */}
        <div className="mining-feature-left">
          <div className="mining-feature-icon">
            <img
              src={stateData?.amenities[0]?.image}
              alt="GNSS Precision Tracking"
            />
          </div>
          <div className="mining-feature-title">
            <p>{stateData?.amenities[0]?.name || ""}</p>
          </div>
          <div className="mining-feature-desc">
            <p> {stateData?.amenities[0]?.desc || ""} </p>
          </div>
        </div>

        {/* Right side */}
        <div className="mining-feature-right">
          <div className="mining-feature-top">
            <div className="mining-feature-top-content">
              <div className="mining-feature-top-icon">
                <div>
                  <img
                    src={stateData?.amenities[1]?.image}
                    alt="Real-Time Tracking"
                  />
                </div>
              </div>
              <div className="mining-feature-top-title">
                  <p>{stateData?.amenities[1]?.name || ""}</p>
                </div>
              <div className="mining-feature-top-desc">
                <p>{stateData?.amenities[1]?.desc || ""}</p>
              </div>
            </div>
          </div>

          <div className="mining-feature-bottom">
            <div className="mining-feature-card">
              <div className="mining-feature-card-icon">
                <img
                  src={stateData?.amenities[2]?.image}
                  alt="High Accuracy Tracking"
                />
              </div>
              <div className="mining-feature-card-title">
                <p>{stateData?.amenities[2]?.name || ""}</p>
              </div>
              <div className="mining-feature-card-desc">
                <p>{stateData?.amenities[2]?.desc || ""}</p>
              </div>
            </div>

            <div className="mining-feature-card">
              <div className="mining-feature-card-icon">
                <img src={stateData?.amenities[3]?.image} alt="Smart Alerts" />
              </div>
              <div className="mining-feature-card-title">
                <p>{stateData?.amenities[3]?.name || ""}</p>
              </div>
              <div className="mining-feature-card-desc">
                <p> {stateData?.amenities[3]?.desc || ""} </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GPS Image */}
      <div className="mining-gps-img">
        <img src={stateData?.banner1} alt="GPS Tracker" />
      </div>

      {/* Properties 2 Section (3-column layout) */}
      <div className="mining-props">
        {/* Left */}
        <div className="mining-prop-left">
          <h3>{stateData?.points[0]?.title || ""}</h3>
          <p>{stateData?.points[0]?.description || ""}</p>
        </div>

        {/* Middle */}
        <div className="mining-prop-middle">
          <div className="mining-prop-card-1"></div>
          <div className="mining-prop-card-2">
            <div>
              <h3>{stateData?.points[1]?.title || ""}</h3>
            </div>
            <div>
              <p>{stateData?.points[1]?.description || ""}</p>
            </div>
          </div>
          <div className="mining-prop-card-3">
            <h3>{stateData?.points[2]?.title || ""}</h3>
          </div>
        </div>

        {/* Right */}
        <div className="mining-prop-right">
          <h3>{stateData?.points[3]?.title || ""}</h3>
          <p>{stateData?.points[3]?.description || ""}</p>
        </div>
      </div>

      <div className="mining-prop-footer">
        <p>{stateData?.points[2]?.description || ""}</p>
      </div>

      <SpecialProduct />

      {/* Two-column truck info section */}
      <div className="mining-truck-info-section">
        <div className="mining-truck-info-left">
          <div
            className="mining-truck-info-block"
            onClick={() => setSelectedTruckInfo(1)}
          >
            <p className="mining-truck-info-p">
              {stateData?.amenities?.[4]?.desc || ""}
            </p>
          </div>
          <hr className="mining-truck-info-divider" />
          <div
            className="mining-truck-info-block"
            onClick={() => setSelectedTruckInfo(2)}
          >
            <p className="mining-truck-info-p">
              {stateData?.amenities?.[5]?.desc || ""}
            </p>
          </div>
          <hr className="mining-truck-info-divider" />
          <div
            className="mining-truck-info-block"
            onClick={() => setSelectedTruckInfo(3)}
          >
            <p className="mining-truck-info-p">
              {stateData?.amenities?.[6]?.desc || ""}
            </p>
          </div>
        </div>

        <div className="mining-truck-info-right">
          <img
            className={
              selectedTruckInfo === 3
                ? "iphone-truck extra-class"
                : "default-truck"
            }
            src={
              selectedTruckInfo === 1
                ? stateData?.amenities?.[4]?.image
                : selectedTruckInfo === 2
                ? stateData?.amenities?.[5]?.image
                : selectedTruckInfo === 3
                ? stateData?.amenities?.[6]?.image
                : stateData?.amenities?.[4]?.image
            }
            alt=""
          />
        </div>
      </div>

      {/* Benefits Section */}
      <div className="mining-benefits-section">
        <h2 className="mining-benefits-header">
          Benefits of {`${stateData?.name || ""}`}
        </h2>
        <div className="mining-benefits-grid">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div className="mining-benefit-card" key={i}>
              <div className="mining-benefit-icon">
                <img src={stateData?.application?.[i]?.image} alt="" />
              </div>
              <div className="mining-benefit-title">
                <h3>{stateData?.application?.[i]?.name || ""}</h3>
              </div>
              <div className="mining-benefit-desc">
                {stateData?.application?.[i]?.desc || ""}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Solutions Section */}
      <div className="mining-solutions-section">
        <div className="mining-solutions-header">
          <p className="mining-solutions-subtitle">Our solutions</p>
          <h2 className="mining-solutions-title">
            {`${stateData?.name || ""}`}
          </h2>
        </div>
        <div className="mining-solutions-hero">
          <img src={stateData?.banner2} alt="AIS-140 Vehicles" />
        </div>
        <div className="mining-solutions-grid">
          <div className="mining-solutions-card">
            <span>
              {`${stateData?.steps[0]?.description || "Key point 1"}`}
            </span>
          </div>
          <div className="mining-solutions-card">
            <span>
              {`${stateData?.steps[1]?.description || "Key point 2"}`}
            </span>
          </div>
          <div className="mining-solutions-card">
            <span>
              {`${stateData?.steps[2]?.description || "Key point 3"}`}
            </span>
          </div>
          <div className="mining-solutions-card">
            <span>
              {`${stateData?.steps[3]?.description || "Key point 4"}`}
            </span>
          </div>
          <div className="mining-solutions-card">
            <span>
              {`${stateData?.steps[4]?.description || "Key point 5"}`}
            </span>
          </div>
          <div className="mining-solutions-card">
            <span>
              {`${stateData?.steps[5]?.description || "Key point 6"}`}.
            </span>
          </div>
        </div>
      </div>

      {/* Product & Overview Section with Truck Image */}
      <div className="mining-product-overview">
        <div className="mining-product-overview-header">
          <h2>Product & Overview</h2>
        </div>

        <div className="mining-product-overview-content">
          <div className="mining-product-overview-text">
            <div>
              <h3>{stateData?.name}</h3>
              <p>{stateData?.description}</p>
            </div>
          </div>
          <div className="mining-product-overview-image">
            <img src={stateData?.banner3} alt="Mining Truck" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mining;
