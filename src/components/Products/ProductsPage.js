import React, { useState, useEffect, useContext } from "react";
import ApiService, { initialAuthState } from "../Services/ApiServices";
import { CartContext } from "../../contexts/CartContext";
import { Link } from "react-router-dom";
import "./ProductsPage.css";
import ProductPopupPage from "../ProductPopupPage/ProductPopupPage";
import * as bootstrap from 'bootstrap';

function ProductsPage() {
  const { addToCart, updateQuantity, cartItems } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [hovered, setHovered] = useState(false);

  const [filters, setFilters] = useState({
    names: [],
    priceRange: [0, 10000],
    sort: "",
  });

  useEffect(() => {
    localStorage.removeItem("buyNowItem");
  }, []);

  const fetchAllProducts = async () => {
    try {
      const response = await ApiService.post(
        "/website-product/getWebsiteproductDetails",
        {
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        }
      );
      setProducts(response.data || []);
      setAllProducts(response.data || []);
    } catch (err) {
      console.error("Failed to fetch data:", err);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchAllProducts();
    
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
  }, []);

  const productCounts = allProducts.reduce((acc, product) => {
    const name = product.name;
    const deviceCount = product.device?.length || 0;
    acc[name] = (acc[name] || 0) + deviceCount;
    return acc;
  }, {});

  const uniqueProductNames = Object.keys(productCounts);

  const handleCheckboxChange = (name) => {
    setFilters((prev) => {
      const newNames = prev.names.includes(name)
        ? prev.names.filter((n) => n !== name)
        : [...prev.names, name];
      return { ...prev, names: newNames };
    });
  };

  const handleSortChange = (value) => {
    setFilters((prev) => ({ ...prev, sort: value }));
  };

  const handlePriceChange = (value) => {
    setFilters((prev) => ({ ...prev, priceRange: [0, Number(value)] }));
  };

  const filteredProducts = allProducts
    .filter((p) => {
      if (filters.names.length === 0) return true;
      return filters.names.includes(p.name);
    })
    .filter((p) => {
      return p.device.some(
        (d) => d.amount + d.subscriptionMonthlyAmt <= filters.priceRange[1]
      );
    });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const aPrice =
      a.device?.[0]?.amount + a.device?.[0]?.subscriptionMonthlyAmt || 0;
    const bPrice =
      b.device?.[0]?.amount + b.device?.[0]?.subscriptionMonthlyAmt || 0;

    if (filters.sort === "low") return aPrice - bPrice;
    if (filters.sort === "high") return bPrice - aPrice;
    if (filters.sort === "az") return a.name.localeCompare(b.name);
    if (filters.sort === "za") return b.name.localeCompare(a.name);
    return 0;
  });

  const handleAddToCart = (device) => {
    setSelectedProduct(device);
    setShowProductModal(true);
  };

  return (
    <div className="products-container">
      {/* Header with animated gradient */}
      <div className="products-heading-container">
        <div className="container">
          <h1 className="products-title">Devices</h1>
        </div>
      </div>
      
      <div className="container py-5">
        <div className="row">
          {/* Filters Sidebar */}
          <div className="col-lg-3 col-md-4 mb-4">
            <div className="sidebar-wrapper card border-0 shadow-sm">
              <div className="card-body">
                {/* Product Filter */}
                <div className="filter-group mb-4">
                  <h2 className="filter-heading">Products</h2>
                  <div className="product-filter-list">
                    {uniqueProductNames.map((productName) => (
                      <div className="form-check custom-checkbox" key={productName}>
                        <input
                          type="checkbox"
                          className="form-check-input custom-control-input"
                          id={`product-${productName}`}
                          checked={filters.names.includes(productName)}
                          onChange={() => handleCheckboxChange(productName)}
                        />
                        <label className="form-check-label d-flex justify-content-between align-items-center" 
                               htmlFor={`product-${productName}`}>
                          <span>{productName}</span>
                          <span className="badge bg-primary rounded-pill animated-badge">
                            {productCounts[productName]}
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Price Filter */}
                <div className="filter-group mb-4">
                  <h2 className="filter-heading">Price Range</h2>
                  <div className="price-filter">
                    <input
                      type="range"
                      className="form-range custom-range"
                      min="0"
                      max="10000"
                      step="100"
                      value={filters.priceRange[1]}
                      onChange={(e) => handlePriceChange(e.target.value)}
                    />
                    <div className="price-labels d-flex justify-content-between">
                      <span>₹0</span>
                      <span>₹{filters.priceRange[1]}</span>
                    </div>
                    <div className="price-value alert alert-light mt-2">
                      Selected: ₹0 - ₹{filters.priceRange[1]}
                    </div>
                  </div>
                </div>
                
                {/* Sort Options */}
                <div className="filter-group">
                  <h2 className="filter-heading">Sort By</h2>
                  <select
                    className="form-select custom-select"
                    value={filters.sort}
                    onChange={(e) => handleSortChange(e.target.value)}
                  >
                    <option value="">Default Sorting</option>
                    <option value="low">Price: Low to High</option>
                    <option value="high">Price: High to Low</option>
                    <option value="az">Name: A to Z</option>
                    <option value="za">Name: Z to A</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="col-lg-9 col-md-8">
            <div className="row g-4 products-display">
              {sortedProducts.map((product) =>
                product.device?.map((device) => {
                  const startPrice =
                    ((device.amount + device.subscriptionMonthlyAmt) *
                      (100-device.discount)) /
                    100;
                  const matchedItem = cartItems.find(
                    (item) => item.device.id === device.id
                  );

                  return (
                    <div
                      key={device.id}
                      className="col-lg-6 col-md-6 col-sm-12 product-column"
                    >
                      <div className="product-card-product h-100">
                        <div className="card product-card-inner h-100 border-0 shadow-hover">
                          <div className="product-image-container">
                            <Link to={`/product/${device.id}`}>
                              <img
                                src={device.image}
                                alt={device.model}
                                className="card-img-top product-image"
                              />
                              <div className="product-image-overlay">
                                <span className="btn btn-sm btn-light view-details">View Details</span>
                              </div>
                            </Link>
                            {device.discount > 0 && (
                              <div className="discount-badge">
                                <span>-{device.discount}%</span>
                              </div>
                            )}
                          </div>
                          <div className="card-body product-info">
                            <h2 className="card-title product-title">{device.name}</h2>
                            <p className="card-text product-description text-truncate-2">
                              {device.description}
                            </p>
                            
                            <div className="price-container">
                              {device.discount > 0 && (
                                <span className="original-price">₹{device.amount}</span>
                              )}
                              <span className="current-price">From ₹{startPrice}/-</span>
                            </div>
                            
                            <div className="product-buttons">
                              {matchedItem ? (
                                <button
                                  className="btn btn-outline-primary btn-cart added"
                                  onClick={() => handleAddToCart(device)}
                                  onMouseEnter={() => setHovered(device.id)}
                                  onMouseLeave={() => setHovered(false)}
                                  data-bs-toggle="tooltip"
                                  title="Update your cart"
                                >
                                  {hovered === device.id ? (
                                    <span className="button-text">Update Cart</span>
                                  ) : (
                                    <span className="button-text">Added <i className="check-icon">✓</i></span>
                                  )}
                                </button>
                              ) : (
                                <button
                                  className="btn btn-primary btn-cart"
                                  onClick={() => handleAddToCart(device)}
                                >
                                  Add to Cart
                                </button>
                              )}
                              <button
                                className="btn btn-success btn-buy"
                                onClick={() => handleAddToCart(device)}
                              >
                                Buy Now
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              
              {sortedProducts.length === 0 && (
                <div className="col-12 empty-products">
                  <div className="alert alert-info text-center p-5 mt-4">
                    <div className="empty-icon mb-3">📦</div>
                    <h3>No products found</h3>
                    <p>Try adjusting your filters to find what you're looking for.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Product Modal */}
      {showProductModal && (
        <div className="modal-backdrop fade show" onClick={() => setShowProductModal(false)}></div>
      )}
      <div className={`product-modal ${showProductModal ? 'show' : ''}`}>
        <div className="product-modal-content" onClick={(e) => e.stopPropagation()}>
          <button
            className="btn-close product-modal-close"
            onClick={() => setShowProductModal(false)}
            aria-label="Close"
          ></button>
          {selectedProduct && (
            <ProductPopupPage
              device={selectedProduct}
              isOpen={showProductModal}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;