import React from "react";
import "./ProductTheme1.css";

const ProductTheme1 = () => {
  const features = [
    {
      icon: "/images/bike_gps_tracker_connectivity.png",
      title: "Connectivity",
      description:
        "Tracking all the employees or positioning the 2-wheelers was never so easy. Track all your employees having two wheelers or your son who drives a two wheeler with GPS trackers.",
    },
    {
      icon: "/images/bike_gps_tracker_battery.png",
      title: "Battery",
      description:
        "Without any extra installation charges, this device is installed to the battery of the bike. This GPS tracking device has power back up for extra hours after being unplugged from the battery.",
    },
    {
      icon: "/images/bike_gps_tracker_tracking.png",
      title: "Tracking",
      description:
        "Tracking of two wheelers becomes so easy with the use of way4track bike series. Whether it’s a company vehicle or your own, track it with features like zone & speeding specification.",
    },
    {
      icon: "/images/bike_gps_tracker_parking_notification.png",
      title: "Parking Notification",
      description:
        "Parking Notification logs the stationary location of your vehicle and alerts you when it moves or enters/exits predefined zones.",
    },
    {
      icon: "/images/bike_gps_tracker_real_time_tracking.png",
      title: "Real Time Tracking",
      description:
        "Track your friends, family, or employees in real-time. This feature enables you to track their exact location instantly.",
    },
    {
      icon: "/images/bike_gps_tracker_24hour_history.png",
      title: "24 Hour History",
      description:
        "Missed out on real-time tracking? View all missed activities from the past 24 hours on a single screen.",
    },
    {
      icon: "/images/bike_gps_tracker_zone_alerts.png",
      title: "Zone Alerts",
      description:
        "Create custom zones and get notified whenever someone enters or exits these designated areas.",
    },
    {
      icon: "/images/bike_gps_tracker_speed_alerts.png",
      title: "Speed Alerts",
      description:
        "Set speed limits and get notified if they are exceeded. Monitor your vehicles and ensure safety on the go.",
    },
  ];

  return (
    <div className="tracker-container">
      <div className="header-section">
        <h1 className="title">Bike GPS Tracker</h1>
        <p className="subtitle">
          WayTrack offers tracking and monitoring services for your personal
          vehicle. Best GPS tracking device for bikes.
        </p>
      </div>

      <div className="image-section">
        <div className="image-wrapper">
          <img
            src="/images/bike_gps_tracker.png"
            alt="Map Tracking"
            className="map-image"
          />
        </div>
      </div>

      <div className="features-section">
        <h2 className="features-heading">
          Advanced Consumer Vehicle Tracking Platform
        </h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🛠️</div>
            <h3 className="feature-title">Maintenance Reminder</h3>
            <p className="feature-text">
              Streamline your assets’ maintenance activities with WayTrack’s
              reminder system. Cut costs and prevent breakdowns.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🧭</div>
            <h3 className="feature-title">Route Playback</h3>
            <p className="feature-text">
              Review the route traveled by your assets for selected dates and
              times. Playback speed and stop locations included.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📍</div>
            <h3 className="feature-title">Geofence</h3>
            <p className="feature-text">
              Set boundaries for your vehicle and get notified when it exits the
              defined area with instant alerts.
            </p>
          </div>
        </div>
      </div>

      <div className="vehicle-tracking-container">
        <div className="tracking-dashboard-image">
          <img
            src="/images/personal_gps_tracking_left_content.png"
            alt="Vehicle Tracking Dashboard"
          />
        </div>

        <div className="alerts-section">
          <div className="alert-feature">
            <img
              src="/images/parking_violation_alerts.png"
              alt="Parking Violation Alerts"
            />
            <h4>Parking Violation Alerts</h4>
            <p>Get notified when you have parked in prohibited zone</p>
          </div>
          <div className="alert-feature">
            <img src="/images/route_replay.png" alt="Route Replay" />
            <h4>Route Replay</h4>
            <p>Review your trips.</p>
          </div>
          <div className="alert-feature">
            <img src="/images/driving_behaviour.png" alt="Theft Alerts" />
            <h4>Theft Alerts</h4>
            <p>Instant notifications in the event of a break-in.</p>
          </div>
        </div>

        <div className="cta-section">
          <h5>TRY IT TODAY</h5>
          <p>
            Way4Track offers tracking and monitoring services for your personal
            vehicle
          </p>
          <button>Try it today</button>
        </div>
      </div>

      <div className="bike-tracker-section">
        <div className="dashboard-image-container">
          <img
            src="/images/personal_gps_tracking_right_content.png"
            alt="GPS Tracking Dashboard"
            className="dashboard-image"
          />
        </div>

        <div className="features-row">
          <div className="feature">
            <img src="/images/maintenance_remainders.png" alt="Maintenance" />
            <h4>Maintenance Reminders</h4>
            <p>Stay on top of maintenance dates</p>
          </div>
          <div className="feature">
            <img src="/images/live_tracking.png" alt="Live Tracking" />
            <h4>Live-Tracking Screen</h4>
            <p>24/7 asset monitoring</p>
          </div>
          <div className="feature">
            <img src="/images/driving_behaviour.png" alt="Driving Behaviour" />
            <h4>Driving Behaviours</h4>
            <p>Exercise safe and economical driving patterns</p>
          </div>
          <div className="what-we-do">
            <h5>— WHAT WE DO? —</h5>
            <p>
              The crucial idea of the way4track vehicle tracking system is to
              ensure the safety of all its customers. The GPS tracking app for
              the bike has to be installed by the individual who will track and
              monitor the concerned person's location.
            </p>
          </div>
          <div className="info-boxes">
            {features.map((feature, index) => (
              <div className="info-box orange" key={index}>
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="feature-icon"
                />
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <img
        className="footer-image"
        src="/images/personal_gps_bikebanner_footer.png"
      />
    </div>
  );
};

export default ProductTheme1;
