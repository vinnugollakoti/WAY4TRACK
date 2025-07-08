// ProductsPage.js

import React, { useState, useEffect, useContext } from "react";
import ApiService, { initialAuthState } from "../Services/ApiServices";
import { CartContext } from "../../contexts/CartContext";
import { Link } from "react-router-dom";
import "./ProductsPage.css";
import ProductPopupPage from "../ProductPopupPage/ProductPopupPage";

function ProductsPage() {
  const { addToCart, updateQuantity, cartItems } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [hovered, setHovered] = useState(false);


  console.log(cartItems,"cart items product pages")



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
  }, []);

  // const productCounts = allProducts.reduce((acc, product) => {
  //   const name = product.name;
  //   const deviceCount = product.device?.length || 0;
  //   acc[name] = (acc[name] || 0) + deviceCount;
  //   return acc;
  // }, {});

  const productCounts = allProducts.reduce((acc, product) => {
    const name = product.name;

    // Filter devices like in code1
    const validDevices = Array.isArray(product.device)
      ? product.device.filter(
          (device) => device && device.id && device.name
          // &&
          // typeof device.amount === "number" &&
          // typeof device.subscriptionMonthlyAmt === "number" &&
          // typeof device.discount === "number"
        )
      : [];

    const deviceCount = validDevices.length;

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
      <div className="products-heading-container">
        <h1 className="products-title section-heading">Devices</h1>
      </div>
      <div className="products-sidebar-container">
        <div className="sidebar-wrapper">
          {/* <div className="location-filter-wrapper">
            <label className="state-select-label" htmlFor="state-select">
              Select State
            </label>
            <select
              id="state-select"
              onChange={(e) => setSelectedState(e.target.value)}
              className="state-select-dropdown"
              value={selectedState}
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>

            <label className="city-select-label" htmlFor="city-select">
              Select City
            </label>
            <select
              id="city-select"
              onChange={(e) => setSelectedCity(e.target.value)}
              className={`city-select-dropdown ${
                !selectedState ? "disabled-dropdown" : ""
              }`}
              value={selectedCity}
              disabled={!selectedState}
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div> */}

          <div className="filter-group product-filter-group">
            <h2 className="subsection-heading">Products</h2>
            {uniqueProductNames.map((productName) => (
              <label
                key={productName}
                className="checkbox-label product-checkbox-label"
              >
                <div className="checkbox-container product-checkbox-container">
                  <input
                    type="checkbox"
                    className="products-filter-checkbox checkbox-input"
                    checked={filters.names.includes(productName)}
                    onChange={() => handleCheckboxChange(productName)}
                  />
                  <span className="product-name checkbox-name">
                    {productName}
                  </span>
                </div>
                <div className="count-container product-count-container">
                  <span className="product-count count-badge">
                    {productCounts[productName]}
                  </span>
                </div>
              </label>
            ))}
          </div>

          <div className="filter-group price-filter-group">
            <h2 className="subsection-heading">Price</h2>
            <input
              type="range"
              min="0"
              max="10000"
              value={filters.priceRange[1]}
              onChange={(e) => handlePriceChange(e.target.value)}
              className="price-slider"
            />
            <div className="price-range price-display">
              Price: ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}
            </div>
          </div>

          <div className="filters-wrapper sort-filter-wrapper">
            <select
              onChange={(e) => handleSortChange(e.target.value)}
              className="filter-select sort-select"
              value={filters.sort}
            >
              <option value="">Sort By</option>
              <option value="low">Price Low to High</option>
              <option value="high">Price High to Low</option>
              <option value="az">Name A to Z</option>
              <option value="za">Name Z to A</option>
            </select>
          </div>
        </div>

        <div className="productsPage-main-container">
          <div className="products-grid">
            {sortedProducts
              .filter(
                (product) =>
                  Array.isArray(product.device) && product.device.length > 0
              )
              .map((product) =>
                product.device
                  .filter(
                    (device) =>
                      device && device.id && device.name
                    // &&
                    // typeof device.amount === "number" &&
                    // typeof device.subscriptionMonthlyAmt === "number" &&
                    // typeof device.discount === "number"
                  )
                  .map((device) => {
                    const startPrice =
                      ((device.amount + device.subscriptionMonthlyAmt) *
                        (100 - device.discount)) /
                      100;

                    const matchedItem = cartItems.find(
                      (item) => item.device?.id === device.id
                    );

                    return (
                      <div
                        key={device.id}
                        className="product-card-productnew product-card-custom"
                      >
                        <div className="product-card-inner">
                          <Link
                            to={`/product/${device.id}`}
                            state={{ device }}
                            className="product-image-wrapper"
                          >
                            <img
                              src={device.image}
                              alt={device.model}
                              className="products-product-image"
                            />
                          </Link>

                          <div className="product-info">
                            <h2 className="product-name">{device.name}</h2>
                            <p className="product-description">
                              {device.description}
                            </p>
                            <div className="product-old-price-container">
                              <p className="product-base-price">
                                Rs.{device.amount}
                              </p>
                              <span className="product-price-discount">
                                -{device.discount}%
                              </span>
                            </div>
                            <p className="product-price">
                              From Rs.{startPrice}/-
                            </p>
                            <div className="product-buttons">
                              {matchedItem ? (
                                <div className="quantity-controls">
                                  <button
                                    className="products-add-cart"
                                    onClick={() => handleAddToCart(device)}
                                    onMouseEnter={() => setHovered(device.id)}
                                    onMouseLeave={() => setHovered(false)}
                                  >
                                    {hovered === device.id
                                      ? "Update Cart"
                                      : "Added"}
                                  </button>
                                </div>
                              ) : (
                                <button
                                  className="button products-add-cart"
                                  onClick={() => handleAddToCart(device)}
                                >
                                  Add Cart
                                </button>
                              )}

                              <button
                                className="button products-buy-now"
                                onClick={() => handleAddToCart(device)}
                              >
                                Buy
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
              )}
          </div>
        </div>
      </div>

      {showProductModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowProductModal(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setShowProductModal(false)}
            >
              ×
            </button>
            <ProductPopupPage
              device={selectedProduct}
              isOpen={showProductModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductsPage;
