import { Container, Row, Col } from 'react-bootstrap'

const historyMilestones = [
  {
    year: 2009,
    title: "Company Founded",
    description: "TrackMaster was established with a vision to revolutionize asset tracking for businesses."
  },
  {
    year: 2012,
    title: "First Major Platform Release",
    description: "Launched our flagship GPS tracking platform with advanced mapping capabilities."
  },
  {
    year: 2015,
    title: "International Expansion",
    description: "Opened offices in Europe and Asia to serve our growing global customer base."
  },
  {
    year: 2018,
    title: "AI Integration",
    description: "Incorporated artificial intelligence and machine learning into our analytics platform."
  },
  {
    year: 2021,
    title: "IoT Ecosystem",
    description: "Expanded our offering to include a complete IoT ecosystem for comprehensive asset management."
  },
  {
    year: 2024,
    title: "Next-Gen Platform",
    description: "Launched our latest platform with predictive analytics and enhanced user experience."
  }
]

const History = () => {
  return (
    <section className="section bg-light" id="history">
      <Container>
        <Row className="text-center mb-5">
          <Col>
            <h6 className="text-uppercase text-primary fw-bold mb-3" data-aos="fade-up">Our Journey</h6>
            <h2 className="display-5 fw-bold mb-4" data-aos="fade-up" data-aos-delay="100">TrackMaster History</h2>
            <p className="lead mx-auto" style={{ maxWidth: '700px' }} data-aos="fade-up" data-aos-delay="200">
              From our founding to the present day, we've been dedicated to innovation and excellence in GPS tracking technology.
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="timeline position-relative">
              {historyMilestones.map((milestone, index) => (
                <div 
                  className={`timeline-item d-flex ${index % 2 === 0 ? '' : 'flex-row-reverse'}`} 
                  key={index}
                  data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                  data-aos-delay={100 + (index * 50)}
                >
                  <div className="timeline-content p-4 bg-white rounded shadow-sm" style={{ 
                    width: 'calc(50% - 30px)',
                    position: 'relative',
                    marginBottom: '50px'
                  }}>
                    <div className="year-badge position-absolute bg-primary text-white fw-bold rounded-pill px-3 py-1" style={{
                      top: index % 2 === 0 ? '20px' : 'auto', 
                      bottom: index % 2 === 0 ? 'auto' : '20px', 
                      [index % 2 === 0 ? 'left' : 'right']: '-70px',
                    }}>
                      {milestone.year}
                    </div>
                    <h4 className="mb-3">{milestone.title}</h4>
                    <p className="mb-0">{milestone.description}</p>
                    
                    <div className="timeline-dot position-absolute bg-accent rounded-circle" style={{
                      width: '20px',
                      height: '20px',
                      top: '50%',
                      [index % 2 === 0 ? 'right' : 'left']: '-40px',
                      transform: 'translateY(-50%)',
                      zIndex: 2
                    }}></div>
                    
                    <div className="timeline-connector position-absolute" style={{
                      width: '30px',
                      height: '2px',
                      backgroundColor: 'var(--accent-color)',
                      top: '50%',
                      [index % 2 === 0 ? 'right' : 'left']: '-30px',
                      transform: 'translateY(-50%)',
                      zIndex: 1
                    }}></div>
                  </div>
                </div>
              ))}
              
              <div className="timeline-line position-absolute" style={{
                width: '2px',
                height: '100%',
                backgroundColor: 'var(--gray-300)',
                left: '50%',
                transform: 'translateX(-50%)',
                top: 0,
                zIndex: 0
              }}></div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default History