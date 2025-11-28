import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import DemoSection from "./DemoSection"
import "./About.css";

export default function About() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleGetInTouch = () => {
    navigate("/contact");
  };

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
            {/* Home button removed as per original */}
          </div>

          <div data-aos="zoom-in" className="header-text">
            <h1 className="header-title">About WAY4TRACK</h1>
            <p className="header-subtitle">
              Your Reliable Partner in GPS Tracking Solutions
            </p>
          </div>
        </div>

        {/* OUR PROMISE SECTION */}
        <div className="promise-section">
          <div className="container">
            <div className="promise-content" data-aos="fade-up">
              <h2>Our Promise</h2>
              <p className="promise-lead">
                At Way4track, every customer matters. We are committed to ensuring you feel supported, 
                informed, and confident—whether tracking a vehicle, protecting a loved one, or managing an entire fleet.
              </p>
              <div className="highlight-box">
                <p className="highlight-text">
                  <strong>Way4track is not just a GPS provider.</strong> We are your reliable partner in safety, 
                  connection, and peace of mind.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* WHO WE SERVE */}
        <div className="serve-section">
          <div className="container">
            <div className="serve-header" data-aos="fade-up">
              <h2>Who We Serve</h2>
              <p>
                At <strong>Way4track</strong>, we serve a wide range of customers who rely on accurate, 
                dependable, and real-time tracking solutions. Our GPS systems are designed for all types 
                of vehicles and industries.
              </p>
            </div>

            <div className="vehicle-grid" data-aos="fade-up">
              <div className="vehicle-category">
                <div className="vehicle-icon">🏍️</div>
                <h4>Two-wheelers</h4>
                <p>Bikes & scooters</p>
              </div>
              <div className="vehicle-category">
                <div className="vehicle-icon">🚗</div>
                <h4>Passenger vehicles</h4>
                <p>Cars, taxis & commercial cabs</p>
              </div>
              <div className="vehicle-category">
                <div className="vehicle-icon">🚌</div>
                <h4>Public transport</h4>
                <p>Buses, school vans & shuttle services</p>
              </div>
              <div className="vehicle-category">
                <div className="vehicle-icon">🚛</div>
                <h4>Heavy vehicles</h4>
                <p>Trucks & trailers</p>
              </div>
              <div className="vehicle-category">
                <div className="vehicle-icon">🚜</div>
                <h4>Agricultural machinery</h4>
                <p>Tractors & harvesters</p>
              </div>
              <div className="vehicle-category">
                <div className="vehicle-icon">🏗️</div>
                <h4>Mining & construction</h4>
                <p>Earthmovers, JCBs, excavators, and dumping machines</p>
              </div>
            </div>

            <div className="serve-footer" data-aos="fade-up">
              <p>
                From individuals who want to protect their personal vehicles to businesses managing large fleets, 
                we support <strong>every customer who values safety, efficiency, and reliable data</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* OUR PURPOSE */}
        <div className="purpose-section">
          <div className="container">
            <div className="purpose-content" data-aos="fade-up">
              <h2>Our Purpose</h2>
              <p className="purpose-lead">
                Our solutions are designed to give customers:
              </p>
              <div className="purpose-grid">
                <div className="purpose-item">
                  <div className="purpose-icon">⚡</div>
                  <h4>Smooth Accessibility</h4>
                  <p>Easy-to-use platforms for seamless tracking experience</p>
                </div>
                <div className="purpose-item">
                  <div className="purpose-icon">🎯</div>
                  <h4>Accurate, Real-time Data</h4>
                  <p>Precise location and vehicle information instantly</p>
                </div>
                <div className="purpose-item">
                  <div className="purpose-icon">🛡️</div>
                  <h4>Better Security</h4>
                  <p>Enhanced monitoring and protection for your assets</p>
                </div>
                <div className="purpose-item">
                  <div className="purpose-icon">📊</div>
                  <h4>Improved Performance</h4>
                  <p>Optimized fleet operations and efficiency</p>
                </div>
                <div className="purpose-item">
                  <div className="purpose-icon">💰</div>
                  <h4>Reduced Costs</h4>
                  <p>Lower operational expenses through smart tracking</p>
                </div>
              </div>
              <p className="purpose-conclusion">
                Whether you own a single bike or manage a large fleet of mining trucks, Way4track ensures 
                you get the right tools, reliable support, and precise data to stay in control.
              </p>
            </div>
          </div>
        </div>

        {/* FOUNDER SECTION */}
        <div className="founder-section">
          <div className="container">
            <div className="founder-content">
              <div className="founder-text" data-aos="fade-right">
                <h2>About Our Founder</h2>
                <p>
                  Way4Track was born from the vision of <strong>Suneel G</strong>, a commerce graduate with 
                  an uncommon and relentless passion for technology. Even while pursuing his B.Com, Suneel 
                  found himself drawn not to numbers on paper, but to wires, devices, and the potential of emerging tech.
                </p>
                <p>
                  This curiosity led him into the world of GPS systems early in his career—a field where he 
                  quickly discovered both his talent and his purpose.
                </p>
                <p>
                  Working hands-on with GPS solutions, he saw how technology could transform safety, improve 
                  management, and bring real-time intelligence to people and businesses. But he also saw gaps: 
                  the need for better service, reliable support, and high-quality tracking solutions that truly 
                  delivered what customers needed. This sparked a drive in him—not just to work in the field, 
                  but to build something of his own.
                </p>
                <div className="founder-highlight">
                  <p>
                    In <strong>2018</strong>, that spark became reality, and <strong>Sharon Telematics PVT.LTD (Way4Track)</strong> was founded.
                  </p>
                </div>
              </div>
              <div className="founder-stats" data-aos="fade-left">
                <div className="founder-stat">
                  <div className="stat-number">2018</div>
                  <div className="stat-label">Founded</div>
                </div>
                <div className="founder-stat">
                  <div className="stat-number">5+</div>
                  <div className="stat-label">States Covered</div>
                </div>
                <div className="founder-stat">
                  <div className="stat-number">7+</div>
                  <div className="stat-label">Years of Excellence</div>
                </div>
                <div className="founder-quote">
                  <p>
                    "Technology becomes meaningful only when it makes life simpler, safer, and better for people."
                  </p>
                  <cite>- Suneel G, Founder</cite>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* HOW WE OPERATE */}
        <div className="operation-section">
          <div className="container">
            <div className="operation-header" data-aos="fade-up">
              <h2>How We Operate Our GPS System</h2>
              <p>
                At <strong>Way4track</strong>, our GPS system is built to deliver accurate data, smooth accessibility, 
                and reliable performance for every customer. We use a combination of advanced hardware, secure software, 
                and dedicated service support to ensure seamless tracking and monitoring.
              </p>
            </div>

            <div className="operation-steps">
              <div className="operation-step" data-aos="fade-right">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Installation & Device Setup</h3>
                  <p>
                    Once a customer chooses a GPS solution, our trained technicians install the GPS tracking device 
                    securely in the vehicle, set up fuel sensors or cameras (if required), configure the system for 
                    real-time monitoring, and test the device to ensure proper accuracy and performance.
                  </p>
                  <p className="step-note">
                    We make sure every installation is clean, safe, and fully optimized.
                  </p>
                </div>
              </div>

              <div className="operation-step" data-aos="fade-left">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Real-Time Data Collection</h3>
                  <p>
                    Our GPS devices continuously collect essential data, including:
                  </p>
                  <ul className="data-list">
                    <li>Live vehicle location</li>
                    <li>Speed and movement</li>
                    <li>Ignition on/off status</li>
                    <li>Route history</li>
                    <li>Fuel levels (with sensors)</li>
                    <li>Camera footage (for 4-channel camera systems)</li>
                  </ul>
                  <p>This information is then securely transmitted to our servers.</p>
                </div>
              </div>

              <div className="operation-step" data-aos="fade-right">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Secure Cloud-Based Processing</h3>
                  <p>
                    All data collected from the device is processed through our <strong>secure cloud servers</strong>, 
                    where it is analyzed, cleaned, filtered, and converted into useful insights.
                  </p>
                  <p className="step-highlight">
                    This ensures customers always get <strong>accurate, real-time information</strong> without delays.
                  </p>
                </div>
              </div>

              <div className="operation-step" data-aos="fade-left">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h3>User-Friendly Mobile & Web Access</h3>
                  <p>
                    Customers can access the data anytime through our <strong>Mobile App</strong> and 
                    <strong> Web Dashboard</strong>. Both platforms are designed for smooth, easy accessibility.
                  </p>
                  <div className="access-features">
                    <div className="access-feature">View live location</div>
                    <div className="access-feature">Check fuel levels</div>
                    <div className="access-feature">Monitor camera feeds</div>
                    <div className="access-feature">Receive alerts</div>
                    <div className="access-feature">Download reports</div>
                    <div className="access-feature">Track multiple vehicles</div>
                  </div>
                </div>
              </div>

              <div className="operation-step" data-aos="fade-right">
                <div className="step-number">5</div>
                <div className="step-content">
                  <h3>Alerts & Notifications</h3>
                  <p>
                    To enhance safety and control, our system provides instant alerts like:
                  </p>
                  <div className="alerts-grid">
                    <div className="alert-item">🚨 Overspeed alerts</div>
                    <div className="alert-item">📍 Geo-fence notifications</div>
                    <div className="alert-item">🔑 Ignition on/off</div>
                    <div className="alert-item">⛽ Fuel theft alerts</div>
                    <div className="alert-item">🛣️ Route deviation alerts</div>
                  </div>
                  <p>These notifications help customers take quick action and reduce risks.</p>
                </div>
              </div>

              <div className="operation-step" data-aos="fade-left">
                <div className="step-number">6</div>
                <div className="step-content">
                  <h3>24/7 Support & Maintenance</h3>
                  <p>
                    Way4track is built on a <strong>service-first approach</strong>, so we offer quick troubleshooting, 
                    provide device replacement or maintenance if needed, upgrade software regularly, assist customers 
                    with dashboard or app queries, and help optimize tracking settings for best performance.
                  </p>
                  <p className="step-note">
                    Our team ensures the system stays accurate, active, and reliable at all times.
                  </p>
                </div>
              </div>
            </div>

            <div className="operation-promise" data-aos="fade-up">
              <div className="promise-card">
                <h3>Our Operation Promise</h3>
                <p className="promise-statement">
                  We operate with one goal: <strong>To give customers smooth access to precise, trustworthy data—every moment, every journey.</strong>
                </p>
                <p>
                  At Way4track, technology and service work together to provide a GPS experience you can truly depend on.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* CTA SECTION */}
        <DemoSection />
      </div>
      <Footer />
    </div>
  );
}