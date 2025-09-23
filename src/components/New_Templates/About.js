import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
// Assets
// import vehiclesImg from "/images/vehicles.png";
// import way4track from "/images/way4track.jpg";
// import technology from "/images/technology.png";
// import support from "/images/support.png";
// import reliability from "/images/reliability.png";
// import safety from "/images/safety.png";

// Components
import History from "./History";

// Styles
import "./About.css";


export default function About() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div>
      <Navbar />
    <div className="about-page-body">
      {/* HEADER PART */}
      <div className="header-container">
        <div data-aos="fade-right">
          <img src="/images/vehicles.png" alt="Vehicles" className="header-img" />
        </div>

        <div className="home-btn-wrapper" data-aos="fade-left">
          {/* <button
            onClick={() => (window.location.href = "/")}
            className="home-btn"
            aria-label="Go to Home"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#60A442"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Home
          </button> */}
        </div>

        <div data-aos="zoom-in" className="header-text">
          <h1 className="header-title">About Page</h1>
          <p className="header-subtitle">
            Smarter GPS solutions for Every Journey
          </p>
        </div>
      </div>

      {/* ABOUT US */}
      <div className="about-section">
        <div className="about-img-wrapper" data-aos="fade-right">
          <img src="/images/way4track.jpg" alt="About Way4Track" className="about-img" />
        </div>

        <div className="about-content" data-aos="fade-left">
          <p>
            At Way4Track, we specialize in delivering cutting-edge GPS tracking
            solutions designed for businesses and individuals.
          </p>
          <p>
            From basic trackers for personal vehicles to advanced AIS-140
            certified systems for fleets, we provide technology that ensures
            safety, transparency, and efficiency.
          </p>
          <p>
            Trusted by transport companies, logistics providers, and individuals
            alike, we combine innovation, reliability, and affordability.
          </p>
          <button className="custom-animated-btn">
            <span>Get in Touch</span>
          </button>
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className="choose-section">
        <div data-aos="zoom-in" className="choose-header">
          <h1>Why Choose Us</h1>
          <p>
            Thank you for trusting Way4Track – powering every journey with
            precision, safety, and control.
          </p>
        </div>

        <motion.div
          className="features-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            visible: { transition: { staggerChildren: 0.3 } },
          }}
        >
          {/* Cutting-Edge Technology */}
          <motion.div
            className="feature-card light"
            variants={{
              hidden: { opacity: 0, x: -80 },
              visible: { opacity: 1, x: 0, transition: { duration: 1 } },
            }}
          >
            <div className="icon-wrapper">
              <img src= "/images/technology.png" alt="Technology" className="icon-img" />
            </div>
            <div>
              <h3 className="feature-title green">Cutting-Edge Technology</h3>
              <p>
                Advanced GPS solutions with real-time tracking, fuel monitoring,
                and remote control features.
              </p>
            </div>
          </motion.div>

          {/* Proven Reliability */}
          <motion.div
            className="feature-card dark"
            variants={{
              hidden: { opacity: 0, x: 80 },
              visible: { opacity: 1, x: 0, transition: { duration: 1 } },
            }}
          >
            <div className="icon-wrapper">
              <img src="/images/reliability.png" alt="Reliability" className="icon-img" />
            </div>
            <div>
              <h3 className="feature-title white">Proven Reliability</h3>
              <p className="white-text">
                Trusted by businesses and individuals for accurate,
                uninterrupted performance.
              </p>
            </div>
          </motion.div>

          {/* Compliance & Safety First */}
          <motion.div
            className="feature-card dark"
            variants={{
              hidden: { opacity: 0, x: -80 },
              visible: { opacity: 1, x: 0, transition: { duration: 1 } },
            }}
          >
            <div className="icon-wrapper">
              <img src= "/images/safety.png" alt="Safety" className="icon-img" />
            </div>
            <div>
              <h3 className="feature-title white">Compliance & Safety First</h3>
              <p className="white-text">
                AIS-140 certified devices for government compliance and enhanced
                passenger safety.
              </p>
            </div>
          </motion.div>

          {/* Dedicated Support */}
          <motion.div
            className="feature-card light"
            variants={{
              hidden: { opacity: 0, x: 80 },
              visible: { opacity: 1, x: 0, transition: { duration: 1 } },
            }}
          >
            <div className="icon-wrapper">
              <img src="/images/support.png" alt="Support" className="icon-img" />
            </div>
            <div>
              <h3 className="feature-title green">Dedicated Support</h3>
              <p>
                24/7 customer assistance to ensure smooth operation and quick
                problem resolution.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* RECORDS SECTION */}
      <div className="records-section">
        <div className="records-header" data-aos="zoom-in">
          <h2>Our Records</h2>
          <p>Our Journey So Far</p>
        </div>

        <div className="records-grid">
          <div className="record-card dark" data-aos="fade-right">
            <span className="record-number">50,000+</span>
            <span className="record-text">Active GPS Devices</span>
          </div>

          <div className="record-card light" data-aos="fade-left">
            <div className="record-inline">
              Cities <br /> Covered <span className="bold">120+</span>
            </div>
          </div>

          <div className="record-card light" data-aos="fade-right">
            <div className="record-inline">
              Cities <br /> Satisfaction <span className="bold">98%</span>
            </div>
          </div>

          <div className="record-card dark" data-aos="fade-left">
            <span className="record-number">12+</span>
            <span className="record-text">Years of Experience</span>
          </div>
        </div>
      </div>

      {/* OUR HISTORY */}
      <History />
    </div>
    <Footer />
    </div>
  );
}
