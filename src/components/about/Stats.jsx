import { useState, useEffect, useRef } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import CountUp from 'react-countup'

const Stats = () => {
  const [inView, setInView] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.disconnect()
      }
    }
  }, [])

  const stats = [
    { value: 50000, label: "Active GPS Devices", suffix: "+", duration: 2.5 },
    { value: 120, label: "Countries Covered", suffix: "+", duration: 2 },
    { value: 98, label: "Customer Satisfaction", suffix: "%", duration: 3 },
    { value: 12, label: "Years Experience", suffix: "+", duration: 1.5 }
  ]

  return (
    <section ref={sectionRef} className="section py-5" style={{
      background: 'linear-gradient(135deg, #0B3D91 0%, #1E88E5 100%)',
      color: 'white'
    }}>
      <Container>
        <Row>
          {stats.map((stat, index) => (
            <Col md={3} sm={6} className="text-center mb-4 mb-md-0" key={index} data-aos="zoom-in" data-aos-delay={index * 100}>
              <div className="p-4">
                <div className="display-3 fw-bold mb-2 d-flex align-items-center justify-content-center">
                  {inView ? (
                    <>
                      <CountUp
                        start={0}
                        end={stat.value}
                        duration={stat.duration}
                        separator=","
                      />
                      <span>{stat.suffix}</span>
                    </>
                  ) : (
                    <>0</>
                  )}
                </div>
                <p className="mb-0 fs-5">{stat.label}</p>
              </div>
              {index < stats.length - 1 && (
                <div className="d-none d-md-block position-absolute" style={{
                  height: '50px',
                  width: '1px',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  right: '0',
                  top: '50%',
                  transform: 'translateY(-50%)'
                }}></div>
              )}
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default Stats