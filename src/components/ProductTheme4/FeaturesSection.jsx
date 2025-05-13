import React, { useState } from "react";
import {
  MapPin,
  Clock,
  AlertTriangle,
  Target,
  Database,
  Map,
} from "lucide-react";

const FeatureCard = ({ icon, title, description, color }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="col-md-6 col-lg-4 mb-4" data-aos="fade-up">
      <div
        className={`feature-card ${isHovered ? "hovered" : ""}`}
        style={{ "--accent-color": color }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="feature-icon">{icon}</div>
        <h3 className="feature-title">{title}</h3>
        <p className="feature-description">{description}</p>
        <div className="feature-overlay"></div>
      </div>
    </div>
  );
};

const FeaturesSection = ({ amenities }) => {
  return (
    <section className="features-section py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 text-center mb-5">
          <h6 className="text-primary text-uppercase" data-aos="fade-up">
            What We Do
          </h6>
          <h2 className="section-title" data-aos="fade-up" data-aos-delay="100">
            Key Features & Benefits
          </h2>
          <div
            className="divider mx-auto"
            data-aos="fade-up"
            data-aos-delay="200"
          ></div>
          <p
            className="section-subtitle"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            The Way4Track vehicle tracking system ensures the safety and peace
            of mind for all our customers
          </p>
        </div>
      </div>

      <div className="row" style={{ padding: "50px" }}>
        {amenities.map((item, index) => (
          <FeatureCard
            key={item.id}
            icon={
              <img
                src={item.image}
                alt={item.name}
                style={{ width: 32, height: 32 }}
              />
            }
            title={item.name}
            description={item.desc}
            color={
              [
                "#4CAF50",
                "#2196F3",
                "#F44336",
                "#FF9800",
                "#9C27B0",
                "#00BCD4",
              ][index % 6]
            }
          />
        ))}
      </div>

      <div className="row justify-content-center mt-5">
        <div className="col-md-8 text-center">
          <div className="cta-box" data-aos="zoom-in">
            <h3>Ready to enhance your vehicle security?</h3>
            <p>Get started with our premium OBD tracking device today</p>
            <button className="btn btn-primary btn-lg mt-3">
              Request a Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
