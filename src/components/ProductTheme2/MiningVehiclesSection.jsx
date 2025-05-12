import { Container, Row, Col } from 'react-bootstrap'

const MiningVehiclesSection = () => {
  return (
    <section className="py-5">
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="mb-5 mb-lg-0" data-aos="fade-left">
            <h2 className="section-title">
              AIS140 GPS systems for <br />
              <span className="highlight">Mining Vehicles</span>
            </h2>
            <p className="mb-3">
              Automotive Industry Standard-140 or AIS-140 is the Intelligent Transport System (ITS) 
              that the government of India have designed to optimize and secure the efficiency of the 
              transport system in India.
            </p>
            <p className="mb-3">
              It is now mandatory for all the Mining transport organisations that the E-permit system 
              has to be integrated with the GPS vehicle tracking system.
            </p>
            <p className="mb-3">
              As per the AP state government guidelines all mining transport vehicles must be integrated 
              with AIS 140 devices in order to maintain real-time location, stoppage reports and other 
              performance information with government servers.
            </p>
          </Col>
          <Col lg={6} data-aos="fade-left" data-aos-delay="200">
            <div className="img-container overflow-hidden rounded-custom shadow-custom">
              <img
                src="./images/mining_1.png"
                alt="AIS140 Mining Vehicles"
                className="img-fluid"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default MiningVehiclesSection