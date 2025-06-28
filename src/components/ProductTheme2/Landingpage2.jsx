import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import AIS140Selector from "../AISSelector/AIS140Selector";

import HeroSection from "./HeroSection";
import MiningVehiclesSection from "./MiningVehiclesSection";
import GpsTrackingSection from "./GpsTrackingSection";
import EPermitSection from "./EPermitSection";
import WhyChooseUsSection from "./WhyChooseUsSection";
import SolutionsSection from "./SolutionsSection";
import FeaturesSection from "./FeaturesSection";
import FooterBanner from "./FooterBanner";

import "./Landingpage2.css";

function Landingpage2({ data, aisProducts }) {
  const [selectedProduct, setSelectedProduct] = useState(data);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: false,
    });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedProduct]);

  const footerBanner = selectedProduct.footerBanner?.replace(/\s/g, "");
  const deviceComponents = [MiningVehiclesSection, GpsTrackingSection];

  return (
    <div className="px-4">
      {/* ✅ AIS-140 Product Selector */}
      <AIS140Selector
        products={aisProducts}
        selectedProduct={selectedProduct}
      />

      {/* Product Details Sections */}
      <HeroSection
        title={selectedProduct.name}
        description={selectedProduct.shortDescription}
        heroImage={selectedProduct.blogImage}
      />

      {selectedProduct.device?.map((device, index) => {
        const Component = deviceComponents[index];
        return <Component key={device.id} device={device} />;
      })}


      <EPermitSection
        subHeading={selectedProduct.description}
        steps={selectedProduct.steps}
      />

      <WhyChooseUsSection
        chooseImage={selectedProduct.chooseImage}
        chooseTitle={selectedProduct.chooseTitle}
        points={selectedProduct.points}
      />

      <SolutionsSection
        ourTitle={selectedProduct.solutionTitle}
        ourDescription={selectedProduct.solutionDescription}
        ourImage={selectedProduct.solutionImage}
      />

      <FeaturesSection amenities={selectedProduct.amenities} />

      <FooterBanner
        product={selectedProduct}
        footerBanner={footerBanner}
      />
    </div>
  );
}

export default Landingpage2;















// import { useEffect } from "react";
// import AOS from "aos";
// import HeroSection from "./HeroSection";
// import MiningVehiclesSection from "./MiningVehiclesSection";
// import GpsTrackingSection from "./GpsTrackingSection";
// import EPermitSection from "./EPermitSection";
// import WhyChooseUsSection from "./WhyChooseUsSection";
// import SolutionsSection from "./SolutionsSection";
// import FeaturesSection from "./FeaturesSection";
// import FooterBanner from "./FooterBanner";
// import "./Landingpage2.css";

// function App(product) {
//   useEffect(() => {
//     AOS.init({
//       duration: 1000,
//       once: false,
//       mirror: false,
//     });
//   }, []);

//   console.log(product, "product2222222");
//   const deviceComponents = [MiningVehiclesSection, GpsTrackingSection];

//   return (
//     <div className="app-container">
//       <HeroSection
//         title={product.data.name}
//         description={product.data.shortDescription}
//         heroImage={product.data.blogImage}
//       />
//       {product.data.device.map((device, index) => {
//         const Component = deviceComponents[index];
//         return <Component key={device.id} device={device} />;
//       })}
//       <EPermitSection
//         subHeading={product.data.description}
//         steps={product.data.steps}
//       />
//       <WhyChooseUsSection
//         chooseImage={product.data.chooseImage}
//         chooseTitle={product.data.chooseTitle}
//         points={product.data.points}
//       />
//       <SolutionsSection
//         ourTitle={product.data.solutionTitle}
//         ourDescription={product.data.solutionDescription}
//         ourImage={product.data.solutionImage}
//       />
//       <FeaturesSection amenities={product.data.amenities} />
//       <FooterBanner product={product} footerBanner={product.data.footerBanner} />
//     </div>
//   );
// }

// export default App;
