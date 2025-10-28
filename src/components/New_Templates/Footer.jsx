import './Footer.css';
import { useState } from 'react';
import locations from './locations';

function Footer() {
  const [currentMapIndex, setCurrentMapIndex] = useState(0);

  const nextMap = () => {
    setCurrentMapIndex((prevIndex) => 
      prevIndex === locations.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevMap = () => {
    setCurrentMapIndex((prevIndex) => 
      prevIndex === 0 ? locations.length - 1 : prevIndex - 1
    );
  };

  const goToMap = (index) => {
    setCurrentMapIndex(index);
  };

  const handleEmailClick = (email) => {
    window.open(`mailto:${email}`, '_blank');
  };

  const handlePhoneClick = (phone) => {
    const cleanPhone = phone.replace(/[^\d+]/g, '');
    window.open(`tel:${cleanPhone}`, '_blank');
  };

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-content">
          {/* Left Section - Brand & Links */}
          <div className="footer-left">
            <div className="footer-brand">
              <div className="footer-logo">
                <h1>way4track</h1>
              </div>
              
            </div>

            <div className="footer-links">
              <div className="footer-column">
                <h4>Company</h4>
                <a href="#">About Us</a>
                <a href="#">Our Products</a>
                <a href="#">Careers</a>
                <a href="#">Blogs</a>
              </div>

              <div className="footer-column">
                <h4>Support</h4>
                <a href="#">Contact Us</a>
                <a href="#">WhatsApp</a>
                <a href="#">Help Center</a>
                <a href="#">Documentation</a>
              </div>
            </div>
          </div>

          {/* Right Section - Ultra Compact Maps Carousel */}
          <div className="footer-right">
            <div className="maps-carousel-ultra-compact">
              <div className="carousel-header">
                <h3 className="carousel-title">Our Locations</h3>
              </div>
              
              <div className="ultra-compact-carousel">
                <div className="location-selector">
                  <select 
                    value={currentMapIndex} 
                    onChange={(e) => goToMap(parseInt(e.target.value))}
                    className="location-dropdown"
                  >
                    {locations.map((location, index) => (
                      <option key={index} value={index}>
                        {location.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="ultra-compact-map-container">
                  <div className="ultra-compact-map-embed">
                    <iframe
                      title={locations[currentMapIndex].title}
                      src={locations[currentMapIndex].mapEmbed}
                      width="100%"
                      height="100%"
                      style={{ border: 0, borderRadius: '6px' }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>

                <div className="ultra-compact-info">
                  <div className="contact-buttons">
                    <button 
                      className="contact-btn email-btn"
                      onClick={() => handleEmailClick(locations[currentMapIndex].email)}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                      Email
                    </button>
                    <button 
                      className="contact-btn phone-btn"
                      onClick={() => handlePhoneClick(locations[currentMapIndex].phone1)}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                      </svg>
                      Call
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        
        <div className="social-links">
                <a href="#" className="social-link" title="Facebook">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="social-link" title="Instagram">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                  </svg>
                </a>
                <a href="#" className="social-link" title="Twitter">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="#" className="social-link" title="YouTube">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a href="#" className="social-link" title="LinkedIn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
              <div>
        <p className="copyright">
          © 2025 Way4Track. All Rights Reserved. 
          <span className="legal-links">
            <a href="#">Terms Of Use</a> • 
            <a href="#">Privacy Policy</a> • 
            <a href="#">Legal Policies</a>
          </span>
        
          
        </p>
        </div>
      </div>
      
    </footer>
  );
}

export default Footer;