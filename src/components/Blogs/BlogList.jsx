import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../Services/ApiServices";
import BlogCard from "./BlogCard";
import "./BlogList.css";
import Navbar from "../New_Templates/Navbar";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();

  const categories = [
    "all",
    "gps technology",
    "vehicle tracking", 
    "fleet management",
    "iot devices",
    "security",
    "installation guides"
  ];

  useEffect(() => {
    const load = async () => {
      try {
        const response = await ApiService.post("blog/getBlogDetails", {});
        setBlogs(response?.data || []);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || 
      blog.title.toLowerCase().includes(selectedCategory) ||
      (blog.description && blog.description.toLowerCase().includes(selectedCategory));
    
    return matchesSearch && matchesCategory;
  });

  const handleBlogClick = (blog) => {
    navigate("/blogdetails", { state: { blog } });
  };

  if (loading) {
    return (
      <div className="blog-list-container">
        <div className="blog-list-loading">
          <div className="loading-spinner"></div>
          <p>Loading WAY4TRACK Blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-body">
      <Navbar />
    <div className="blog-list-container">
      <div className="blog-list-header">
        <div className="blog-hero-section">
          <h1 className="blog-main-title">WAY4TRACK BLOGS</h1>
          <p className="blog-subtitle">
            Expert insights on GPS tracking, vehicle security, and fleet management technology
          </p>
        </div>
        
        <div className="blog-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>

          <div className="category-filter">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-select"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="blog-stats">
        <div className="stat-item">
          <span className="stat-number">{blogs.length}</span>
          <span className="stat-label">Articles</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{categories.length - 1}</span>
          <span className="stat-label">Categories</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">5 min</span>
          <span className="stat-label">Avg. Read</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">24/7</span>
          <span className="stat-label">Support</span>
        </div>
      </div>

      {filteredBlogs.length === 0 ? (
        <div className="no-blogs-found">
          <div className="no-blogs-icon">📡</div>
          <h3>No blogs found</h3>
          <p>Try adjusting your search terms or category filter</p>
        </div>
      ) : (
        <>
          <div className="results-info">
            <span className="results-count">
              Showing {filteredBlogs.length} of {blogs.length} articles
              {selectedCategory !== 'all' && ` in "${selectedCategory}"`}
            </span>
          </div>
          
          <div className="blog-grid">
            {filteredBlogs.map(blog => (
              <BlogCard
                key={blog.id}
                blog={blog}
                onClick={() => handleBlogClick(blog)}
              />
            ))}
          </div>
        </>
      )}
    </div>
    </div>
  );
};

export default BlogList;