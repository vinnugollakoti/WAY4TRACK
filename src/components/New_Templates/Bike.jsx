import { Nav } from "react-bootstrap";
import "./Bike.css";
import Navbar from "./Navbar";

const Bike = () => {
  const testimonials = [
    { 
      name: "S E", 
      time: "10 days ago", 
      text: "Love this place! Awesome coaches, great vibe, and tough sessions that actually get results.", 
      avatar: "https://randomuser.me/api/portraits/men/32.jpg", 
      rating: 5 
    },
    { 
      name: "Jak", 
      time: "30 days ago", 
      text: "Love training here – great energy, killer workouts and awesome instructors!!", 
      avatar: "https://randomuser.me/api/portraits/men/33.jpg", 
      rating: 5 
    },
    { 
      name: "Nar", 
      time: "1 month ago", 
      text: "Today's hybrid class was awesome as always.", 
      avatar: "https://randomuser.me/api/portraits/women/44.jpg", 
      rating: 5 
    },
    { 
      name: "Mic", 
      time: "1 month ago", 
      text: "For the first time I consistently went to the gym for 2 years straight! Thanks to the beautiful community.", 
      avatar: "https://randomuser.me/api/portraits/men/32.jpg", 
      rating: 5 
    },
  ];

  return (
    <div className="body">
      <Navbar />
      <img src="/images/bike-banner.jpg" alt="" className="hero-bike" />
      <center>
        <h1 className="heading">Curious to know about our Bike GPS ?</h1>
        <p className="curios-line">
          The Basic GPS Tracking Device provides 2G and 4G tracking, geo-fencing, alerts, and trip history with motion-triggered reporting and remote configuration.
        </p>
      </center>
     <div className="main-cards">
      <div className="main-cards-1">
        <h1 className="main-cards-heading">Smart Geo-Fencing with Instant Alerts</h1>
        <p className="main-cards-text">
          The Smart Geo-Fencing feature lets you set safe zones for your bike and instantly alerts you if it crosses the boundary. Stay protected with real-time notifications that ensure security and peace of mind.
        </p>
      </div>
      <div className="main-cards-2">
         <h1 className="main-cards-heading">Motion Detection & Anti-Theft Alerts</h1>
        <p className="main-cards-text">
          Stay secure with an advanced motion sensor that detects movement, impact, or towing attempts. Instant alerts notify you about suspicious activity, ensuring anti-theft protection and complete control over your vehicle’s safety.
        </p>
      </div>
      <div className="main-cards-3">
         <h1 className="main-cards-heading">Mileage & Trip Insights</h1>
        <p className="main-cards-text">
          Monitor your vehicle’s usage with detailed trip summaries and mileage reports. Access historical trip logs to track performance, and ensure proper vehicle usage for personal or business purposes.
        </p>
      </div>
    </div>

    {/* RAHULS HAD THIS SECTION */}
    <div>
    </div>

    {/* 6 cards section */}
    <div className="six-cards-main">
      <div className="six-cards-1">
        <div className="six-cards-icon-bg">
          <img src="/images/icon4-bike.png" alt="" className="six-cards-icon" />
        </div>
        <h1 className="six-cards-heading">Real-time Tracking </h1>
        <p className="six-cards-text">"Track your assets in real time with interval-based or continuous updates for complete visibility. Stay informed, stay in control — anytime, anywhere</p>
      </div>
      <div className="six-cards-2">
        <div className="six-cards-icon-bg">
          <img src="/images/icon5-bike.png" alt="" className="six-cards-icon" />
        </div>
        <h1  className="six-cards-heading">Cellular connectivity with 2G and 4G</h1>
        <p className="six-cards-text">"Reliable 4G connectivity with automatic 2G fallback ensures uninterrupted tracking. Stay connected everywhere, even in low-network areas.".</p>
      </div>
      <div className="six-cards-3">
        <div className="six-cards-icon-bg">
          <img src="/images/icon2-bike.png" alt="" className="six-cards-icon" />
        </div>
        <h1 className="six-cards-heading">Overspeed alert</h1>
        <p className="six-cards-text">"Overspeed alerts notify you instantly when set speed limits are crossed. Drive safer and protect your vehicle with real-time monitoring."</p>
      </div>
    </div>
    <div className="six-cards-main-2">
      <div className="six-cards-1">
        <div className="six-cards-icon-bg">
          <img src="/images/icon3-bike.png" alt="" className="six-cards-icon" />
        </div>
        <h1 className="six-cards-heading">Mileage & trip history report</h1>
        <p className="six-cards-text">Access detailed mileage and trip history reports anytime. Review past journeys, analyze travel patterns, and keep track of distances covered with ease.</p>
      </div>
      <div className="six-cards-2">
        <div className="six-cards-icon-bg">
          <img src="/images/icon6-bike.png" alt="" className="six-cards-icon" />
        </div>
        <h1 className="six-cards-heading">Movement-Triggered Alerts with Smart Motion Sensor</h1>
        <p className="six-cards-text">"Motion sensor sends instant alerts on movement. Stay aware and protect your assets anytime."</p>
      </div>
      <div className="six-cards-3">
        <div className="six-cards-icon-bg">
          <img src="/images/token.png" alt="" className="six-cards-icon" />
        </div>
        <h1 className="six-cards-heading">Smart Geo-Fencing with Instant Alerts</h1>
        <p className="six-cards-text">"Set virtual boundaries with smart geo-fencing. Get instant alerts whenever your asset moves in or out."</p>
      </div>
    </div>

    <div className="gps-dashboard-div">
      <h1 className="gps-tracking-dashboard-heading">GPS Tracking Dashboard</h1>
      <div className="gps-dashboard-content">
        <img src="/images/bike2.png" alt="" className="gps-dashboard-img" />
        <div className="gps-dashboard-cards-main" style={{ marginTop: 0 }}>
          <div className="gps-dashboard-cards-main-1">
            <div className="gps-tracking-card-1-start">
              <h1 className="gps-tracking-card-1-heading">Top Navigation & Alerts</h1>
              <p className="gps-tracking-card-1-text">Tabs (Monitor, Statistics, Configuration) with status summary boxes and alert indicator.</p>
            </div>
            <div className="gps-tracking-card-2-start">
              <h1 className="gps-tracking-card-2-heading">Vehicle Status Overview</h1>
              <p className="gps-tracking-card-2-text">Real-time list with status icons, vehicle name, driver, duration, speed, and location.</p>
            </div>
          </div>
          <div className="gps-dashboard-cards-main-1">
            <div className="gps-tracking-card-1">
              <h1 className="gps-tracking-card-1-heading">Ignition & Idle Monitoring</h1>
              <p className="gps-tracking-card-1-text">Monitor engine on/off status and track idle time to improve efficiency</p>
            </div>
            <div className="gps-tracking-card-2">
              <h1 className="gps-tracking-card-2-heading">Travel Summary Reports</h1>
              <p className="gps-tracking-card-2-text">Get a clear overview of every trip with detailed insights on routes, stops, duration, and mileage covered.</p>
            </div>
          </div>
          <div className="gps-dashboard-cards-main-1">
            <div className="gps-tracking-card-1">
              <h1 className="gps-tracking-card-1-heading">Performance Metrics</h1>
              <p className="gps-tracking-card-1-text">Running/Idle/Stopped/Inactive time, stoppage duration, idle count, overspeed count.</p>
            </div>
            <div className="gps-tracking-card-2">
              <h1 className="gps-tracking-card-2-heading">Playback & Analysis</h1>
              <p className="gps-tracking-card-2-text">Playback option allows you to revisit complete trip history, view exact routes taken on the map, analyze driving patterns.</p>
            </div>
          </div>
          <button className="gps-know-more-btn">Know more →</button>
        </div>
      </div>
    </div>

    {/* TAKE FROM RAHUL */}

    <div className="points-card-main">
      <img src="/images/bike3.png" alt="" className="gps-tracking-img" />
      <div className="points-card-points-div">
        <div className="points-card-points-div-1-start">
          <div className="icon-background">
            <img src="/images/token.png" alt="" className="logo-icon" /> {/* logo comes */}
          </div>
          <div className="point-card-matter">
            <p className="point-card-heading">Group Ride Tracking</p>
            <p className="point-card-text">Track multiple bikes in group rides, ensuring no rider gets lost and improving coordination.</p>
          </div>
        </div>
        <div className="points-card-points-div-1">
          <div className="icon-background">
            <img src="/images/token.png" alt="" className="logo-icon" /> {/* logo comes */}
          </div>
          <div className="point-card-matter">
            <p className="point-card-heading">Personal Security</p>
            <p className="point-card-text">Monitor the location of individuals, ensuring safety during travel or emergencies.</p>
          </div>
        </div>
        <div className="points-card-points-div-1">
          <div className="icon-background">
            <img src="/images/token.png" alt="" className="logo-icon" /> {/* logo comes */}
          </div>
          <div className="point-card-matter">
            <p className="point-card-heading">Parking Location Finder</p>
            <p className="point-card-text">Easily locate your parked bike in crowded areas with GPS pin-drop location sharing.</p>
          </div>
        </div>
        <div className="points-card-points-div-1">
          <div className="icon-background">
            <img src="/images/token.png" alt="" className="logo-icon" /> {/* logo comes */}
          </div>
          <div className="point-card-matter">
            <p className="point-card-heading">Maintenance Reminders</p>
            <p className="point-card-text">Get smart alerts for regular bike servicing, oil changes, and battery health based on mileage and usage.</p>
          </div>
        </div>
        <div className="points-card-points-div-1">
          <div className="icon-background">
            <img src="/images/token.png" alt="" className="logo-icon" /> {/* logo comes */}
          </div>
          <div className="point-card-matter">
            <p className="point-card-heading">Insurance & Theft Claim Support</p>
            <p className="point-card-text">Provide accurate trip and theft data logs to insurance companies for faster claim settlements.</p>
          </div>
        </div>
        <div className="points-card-points-div-1">
          <div className="icon-background">
            <img src="/images/token.png" alt="" className="logo-icon" /> {/* logo comes */}
          </div>
          <div className="point-card-matter">
            <p className="point-card-heading">Eco-Friendly Riding Insights</p>
            <p className="point-card-text">Monitor fuel consumption, idle time, and riding patterns to encourage efficient and eco-friendly riding.</p>
          </div>
        </div>
      </div>
    </div>

    {/* three images section */}
    <div className="three-cards-section">
      <h1 className="gps-communications-heading">GPS Communications</h1>
      <div className="three-cards">
        <div className="three-card-1 start">
          <center>
          <h1 className="three-cards-section-heading">Sensors in BIKE GPS</h1>
          </center>
          <p className="three-cards-section-text">Supports 2G and 4G GSM/GPRS (850/900/1800/1900 MHz) with standard/micro SIM. Data via TCP/UDP 
with SMS backup for alerts.</p>
        <center>
        <img src="/images/bike4.png" alt="" className="three-cards-section-img" />
        </center>
        </div>
        <div className="three-card-1">
          <center>
          <h1 className="three-cards-section-heading">Sensors in BIKE GPS</h1>
          </center>
          <p className="three-cards-section-text">Supports 2G and 4G GSM/GPRS (850/900/1800/1900 MHz) with standard/micro SIM. Data via TCP/UDP 
with SMS backup for alerts.</p>
       <center>
        <img src="/images/bike5.png" alt="" className="three-cards-section-img bike5" />
        </center>
        </div>
        <div className="three-card-1">
          <center>
          <h1 className="three-cards-section-heading">Sensors in BIKE GPS</h1>
          </center>
          <p className="three-cards-section-text">Supports 2G and 4G GSM/GPRS (850/900/1800/1900 MHz) with standard/micro SIM. Data via TCP/UDP 
with SMS backup for alerts.</p>
           <center>
        <img src="/images/bike6.png" alt="" className="three-cards-section-img bike6" />
        </center>
        </div>
      </div>
    </div>

    {/* poster section */}
    <div className="poster-section">
      <img src="/images/schoolbus.jpg" alt="" className="poster-bike-last" />
    </div>

    <div className="testimonials-container">
      <div className="testimonials-scroll">
        {testimonials.concat(testimonials).map((t, i) => (
          <div key={i} className="testimonial-card">
            <div className="stars">{"⭐".repeat(t.rating)}</div>
            <p className="testimonial-text">{t.text}</p>
            <div className="testimonial-footer">
              <img src={t.avatar} alt={t.name} className="avatar" />
              <div className="user-info">
                <strong>{t.name}</strong>
                <span>{t.time}</span>
              </div>
            </div>
          </div>
        ))}
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
  )
}

export default Bike
