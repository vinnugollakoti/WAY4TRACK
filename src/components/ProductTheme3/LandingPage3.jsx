// src/LandingPage.js
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import GpsSection from "./GpsSection";
import ParentsAppSection from "./ParentsAppSection";
import MonitoringSection from "./MonitoringSection";
import DriverAppSection from "./DriverAppSection";
import SupportedTrackersSection from "./SupportedTrackersSection";
import SolutionsSection from "../ProductTheme2/SolutionsSection";
import CTASection from "./CTASection";

function LandingPage3(product) {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  console.log(product, "product333");

  const appSections = [GpsSection,ParentsAppSection, DriverAppSection];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-amber-50">
      <div data-aos="fade-up">
        <HeroSection
          title={product.data.name}
          shortDesc={product.data.shortDescription}
          blogImage={product.data.blogImage}
        />
      </div>
      <div data-aos="fade-up" data-aos-delay="100">
        <FeaturesSection description={product.data.description} applications={product.data.amenities} />
      </div>
      {/* <div data-aos="fade-up" data-aos-delay="200">
        <GpsSection />
      </div> */}
      {/* <div data-aos="fade-up" data-aos-delay="300">
        <ParentsAppSection />
      </div>
      <div data-aos="fade-up" data-aos-delay="400">
        <MonitoringSection />
      </div>
      <div data-aos="fade-up" data-aos-delay="500">
        <DriverAppSection />
      </div> */}
      {product.data.productApp.map((app, index) => {
        const SectionComponent = appSections[index % appSections.length];
        return (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-delay={300 + index * 100}
          >
            <SectionComponent
              app={app}
              title={product.data.name}
              steps={product.data.points}
              chooseImage={product.data.chooseImage}
              chooseTitle={product.data.chooseTitle}
              chooseDescription={product.data.chooseDescription}
            />
          </div>
        );
      })}
      <SolutionsSection
        ourTitle={product.data.solutionTitle}
        ourDescription={product.data.solutionDescription}
        ourImage={product.data.solutionImage}
      />
      <CTASection title={product.data.name} footerImage={product.data.footerBanner} />
    </div>
  );
}

export default LandingPage3;
