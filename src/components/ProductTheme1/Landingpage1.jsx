import React, { useEffect } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from "aos";
import "aos/dist/aos.css";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import DashboardDemo from "./DashboardDemo";
import TrackingFeatures from "./TrackingFeatures";
import FeatureGrid from "./FeatureGrid";
import CTASection from "./CTASection";
import "./styles/App.css";

function Landingpage1(product) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }, []);

  console.log(product, "Product");

  // Mock data that would normally come from an API or CMS
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
    footerImage:
      "https://images.pexels.com/photos/5372639/pexels-photo-5372639.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  };

  return (
    <div className="bike-tracker-app">
      <HeroSection
        title={product.data.name}
        description={product.data.shortDescription}
        heroImage={product.data.banner1}
        mobileAppImage={productData.mobileAppImage}
      />
      <FeaturesSection
        title={product.data.description}
        applications={product.data.application}
      />
      <DashboardDemo
        dashboardImage={product.data.banner2}
        applications={product.data.application}
      />
      <TrackingFeatures dashboardImage={product.data.banner2} />
      <FeatureGrid amenities={product.data.amenities} />
      <CTASection
        footerImage={product.data.footerBanner}
      />
    </div>
  );
}

export default Landingpage1;
