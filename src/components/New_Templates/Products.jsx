import "./Products.css";
import Footer from "./Footer";
import DemoSection from "./DemoSection";
import Navbar from "./Navbar";

function Products({ websiteData }) {
  console.log("Products component rendered", websiteData);

  // Filter out dummy products and ensure we only show products with valid device data
  const validProducts = websiteData.filter(
    (product) =>
      product.name !== "Dummy Product" &&
      product.device &&
      product.device.length > 0 &&
      product.device[0].image
  );

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
            <div key={index} className="product-card">
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
                <button className="add-btn">Add to cart</button>
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