import React from 'react'
import { Card, Row, Col, Badge } from 'react-bootstrap'
import './ProductShowcase.css'

const ProductShowcase = () => {
  const products = [
    {
      id: 1,
      name: "BikeGuard Pro",
      description: "Advanced GPS tracking for bicycles with anti-theft alerts and route history.",
      imageUrl: "https://images.pexels.com/photos/5464239/pexels-photo-5464239.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: ["Real-time GPS", "Anti-theft alarm", "Mobile app", "Weatherproof"],
      isNew: true
    },
    {
      id: 2,
      name: "CarTrack Guardian",
      description: "Complete vehicle security system with real-time monitoring and geofencing.",
      imageUrl: "https://images.pexels.com/photos/5835104/pexels-photo-5835104.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: ["Live tracking", "Geofencing", "Engine diagnostics", "Recovery assistance"],
      isNew: false
    },
    {
      id: 3,
      name: "FleetVision",
      description: "Enterprise fleet management solution with advanced analytics and reporting.",
      imageUrl: "https://images.pexels.com/photos/6667360/pexels-photo-6667360.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: ["Multi-vehicle tracking", "Driver behavior", "Fuel monitoring", "Maintenance alerts"],
      isNew: true
    }
  ]

  return (
    <div className="product-showcase py-5">
      <div className="container">
        <h2 className="section-title text-center mb-5" data-aos="fade-up">
          Our Tracking Solutions
        </h2>
        
        <Row>
          {products.map((product, index) => (
            <Col lg={4} md={6} className="mb-4" key={product.id}>
              <Card 
                className="product-card h-100" 
                data-aos="fade-up" 
                data-aos-delay={index * 100}
              >
                <div className="product-image-wrapper">
                  <Card.Img variant="top" src={product.imageUrl} className="product-image" />
                  {product.isNew && (
                    <Badge bg="danger" className="new-badge">NEW</Badge>
                  )}
                </div>
                <Card.Body>
                  <Card.Title className="product-title">{product.name}</Card.Title>
                  <Card.Text className="product-description">
                    {product.description}
                  </Card.Text>
                  <div className="product-features">
                    {product.features.map((feature, i) => (
                      <Badge bg="light" text="dark" className="feature-badge" key={i}>
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </Card.Body>
                <Card.Footer className="bg-transparent border-0">
                  <button className="btn btn-outline-primary w-100">Learn More</button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
}

export default ProductShowcase