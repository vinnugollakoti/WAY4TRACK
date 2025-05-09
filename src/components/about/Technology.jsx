import { Container, Row, Col } from 'react-bootstrap'

const technologies = [
  { name: "GPS Satellite Tracking", percentage: 95 },
  { name: "Cellular Network", percentage: 90 },
  { name: "IoT Integration", percentage: 85 },
  { name: "AI-Powered Analytics", percentage: 80 },
  { name: "Cloud Infrastructure", percentage: 98 }
]

const Technology = () => {
  return (
    <section className="section bg-light" id="technology">
      <Container>
        <Row className="align-items-center">
          <Col lg={5} className="mb-5 mb-lg-0" data-aos="fade-right">
            <h6 className="text-uppercase text-primary fw-bold mb-3">Our Technology</h6>
            <h2 className="display-5 fw-bold mb-4">Cutting-Edge GPS Tracking Systems</h2>
            <p className="lead mb-4">
              We leverage the latest advancements in GPS technology, IoT integration, and data analytics to deliver powerful and reliable tracking solutions.
            </p>
            <p className="mb-5">
              Our proprietary software platform combines real-time tracking with advanced analytics to provide actionable insights that drive business efficiency and security.
            </p>
            <button className="btn btn-primary px-4 py-2">Explore Our Tech Stack</button>
          </Col>
          <Col lg={7} data-aos="fade-left" data-aos-delay="200">
            <div className="position-relative p-4 bg-white rounded shadow-sm">
              {technologies.map((tech, index) => (
                <div className="mb-4" key={index}>
                  <div className="d-flex justify-content-between mb-2">
                    <p className="mb-0 fw-bold">{tech.name}</p>
                    <p className="mb-0 text-primary">{tech.percentage}%</p>
                  </div>
                  <div className="progress" style={{ height: '10px' }}>
                    <div 
                      className="progress-bar" 
                      role="progressbar" 
                      style={{ 
                        width: `${tech.percentage}%`,
                        backgroundColor: 'var(--primary-color)',
                        transition: 'width 1.5s ease-in-out'
                      }} 
                      aria-valuenow={tech.percentage} 
                      aria-valuemin="0" 
                      aria-valuemax="100"
                      data-aos="slide-right"
                      data-aos-duration="1500"
                      data-aos-delay={300 + (index * 100)}
                    ></div>
                  </div>
                </div>
              ))}
              
              <div className="d-flex flex-wrap justify-content-around mt-5">
                <div className="tech-icon-wrapper mb-3 mx-2" data-aos="zoom-in" data-aos-delay="400">
                  <div className="tech-icon d-flex align-items-center justify-content-center bg-light rounded-circle" style={{
                    width: '80px',
                    height: '80px',
                    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
                    transition: 'transform 0.3s ease'
                  }}>
                    <span className="display-5">📡</span>
                  </div>
                  <p className="text-center mt-2 small">GPS</p>
                </div>
                <div className="tech-icon-wrapper mb-3 mx-2" data-aos="zoom-in" data-aos-delay="500">
                  <div className="tech-icon d-flex align-items-center justify-content-center bg-light rounded-circle" style={{
                    width: '80px',
                    height: '80px',
                    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
                    transition: 'transform 0.3s ease'
                  }}>
                    <span className="display-5">☁️</span>
                  </div>
                  <p className="text-center mt-2 small">Cloud</p>
                </div>
                <div className="tech-icon-wrapper mb-3 mx-2" data-aos="zoom-in" data-aos-delay="600">
                  <div className="tech-icon d-flex align-items-center justify-content-center bg-light rounded-circle" style={{
                    width: '80px',
                    height: '80px',
                    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
                    transition: 'transform 0.3s ease'
                  }}>
                    <span className="display-5">📊</span>
                  </div>
                  <p className="text-center mt-2 small">Analytics</p>
                </div>
                <div className="tech-icon-wrapper mb-3 mx-2" data-aos="zoom-in" data-aos-delay="700">
                  <div className="tech-icon d-flex align-items-center justify-content-center bg-light rounded-circle" style={{
                    width: '80px',
                    height: '80px',
                    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
                    transition: 'transform 0.3s ease'
                  }}>
                    <span className="display-5">🔒</span>
                  </div>
                  <p className="text-center mt-2 small">Security</p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <style jsx="true">{`
        .tech-icon-wrapper:hover .tech-icon {
          transform: translateY(-10px);
        }
      `}</style>
    </section>
  )
}

export default Technology