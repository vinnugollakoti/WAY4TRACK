import React from "react";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import ParametersSection from "./ParametersSection";
import FeaturesSection from "./FeaturesSection";
import "./styles/product-page.css";
// import 'bootstrap/dist/css/bootstrap.min.css';

const ProductPage = (product) => {
  console.log(product, "product4");
  return (
    <div className="product-page">
      <HeroSection
        homeTitle={product.data.name}
        description={product.data.shortDescription}
      />
      <div className="container-fluid">
        <AboutSection />
        <ParametersSection />
        <FeaturesSection />
      </div>
    </div>
  );
};

export default ProductPage;
