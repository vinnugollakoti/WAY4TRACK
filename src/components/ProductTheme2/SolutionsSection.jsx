import { Container, Row, Col } from "react-bootstrap";

const SolutionsSection = ({ ourTitle, ourDescription, ourImage }) => {
  return (
    <section className="py-5 rounded my-3 rrr">
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="mb-5 mb-lg-0" data-aos="fade-up">
            <p className="text-uppercase fw-bold text-secondary mb-2">
              OUR SOLUTIONS
            </p>
            <h2 className="section-title">
              {ourTitle ||
                "AIS 140 IRNSS Certified GPS Tracker for commercial vehicles"}
            </h2>
            <p className="mb-3">
              {ourDescription ||
                "An AIS 140 IRNSS Certified GPS Tracker is a perfect fit for commercial vehicles to maximize profits by their operating efficiency and cutting on cost. It may also replace the toll gates in the future."}
            </p>
          </Col>
          <Col lg={6} data-aos="fade-up" data-aos-delay="200">
            <div className="img-container overflow-hidden rounded-custom shadow-custom">
              <img
                src={ourImage || ""} 
                alt="Commercial Vehicles"
                className="img-fluid"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SolutionsSection;
