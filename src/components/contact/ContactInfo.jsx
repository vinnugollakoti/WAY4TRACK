import React from 'react'
import { Card } from 'react-bootstrap'
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin
} from 'react-icons/fa'
import './ContactInfo.css'

const ContactInfo = () => {
  return (
    <div className="contact-info">
      <h2 className="section-title">Contact Information</h2>
      <div className="divider mb-4"></div>
      
      <div className="info-cards">
        <Card className="info-card mb-4" data-aos="fade-up" data-aos-delay="100">
          <Card.Body className="d-flex">
            <div className="info-icon">
              <FaMapMarkerAlt />
            </div>
            <div>
              <h5>Our Location</h5>
              <p className="mb-0">
                1234 Innovation Drive<br />
                Suite 500<br />
                San Francisco, CA 94103
              </p>
            </div>
          </Card.Body>
        </Card>
        
        <Card className="info-card mb-4" data-aos="fade-up" data-aos-delay="200">
          <Card.Body className="d-flex">
            <div className="info-icon">
              <FaPhone />
            </div>
            <div>
              <h5>Phone Number</h5>
              <p className="mb-1">Sales: <a href="tel:+14155557890">+1 (415) 555-7890</a></p>
              <p className="mb-0">Support: <a href="tel:+14155557891">+1 (415) 555-7891</a></p>
            </div>
          </Card.Body>
        </Card>
        
        <Card className="info-card mb-4" data-aos="fade-up" data-aos-delay="300">
          <Card.Body className="d-flex">
            <div className="info-icon">
              <FaEnvelope />
            </div>
            <div>
              <h5>Email Address</h5>
              <p className="mb-1">Info: <a href="mailto:info@trackertech.com">info@trackertech.com</a></p>
              <p className="mb-0">Support: <a href="mailto:support@trackertech.com">support@trackertech.com</a></p>
            </div>
          </Card.Body>
        </Card>
        
        <Card className="info-card mb-4" data-aos="fade-up" data-aos-delay="400">
          <Card.Body className="d-flex">
            <div className="info-icon">
              <FaClock />
            </div>
            <div>
              <h5>Business Hours</h5>
              <p className="mb-1">Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p className="mb-0">Saturday: 10:00 AM - 2:00 PM</p>
            </div>
          </Card.Body>
        </Card>
      </div>
      
      <div className="social-media" data-aos="fade-up" data-aos-delay="500">
        <h5>Connect With Us</h5>
        <div className="social-icons">
          <a href="#" className="social-icon">
            <FaFacebook />
          </a>
          <a href="#" className="social-icon">
            <FaTwitter />
          </a>
          <a href="#" className="social-icon">
            <FaInstagram />
          </a>
          <a href="#" className="social-icon">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </div>
  )
}

export default ContactInfo