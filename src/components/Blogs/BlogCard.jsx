import React from "react";
import "./BlogCard.css";

const BlogCard = ({ blog, onClick }) => {
  const getCategoryFromTitle = (title) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('gps') || lowerTitle.includes('tracking')) return 'GPS Technology';
    if (lowerTitle.includes('vehicle') || lowerTitle.includes('car')) return 'Vehicle Tracking';
    if (lowerTitle.includes('fleet')) return 'Fleet Management';
    if (lowerTitle.includes('iot') || lowerTitle.includes('device')) return 'IoT Devices';
    if (lowerTitle.includes('security') || lowerTitle.includes('safety')) return 'Security';
    return 'Technology';
  };

  const category = getCategoryFromTitle(blog.title);

  return (
    <div className="blog-card" onClick={onClick}>
      <div className="blog-card-image-container">
        <img
          src={blog.image}
          alt={blog.title}
          className="blog-card-image"
        />
        <div className="blog-card-overlay"></div>
        <div className="blog-card-category">{category}</div>
      </div>

      <div className="blog-card-content">
        <h3 className="blog-card-title">{blog.title}</h3>
        <div className="blog-card-meta">
          <span className="blog-read-time">5 min read</span>
          <span className="blog-category-tag">{category}</span>
        </div>
        <div className="blog-card-excerpt">
          {blog.description || "Discover the latest in GPS tracking technology and vehicle security solutions..."}
        </div>
        <button className="blog-read-more-btn">
          Read More
          <span className="btn-arrow">→</span>
        </button>
      </div>
    </div>
  );
};

export default BlogCard;