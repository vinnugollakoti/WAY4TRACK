import React from "react";
import { useState } from "react";
import Navbar from "./Navbar";
import "./ProductOver.css";
import DemoSection from "./DemoSection"

function ProductsOverview() {
  const [quantity, setQuantity] = useState(1);

  // Quantity control functions
  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };
  return (
    <div>
      <Navbar />
      <div className="mining-product">
        <div className="mining-product-img">
          <img src="/images/miningProductImage.png" alt="" />
        </div>
        <div className="mining-product-details">
          <div className="mining-product-title">
            <h2>
              AIS-140 Mining GPS Tracker – Government Approved | Real-Time
              Tracking | SOS Button | Dual SIM | 4 Hours Backup Battery
            </h2>
          </div>
          <div className="mining-product-price">
            <p>Rs. 3,999.00 - Rs. 4,990.00</p>
          </div>
          <div className="mining-product-features">
            <ul>
              <li>
                AIS-140 Certified & Govt Approved – Mandatory for commercial
                vehicles
              </li>
              <li>
                Real-Time Tracking & SOS Alerts – Safer rides, instant
                notifications
              </li>
              <li>Dual SIM / 2G & 4G Connectivity – Always stay connected</li>
              <li>4 Hours Backup Battery – Reliable even during power cuts</li>
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
              <p>Rs. 3,999.00</p>
            </div>
            <div className="mining-product-quantity">
              <div className="mining-product-quantity-label">
                <p>Quantity</p>
              </div>
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
                <div className="mining-product-cart-btn">
                  <button>Add to Cart</button>
                </div>
                <div className="mining-product-buy-btn">
                  <button>Buy it now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mining-specification-title">
        <h1>Mining GPS Tracker - Specification</h1>
      </div>
      <div className="mining-features">
        {/* Left side */}
        <div className="mining-feature-left">
          <div className="mining-feature-icon">
            <img src="/images/file_map.png" alt="GNSS Precision Tracking" />
          </div>
          <div className="mining-feature-title">
            <p>Advanced GNSS Precision Tracking</p>
          </div>
          <div className="mining-feature-desc">
            <p>
              Navigate with unmatched precision, powered by advanced
              high-sensitivity GNSS technology. Equipped with GPS, GLONASS, and
              IRNSS, it ensures seamless regional accuracy at all times. Whether
              you're driving through bustling city streets, cruising along
              highways, or exploring remote off-road terrains, reliable tracking
              stays with you everywhere. Wherever your journey takes you, trust
              in continuous, precise, and dependable navigation.
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="mining-feature-right">
          <div className="mining-feature-top">
            <div className="mining-feature-top-content">
              <div className="mining-feature-top-icon">
                <div>
                  <img src="/images/ambulance.png" alt="Real-Time Tracking" />
                </div>
                <div className="mining-feature-top-title">
                  <p>Real-Time Tracking & Route Playback</p>
                </div>
              </div>
              <div className="mining-feature-top-desc">
                <p>
                  "Monitor your vehicles live with accurate real-time tracking.
                  Replay complete routes to review past journeys with ease.
                  Improve planning, safety, and accountability on the move. Stay
                  in control with every trip, past or present."
                </p>
              </div>
            </div>
          </div>

          <div className="mining-feature-bottom">
            <div className="mining-feature-card">
              <div className="mining-feature-card-icon">
                <img src="/images/target.png" alt="High Accuracy Tracking" />
              </div>
              <div className="mining-feature-card-title">
                <p>
                  High Accuracy Tracking <br /> (≤ 2.5 meters)
                </p>
              </div>
              <div className="mining-feature-card-desc">
                <p>
                  Pinpoint location precision with up to 2.5 meters accuracy.
                  Reliable tracking in cities, highways, and remote areas.
                </p>
              </div>
            </div>

            <div className="mining-feature-card">
              <div className="mining-feature-card-icon">
                <img src="/images/alarm_smart_wake.png" alt="Smart Alerts" />
              </div>
              <div className="mining-feature-card-title">
                <p>Smart Alerts for Safer Tracking</p>
              </div>
              <div className="mining-feature-card-desc">
                <p>
                  Get instant alerts for geo-fence breaches, overspeeding, and
                  route deviations. Stay in control with safer, smarter vehicle
                  tracking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mining-benefits-section">
        <h2 className="mining-benefits-header">
          Benefits of AIS-140 GPS Tracker
        </h2>
        <div className="mining-benefits-grid">
          <div className="mining-benefit-card">
            <div className="mining-benefit-icon">
              <img src="/images/legal.png" alt="Legal Compliance" />
            </div>
            <div className="mining-benefit-title">
              <h3>Legal Compliance</h3>
            </div>
            <div className="mining-benefit-desc">
              AIS-140 certified GPS devices are mandatory in India for
              commercial and public transport vehicles to meet government
              standards.
            </div>
          </div>
          <div className="mining-benefit-card">
            <div className="mining-benefit-icon">
              <img
                src="/images/government-integration.png"
                alt="Government Integration"
              />
            </div>
            <div className="mining-benefit-title">
              <h3>Government Integration</h3>
            </div>
            <div className="mining-benefit-desc">
              Live location and travel data are automatically shared with state
              and national control centers.
            </div>
          </div>
          <div className="mining-benefit-card">
            <div className="mining-benefit-icon">
              <img
                className="mining-benefit-icon-passenger"
                src="/images/delivery-truck.png"
                alt="Passenger Safety"
              />
            </div>
            <div className="mining-benefit-title">
              <h3>Passenger Safety</h3>
            </div>
            <div className="mining-benefit-desc">
              SOS button enables instant emergency alerts to ensure quick help
              during accidents or threats.
            </div>
          </div>
          <div className="mining-benefit-card">
            <div className="mining-benefit-icon">
              <img src="/images/fleet.png" alt="Fleet Efficiency" />
            </div>
            <div className="mining-benefit-title">
              <h3>Fleet Efficiency</h3>
            </div>
            <div className="mining-benefit-desc">
              Real-time tracking improves routes, reduces downtime, and boosts
              productivity for fleets and trucks.
            </div>
          </div>
          <div className="mining-benefit-card">
            <div className="mining-benefit-icon">
              <img
                src="/images/shop-specialist-icon.png"
                alt="Shop Specialist"
              />
            </div>
            <div className="mining-benefit-title">
              <h3>Shop live with a Specialist</h3>
            </div>
            <div className="mining-benefit-desc">
              Let us guide you live over video and answer all of your questions.
            </div>
          </div>
          <div className="mining-benefit-card">
            <div className="mining-benefit-icon">
              <img src="/images/personal-setup-icon.png" alt="Personal Setup" />
            </div>
            <div className="mining-benefit-title">
              <h3>Join an online Personal Setup session</h3>
            </div>
            <div className="mining-benefit-desc">
              Talk one on one with a Specialist to set up your device and
              discover new features.
            </div>
          </div>
          <div className="mining-benefit-card">
            <div className="mining-benefit-icon">
              <img
                src="/images/explore-experience-icon.png"
                alt="Explore Experience"
              />
            </div>
            <div className="mining-benefit-title">
              <h3>Explore new experiences around you</h3>
            </div>
            <div className="mining-benefit-desc">
              Use the app to find personal workshops and more.
            </div>
          </div>
        </div>
      </div>
      <div className="mining-know-more">
        <button className="know-more-btn">
          <span>Know more</span>
          <div className="know-more-icon">
            <img src="/images/Arrow 11.png" alt="arrow" />
          </div>
        </button>
      </div>
      <div className="mining-view-more-section">
        <div className="mining-view-more-text">
          <h1>
            Want to see more ? <br />
            Check our remaining products
          </h1>
        </div>
        <div className="mining-view-more">
          <button className="view-more-btn">
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
      <DemoSection/>
    </div>
  );
}

export default ProductsOverview;
