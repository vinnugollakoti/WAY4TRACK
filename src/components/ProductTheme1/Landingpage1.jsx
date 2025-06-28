import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import AIS140Selector from "../AISSelector/AIS140Selector";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import DashboardDemo from "./DashboardDemo";
import TrackingFeatures from "./TrackingFeatures";
import FeatureGrid from "./FeatureGrid";
import CTASection from "./CTASection";
import SolutionsSection from "../ProductTheme2/SolutionsSection";
import "./styles/App.css";

function Landingpage1({ data, aisProducts }) {
  const [selectedProduct, setSelectedProduct] = useState(data);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }, []);

  console.log(aisProducts, "AIS Products");
  console.log(data.footerBanner, "FOOTER BANNER........");

  const footerBanner = selectedProduct.footerBanner?.replace(/\s/g, "");

  const productData = {
    name: "Bike GPS Tracker",
    shortDescription:
      "The ultimate bike tracking solution with real-time location monitoring",
    description: "Advanced Consumer Vehicle Tracking Platform",
    heroImage: "./images/banner1.png",
    mobileAppImage:
      "https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=",
    dashboardImage1: "./images/banner2.png",
    dashboardImage2: "./images/banner3.png",
  };

  return (
    <div className="bike-tracker-app">
      <AIS140Selector products={aisProducts} selectedProduct={data} />
      {/* {showAisCards && aisProducts?.length > 0 && (
        <div className="hero-extra-cards mt-4">
          {aisProducts.map((item) => (
            <div
              key={item.id}
              onClick={() => handleCardClick(item)}
              className={`extra-card p-3 mb-2 rounded shadow-sm bg-light ${
                selectedProduct.id === item.id
                  ? "border-blue-500"
                  : "border-gray-300"
              }`}
            >
              <h5 className="font-semibold text-lg mb-1">{item.name}</h5>
              <p className="text-sm text-gray-600">{item.shortDescription}</p>
            </div>
          ))}
        </div>
      )} */}
      <HeroSection
        title={selectedProduct.name}
        description={selectedProduct.shortDescription}
        heroImage={selectedProduct.banner1}
        mobileAppImage={
          selectedProduct.mobileAppImage ||
          "https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg"
        }
      />

      <FeaturesSection
        title={selectedProduct.description}
        applications={selectedProduct.application}
      />

      <DashboardDemo dashboardImage={selectedProduct.banner2} />
      <TrackingFeatures dashboardImage={selectedProduct.banner3} />
      <FeatureGrid amenities={selectedProduct.amenities} />

      <SolutionsSection
        ourTitle={selectedProduct.solutionTitle}
        ourDescription={selectedProduct.solutionDescription}
        ourImage={selectedProduct.solutionImage}
      />

      <CTASection footerBanner={footerBanner} />
    </div>
  );
}

export default Landingpage1;
