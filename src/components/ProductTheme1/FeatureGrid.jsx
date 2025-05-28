import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Wifi, Battery, Navigation, AlarmPlus as Alarm, Clock, History, Map, AlertTriangle } from 'lucide-react';
import './styles/FeatureGrid.css';

const FeatureGrid = (amenities) => {


  console.log(amenities,"amenities feature grid")
  return (
    <section className="feature-grid-section section-padding">
      <Container>
        <Row className="mb-5">
          <Col lg={12} className="mx-auto text-center">
            <h2 className="section-title" data-aos="fade-up">Key Tracking Features</h2>
            <div className="title-underline" data-aos="fade-up" data-aos-delay="100"></div>
            <p className="section-description" data-aos="fade-up" data-aos-delay="200">
              Explore our comprehensive set of tracking features designed to keep your bike safe and secure at all times.
            </p>
          </Col>
        </Row>
        <Row>
          {amenities.amenities.map((feature, index) => (
            <Col lg={4} md={6} sm={12}key={index} className="mb-4">
              <div 
                className="feature-card" 
                data-aos="fade-up"
                data-aos-delay={index * 50}
              >
                <div className="feature-icon-3">
                  {/* {feature.icon} */}
                  <img src={feature.image} alt={feature.name} />
                </div>
                <h4>{feature.name}</h4>
                <p>{feature.desc}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default FeatureGrid;