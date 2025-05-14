import { useLocation, useNavigate } from "react-router-dom";

const RelatedBlogs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const blogs = location.state?.blogs || [];
  return (
<>
   <div style={{padding:"50px 0px"}}>
   <div className="container">
  <div className="row">
    {blogs.map((blog, index) => (
      <div className="col-md-4 mb-4" key={index}>
        <div className="blog-card h-100">
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
      </div>
    ))}
  </div>
</div>
</div> 
</>

  );
};

export default RelatedBlogs;
