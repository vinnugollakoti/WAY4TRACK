import "./Products.css";
import Footer from "./Footer";
import DemoSection from "./DemoSection"

function Products() {
  const products = [
    {
      title: "Fuel Monitoring System with GPS Tracker",
      description:
        "Our mission is to deliver reliable and cutting-edge GPS tracking solutions that meet the diverse needs of our clients.",
      image: "/images/image 6.png",
      price: "$100",
    },
    {
      title: "Magnetic GPS Tracker",
      description:
        "Compact and portable tracker with rechargeable battery and strong magnets for easy attachment. Ideal for covert tracking, temporary monitoring, and asset security without wiring",
      image: "/images/image 5.png",
      price: "$100",
    },
    {
      title: "Lite GPS Tracking Device",
      description:
        "Compact, rugged, and power-efficient tracker with real-time location reporting. Features remote engine immobilization via mobile app or web portal.",
      image: "/images/21 1.png",
      price: "$100",
    },
    {
      title: "AC - Monitoring GPS",
      description:
        "Our mission is to deliver reliable and cutting-edge GPS tracking solutions that meet the diverse needs of our clients.",
      image: "/images/24 1.png",
      price: "$100",
    },
    {
      title: "Fuel Monitoring System with GPS Tracker",
      description:
        "Our mission is to deliver reliable and cutting-edge GPS tracking solutions that meet the diverse needs of our clients.",
      image: "/images/image 6.png",
      price: "$100",
    },
    {
      title: "Magnetic GPS Tracker",
      description:
        "Compact and portable tracker with rechargeable battery and strong magnets for easy attachment. Ideal for covert tracking, temporary monitoring, and asset security without wiring",
      image: "/images/image 5.png",
      price: "$100",
    },
    {
      title: "Basic GPS Tracking Device",
      description:
        "Compact, rugged, and power-efficient tracker with real-time location reporting. Features remote engine immobilization via mobile app or web portal.",
      image: "/images/21 1.png",
      price: "$100",
    },
    {
      title: "Rare camera",
      description:
        "Our mission is to deliver reliable and cutting-edge GPS tracking solutions that meet the diverse needs of our clients.",
      image: "/images/24 1.png",
      price: "$100",
    },
  ];

  return (
    <div className="root">
      <div className="product-hero">
        <img className="product-hero-img" src="/images/FAM 1.png" alt="Hero" />
      </div>
      <div className="products-container">
        {products.map((product, index) => (
          <div key={index} className="product-card">
            <div className="product-image-container">
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
              />
            </div>
            <h3 className="product-title">{product.title}</h3>
            <p className="product-description">{product.description}</p>
            <div className="product-price-section">
              <span className="product-price">{product.price}</span>
              <span className="product-old-price">$100</span>
            </div>
            <div className="product-buttons"> 
              <button className="buy-btn">Buy now</button>
              <button className="add-btn">Add to cart</button>
            </div>
          </div>
        ))}
      </div>
      <DemoSection/>
      <Footer/>
    </div>
  );
}

export default Products;
