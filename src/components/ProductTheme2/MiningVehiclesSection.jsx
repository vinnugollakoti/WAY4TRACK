import { Container, Row, Col } from "react-bootstrap";

const MiningVehiclesSection = (device) => {
  console.log(device, "device11111");
  return (
    <section className="py-5">
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="mb-5 mb-lg-0" data-aos="fade-left">
            <h2 className="section-title">
              {device.device.name}
              {/* AIS140 GPS systems for <br /> */}
              {/* <span className="highlight">Mining Vehicles</span> */}
            </h2>
            {device.device.description.split("*").map((paragraph, index) => (
              <p className="mb-3" key={index}>
                {paragraph.trim()}
              </p>
            ))}
          </Col>
          <Col lg={6} data-aos="fade-left" data-aos-delay="200">
            <div className="img-container overflow-hidden rounded-custom shadow-custom">
              <img
                src={device.device.image}
                alt="AIS140 Mining Vehicles"
                className={device.device.name}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default MiningVehiclesSection;
