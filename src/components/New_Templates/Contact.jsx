import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaPaperPlane, FaStar } from "react-icons/fa";
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
  
  const [reviewData, setReviewData] = useState({
    review: "",
    rating: 0,
    hoverRating: 0
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewSubmitStatus, setReviewSubmitStatus] = useState(null);
  const [validationErrors, setValidationErrors] = useState({
    rating: false,
    review: false
  });

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

  const validateReviewForm = () => {
    const errors = {
      rating: reviewData.rating === 0,
      review: reviewData.review.trim() === ""
    };
    
    setValidationErrors(errors);
    return !errors.rating && !errors.review;
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateReviewForm()) {
      // Scroll to error
      setTimeout(() => {
        if (reviewData.rating === 0) {
          document.querySelector('.star-rating')?.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        } else if (reviewData.review.trim() === "") {
          document.querySelector('#review')?.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }
      }, 100);
      return;
    }
    
    setIsSubmittingReview(true);
    
    try {
      const response = await fetch("https://sharontelematics.org/api/review/handleReviewDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          review: reviewData.review,
          rating: reviewData.rating
        })
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setReviewSubmitStatus("success");
        setReviewData({
          review: "",
          rating: 0,
          hoverRating: 0
        });
        setValidationErrors({
          rating: false,
          review: false
        });
      } else {
        setReviewSubmitStatus("error");
        console.error("Review submission failed:", result);
      }
    } catch (error) {
      setReviewSubmitStatus("error");
      console.error("Error submitting review:", error);
    } finally {
      setIsSubmittingReview(false);
      // Reset status after 5 seconds
      setTimeout(() => setReviewSubmitStatus(null), 5000);
    }
  };

  const handleStarClick = (rating) => {
    setReviewData(prev => ({ ...prev, rating }));
    setValidationErrors(prev => ({ ...prev, rating: false }));
  };

  const handleStarHover = (rating) => {
    setReviewData(prev => ({ ...prev, hoverRating: rating }));
  };

  const handleStarLeave = () => {
    setReviewData(prev => ({ ...prev, hoverRating: 0 }));
  };

  const handleReviewChange = (e) => {
    setReviewData(prev => ({ ...prev, review: e.target.value }));
    setValidationErrors(prev => ({ ...prev, review: false }));
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
        {/* New Review Section */}
        <section className="review-section">
          <div className="review-container">
            <div className="review-header">
              <h2>Share Your Experience</h2>
              <p>Tell us about your experience with Way4Track GPS solutions</p>
            </div>

            {reviewSubmitStatus === "success" && (
              <div className="review-success-message">
                <FaPaperPlane className="success-icon" />
                <div>
                  <h3>Thank You for Your Feedback!</h3>
                  <p>Your review has been submitted successfully.</p>
                </div>
              </div>
            )}

            {reviewSubmitStatus === "error" && (
              <div className="review-error-message">
                <div>
                  <h3>Submission Failed</h3>
                  <p>There was an error submitting your review. Please try again.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleReviewSubmit} className="review-form">
              <div className="review-form-group">
                <label htmlFor="rating">Your Rating *</label>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      className="star-btn"
                      onClick={() => handleStarClick(star)}
                      onMouseEnter={() => handleStarHover(star)}
                      onMouseLeave={handleStarLeave}
                    >
                      <FaStar
                        className={`star-icon ${
                          star <= (reviewData.hoverRating || reviewData.rating)
                            ? "star-filled"
                            : "star-empty"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="rating-text">
                    {reviewData.rating > 0 ? `${reviewData.rating} out of 5` : "Select a rating"}
                  </span>
                </div>
                {validationErrors.rating && (
                  <div className="error-message">
                    Please select a star rating
                  </div>
                )}
              </div>

              <div className="review-form-group">
                <label htmlFor="review">Your Review *</label>
                <textarea
                  id="review"
                  name="review"
                  value={reviewData.review}
                  onChange={handleReviewChange}
                  required
                  rows="5"
                  placeholder="Share your experience with Way4Track's GPS tracking services and website..."
                  maxLength="500"
                  className={validationErrors.review ? 'error-input' : ''}
                ></textarea>
                <div className="char-count">
                  {reviewData.review.length}/500 characters
                </div>
                {validationErrors.review && (
                  <div className="error-message">
                    Please enter your review
                  </div>
                )}
              </div>

              <button 
                type="submit" 
                className="submit-review-btn"
                disabled={isSubmittingReview}
              >
                {isSubmittingReview ? (
                  <>
                    <div className="loading-spinner"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="btn-icon" />
                    Submit Review
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