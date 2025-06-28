import React, { useState } from "react";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import ParametersSection from "./ParametersSection";
import FeaturesSection from "./FeaturesSection";
import SolutionsSection from "../ProductTheme2/SolutionsSection";
// import FooterBanner from "./FooterBanner";
import AIS140Selector from "../AISSelector/AIS140Selector";

import "./styles/product-page.css";

const ProductPage = ({ data, aisProducts }) => {
  const [selectedProduct, setSelectedProduct] = useState(data);

  return (
    <div className="product-page">
      {/* ✅ AIS-140 Selector */}
      <AIS140Selector
        products={aisProducts}
        selectedProduct={selectedProduct}
      />

      <HeroSection
        homeTitle={selectedProduct.name}
        shortDescription={selectedProduct.shortDescription}
      />
      <div className="container-fluid">
        <AboutSection
          title={selectedProduct.name}
          devices={selectedProduct.device}
        />
        <ParametersSection description={selectedProduct.description} />
        <SolutionsSection
          ourTitle={selectedProduct.solutionTitle}
          ourDescription={selectedProduct.solutionDescription}
          ourImage={selectedProduct.solutionImage}
        />
        <FeaturesSection
          applications={selectedProduct.application}
          title={selectedProduct.name}
        />
        {/* <FooterBanner footerBanner={selectedProduct.footerBanner} /> */}
      </div>
    </div>
  );
};

export default ProductPage;

// import React from "react";
// import HeroSection from "./HeroSection";
// import AboutSection from "./AboutSection";
// import ParametersSection from "./ParametersSection";
// import FeaturesSection from "./FeaturesSection";
// import SolutionsSection from "../ProductTheme2/SolutionsSection";
// // import FooterBanner from "./FooterBanner";
// import "./styles/product-page.css";
// // import 'bootstrap/dist/css/bootstrap.min.css';

// const ProductPage = (product) => {
//   console.log(product, "product4.........");
//   return (
//     <div className="product-page">
//       <HeroSection
//         homeTitle={product.data.name}
//         shortDescription={product.data.shortDescription}
//       />
//       <div className="container-fluid">
//         <AboutSection title={product.data.name} devices={product.data.device} />
//         <ParametersSection description={product.data.description} />
//         <SolutionsSection
//           ourTitle={product.data.solutionTitle}
//           ourDescription={product.data.solutionDescription}
//           ourImage={product.data.solutionImage}
//         />
//         <FeaturesSection
//           applications={product.data.application}
//           title={product.data.name}
//         />
//         {/* <FooterBanner footerBanner={product.data.footerBanner} /> */}
//       </div>
//     </div>
//   );
// };

// export default ProductPage;
