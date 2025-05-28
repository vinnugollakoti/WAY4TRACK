import { Container, Row, Col, Card } from "react-bootstrap";

const FeaturesSection = (amenities) => {
  console.log(amenities, "applicationnfjeianfuy");
  const features = [
    {
      icon: "bi bi-geo-alt-fill",
      title: "Live Location Tracking",
      description: "Real-time tracking with GEO fencing.",
    },
    {
      icon: "bi bi-speedometer2",
      title: "Over Speed",
      description: "Get Over Speed Alerts on Your Smartphone.",
    },
    {
      icon: "bi bi-map",
      title: "Geofence",
      description: "Get powerful insights with Geofence Analytics.",
    },
    {
      icon: "bi bi-clock-history",
      title: "History View",
      description: "Entire data of vehicle history is available.",
    },
  ];

  return (
    <section className="py-5 bg-custom-light">
      <Container>
        <Row className="mb-5">
          <Col className="text-center" data-aos="fade-up">
            <h2 className="section-title">Key Features</h2>
            <p className="section-subtitle">
              Our GPS tracking system offers advanced features for complete
              vehicle monitoring
            </p>
          </Col>
        </Row>
        <Row>
          {amenities.amenities
            .filter((f) => f.image && f.name && f.desc)
            .map((feature, index) => (
              <Col
                md={4}
                lg={3}
                key={index}
                className="mb-4"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <Card className="h-100 border-0 shadow-custom text-center hover-lift">
                  <Card.Body className="p-4">
                    <div className="feature-icon-container mb-3">
                      {/* <i className={`${feature.icon} text-success fs-1`}></i> */}
                      <img src={feature.image} alt={feature.name} />
                    </div>
                    <h4 className="fw-bold mb-3 text-primary">
                      {feature.name}
                    </h4>
                    <p className="mb-0 text-secondary">{feature.desc}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
    </section>
  );
};

export default FeaturesSection;
