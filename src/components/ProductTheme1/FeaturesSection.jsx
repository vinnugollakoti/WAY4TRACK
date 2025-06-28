import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './styles/FeaturesSection.css';

const FeaturesSection = ({ title, applications = [] }) => (
  <section className="features-section rounded my-3 section-padding" id="features">
    <Container>
      <Row className="text-center mb-5">
        <Col>
          <h2 className="section-title" data-aos="fade-up">{title}</h2>
          <div
            className="title-underline"
            data-aos="fade-up"
            data-aos-delay="100"
          />
        </Col>
      </Row>

      <Row>
        {applications.map((feature, index) => (
          <Col
            key={index}
            lg={4}          /* 3‑up on desktop   */
            md={6}          /* 2‑up on tablets   */
            sm={12}         /* 1‑up on phones    */
            className="mb-4"
          >
            <div
              className="feature-card"
              data-aos="fade-up"
              data-aos-delay={100 + index * 100}
            >
              <div className="feature-icon-3">
                <img
                  src={feature.image}
                  alt={feature.name}
                  className="icons-size-dec"
                />
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

export default FeaturesSection;
