import { Container, Row, Col, Button } from 'react-bootstrap'

const GpsTrackingSection = () => {
  return (
    <section className="py-5 bg-custom-light">
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="mb-5 mb-lg-0 order-lg-2" data-aos="fade-left">
            <div className="ps-lg-4">
              <h2 className="section-title">
                AIS 140 CERTIFIED GPS TRACKING DEVICE
              </h2>
              <p className="mb-4">
                Automotive Industry Standard-140 or AIS-140 is the Intelligent Transport System (ITS) 
                that the government of India have designed to optimize and secure the efficiency of the 
                transport system in India. This design has been proven worldwide to enhance the use of 
                the present transport foundation up to its optimum ability which helps to improve the 
                transport system in its efficacy, value, safety and security. The implementation of 
                AIS 140 is being done all over the country.
              </p>
              <Button variant="success" className="btn-custom rounded-pill">
                Know more
              </Button>
            </div>
          </Col>
          <Col lg={6} data-aos="fade-right" data-aos-delay="200">
            <div className="img-container overflow-hidden rounded-custom shadow-custom">
              <img
                src="./images/ais140_img.png"
                alt="AIS 140 GPS Tracker"
                className="img-fluid"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default GpsTrackingSection