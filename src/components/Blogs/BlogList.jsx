import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import BlogCard from './BlogCard';
import ApiService from '../Services/ApiServices';

const BlogList = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(category || 'all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productPayload = {
          companyCode: "WAY4TRACK",
          unitCode: "WAY4",
        };
        const response = await ApiService.post(
          "website-product/getWebsiteProductDetails",
          productPayload
        );
        console.log("respose", response);
        setBlogData(response?.data || []);
      } catch (error) {
        console.error("Failed to fetch product data:", error);
      }
    };

    fetchProducts();
  }, []);

  const mainProducts = blogData.filter(blog => blog.isMainProduct);
  const categories = [...new Set(mainProducts.map(blog => blog.category))];

  const filteredProducts = activeCategory === 'all'
    ? mainProducts
    : mainProducts.filter(blog => blog.category === activeCategory);

  const subProducts = selectedProduct
    ? blogData.filter(blog => blog.parentCategory === selectedProduct.category)
    : [];

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    navigate("/blogs", { state: { blogs: product.Blog } });
  };

  const handleBackClick = () => {
    setSelectedProduct(null);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setSelectedProduct(null);
  };

  const formatCategory = (cat) => {
    return cat
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="container py-5">
      <h1 className="page-title text-center mb-5">Way4Track - GPS Tracking Solutions</h1>

      {/* Uncomment this block if you want category filters */}
      {/* {!selectedProduct && (
        <div className="d-flex flex-wrap justify-content-center mb-4 gap-2">
          <button
            className={`btn btn-outline-primary ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('all')}
            style={{ minWidth: '120px' }}
          >
            All Products
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              className={`btn btn-outline-primary ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => handleCategoryChange(cat)}
              style={{ minWidth: '120px' }}
            >
              {formatCategory(cat)}
            </button>
          ))}
        </div>
      )} */}

      {/* Uncomment to show filtered products grid */}
      {/* {!selectedProduct ? (
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="col"
              onClick={() => handleProductClick(product)}
              style={{ cursor: 'pointer' }}
            >
              <BlogCard blog={product} />
            </div>
          ))}
        </div>
      ) : (
        <div>
          <button onClick={handleBackClick} className="btn btn-secondary mb-4">
            ← Back to Products
          </button>
          <h2 className="category-title mb-4 text-center">{selectedProduct.title} Solutions</h2>
          <div className="row row-cols-1 row-cols-md-4 g-4">
            {subProducts.map(product => (
              <Link to={`/blog/${product.id}`} key={product.id} className="text-decoration-none">
                <div className="col">
                  <BlogCard blog={product} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )} */}

      <div className="row row-cols-1 row-cols-md-4 g-4">
        {blogData.map(product => (
          <div key={product.id} className="col">
            <div
              onClick={() => handleProductClick(product)}
              style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <BlogCard blog={product} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
