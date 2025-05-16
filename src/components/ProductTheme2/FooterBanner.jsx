import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { MapPin } from 'lucide-react';
import "./FooterBanner.css";

const FooterBanner = ({ footerBanner, product }) => {
  return (
    <section className="cta-section contaier-fluid" style={{width:"100%"}}> 
      <div className="parallax-bg" style={{ backgroundImage: `url(${footerBanner})` }}></div>
      <div className="overlay"></div>
      <div className="cta-inner">
        <Container className="position-relative">
          <Row className="justify-content-center">
            <Col lg={8} md={10} className="text-center">
              <div className="cta-content" data-aos="fade-up">
                <div className="cta-badge">
                  <MapPin size={16} />
                  <span>GPS Tracker</span>
                </div>
                <h2>Protect Your {product?.data?.name} with Advanced GPS Tracking</h2>
                <p>
                  Get real-time location updates, theft alerts, and comprehensive monitoring 
                  for your bike with our state-of-the-art GPS tracking system.
                </p>
                <div className="cta-buttons">
                  <button className="btn btn-light">Learn More</button>
                  <button className="btn btn-outline-light">Contact Us</button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default FooterBanner;
