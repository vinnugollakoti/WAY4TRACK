import React, { useState } from 'react';
import { MapPin, Clock, AlertTriangle, Target, Database, Map } from 'lucide-react';

const FeatureCard = ({ icon, title, description, color }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="col-md-6 col-lg-4 mb-4"
      data-aos="fade-up"
    >
      <div 
        className={`feature-card ${isHovered ? 'hovered' : ''}`}
        style={{ '--accent-color': color }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="feature-icon">
          {icon}
        </div>
        <h3 className="feature-title">{title}</h3>
        <p className="feature-description">{description}</p>
        <div className="feature-overlay"></div>
      </div>
    </div>
  );
};

const FeaturesSection = () => {
  return (
    <section className="features-section py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 text-center mb-5">
          <h6 className="text-primary text-uppercase" data-aos="fade-up">What We Do</h6>
          <h2 className="section-title" data-aos="fade-up" data-aos-delay="100">
            Key Features & Benefits
          </h2>
          <div className="divider mx-auto" data-aos="fade-up" data-aos-delay="200"></div>
          <p className="section-subtitle" data-aos="fade-up" data-aos-delay="300">
            The Way4Track vehicle tracking system ensures the safety and peace of mind for all our customers
          </p>
        </div>
      </div>
      
      <div className="row" style={{padding:"50px"}}>
        <FeatureCard 
          icon={<MapPin size={32} />}
          title="Tracking"
          description="Track all your loved ones and employees on a single screen. Way4Track lets you monitor everyone's location in real-time with guaranteed safety and accuracy."
          color="#4CAF50"
        />
        
        <FeatureCard 
          icon={<Clock size={32} />}
          title="24 Hour History"
          description="No time to track in real-time? Check all missed activities on a single screen. Never worry about missing important movement details again."
          color="#2196F3"
        />
        
        <FeatureCard 
          icon={<AlertTriangle size={32} />}
          title="Speed Alerts"
          description="Set custom speed limits and receive instant alerts when they're exceeded. This feature helps ensure safety for all your tracked vehicles and drivers."
          color="#F44336"
        />
        
        <FeatureCard 
          icon={<Target size={32} />}
          title="Location on Demand"
          description="Whatever mode your tracker is in, fetch real-time position with a single click. Get immediate location updates whenever you need them."
          color="#FF9800"
        />
        
        <FeatureCard 
          icon={<Database size={32} />}
          title="Recover Offline GPS Data"
          description="This device stores location data even when offline and uploads it once connected. Never lose tracking history due to connectivity issues."
          color="#9C27B0"
        />
        
        <FeatureCard 
          icon={<Map size={32} />}
          title="Zone Alerts"
          description="Create custom geographic zones and receive alerts when tracked devices enter or exit these areas. Perfect for monitoring restricted areas."
          color="#00BCD4"
        />
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