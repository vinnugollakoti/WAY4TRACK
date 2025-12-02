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
  const [activeSection, setActiveSection] = useState("introduction");

  useEffect(() => {
    fetchTermsAndConditions();
  }, []);

  const fetchTermsAndConditions = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://sharontelematics.org/api/terms_and_condition/getAllTermsAndCondition");
      
      if (response.status && response.data.length > 0) {
        console.log("TERMS RESPONSE : ", response.data)
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

  const parseTermsContent = (content) => {
    if (!content) return [];
    
    // Parse the content to extract sections
    const sections = [];
    const lines = content.split('\n').filter(line => line.trim());
    let currentSection = { title: "Introduction", content: [] };
    
    lines.forEach((line, index) => {
      // Check if line is a section header (contains numbers or specific keywords)
      if (line.match(/^\d+\./) || 
          line.toLowerCase().includes('section') || 
          line.toLowerCase().includes('clause') ||
          line.match(/^[A-Z][A-Z\s]+$/)) {
        // If we have content in current section, save it
        if (currentSection.content.length > 0) {
          sections.push({ ...currentSection });
        }
        currentSection = { 
          title: line.trim(), 
          content: [],
          id: `section-${sections.length + 1}` 
        };
      } else {
        currentSection.content.push(line.trim());
      }
    });
    
    // Add the last section
    if (currentSection.content.length > 0) {
      sections.push({ ...currentSection });
    }
    
    return sections;
  };

  const getQuickSections = (content) => {
    if (!content) return [];
    
    const quickSections = [];
    const lines = content.split('\n').filter(line => line.trim());
    
    lines.forEach((line) => {
      if (line.match(/^\d+\./)) {
        const match = line.match(/^\d+\.\s*(.+)/);
        if (match) {
          quickSections.push({
            id: `section-${quickSections.length + 1}`,
            title: match[1].substring(0, 50) + (match[1].length > 50 ? '...' : '')
          });
        }
      }
    });
    
    return quickSections;
  };

  const sections = termsData ? parseTermsContent(termsData.termsAndCondition) : [];
  const quickSections = termsData ? getQuickSections(termsData.termsAndCondition) : [];

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

      <div className="terms-main">
        <div className="terms-sidebar">
          <div className="sidebar-card">
            <h3>Quick Navigation</h3>
            <div className="sidebar-sections">
              {quickSections.map((section, index) => (
                <button
                  key={section.id}
                  className={`sidebar-link ${activeSection === section.id ? 'active' : ''}`}
                  onClick={() => {
                    setActiveSection(section.id);
                    document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span className="section-number">{index + 1}</span>
                  <span className="section-title">{section.title}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="sidebar-actions">
            <button onClick={handleDownload} className="sidebar-action-btn">
              <FaDownload />
              Download PDF
            </button>
            <button onClick={handlePrint} className="sidebar-action-btn">
              <FaPrint />
              Print
            </button>
          </div>

          {termsData?.image && (
            <div className="sidebar-image">
              <img 
                src={termsData.image} 
                alt="Terms and Conditions" 
                className="terms-image"
              />
            </div>
          )}
        </div>

        <div className="terms-content">
          <div className="content-header">
            <div className="company-info">
              <h2>WAY4TRACK GPS Tracking Solutions</h2>
              <p className="company-desc">
                These Terms and Conditions govern your use of WAY4TRACK's GPS tracking services, 
                products, and related applications. By using our services, you agree to these terms.
              </p>
            </div>

            <div className="content-actions">
              <button onClick={handleDownload} className="action-btn primary">
                <FaDownload />
                Download
              </button>
              <button onClick={handlePrint} className="action-btn secondary">
                <FaPrint />
                Print
              </button>
            </div>
          </div>

          <div className="terms-disclaimer">
            <div className="disclaimer-icon">
              <FaExclamationTriangle />
            </div>
            <p>
              <strong>Important:</strong> Please read these terms carefully before using our services. 
              If you do not agree with any part of these terms, you must not use our GPS tracking services.
            </p>
          </div>

          <div className="terms-sections">
            {sections.length > 0 ? (
              sections.map((section, index) => (
                <div 
                  key={section.id || `section-${index}`} 
                  id={section.id || `section-${index}`}
                  className="terms-section"
                >
                  <div className="section-header">
                    <span className="section-number">{index + 1}</span>
                    <h3 className="section-title">{section.title}</h3>
                  </div>
                  <div className="section-content">
                    {section.content.map((paragraph, pIndex) => (
                      paragraph.trim() && (
                        <p key={pIndex} className="terms-paragraph">
                          {paragraph}
                        </p>
                      )
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-sections">
                <div className="format-warning">
                  <FaExclamationTriangle />
                  <p>The terms and conditions content could not be parsed into sections.</p>
                </div>
                <div className="full-content">
                  <pre className="plain-text">{termsData?.termsAndCondition}</pre>
                </div>
              </div>
            )}
          </div>

          <div className="terms-acceptance">
            <div className="acceptance-card">
              <h3>Acceptance of Terms</h3>
              <p>
                By accessing and using WAY4TRACK's GPS tracking services, you acknowledge that you 
                have read, understood, and agree to be bound by these Terms and Conditions.
              </p>
              <div className="acceptance-points">
                <div className="acceptance-point">
                  <FaCheckCircle />
                  <span>I have read and understood these terms</span>
                </div>
                <div className="acceptance-point">
                  <FaCheckCircle />
                  <span>I agree to comply with all terms and conditions</span>
                </div>
                <div className="acceptance-point">
                  <FaCheckCircle />
                  <span>I understand my responsibilities as a user</span>
                </div>
              </div>
            </div>
          </div>

          <div className="terms-footer">
            <div className="footer-content">
              <h3>Contact for Clarifications</h3>
              <p>
                If you have any questions about these Terms and Conditions, please contact us:
              </p>
              <div className="contact-info">
                <p><strong>Email:</strong> support@way4track.com</p>
                <p><strong>Phone:</strong> +91 9110 729 757</p>
                <p><strong>Business Hours:</strong> Monday - Saturday, 9:00 AM - 6:00 PM</p>
              </div>
              <p className="footer-note">
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