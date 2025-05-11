import React from 'react';

const BlogCard = ({ blog }) => {
  console.log("blog",blog)
  return (
    <div className="blog-card">
      <img 
        src={blog.homeBanner} 
        alt={blog.blogTitle || "Blog Image"} 
        className="blog-card-image"
      />
      <div className="blog-card-content">
        <h3 className="blog-card-title">  
          {blog.name || "Untitled Blog"}
        </h3>
      </div>
    </div>
  );
};


export default BlogCard;