import React from "react";
import { HiArrowNarrowRight } from "react-icons/hi";
import "./ProductIconSection.css"; // Assuming you have a CSS file for styles

const ProductIconSection = ({ product }) => {
  if (!product || !product.productIcon) {
    return null;
  }

  return (
 
  <div >
<div className="container-fluid">
  <div className="row">
  <div className="product-box">
  <h5 className="products-name" style={{ fontWeight: "bold" }}>
    {product.name}
  </h5>
  <p className="product-desc">{product.shortDescription}</p>

  <div className="image-with-icon d-flex align-items-center gap-3">
    <div className="icon-circle">
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
</div>
</div>
</div>

);

};

export default ProductIconSection;