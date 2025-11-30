import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as pdfjs from "pdfjs-dist/legacy/build/pdf";
import Navbar from "../New_Templates/Navbar";
import "./BlogDetail.css";

pdfjs.GlobalWorkerOptions.workerSrc =
  `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const BlogDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const blog = state?.blog;

  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(true);
  const [parsedContent, setParsedContent] = useState(null);

  useEffect(() => {
    if (!blog?.pdfFile) {
      setLoading(false);
      return;
    }

    const loadPDF = async () => {
      try {
        const pdf = await pdfjs.getDocument(blog.pdfFile).promise;
        let finalHtml = "";

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const text = await page.getTextContent();
          const pageText = text.items.map(t => t.str).join(" ");
          finalHtml += pageText + " ";
        }

        setHtml(finalHtml);
        parseBlogContent(finalHtml);
      } catch (err) {
        console.error("PDF read error:", err);
        setHtml("Failed to load blog content.");
      } finally {
        setLoading(false);
      }
    };

    loadPDF();
  }, [blog]);

  const parseBlogContent = (content) => {
    // Parse the blog content into structured sections for GPS tracking topics
    const sections = {
      introduction: "",
      features: [],
      benefits: [],
      technicalDetails: [],
      conclusion: ""
    };

    const lines = content.split('\n').filter(line => line.trim());
    let currentSection = 'introduction';
    
    lines.forEach(line => {
      const lowerLine = line.toLowerCase();
      
      if (lowerLine.includes('introduction') || lowerLine.includes('overview')) {
        currentSection = 'introduction';
      } else if (lowerLine.includes('features') || lowerLine.includes('key features')) {
        currentSection = 'features';
      } else if (lowerLine.includes('benefits') || lowerLine.includes('advantages')) {
        currentSection = 'benefits';
      } else if (lowerLine.includes('technical') || lowerLine.includes('specifications')) {
        currentSection = 'technicalDetails';
      } else if (lowerLine.includes('conclusion') || lowerLine.includes('summary')) {
        currentSection = 'conclusion';
      } else {
        if (currentSection === 'features' || currentSection === 'benefits' || currentSection === 'technicalDetails') {
          if (line.trim() && (line.match(/^[•\-]/) || line.match(/^\d/))) {
            sections[currentSection].push(line.replace(/^[•\-\d\.\s]+/, '').trim());
          }
        } else if (line.trim()) {
          sections[currentSection] += line + ' ';
        }
      }
    });

    setParsedContent(sections);
  };

  const downloadPDF = () => {
    if (blog?.pdfFile) {
      const link = document.createElement('a');
      link.href = blog.pdfFile;
      link.download = `${blog.title}.pdf` || 'way4track-blog.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const shareBlog = async () => {
    const shareData = {
      title: blog.title,
      text: `Check out this GPS tracking blog: ${blog.title}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        alert('Blog link copied to clipboard!');
      }
    } catch (err) {
      console.log('Error sharing:', err);
    }
  };

  const formatContent = (content) => {
    if (parsedContent) {
      return (
        <div className="blog-content-structured">
          {/* Introduction */}
          {parsedContent.introduction && (
            <div className="content-section">
              <h3 className="section-title">📖 Introduction</h3>
              <div className="section-content">
                <p>{parsedContent.introduction}</p>
              </div>
            </div>
          )}

          {/* Features */}
          {parsedContent.features.length > 0 && (
            <div className="content-section">
              <h3 className="section-title">🚀 Key Features</h3>
              <div className="features-list">
                {parsedContent.features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <span className="feature-icon">✓</span>
                    <span className="feature-text">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Benefits */}
          {parsedContent.benefits.length > 0 && (
            <div className="content-section">
              <h3 className="section-title">💡 Benefits</h3>
              <div className="benefits-list">
                {parsedContent.benefits.map((benefit, index) => (
                  <div key={index} className="benefit-item">
                    <span className="benefit-icon">⭐</span>
                    <span className="benefit-text">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technical Details */}
          {parsedContent.technicalDetails.length > 0 && (
            <div className="content-section">
              <h3 className="section-title">🔧 Technical Specifications</h3>
              <div className="tech-list">
                {parsedContent.technicalDetails.map((detail, index) => (
                  <div key={index} className="tech-item">
                    <span className="tech-icon">⚙️</span>
                    <span className="tech-text">{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Conclusion */}
          {parsedContent.conclusion && (
            <div className="content-section">
              <h3 className="section-title">🎯 Conclusion</h3>
              <div className="section-content">
                <p>{parsedContent.conclusion}</p>
              </div>
            </div>
          )}
        </div>
      );
    }

    // Fallback to simple text formatting
    return (
      <div className="simple-content">
        {content.split('\n').map((paragraph, index) => (
          paragraph.trim() && (
            <p key={index} className="content-paragraph">
              {paragraph}
            </p>
          )
        ))}
      </div>
    );
  };

  if (!blog) {
    return (
      <div className="blog-detail-container">
        <Navbar />
        <div className="error-state">
          <h2>Blog not found</h2>
          <button onClick={() => navigate('/blogs')} className="back-button">
            ← Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-detail-container">
      <Navbar />
      
      <button onClick={() => navigate('/blogs')} className="back-button">
        ← Back to Blogs
      </button>

      <article className="blog-detail">
        <header className="blog-detail-header">
          <div className="blog-meta">
            <span className="blog-category">GPS Technology</span>
            <span className="blog-read-time">5 min read</span>
          </div>
          <h1 className="blog-detail-title">{blog.title}</h1>
          
          
          <div className="blog-author">
            <div className="author-avatar">🛰️</div>
            <div className="author-info">
              <span className="author-name">WAY4TRACK Expert</span>
              <span className="publish-date">Published recently</span>
            </div>
          </div>
        </header>

        

        <div className="blog-content">
          {loading ? (
            <div className="content-loading">
              <div className="loading-spinner"></div>
              <p>Loading blog content...</p>
            </div>
          ) : (
            formatContent(html)
          )}
        </div>

        <div className="blog-hero-image">
          <img 
            src={blog.image} 
            alt={blog.title} 
          />
        </div>

        {blog.description && (
            <div className="blog-description">
              <p>{blog.description}</p>
            </div>
          )}

        <footer className="blog-detail-footer">
          <div className="blog-actions">
            <button className="action-btn download-btn" onClick={downloadPDF}>
              📥 Download PDF
            </button>
            <button className="action-btn share-btn" onClick={shareBlog}>
              📤 Share Blog
            </button>
          </div>
          
          <div className="blog-tags">
            <span className="tag">GPS Tracking</span>
            <span className="tag">Vehicle Security</span>
            <span className="tag">Fleet Management</span>
            <span className="tag">Technology</span>
          </div>
        </footer>
      </article>
    </div>
  );
};

export default BlogDetail;