import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import AddHiring from './AddHiring';

const Hero = () => {
  const backgroundImage = './images/career.jpg';

  return (
    <>
      <div
        className="hero-section position-relative"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '75vh',
          color: '#fff',
          paddingTop: '5rem',
          paddingBottom: '5rem',
          zIndex: 1,
        }}
      >
        {/* Gradient Overlay */}
        <div
          className="overlay"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.9))',
            zIndex: 0,
          }}
        />

        <Container style={{ position: 'relative', zIndex: 1 }}>
          <Row className="align-items-center">
            <Col lg={8} className="mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="hero-title" style={{color:"white"}}>Build Your Future With Us</h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <p className="hero-subtitle">
                  Join our innovative team and be part of creating technology that changes lives.
                  We're not just building products, we're shaping the future.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="hero-buttons"
              >
                <a href="#jobs" className="btn btn-light btn-lg me-3">
                  Explore Roles
                </a>
                <a href="#jobs" className="btn btn-outline-light btn-lg">
                  Learn More
                </a>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </div>

      <div>
        <AddHiring />
      </div>
    </>
  );
};

export default Hero;
