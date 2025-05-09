import { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
})

const officeLocations = [
  { name: "Headquarters", coordinates: [40.7128, -74.0060], description: "New York City, USA" },
  { name: "European Office", coordinates: [51.5074, -0.1278], description: "London, UK" },
  { name: "Asia-Pacific Office", coordinates: [1.3521, 103.8198], description: "Singapore" },
  { name: "Middle East Office", coordinates: [25.2048, 55.2708], description: "Dubai, UAE" }
]

const Coverage = () => {
  useEffect(() => {
    // Handle leaflet container issues
    const resizeObserver = new ResizeObserver(() => {
      window.dispatchEvent(new Event('resize'))
    })
    
    const mapContainer = document.querySelector('.leaflet-container')
    if (mapContainer) {
      resizeObserver.observe(mapContainer)
    }
    
    return () => {
      if (mapContainer) {
        resizeObserver.unobserve(mapContainer)
      }
    }
  }, [])
  
  return (
    <section className="section bg-white" id="coverage">
      <Container>
        <Row className="align-items-center">
          <Col lg={5} className="mb-5 mb-lg-0" data-aos="fade-right">
            <h6 className="text-uppercase text-primary fw-bold mb-3">Global Coverage</h6>
            <h2 className="display-5 fw-bold mb-4">Tracking Solutions Worldwide</h2>
            <p className="lead mb-4">
              Our GPS tracking technology operates across all continents, providing reliable service no matter where your assets are located.
            </p>
            
            <ul className="list-unstyled mb-5">
              {officeLocations.map((office, index) => (
                <li className="d-flex align-items-center mb-3" key={index} data-aos="fade-up" data-aos-delay={100 * index}>
                  <div className="bg-primary rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center" style={{
                    width: '40px',
                    height: '40px',
                    color: 'white'
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                      <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/>
                      <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                    </svg>
                  </div>
                  <div className="ms-3">
                    <h6 className="mb-0">{office.name}</h6>
                    <p className="mb-0 text-muted">{office.description}</p>
                  </div>
                </li>
              ))}
            </ul>
            
            <div className="bg-light rounded p-4" data-aos="fade-up">
              <h5 className="mb-3">Need Global Tracking?</h5>
              <p className="mb-3">Our solutions work everywhere, from dense urban environments to remote wilderness areas, keeping you connected to your assets at all times.</p>
              <button className="btn btn-accent">Get Coverage Details</button>
            </div>
          </Col>
          <Col lg={7} data-aos="fade-left" data-aos-delay="200">
            <div className="map-container rounded overflow-hidden shadow" style={{ 
              height: '500px',
              position: 'relative',
              zIndex: 1 
            }}>
              <div style={{ height: '100%', width: '100%' }}>
                <MapContainer 
                  center={[20, 0]} 
                  zoom={2} 
                  style={{ height: '100%', width: '100%' }}
                  scrollWheelZoom={false}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  />
                  {officeLocations.map((office, index) => (
                    <Marker 
                      position={office.coordinates}
                      key={index}
                    >
                      <Popup>
                        <strong>{office.name}</strong><br />
                        {office.description}
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
              <div className="coverage-overlay position-absolute" style={{
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle at center, rgba(30, 136, 229, 0.2) 0%, transparent 70%)',
                pointerEvents: 'none',
                zIndex: 400
              }}></div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Coverage