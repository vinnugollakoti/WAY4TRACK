import React, { useState, useEffect } from "react";
import { FaFileContract, FaDownload, FaPrint, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import ApiService from "../Services/ApiServices";
import Navbar from "../New_Templates/Navbar";
import Footer from "../New_Templates/Footer";
import "./terms.css";
import axios from "axios";

const TermsAndConditions = () => {
  const [termsData, setTermsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTermsAndConditions();
  }, []);

  const fetchTermsAndConditions = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://sharontelematics.org/api/terms_and_condition/getAllTermsAndCondition");
      
      if (response.data && response.data.length > 0) {
        console.log("TERMS RESPONSE : ", response.data);
        setTermsData(response.data[0]);
      } else {
        throw new Error("No terms and conditions found");
      }
    } catch (err) {
      console.error("Error fetching terms and conditions:", err);
      setError("Failed to load terms and conditions. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (termsData?.termsAndCondition) {
      const element = document.createElement("a");
      const file = new Blob([termsData.termsAndCondition], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = "WAY4TRACK_Terms_and_Conditions.txt";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="terms-container">
        <Navbar />
        <div className="terms-loading">
          <div className="loading-spinner"></div>
          <h2>Loading Terms and Conditions</h2>
          <p>Please wait while we fetch the latest terms...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="terms-container">
        <Navbar />
        <div className="terms-error">
          <FaExclamationTriangle className="error-icon" />
          <h2>Unable to Load Terms</h2>
          <p>{error}</p>
          <button onClick={fetchTermsAndConditions} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="terms-container">
      <Navbar />
      
      <div className="terms-header">
        <div className="header-content">
          <div className="header-icon">
            <FaFileContract />
          </div>
          <h1 className="terms-h1">Terms and Conditions</h1>
          <p className="subtitle">Effective Date: {new Date().toLocaleDateString()}</p>
          <div className="header-badge">
            <span className="badge">
              <FaCheckCircle className="badge-icon" />
              Latest Version
            </span>
          </div>
        </div>
      </div>

      <div className="terms-main-simple">
        <div className="terms-content-simple">
          <div className="content-header-simple">
            <div className="company-info-simple">
              <h2>WAY4TRACK GPS Tracking Solutions</h2>
              <p className="company-desc-simple">
                These Terms and Conditions govern your use of WAY4TRACK's GPS tracking services, 
                products, and related applications. By using our services, you agree to these terms.
              </p>
            </div>

            <div className="content-actions-simple">
              <button onClick={handleDownload} className="action-btn-simple primary-simple">
                <FaDownload />
                Download
              </button>
              <button onClick={handlePrint} className="action-btn-simple secondary-simple">
                <FaPrint />
                Print
              </button>
            </div>
          </div>

          <div className="terms-disclaimer-simple">
            <div className="disclaimer-icon-simple">
              <FaExclamationTriangle />
            </div>
            <p>
              <strong>Important:</strong> Please read these terms carefully before using our services. 
              If you do not agree with any part of these terms, you must not use our GPS tracking services.
            </p>
          </div>

          <div className="terms-content-wrapper">
            {termsData?.image && (
              <div className="terms-image-container">
                <img 
                  src={termsData.image} 
                  alt="Terms and Conditions" 
                  className="terms-image-main"
                />
              </div>
            )}

            <div className="terms-text-content">
              <pre className="terms-text">
                {termsData?.termsAndCondition}
              </pre>
            </div>
          </div>

          <div className="terms-acceptance-simple">
            <div className="acceptance-card-simple">
              <h3>Acceptance of Terms</h3>
              <p>
                By accessing and using WAY4TRACK's GPS tracking services, you acknowledge that you 
                have read, understood, and agree to be bound by these Terms and Conditions.
              </p>
              <div className="acceptance-points-simple">
                <div className="acceptance-point-simple">
                  <FaCheckCircle />
                  <span>I have read and understood these terms</span>
                </div>
                <div className="acceptance-point-simple">
                  <FaCheckCircle />
                  <span>I agree to comply with all terms and conditions</span>
                </div>
                <div className="acceptance-point-simple">
                  <FaCheckCircle />
                  <span>I understand my responsibilities as a user</span>
                </div>
              </div>
            </div>
          </div>

          <div className="terms-footer-simple">
            <div className="footer-content-simple">
              <h3>Contact for Clarifications</h3>
              <p>
                If you have any questions about these Terms and Conditions, please contact us:
              </p>
              <div className="contact-info-simple">
                <p><strong>Email:</strong> support@way4track.com</p>
                <p><strong>Phone:</strong> +91 9110 729 757</p>
                <p><strong>Business Hours:</strong> Monday - Saturday, 9:00 AM - 6:00 PM</p>
              </div>
              <p className="footer-note-simple">
                These Terms and Conditions were last updated on {new Date().toLocaleDateString()}.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsAndConditions;