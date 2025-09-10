import React, { useState, useEffect } from "react";
import "./Homepage.css";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Navbar from "./Navbar";


function Home({ websiteData }) {
  // Carousel state management
  const [promotions, setPromotions] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // New session states
  const [session1, setSession1] = useState([]);
  const [session2, setSession2] = useState([]);
  const [session3, setSession3] = useState([]);
  const [session4, setSession4] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const payload = {
          companyCode: "WAY4TRACK",
          unitCode: "WAY4",
        };

        const response = await axios.post(
          "https://sharontelematics.org/api/promotion/getAllPromotions",
          payload
        );
        const data = response.data.data;
        setPromotions(data);

        // Helper to get latest promotion by theme
        const getLatestListByTheme = (theme) => {
          const latest = data
            .filter(item => item.theme === theme)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
          return latest?.list || [];
        };

        setSession1(getLatestListByTheme("Session-1"));
        setSession2(getLatestListByTheme("Session-2"));
        setSession3(getLatestListByTheme("Session-3"));
        setSession4(getLatestListByTheme("Session-4"));

      } catch (error) {
        console.error("Error fetching promotions:", error);
      }
    };

    fetchPromotions();
  }, []);

  useEffect(() => {
    console.log("Promotions data:", promotions);
    console.log("Session 1:", session1);
    console.log("Session 2:", session2);
    console.log("Session 3:", session3);
    console.log("Session 4:", session4);;
  }, [promotions]);

  useEffect(() => {
    console.log("Website Data:", websiteData);
  }, [websiteData]);


  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % websiteData.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [websiteData.length]);

  const handleSlideClick = (item) => {
    navigate(`/${item.layoutType}/${item.id}`);
  };

  // Manual navigation functions
  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % websiteData.length);
  };



  const goToPrevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + websiteData.length) % websiteData.length
    );
  };

  // Quantity control functions
  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div className="homepage-root">
      <Navbar />
      {/* Carousel Section */}
      <div className="homepage-intro">
        <div className="carousel-container">
          {/* Navigation Arrows */}
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrevSlide}
          >
            &#8249; {/* Left arrow character */}
          </button>
          {websiteData.map((item, index) => (
            <div
              key={index}
              className={`carousel-slide ${index === currentSlide ? "active" : ""}`}
            >
              <img
                className="homepage-intro-img"
                src={item.blogImage ? item.blogImage : "/images/Rectangle 16.png"}
                alt={`Slide ${index + 1}`}
                onClick={() => handleSlideClick(item)}
              />
            </div>
          ))}
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNextSlide}
          >
            &#8250; {/* Right arrow character */}
          </button>
        </div>
      </div>

      <div className="homepage-products">
        {session2.slice(-5).map((item, index) => (
          <div key={index} className="homepage-product-card">
            <img
              src={item.photo ? item.photo : ""} // fallback if photo missing
              alt={item.name || `Product ${index + 1}`}
            />
            <h3>{item.name || "Unnamed Product"}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>

      <section className="homepage-solutions">
        <h2 className="solutions-title">Our Solutions -</h2>
        <div className="solutions-list">
          {session3.slice(-4).map((item, index) => (
            <motion.div
              key={index}
              className="solution-card"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="solution-left">
                <h3 className="solution-heading">
                  {item.name || `Solution ${index + 1}`}
                </h3>
                <p className="solution-desc">{item.desc}</p>
                <button className="solution-cta">Know more</button>
              </div>
              <div className="solution-right">
                <img
                  src={item.photo ? item.photo : "/images/fallback.png"}
                  alt={item.name || `Solution ${index + 1}`}
                />
              </div>
            </motion.div>
          ))}
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
            <h3 className="featuree-title">
              Government-Integrated GPS Solutions
            </h3>
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
        {session4.length > 0 && session4[session4.length - 1].photo ? (
          <img src={session4[session4.length - 1].photo} alt="Latest" />
        ) : (
          <img src="/images/Rectangle 73.png" alt="Fallback" />
        )}
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
            <p>
              <a href="#">About</a>
            </p>
            <p>
              <a href="#">Our Products</a>
            </p>
            <p>
              <a href="#">Careers</a>
            </p>
            <p>
              <a href="#">Blogs</a>
            </p>
          </div>

          <div className="footer-column">
            <h4>Support</h4>
            <p>
              <a href="#">Contact Us</a>
            </p>
            <p>
              <a href="#">Whatsapp</a>
            </p>
          </div>

          <div className="footer-column">
            <h4>Support</h4>
            <p>
              <a href="#">Contact Us</a>
            </p>
            <p>
              <a href="#">Whatsapp</a>
            </p>
          </div>

          <div className="footer-column">
            <h4>Follow Us</h4>
            <p>
              <a href="#">Instagram</a>
            </p>
            <p>
              <a href="#">Facebook</a>
            </p>
            <p>
              <a href="#">Twitter</a>
            </p>
            <p>
              <a href="#">Youtube</a>
            </p>
          </div>
        </div>

        <div className="footer-logo">
          <h1>
            Way4Track
          </h1>
        </div>

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

export default Home;
