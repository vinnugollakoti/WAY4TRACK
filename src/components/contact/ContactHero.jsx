import React from 'react'
import './ContactHero.css'

const ContactHero = () => {
  return (
    <div className="contact-hero">
      <div className="hero-overlay"></div>
      <div className="container position-relative h-100 d-flex flex-column justify-content-center">
        <div className="row">
          <div className="col-lg-8 text-white">
            <h1 className="hero-title animated-fadeInUp">
              Get in <span className="text-gradient-hero">Touch</span>
            </h1>
            <div className="divider mb-4 animated-fadeInUp" style={{ animationDelay: '0.2s' }}></div>
            <p className="hero-subtitle animated-fadeInUp" style={{ animationDelay: '0.4s' }}>
              We're here to help with all your vehicle tracking needs. 
              Reach out to our team of experts for personalized assistance.
            </p>
            <div className="mt-4 animated-fadeInUp" style={{ animationDelay: '0.6s' }}>
              <button 
                className="btn btn-secondary btn-lg me-3 shadow-lg"
                onClick={() => document.querySelector('.contact-form').scrollIntoView({ behavior: 'smooth' })}
              >
                Contact Us Now
              </button>
              <button 
                className="btn btn-outline-light btn-lg"
                onClick={() => document.querySelector('.product-showcase').scrollIntoView({ behavior: 'smooth' })}
              >
                View Products
              </button>
            </div>
          </div>
        </div>
        
        {/* <div className="floating-devices">
          <div className="floating-device animated-float" style={{ animationDelay: '0s' }}>
            <img src="https://images.pexels.com/photos/4482932/pexels-photo-4482932.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Tracking device" />
          </div>
          <div className="floating-device animated-float" style={{ animationDelay: '2s' }}>
            <img src="https://images.pexels.com/photos/5464239/pexels-photo-5464239.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Tracking device on bike" />
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default ContactHero