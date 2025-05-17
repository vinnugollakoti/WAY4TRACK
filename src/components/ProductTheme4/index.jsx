import React from "react";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import ParametersSection from "./ParametersSection";
import FeaturesSection from "./FeaturesSection";
import SolutionsSection from "../ProductTheme2/SolutionsSection";
import FooterBanner from "./FooterBanner";
import "./styles/product-page.css";
// import 'bootstrap/dist/css/bootstrap.min.css';

const ProductPage = (product) => {
  console.log(product, "product4.........");
  return (
    <div className="product-page">
      <HeroSection
        homeTitle={product.data.name}
        shortDescription={product.data.shortDescription}
      />
      <div className="container-fluid">
        <AboutSection devices={product.data.device} />
        <ParametersSection description={product.data.description} />
        <SolutionsSection
          ourTitle={product.data.solutionTitle}
          ourDescription={product.data.solutionDescription}
          ourImage={product.data.solutionImage}
        />
        <FeaturesSection amenities={product.data.amenities} />
      <FooterBanner footerBanner={product.data.footerBanner} />

      </div>
    </div>
  );
};

export default ProductPage;
