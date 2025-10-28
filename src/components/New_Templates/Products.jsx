import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Products.css";
import Footer from "./Footer";
import DemoSection from "./DemoSection";
import Navbar from "./Navbar";
import { CartContext } from "../../contexts/CartContext";
import ProductPopupPage from "../ProductPopupPage/ProductPopupPage";

function Products({ websiteData }) {
  console.log("Products component rendered", websiteData);
  const navigate = useNavigate();
  const { cartItems, addToCart } = useContext(CartContext);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Filter out dummy products and ensure we only show products with valid device data
  const validProducts = websiteData.filter(
    (product) =>
      product.name !== "Dummy Product" &&
      product.device &&
      product.device.length > 0 &&
      product.device[0].image
  );

  console.log("Cart Items:", cartItems);
  console.log("Products: ", validProducts);

  const handleAddToCart = (product, device) => {
    setSelectedProduct({
      ...device,
      productDetails: product // Include product details for the popup
    });
    setShowProductModal(true);
  };

  const handleBuyNow = (product, device) => {
    setSelectedProduct({
      ...device,
      productDetails: product // Include product details for the popup
    });
    setShowProductModal(true);
  };


  return (
    <div className="root">
      <Navbar />
      <div className="product-hero">
        <img className="product-hero-img" src="/images/FAM1.jpeg" alt="Hero" />
      </div>
      <div className="products-container">
  {validProducts.map((product, index) =>
    product.device.map((device, dIndex) => {
      const discountedPrice = Math.round(
        (device.amount || 100) * (1 - (device.discount || 0) / 100)
      );

      const matchedItem = cartItems.find(
        (item) => item.device?.id === device.id
      );

      return (
        <div
          key={`${index}-${dIndex}`}
          className="product-card"
          onClick={() => {
            navigate(`/product/${product.id}?deviceId=${device.id}`);
          }}

        >
          <div className="product-image-container">
            <img
              src={device.image?.[0]}
              alt={device.name || device.webProductName}
              className="product-image"
              onError={(e) => {
                e.target.src = "/images/placeholder-product.png";
              }}
            />
          </div>
          <h3 className="product-title">
            {device.name || device.webProductName}
          </h3>
          <p className="product-description">
            {device.description || "No description available"}
          </p>

          <div className="product-price-section">
            <span className="product-price">₹{discountedPrice}</span>
            {device.discount > 0 && (
              <span className="product-old-price">
                ₹{device.amount || 100}
              </span>
            )}
          </div>

          <div className="product-buttons">
            <button
              className="buy-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleBuyNow(product, device);
              }}
            >
              Buy now
            </button>

            {matchedItem ? (
              <button
                className="add-btn added"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product, device);
                }}
                onMouseEnter={() => setHovered(device.id)}
                onMouseLeave={() => setHovered(false)}
              >
                {hovered === device.id ? "Update Cart" : "Added"}
              </button>
            ) : (
              <button
                className="add-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product, device);
                }}
              >
                Add to cart
              </button>
            )}
          </div>
        </div>
      );
    })
  )}
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

      <DemoSection />
      <Footer />
    </div>
  );
}

export default Products;