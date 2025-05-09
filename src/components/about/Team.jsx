import { Container, Row, Col, Card } from 'react-bootstrap'

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "Chief Executive Officer",
    image: "https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    bio: "Sarah brings over 15 years of experience in GPS technology and business leadership."
  },
  {
    name: "Michael Chen",
    role: "Chief Technology Officer",
    image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    bio: "Michael leads our engineering team and drives innovation in our tracking solutions."
  },
  {
    name: "Elena Rodriguez",
    role: "Head of Product",
    image: "https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    bio: "Elena ensures our products meet the highest standards of quality and usability."
  },
  {
    name: "David Williams",
    role: "Customer Success Director",
    image: "https://images.pexels.com/photos/3785104/pexels-photo-3785104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    bio: "David's team is dedicated to ensuring our clients achieve their tracking goals."
  }
]

const Team = () => {
  return (
    <section className="section bg-light" id="team">
      <Container>
        <Row className="text-center mb-5">
          <Col>
            <h6 className="text-uppercase text-primary fw-bold mb-3" data-aos="fade-up">Our Team</h6>
            <h2 className="display-5 fw-bold mb-4" data-aos="fade-up" data-aos-delay="100">Meet The Experts Behind TrackMaster</h2>
            <p className="lead mx-auto" style={{ maxWidth: '700px' }} data-aos="fade-up" data-aos-delay="200">
              Our team of professionals brings decades of combined experience in GPS technology, software development, and customer success.
            </p>
          </Col>
        </Row>
        <Row>
          {teamMembers.map((member, index) => (
            <Col lg={3} md={6} className="mb-4" key={index}>
              <Card className="team-card border-0 h-100" data-aos="fade-up" data-aos-delay={100 + (index * 100)}>
                <div className="position-relative overflow-hidden" style={{ height: '300px' }}>
                  <Card.Img 
                    variant="top" 
                    src={member.image} 
                    alt={member.name}
                    className="img-fluid h-100 w-100 object-fit-cover"
                  />
                  <div className="team-overlay position-absolute w-100 h-100 top-0 start-0 d-flex align-items-center justify-content-center" style={{
                    background: 'linear-gradient(to bottom, rgba(11, 61, 145, 0) 0%, rgba(11, 61, 145, 0.8) 100%)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease'
                  }}>
                    <div className="social-icons d-flex gap-2">
                      <a href="#" className="btn btn-light btn-sm rounded-circle">
                        <i className="bi bi-linkedin"></i>
                      </a>
                      <a href="#" className="btn btn-light btn-sm rounded-circle">
                        <i className="bi bi-twitter"></i>
                      </a>
                      <a href="#" className="btn btn-light btn-sm rounded-circle">
                        <i className="bi bi-envelope"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <Card.Body className="text-center">
                  <Card.Title as="h5" className="mb-1">{member.name}</Card.Title>
                  <div className="text-primary small mb-3">{member.role}</div>
                  <Card.Text>{member.bio}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <style jsx="true">{`
        .team-card:hover .team-overlay {
          opacity: 1 !important;
        }
      `}</style>
    </section>
  )
}

export default Team