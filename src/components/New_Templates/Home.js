import React, { useState, useEffect, useRef } from "react";
import "./Homepage.css";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer"
import DemoSection from "./DemoSection";
import SpecialProduct from "./SpecialProduct";
import HomepageProducts from "./HomepageProducts";

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
  const cardsContainerRef = useRef(null);

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
            .filter((item) => item.theme === theme)
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
    console.log("Session 4:", session4);
  }, [promotions]);

  useEffect(() => {
    console.log("Website Data:", websiteData);
  }, [websiteData]);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % websiteData.length);
    }, 15000);

    return () => clearInterval(interval);
  }, [websiteData.length]);

  // Setup scroll animation for solutions section
  useEffect(() => {
    if (session3.length === 0 || !cardsContainerRef.current) return;

    const cardsContainer = cardsContainerRef.current;
    const cards = cardsContainer.querySelectorAll('.solution-card-sticky');

    // Set CSS custom properties
    cardsContainer.style.setProperty('--cards-count', cards.length);
    if (cards.length > 0) {
      cardsContainer.style.setProperty('--card-height', `${cards[0].clientHeight}px`);
    }

    // Add padding to create the staggered effect
    Array.from(cards).forEach((card, index) => {
      const offsetTop = 30 + index * 80;
      card.style.paddingTop = `${offsetTop}px`;

      if (index === cards.length - 1) return;

      const toScale = 1 - (cards.length - 1 - index) * 0.07;
      const nextCard = cards[index + 1];
      const cardInner = card.querySelector('.solution-card-inner');

      // Create scroll observer for each card
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const percentageY = 1 - entry.intersectionRatio;

            cardInner.style.transform = `scale(${valueAtPercentage({
              from: 1,
              to: toScale,
              percentage: percentageY
            })
              })`;

            cardInner.style.filter = `brightness(${valueAtPercentage({
              from: 1,
              to: 0.8,
              percentage: percentageY
            })})`;
          });
        },
        {
          threshold: Array.from({ length: 100 }, (_, i) => i / 100)
        }
      );

      observer.observe(nextCard);
    });
  }, [session3]);

  // Helper function for value interpolation
  const valueAtPercentage = ({ from, to, percentage }) => {
    return from + (to - from) * percentage;
  };

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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Optional: Adds smooth scrolling
    });
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
              className={`carousel-slide ${index === currentSlide ? "active" : ""
                }`}
            >
              <img
                className="homepage-intro-img"
                src={item.blogImage ? item.blogImage : ""}
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

     <HomepageProducts />



      <section className="homepage-solutions">
        <center>
          <h2 className="solutions-title why-choose-title">Our Solutions</h2>
        </center>
        <div className="solutions-sticky-cards" ref={cardsContainerRef}>
          {session3.slice(-4).map((item, index) => (
            <Link
              to={item.link || "/"}
              key={index}
               onClick={() => window.scrollTo(0, 0)}
              className="solution-card-sticky"
              data-index={index}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="solution-card-inner">
                <div className="solution-card-image-container">
                  <img
                    src={item.photo ? item.photo : "/images/fallback.png"}
                    alt={item.name || `Solution ${index + 1}`}
                  />
                </div>
                <div className="solution-card-content">
                  <h3 className="solution-card-title">
                    {item.name || `Solution ${index + 1}`}
                  </h3>
                  <p className="solution-card-description">{item.desc}</p>
                  <p className="solution-card-hint" style={{ fontSize: "0.9rem", color: "#555" }}>
                    Click anywhere to view details
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="homepage-why-choose">
  <div className="why-choose-container">
    <div className="why-choose-header">
      <h2 className="why-choose-title">Why Choose Way4Track?</h2>
      <p className="why-choose-subtitle">
        Experience the difference with our cutting-edge GPS tracking solutions 
        designed for reliability, innovation, and your peace of mind
      </p>
    </div>

    <div className="features-showcase">
      <div className="feature-grid">
        <div className="feature-item">
          <div className="feature-icon-wrapper">
            <div className="feature-icon-bg">
              <img src="/images/assistant_direction.png" alt="GPS Solutions" />
            </div>
            <div className="feature-number">01</div>
          </div>
          <div className="feature-content">
            <h3 className="feature-title">Comprehensive GPS Solutions</h3>
            <p className="feature-desc">
              From personal vehicles to large fleets and valuable assets, we provide 
              tailored tracking solutions for every requirement
            </p>
          </div>
        </div>

        <div className="feature-item">
          <div className="feature-icon-wrapper">
            <div className="feature-icon-bg">
              <img src="/images/assured_workload.png" alt="Government Approved" />
            </div>
            <div className="feature-number">02</div>
          </div>
          <div className="feature-content">
            <h3 className="feature-title">Government Certified</h3>
            <p className="feature-desc">
              AIS-140 compliant devices with full legal certification for 
              complete compliance and peace of mind
            </p>
          </div>
        </div>

        <div className="feature-item">
          <div className="feature-icon-wrapper">
            <div className="feature-icon-bg">
              <img src="/images/verified.png" alt="Reliable Tracking" />
            </div>
            <div className="feature-number">03</div>
          </div>
          <div className="feature-content">
            <h3 className="feature-title">Precision Tracking</h3>
            <p className="feature-desc">
              High-sensitivity GPS technology delivering real-time location 
              accuracy with 99.9% reliability
            </p>
          </div>
        </div>

        <div className="feature-item">
          <div className="feature-icon-wrapper">
            <div className="feature-icon-bg">
              <img src="/images/category_search.png" alt="Safety Features" />
            </div>
            <div className="feature-number">04</div>
          </div>
          <div className="feature-content">
            <h3 className="feature-title">Advanced Safety Suite</h3>
            <p className="feature-desc">
              SOS emergency button, remote immobilizer, geo-fencing, and 
              instant theft alerts for maximum security
            </p>
          </div>
        </div>

        <div className="feature-item">
          <div className="feature-icon-wrapper">
            <div className="feature-icon-bg">
              <img src="/images/desktop_cloud_stack.png" alt="Easy Platforms" />
            </div>
            <div className="feature-number">05</div>
          </div>
          <div className="feature-content">
            <h3 className="feature-title">Intuitive Platforms</h3>
            <p className="feature-desc">
              User-friendly mobile app and web portal for seamless tracking 
              and management from anywhere
            </p>
          </div>
        </div>

        <div className="feature-item">
          <div className="feature-icon-wrapper">
            <div className="feature-icon-bg">
              <img src="/images/contact_mail.png" alt="Support" />
            </div>
            <div className="feature-number">06</div>
          </div>
          <div className="feature-content">
            <h3 className="feature-title">24/7 Expert Support</h3>
            <p className="feature-desc">
              Round-the-clock customer assistance with dedicated experts 
              for instant guidance and support
            </p>
          </div>
        </div>
      </div>
    </div>

    <div className="why-choose-stats">
      <div className="stat-item">
        <div className="stat-number">10K+</div>
        <div className="stat-label">Happy Customers</div>
      </div>
      <div className="stat-item">
        <div className="stat-number">99.9%</div>
        <div className="stat-label">Uptime Reliability</div>
      </div>
      <div className="stat-item">
        <div className="stat-number">24/7</div>
        <div className="stat-label">Support Available</div>
      </div>
      <div className="stat-item">
        <div className="stat-number">50+</div>
        <div className="stat-label">Cities Covered</div>
      </div>
    </div>
  </div>
</section>
      <SpecialProduct websiteData={websiteData} />
      <section className="featurees-section">
        <div className="featurees-heading-container">
          <h2 className="featurees-heading">What's New With Way4track</h2>
        </div>

        <div className="featurees-container">
          <div className="featuree-box">
            <img
              src="/images/Gemini_Generated_Image_pwxowdpwxowdpwxo.png"
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
              src="/images/homepaage 2img.png"
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
              src="/images/homepage-3img.png"
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
      <DemoSection />

      <Footer />


    </div>
  );
}

export default Home;