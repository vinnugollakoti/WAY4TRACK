import { Container, Row, Col } from "react-bootstrap";

const WhyChooseUsSection = ({ chooseImage, chooseTitle, points }) => {
  return (
    <section className="py-5 bg-custom-light rounded my-3 yellowDoodles">
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="mb-5 mb-lg-0" data-aos="fade-right">
            <div className="img-container overflow-hidden rounded-custom shadow-custom">
              <img
                src={chooseImage}
                alt="Support Team"
                className="img-fluid"
              />
            </div>
          </Col>
          <Col lg={6} data-aos="fade-left" data-aos-delay="200">
            <div className="ps-lg-4">
              <p className="text-uppercase fw-bold text-secondary mb-2">
                WHY CHOOSE US?
              </p>
              <h2 className="section-title">
                We bring solutions to make life easier for our clients.
              </h2>
              <ul className="list-unstyled">
                {points.map((point,index) => (
                  <li className="mb-4">
                  <div className="d-flex">
                    <div className="me-3 text-success fs-4">✓</div>
                    <div>
                      <h5 className="fw-bold mb-2">{point.title}</h5>
                      <p>
                        {point.description}
                      </p>
                    </div>
                  </div>
                </li>
                ))}
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default WhyChooseUsSection;
