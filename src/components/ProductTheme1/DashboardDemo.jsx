import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './styles/DashboardDemo.css';

const DashboardDemo = ({ dashboardImage }) => {
  return (
<section className="dashboard-demo rounded my-3 section-padding yellowDoodles">      
<Container>
        <Row className="justify-content-center mb-5">
          <Col lg={10} className="text-center">
            <div 
              className="dashboard-image-container" 
              data-aos="fade-up"
            >
              <img 
                src={dashboardImage} 
                alt="Vehicle Tracking Dashboard" 
                className="dashboard-image img-fluid" 
              />
              <div className="overlay-element element-1">
                <div className="blob-shape"></div>
              </div>
              <div className="overlay-element element-2">
                <div className="blob-shape"></div>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col lg={8} md={10} className="mx-auto">
            <div className="cta-box" data-aos="fade-up">
              <h3>TRY IT TODAY</h3>
              <p>Way4Track offers tracking and monitoring services for your personal vehicle</p>
              <button className="btn btn-accent">Try it today</button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default DashboardDemo;
