import { useLocation, useNavigate } from "react-router-dom";

const RelatedBlogs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const blogs = location.state?.blogs || [];
  return (
    <div className="blog-grid">
      {blogs.map((blog, index) => (
        <div className="blog-card" key={index}>
          <img
            src={blog.image}
            alt={blog.title || "Blog Image"}
            className="blog-card-image"
          />
          <div className="blog-card-content">
            <h3 className="blog-card-title">{blog.title || "Untitled Blog"}</h3>
          </div>
          <button
            onClick={() =>
              navigate("/blogdetails", { state: { blogDetail: blog } })
            }
          >
            <p>Read More...</p>
          </button>
        </div>
      ))}
    </div>
  );
};

export default RelatedBlogs;
