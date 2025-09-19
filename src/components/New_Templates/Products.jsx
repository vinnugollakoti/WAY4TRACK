import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import "./Products.css";
import Footer from "./Footer";
import DemoSection from "./DemoSection";
import Navbar from "./Navbar";
import { CartContext } from "../../contexts/CartContext";

function Products({ websiteData }) {
  console.log("Products component rendered", websiteData);
  const Navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  // Filter out dummy products and ensure we only show products with valid device data
  const validProducts = websiteData.filter(
    (product) =>
      product.name !== "Dummy Product" &&
      product.device &&
      product.device.length > 0 &&
      product.device[0].image
  );

  const handleAddToCart = (product, device) => {
    const cartItem = {
      deviceId: device.id,
      product: product,
      name: device.name,
      quantity: 1,
      clientId: localStorage.getItem("client_db_id"),
      totalAmount: Math.round((device.amount || 100) * (1 - (device.discount || 0) / 100))
    };

    addToCart(cartItem);
  };


  return (
    <div className="root">
      <Navbar />
      <div className="product-hero">
        <img className="product-hero-img" src="/images/FAM 1.png" alt="Hero" />
      </div>
      <div className="products-container">
        {validProducts.map((product, index) => {
          const device = product.device[0];
          return (
            <div key={index} className="product-card" onClick={() => {
              Navigate(`/product/${product.id}`);
            }}>
              <div className="product-image-container">
                <img
                  src={device.image}
                  alt={device.name}
                  className="product-image"
                  onError={(e) => {
                    e.target.src = "/images/placeholder-product.png"; // Fallback image
                  }}
                />
              </div>
              <h3 className="product-title">{device.name}</h3>
              <p className="product-description">
                {device.description || "No description available"}
              </p>
              <div className="product-price-section">
                <span className="product-price">
                  ₹{Math.round((device.amount || 100) * (1 - (device.discount || 0) / 100))}
                </span>

                {device.discount > 0 && (
                  <span className="product-old-price">
                    ₹{device.amount || 100}
                  </span>
                )}
              </div>
              <div className="product-buttons">
                <button className="buy-btn">Buy now</button>
                <button className="add-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product, device);
                  }}>
                  Add to cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <DemoSection />
      <Footer />
    </div>
  );
}

export default Products;