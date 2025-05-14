import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { WrenchIcon, RouteIcon, MapPinIcon } from 'lucide-react';
import './styles/FeaturesSection.css';

const FeaturesSection = ({ title,applications }) => {
  console.log(applications,"applications")
  const features = [
    {
      icon: <WrenchIcon size={40} />,
      title: "Maintenance Reminder",
      description: "Streamline your assets' maintenance activities with our reminder system. Cut costs and prevent breakdowns."
    },
    {
      icon: <RouteIcon size={40} />,
      title: "Route Playback",
      description: "Review the route traveled by your assets for selected dates and times. Playback speed and stop locations included."
    },
    {
      icon: <MapPinIcon size={40} />,
      title: "Geofence",
      description: "Set boundaries for your vehicle and get notified when it exits the defined area with instant alerts."
    }
  ];

  return (
    <section className="features-section section-padding" id="features">
      <Container>
        <Row className="text-center mb-5">
          <Col>
            <h2 className="section-title" data-aos="fade-up">{title}</h2>
            <div className="title-underline" data-aos="fade-up" data-aos-delay="100"></div>
          </Col>
        </Row>
        <Row>
          {applications.slice(0,3).map((feature, index) => (
            <Col lg={4} md={6} sm={12} key={index} className="mb-4">
              <div 
                className="feature-card" 
                data-aos="fade-up" 
                data-aos-delay={100 + (index * 100)}
              >
                <div className="feature-icon-3">
                  {/* {feature.icon} */}
                  <img src={feature.image} alt={feature.name} className='icons-size-dec' />
                </div>
                <h3 className="feature-title">{feature.name}</h3>
                <p className="feature-description">{feature.desc}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default FeaturesSection;