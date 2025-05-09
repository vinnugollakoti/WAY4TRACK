import { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Carousel } from 'react-bootstrap'

const testimonials = [
  {
    name: "Robert Martinez",
    company: "FleetCo Logistics",
    quote: "TrackMaster revolutionized our fleet management. We've reduced fuel costs by 22% and improved delivery times significantly with their real-time tracking solutions.",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    name: "Jennifer Thompson",
    company: "Global Construction Inc.",
    quote: "The asset tracking system has been a game-changer for our construction sites. We can locate equipment instantly and have virtually eliminated theft issues.",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    name: "Ahmed Hassan",
    company: "Rapid Delivery Services",
    quote: "TrackMaster provided us with a custom tracking solution that integrated perfectly with our existing systems. The support team has been exceptional throughout.",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  }
]

const Testimonials = () => {
  const [index, setIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  
  // Auto-play carousel when not hovering
  useEffect(() => {
    if (isHovering) return
    
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [isHovering])

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex)
  }

  return (
    <section className="section bg-white" id="testimonials">
      <Container>
        <Row className="text-center mb-5">
          <Col>
            <h6 className="text-uppercase text-primary fw-bold mb-3" data-aos="fade-up">Testimonials</h6>
            <h2 className="display-5 fw-bold mb-4" data-aos="fade-up" data-aos-delay="100">What Our Clients Say</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={10} data-aos="fade-up" data-aos-delay="200">
            <div 
              className="testimonial-carousel" 
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <Carousel 
                activeIndex={index} 
                onSelect={handleSelect}
                indicators={true}
                controls={true}
                interval={null}
                className="testimonial-carousel"
              >
                {testimonials.map((testimonial, idx) => (
                  <Carousel.Item key={idx}>
                    <Card className="testimonial-card border-0 p-4 p-md-5">
                      <Row className="align-items-center">
                        <Col md={4} className="mb-4 mb-md-0">
                          <div className="testimonial-img position-relative">
                            <div className="position-absolute" style={{
                              width: '160px',
                              height: '160px',
                              backgroundColor: 'var(--primary-color)',
                              opacity: 0.05,
                              borderRadius: '50%',
                              top: '-10px',
                              left: '-10px',
                              zIndex: 0
                            }}></div>
                            <div className="position-relative rounded-circle overflow-hidden" style={{
                              width: '150px',
                              height: '150px',
                              border: '5px solid #fff',
                              boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                              margin: '0 auto',
                              zIndex: 1
                            }}>
                              <img 
                                src={testimonial.image} 
                                alt={testimonial.name} 
                                className="w-100 h-100 object-fit-cover"
                              />
                            </div>
                          </div>
                        </Col>
                        <Col md={8}>
                          <div className="quote-icon mb-3 text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-quote" viewBox="0 0 16 16">
                              <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z"/>
                            </svg>
                          </div>
                          <Card.Text className="testimonial-quote fs-5 mb-4">
                            {testimonial.quote}
                          </Card.Text>
                          <h5 className="mb-1">{testimonial.name}</h5>
                          <p className="text-primary mb-0">{testimonial.company}</p>
                        </Col>
                      </Row>
                    </Card>
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          </Col>
        </Row>
      </Container>
      
      <style jsx="true">{`
        .testimonial-card {
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          border-radius: 15px;
        }
        
        .carousel-indicators {
          bottom: -50px;
        }
        
        .carousel-indicators button {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: var(--gray-300);
        }
        
        .carousel-indicators button.active {
          background-color: var(--primary-color);
        }
        
        .carousel-control-prev,
        .carousel-control-next {
          opacity: 0.7;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: var(--light-color);
          top: 50%;
          transform: translateY(-50%);
        }
        
        .carousel-control-prev {
          left: -25px;
        }
        
        .carousel-control-next {
          right: -25px;
        }
        
        .carousel-control-prev-icon,
        .carousel-control-next-icon {
          filter: none;
          background-image: none;
        }
        
        .carousel-control-prev::after,
        .carousel-control-next::after {
          content: '';
          display: block;
          width: 10px;
          height: 10px;
          border-top: 2px solid var(--primary-color);
          border-right: 2px solid var(--primary-color);
        }
        
        .carousel-control-prev::after {
          transform: rotate(-135deg);
          margin-left: 20px;
        }
        
        .carousel-control-next::after {
          transform: rotate(45deg);
          margin-right: 20px;
        }
        
        @media (max-width: 768px) {
          .carousel-control-prev,
          .carousel-control-next {
            display: none;
          }
        }
      `}</style>
    </section>
  )
}

export default Testimonials