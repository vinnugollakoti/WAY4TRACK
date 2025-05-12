import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add slight delay for animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="hero bg-dark text-white py-5 position-relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #5e72eb, #ff9190)",
        height: "100vh",
        minHeight: "600px",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Animated background elements */}
      <div
        className="position-absolute w-100 h-100"
        style={{ top: 0, left: 0, zIndex: 0 }}
      >
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="position-absolute rounded-circle"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              width: `${Math.floor(Math.random() * 200) + 50}px`,
              height: `${Math.floor(Math.random() * 200) + 50}px`,
              top: `${Math.floor(Math.random() * 100)}%`,
              left: `${Math.floor(Math.random() * 100)}%`,
              animation: `float ${
                Math.floor(Math.random() * 20) + 15
              }s infinite ease-in-out`,
              animationDelay: `${Math.floor(Math.random() * 5)}s`,
              opacity: 0.1,
              zIndex: 0,
            }}
          />
        ))}
      </div>

      <Container className="position-relative" style={{ zIndex: 1 }}>
        <Row className="align-items-center">
          <Col
            lg={7}
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
            style={{
              transition: "all 1s ease-out",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(-50px)",
            }}
          >
            <h1 className="display-3 fw-bold mb-4" data-aos="fade-right">
              About <span className="text-accent">TrackMaster</span>
            </h1>
            <p
              className="lead mb-4 fs-4"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              Pioneering GPS tracking solutions that revolutionize how
              businesses monitor and optimize their assets in real-time.
            </p>
            <div data-aos="fade-up" data-aos-delay="400">
              <button className="btn btn-accent btn-lg me-3 shadow">
                Our Services
              </button>
              <button className="btn btn-outline-light btn-lg">
                Contact Us
              </button>
            </div>
          </Col>
          <Col lg={5} className="d-none d-lg-block">
            <div
              className="position-relative"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              <div
                className="position-relative"
                style={{
                  width: "100%",
                  height: "400px",
                  backgroundImage: "url('./images/track1.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "10px",
                  backdropFilter: "blur(10px)",
                  overflow: "hidden",
                }}
              >
                {/* Animated map visualization */}
                <div className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center">
                  <div className="world-map-outline">
                    <div
                      className="animate-tracking-dot position-absolute bg-accent"
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        top: "40%",
                        left: "30%",
                        zIndex: 2,
                      }}
                    ></div>
                    <div
                      className="animate-tracking-dot position-absolute bg-accent"
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        top: "60%",
                        left: "70%",
                        zIndex: 2,
                        animationDelay: "1s",
                      }}
                    ></div>
                    <div
                      className="animate-tracking-dot position-absolute bg-accent"
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        top: "30%",
                        left: "60%",
                        zIndex: 2,
                        animationDelay: "2s",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;
