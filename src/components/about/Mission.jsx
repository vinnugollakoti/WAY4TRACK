import { Container, Row, Col } from 'react-bootstrap'

const Mission = () => {
  return (
    <section className="section bg-light">
      <Container>
        <Row className="align-items-center">
          <Col lg={6} data-aos="fade-right">
            <div className="position-relative">
              <div className="bg-primary rounded-circle position-absolute" style={{
                width: '200px',
                height: '200px',
                bottom: '-20px',
                left: '-20px',
                opacity: 0.1,
                zIndex: 0
              }}></div>
              <div className="bg-accent rounded-circle position-absolute" style={{
                width: '150px',
                height: '150px',
                top: '-30px',
                right: '50px',
                opacity: 0.1,
                zIndex: 0
              }}></div>
              <img 
                src="https://images.pexels.com/photos/7438102/pexels-photo-7438102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Mission" 
                className="img-fluid rounded shadow-lg position-relative"
                style={{ zIndex: 1 }}
              />
            </div>
          </Col>
          <Col lg={6} className="mt-5 mt-lg-0" data-aos="fade-left" data-aos-delay="200">
            <h6 className="text-uppercase text-primary fw-bold mb-3">Our Mission</h6>
            <h2 className="display-5 fw-bold mb-4">Revolutionizing Asset Tracking and Management</h2>
            <p className="lead mb-4">
              At TrackMaster, we're dedicated to providing cutting-edge GPS tracking solutions that empower businesses to make data-driven decisions, enhance operational efficiency, and increase profitability.
            </p>
            <div className="d-flex mb-4">
              <div className="flex-shrink-0">
                <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center" style={{
                  width: '50px',
                  height: '50px'
                }}>
                  <i className="bi bi-geo-alt text-white fs-4"></i>
                </div>
              </div>
              <div className="ms-3">
                <h5>Precision Tracking</h5>
                <p className="mb-0">Real-time location monitoring with industry-leading accuracy</p>
              </div>
            </div>
            <div className="d-flex mb-4">
              <div className="flex-shrink-0">
                <div className="bg-accent rounded-circle d-flex align-items-center justify-content-center" style={{
                  width: '50px',
                  height: '50px'
                }}>
                  <i className="bi bi-shield-check text-white fs-4"></i>
                </div>
              </div>
              <div className="ms-3">
                <h5>Enhanced Security</h5>
                <p className="mb-0">Advanced theft prevention and recovery capabilities</p>
              </div>
            </div>
            <div className="d-flex">
              <div className="flex-shrink-0">
                <div className="bg-secondary rounded-circle d-flex align-items-center justify-content-center" style={{
                  width: '50px',
                  height: '50px'
                }}>
                  <i className="bi bi-graph-up text-white fs-4"></i>
                </div>
              </div>
              <div className="ms-3">
                <h5>Data-Driven Insights</h5>
                <p className="mb-0">Actionable intelligence to optimize routes and reduce costs</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Mission