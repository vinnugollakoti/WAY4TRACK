import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import './MapSection.css'

const MapSection = () => {
  const [mapLoaded, setMapLoaded] = useState(false)
  
  useEffect(() => {
    // Add Leaflet CSS
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
    link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY='
    link.crossOrigin = ''
    document.head.appendChild(link)
    
    // Set loaded state after a short delay to ensure CSS is applied
    setTimeout(() => {
      setMapLoaded(true)
    }, 500)
    
    return () => {
      document.head.removeChild(link)
    }
  }, [])
  
  const position = [37.7749, -122.4194] // San Francisco coordinates

  return (
    <div className="map-section">
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <div 
              className="map-content"
              data-aos="fade-right"
            >
              <h2 className="section-title">Visit Our Office</h2>
              <div className="divider mb-4"></div>
              <p className="mb-4">
                We're conveniently located in the heart of San Francisco's tech district.
                Stop by for a personalized demonstration of our vehicle tracking solutions.
              </p>
              
              <div className="location-details">
                <div className="location-item">
                  <strong>Address:</strong> 1234 Innovation Drive, Suite 500, San Francisco, CA 94103
                </div>
                <div className="location-item">
                  <strong>Nearby:</strong> Short walk from Market Street BART station
                </div>
                <div className="location-item">
                  <strong>Parking:</strong> Available in the building garage
                </div>
              </div>
              
              <button className="btn btn-primary mt-4">
                Get Directions
              </button>
            </div>
          </div>
          
          <div className="col-lg-6">
            {mapLoaded && (
              <div 
                className="map-container shadow-lg"
                data-aos="fade-left"
              >
                <MapContainer 
                  center={position} 
                  zoom={14} 
                  scrollWheelZoom={false}
                  style={{ height: '100%', width: '100%', borderRadius: '12px' }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={position}>
                    <Popup>
                      <strong>TrackerTech Headquarters</strong><br />
                      1234 Innovation Drive<br />
                      Suite 500<br />
                      San Francisco, CA 94103
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MapSection