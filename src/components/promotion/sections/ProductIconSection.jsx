import React from "react";
import { HiArrowNarrowRight } from "react-icons/hi";
import "./ProductIconSection.css"; // Assuming you have a CSS file for styles

const ProductIconSection = ({ product }) => {
  if (!product || !product.productIcon) {
    return null;
  }

  return (
  <div className="product-box">
    <h5 className="products-name" style={{ fontWeight: "bold" }}>
      {product.name}
    </h5>
    <p className="product-desc">{product.shortDescription}</p>

    <div className="image-with-icon d-flex align-items-center gap-3">
      <div
        style={{
          border: "1px solid lightgray",
          borderRadius: "50%",
          padding: "8px",
          backgroundColor: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "50px",
          height: "50px",
        }}
      >
        <span className="custom-arrow">
          <HiArrowNarrowRight size={25} />
        </span>
      </div>

      <img
        className="product-icon"
        src={product.productIcon}
        alt="Product Icon"
        style={{
          objectFit: "cover",
          width: "calc(100% - 80px)",
        }}
      />
    </div>
  </div>
);

};

export default ProductIconSection;