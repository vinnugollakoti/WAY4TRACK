import { Container, Row, Col, Card } from 'react-bootstrap'

const services = [
  {
    icon: "🚚",
    title: "Fleet Management",
    description: "Comprehensive solutions for monitoring vehicle location, driver behavior, fuel consumption, and maintenance schedules to optimize fleet operations.",
    color: "#0B3D91"
  },
  {
    icon: "🏢",
    title: "Asset Tracking",
    description: "Keep track of valuable equipment and assets with real-time location data, usage metrics, and automated inventory management.",
    color: "#1E88E5"
  },
  {
    icon: "👷",
    title: "Workforce Management",
    description: "Enhance field service operations with GPS tracking for employee locations, job assignments, and performance analytics.",
    color: "#FF7F50"
  },
  {
    icon: "🔒",
    title: "Security Solutions",
    description: "Protect vehicles and assets with geofencing, unauthorized movement alerts, and recovery assistance for stolen property.",
    color: "#4CAF50"
  },
  {
    icon: "📊",
    title: "Data Analytics",
    description: "Transform tracking data into actionable insights with advanced reporting, custom dashboards, and predictive analytics.",
    color: "#9C27B0"
  },
  {
    icon: "🔧",
    title: "Custom Integration",
    description: "Seamlessly integrate our GPS tracking solutions with your existing management systems for unified operations.",
    color: "#F44336"
  }
]

const Services = () => {
  return (
    <section className="section bg-white" id="services">
      <Container>
        <Row className="text-center mb-5">
          <Col>
            <h6 className="text-uppercase text-primary fw-bold mb-3" data-aos="fade-up">Our Services</h6>
            <h2 className="display-5 fw-bold mb-4" data-aos="fade-up" data-aos-delay="100">Comprehensive GPS Tracking Solutions</h2>
            <p className="lead mx-auto" style={{ maxWidth: '700px' }} data-aos="fade-up" data-aos-delay="200">
              We offer a wide range of GPS tracking and management services designed to meet the unique needs of businesses across industries.
            </p>
          </Col>
        </Row>
        <Row>
          {services.map((service, index) => (
            <Col lg={4} md={6} className="mb-4" key={index} data-aos="fade-up" data-aos-delay={100 + (index * 100)}>
              <Card className="h-100 p-4 border-0 shadow-sm position-relative overflow-hidden">
                <div className="position-absolute rounded-circle" style={{
                  backgroundColor: service.color,
                  width: '120px',
                  height: '120px',
                  top: '-60px',
                  right: '-60px',
                  opacity: 0.1
                }}></div>
                <Card.Body className="position-relative" style={{ zIndex: 1 }}>
                  <div className="display-5 mb-3">{service.icon}</div>
                  <h4 className="mb-3">{service.title}</h4>
                  <Card.Text>{service.description}</Card.Text>
                  <a href="#" className="btn btn-sm btn-outline-primary mt-3">Learn More</a>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default Services