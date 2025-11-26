import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaPaperPlane } from "react-icons/fa";
import Navbar from "../New_Templates/Navbar";
import Footer from "../New_Templates/Footer";
import locations from './locations';
import "./Contact.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    branch: "Head Quarters Visakhapatnam"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        branch: "Head Quarters Visakhapatnam"
      });
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 2000);
  };

  return (
    <div className="contact-us-container">
      <Navbar />
      
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <h1>Get in Touch</h1>
          <p>We're here to help you with all your GPS tracking needs. Reach out to our sales team for expert assistance.</p>
        </div>
      </section>

      <div className="contact-main-content">
        {/* Contact Form Section */}
        <section className="contact-form-section">
          <div className="form-container">
            <div className="form-header">
              <h2>Contact Our Sales Team</h2>
              <p>Fill out the form below and we'll get back to you within 24 hours</p>
            </div>

            {submitStatus === "success" && (
              <div className="success-message">
                <FaPaperPlane className="success-icon" />
                <div>
                  <h3>Thank You!</h3>
                  <p>Your message has been sent successfully. Our team will contact you shortly.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="branch">Preferred Branch</label>
                  <select
                    id="branch"
                    name="branch"
                    value={formData.branch}
                    onChange={handleInputChange}
                  >
                    {locations.map((location, index) => (
                      <option key={index} value={location.title}>
                        {location.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  placeholder="What is this regarding?"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="6"
                  placeholder="Tell us about your GPS tracking requirements..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="loading-spinner"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="btn-icon" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </section>

        {/* Company Locations Section */}
        <section className="locations-section">
          <div className="locations-header">
            <h2>Our Offices Across India</h2>
            <p>Visit us at any of our branches for personalized GPS tracking solutions</p>
          </div>

          <div className="locations-grid">
            {locations.map((location, index) => (
              <div key={index} className="location-card">
                <div className="location-header">
                  <FaMapMarkerAlt className="location-icon" />
                  <h3>{location.title}</h3>
                </div>
                
                <div className="location-content">
                  <div className="location-details">
                    <div className="detail-item">
                      <FaMapMarkerAlt className="detail-icon" />
                      <span className="detail-text">{location.address}</span>
                    </div>
                    
                    <div className="detail-item">
                      <FaPhone className="detail-icon" />
                      <div className="phone-numbers">
                        <span className="detail-text">{location.phone1}</span>
                        <span className="detail-text">{location.phone2}</span>
                      </div>
                    </div>
                    
                    <div className="detail-item">
                      <FaEnvelope className="detail-icon" />
                      <span className="detail-text">{location.email}</span>
                    </div>
                  </div>

                  <div className="location-map">
                    <iframe
                      src={location.mapEmbed}
                      width="100%"
                      height="200"
                      style={{ border: 0, borderRadius: "8px" }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Location map for ${location.title}`}
                    ></iframe>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Info Banner */}
        <section className="contact-info-banner">
          <div className="banner-content">
            <div className="info-item">
              <FaPhone className="info-icon" />
              <div>
                <h3 className="info-item-h3">Call Us</h3>
                <p>+91 9110 729 757</p>
                <span>24/7 Customer Support</span>
              </div>
            </div>
            
            <div className="info-item">
              <FaEnvelope className="info-icon" />
              <div>
                <h3 className="info-item-h3">Email Us</h3>
                <p>support@way4track.com</p>
                <span>Quick Response Guaranteed</span>
              </div>
            </div>
            
            <div className="info-item">
              <FaClock className="info-icon" />
              <div>
                <h3 className="info-item-h3">Business Hours</h3>
                <p>Monday - Saturday</p>
                <span>9:00 AM - 6:00 PM</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default ContactUs;