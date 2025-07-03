import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./styles/HeroSection.css";
import { MapPin } from "lucide-react";

const HeroSection = ({ title, description, heroImage, mobileAppImage }) => {
  return (
    <section className="hero-section">
      <Container>
        <Row className="align-items-center">
          <Col lg={6} md={12} className="hero-content" data-aos="fade-right">
            <div className="hero-badge">
              <MapPin size={16} />
              <span style={{ color: "white" }}>Premium GPS Technology</span>
            </div>
            <h1 className="hero-title">{title}</h1>
            <p className="hero-description">{description}</p>
            <div className="hero-buttons">
              <button className="btn btn-primary me-3">Learn More</button>
              <button className="btn btn-outline-primary">View Demo</button>
            </div>
          </Col>

          <Col
            lg={6}
            md={12}
            className="hero-image-container"
            data-aos="zoom-in"
            data-aos-delay="300"
          >
            <div style={{ position: 'relative', height: '70%'}}>
              <img
                src={heroImage}
                alt="GPS Tracking Map"
                className="hero-main-image"
                style={{width: '100%',
                  height: '100%',
                  objectFit: 'fill'}}
              />
              <div className="pulse-effect"></div>
              <div className="location-marker location-1">
                <div className="pin-dot"></div>
                <div className="pin-ripple"></div>
              </div>
              <div className="location-marker location-2">
                <div className="pin-dot"></div>
                <div className="pin-ripple"></div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
