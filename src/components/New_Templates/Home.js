import React, { useState, useEffect } from "react";
import "./Homepage.css";

function Homepage() {
  // Carousel state management
  const [currentSlide, setCurrentSlide] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  const images = [
    "/images/mining1.png",
    "/images/Rectangle 16.png",
    "/images/Rectangle 17.png",
    "/images/Rectangle 18.png",
    "/images/Rectangle 19.png"
  ];

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  // Manual navigation functions
  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length);
  };

  // Quantity control functions
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div className="homepage-root">
      {/* Carousel Section */}
      <div className="homepage-intro">
        <div className="carousel-container">
          {/* Navigation Arrows */}
          <button className="carousel-arrow carousel-arrow-left" onClick={goToPrevSlide}>
            &#8249; {/* Left arrow character */}
          </button>
          <button className="carousel-arrow carousel-arrow-right" onClick={goToNextSlide}>
            &#8250; {/* Right arrow character */}
          </button>
          
          {images.map((image, index) => (
            <div
              key={index}
              className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
            >
              <img 
                className="homepage-intro-img" 
                src={image} 
                alt={`Slide ${index + 1}`} 
              />
            </div>
          ))}
        </div>
      </div>

      <div className="homepage-products">
        <div className="homepage-product-card">
          <img
            src="/images/home-product-1.png"
            alt="AC Monitoring GPS Tracker"
          />
          <h3>AC Monitoring GPS Tracker</h3>
          <p>Real-time AC status, temperature monitoring, alerts</p>
        </div>
        <div className="homepage-product-card">
          <img
            src="/images/home-product-5.png"
            alt="Advanced GPS Tracker (4G)"
          />
          <h3>Advanced GPS Tracker (4G)</h3>
          <p>High-speed tracking, geofencing, remote control</p>
        </div>
        <div className="homepage-product-card">
          <img
            src="/images/home-product-2.png"
            alt="AIS-140 Mining GPS Tracker"
          />
          <h3>AIS-140 Mining GPS Tracker</h3>
          <p>Rugged design, compliance with mining standards</p>
        </div>
        <div className="homepage-product-card">
          <img src="/images/home-product-3.png" alt="Dashcam GPS Tracker" />
          <h3>Dashcam GPS Tracker</h3>
          <p>Video recording, driver behavior analysis, GPS tracking</p>
        </div>
        <div className="homepage-product-card">
          <img
            src="/images/home-product-4.png"
            alt="GPS Tracker with Fuel Monitoring"
          />
          <h3>GPS Tracker with Fuel Monitoring</h3>
          <p>Fuel level monitoring, theft alerts, route optimization</p>
        </div>
      </div>

      <section className="homepage-solutions">
        <h2 className="solutions-title">Our Solutions -</h2>
        <div className="solutions-list">
          <div className="solution-card">
            <div className="solution-left">
              <h3 className="solution-heading">Tire Management</h3>
              <p className="solution-desc">
                Tire management systems use sensors to monitor tire pressure,
                temperature, and wear in real time, helping prevent sudden
                failures. They also calculate tire life based on mileage, load,
                and road conditions, sending alerts when replacement is due.
                This reduces fuel consumption, improves safety, and extends
                overall tire lifespan.
              </p>
              <button className="solution-cta">Know more</button>
            </div>
            <div className="solution-right">
              <img src="/images/tire-1.png" alt="Tire" />
            </div>
          </div>

          <div className="solution-card">
            <div className="solution-left">
              <h3 className="solution-heading">Vehicle Health Management</h3>
              <p className="solution-desc">
                Vehicle health management tracks key parameters like engine
                temperature, oil pressure, and battery status in real time to
                detect faults early. It reduces breakdowns, lowers maintenance
                costs, and improves overall vehicle reliability and safety.
              </p>
              <button className="solution-cta">Know more</button>
            </div>
            <div className="solution-right">
              <img src="/images/vehicle-health.png" alt="Vehicle Health" />
            </div>
          </div>

          <div className="solution-card">
            <div className="solution-left">
              <h3 className="solution-heading">AIS-140 VLTD</h3>
              <p className="solution-desc">
                VLTD GPS trackers provide real-time vehicle tracking, route
                monitoring, and emergency SOS alerts to ensure passenger and
                driver safety. They help authorities and fleet owners improve
                compliance, reduce downtime, and enhance overall operational
                efficiency.
              </p>
              <button className="solution-cta">Know more</button>
            </div>
            <div className="solution-right">
              <img src="/images/Column.png" alt="AIS-140" />
            </div>
          </div>

          <div className="solution-card">
            <div className="solution-left">
              <h3 className="solution-heading">Smart Waste Management</h3>
              <p className="solution-desc">
                Smart waste management uses IoT-enabled bins and sensors to
                monitor waste levels in real time and optimize collection
                routes. This reduces operational costs, prevents overflow, and
                promotes cleaner, more sustainable cities.
              </p>
              <button className="solution-cta">Know more</button>
            </div>
            <div className="solution-right">
              <img src="/images/9-42143900.png" alt="Smart Waste" />
            </div>
          </div>
        </div>
      </section>

      <section className="homepage-why-choose">
        <div className="why-choose-content">
          <button className="benefits-button">BENEFITS</button>
          <h2 className="why-choose-title">Why Choose Us?</h2>
          <p className="why-choose-desc">
            Because reliability, innovation, and safety drive everything
            <br />
            we do.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <img src="/images/assistant_direction.png" alt="GPS Solutions" />
            </div>
            <h3 className="feature-title">Wide Range of GPS Solutions</h3>
            <p className="feature-desc">
              From vehicles to assets, we have trackers for every need
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <img
                src="/images/assured_workload.png"
                alt="Government Approved"
              />
            </div>
            <h3 className="feature-title">Government-Approved & Certified</h3>
            <p className="feature-desc">
              AIS-140 compliant devices for complete legal assurance.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <img src="/images/verified.png" alt="Reliable Tracking" />
            </div>
            <h3 className="feature-title">Reliable & Accurate Tracking</h3>
            <p className="feature-desc">
              High-sensitivity GPS for real-time location precision
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <img src="/images/category_search.png" alt="Safety Features" />
            </div>
            <h3 className="feature-title">Advanced Safety Features</h3>
            <p className="feature-desc">
              SOS button, immobilizer, geo-fencing, and theft alerts.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <img src="/images/desktop_cloud_stack.png" alt="Easy Platforms" />
            </div>
            <h3 className="feature-title">Easy to Use Platforms</h3>
            <p className="feature-desc">
              Track via mobile app & web portal anytime, anywhere.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <img src="/images/contact_mail.png" alt="Support" />
            </div>
            <h3 className="feature-title">Dedicated Support & Service</h3>
            <p className="feature-desc">
              24/7 customer assistance and expert guidance.
            </p>
          </div>
        </div>
      </section>

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
      <section className="featurees-section">
        <div className="featurees-heading-container">
          <h2 className="featurees-heading">What's New With Way4track</h2>
        </div>

        <div className="featurees-container">
          <div className="featuree-box">
            <img
              src="/images/image-38.png"
              alt="Government GPS"
              className="featuree-img"
            />
            <h3 className="featuree-title">Government-Integrated GPS Solutions</h3>
            <p className="featuree-text">
              "AIS-140 certified trackers with real-time data sharing for
              compliance and smooth fleet operations"
            </p>
          </div>

          <div className="featuree-box">
            <img
              src="/images/image-37.png"
              alt="Safety Monitoring"
              className="featuree-img"
            />
            <h3 className="featuree-title">Advanced Safety & Monitoring</h3>
            <p className="featuree-text">
              SOS alerts, geo-fencing, ignition, speed, and idle time tracking
              for smarter fleet management.
            </p>
          </div>

          <div className="featuree-box">
            <img
              src="/images/image-39.png"
              alt="Custom Tracking"
              className="featuree-img"
            />
            <h3 className="featuree-title">Customizable Tracking</h3>
            <p className="featuree-text">
              "Plug-and-play GPS for bikes, fleets, and buses with route, fuel,
              theft, and engine control via app."
            </p>
          </div>
        </div>
      </section>
      <div className="mining-gps-img">
        <img src="/images/Rectangle 73.png" alt="" />
      </div>
      <div className="demo-section">
        <div className="demo-content">
          <h2>Experience Smarter Tracking in Action</h2>
          <p>
            Still unsure if GPS tracking fits your business or personal needs?
            Join a 15-min live demo call and discover how Way4Track can save you
            time, money, and stress.
          </p>
          <div className="demo-button">
            <button className="demo-btn">
              Book A Demo
              <span className="icon">↗</span>
            </button>
          </div>
        </div>
        <div className="demo-image">
          <img src="/images/Rectangle 59.png" alt="" />
        </div>
      </div>
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Our Products</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Blogs</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Support</h4>
            <ul>
              <li>
                <a href="#">Contact Us</a>
              </li>
              <li>
                <a href="#">Whatsapp</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Support</h4>
            <ul>
              <li>
                <a href="#">Contact Us</a>
              </li>
              <li>
                <a href="#">Whatsapp</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Follow Us</h4>
            <ul>
              <li>
                <a href="#">Instagram</a>
              </li>
              <li>
                <a href="#">Facebook</a>
              </li>
              <li>
                <a href="#">Twitter</a>
              </li>
              <li>
                <a href="#">Youtube</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-logo">Way4Track</div>

        <div className="footer-bottom">
          <p>
            ©2025 All Rights Reserved • Terms Of Use • Privacy Policy • Legal
            Policies
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Homepage;