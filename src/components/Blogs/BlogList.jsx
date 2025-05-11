import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import BlogCard from './BlogCard';
import ApiService from '../Services/ApiServices'; // adjust this path to your ApiService file

const BlogList = () => {
  const { category } = useParams();
  const navigate=useNavigate();
  const [activeCategory, setActiveCategory] = useState(category || 'all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [blogData, setBlogData] = useState([]);

  // Fetch products on component mount
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
        console.log("respose",response)
        setBlogData(response?.data || []);
      } catch (error) {
        console.error("Failed to fetch product data:", error);
      }
    };

    fetchProducts();
  }, []);

  // Get main products (parent categories)
  const mainProducts = blogData.filter(blog => blog.isMainProduct);

  // Get unique categories from main products
  const categories = [...new Set(mainProducts.map(blog => blog.category))];

  // Filtered products based on active category
  const filteredProducts = activeCategory === 'all'
    ? mainProducts
    : mainProducts.filter(blog => blog.category === activeCategory);

  // Sub-products for selected product
  const subProducts = selectedProduct
    ? blogData.filter(blog => blog.parentCategory === selectedProduct.category)
    : [];

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    navigate("/blogs",{state:{blogs:product.Blog}})
  };

  const handleBackClick = () => {
    setSelectedProduct(null);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setSelectedProduct(null);
  };

  return (
    <div>
      <h1 className="page-title">Way4Track - GPS Tracking Solutions</h1>

      {/* {!selectedProduct && (
        <div className="category-filters">
          <button
            className={`category-filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('all')}
          >
            All Products
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              className={`category-filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => handleCategoryChange(cat)}
            >
              {cat.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </button>
          ))}
        </div>
      )} */}

      {/* {!selectedProduct ? (
        <div className="blog-grid">
          {filteredProducts.map(product => (
            <div key={product.id} onClick={() => handleProductClick(product)} className="clickable">
              <BlogCard blog={product} />
            </div>
          ))}
        </div>
      ) : (
        <div>
          <button onClick={handleBackClick} className="back-button mb-4">
            ← Back to Products
          </button>
          <h2 className="category-title mb-4">{selectedProduct.title} Solutions</h2>
          <div className="blog-grid">
            {subProducts.map(product => (
              <Link to={`/blog/${product.id}`} key={product.id}>
                <BlogCard blog={product} />
              </Link>
            ))}
          </div>
        </div>
      )} */}

 <div className="blog-grid">
          {blogData.map(product => (
            <div key={product.id} onClick={() => handleProductClick(product)} className="clickable">
              <BlogCard blog={product} />
            </div>
          ))}
        </div>

    </div>
  );
};

export default BlogList;
