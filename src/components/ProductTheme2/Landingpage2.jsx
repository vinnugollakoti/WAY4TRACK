import { useEffect } from "react";
import AOS from "aos";
import HeroSection from "./HeroSection";
import MiningVehiclesSection from "./MiningVehiclesSection";
import GpsTrackingSection from "./GpsTrackingSection";
import EPermitSection from "./EPermitSection";
import WhyChooseUsSection from "./WhyChooseUsSection";
import SolutionsSection from "./SolutionsSection";
import FeaturesSection from "./FeaturesSection";
import FooterBanner from "./FooterBanner";
import "./Landingpage2.css";

function App(product) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: false,
    });
  }, []);

  console.log(product, "product2222222");
  const deviceComponents = [MiningVehiclesSection, GpsTrackingSection];

  return (
    <div className="app-container">
      <HeroSection
        title={product.data.name}
        description={product.data.shortDescription}
        heroImage={product.data.blogImage}
      />
      {product.data.device.map((device, index) => {
        const Component = deviceComponents[index];
        return <Component key={device.id} device={device} />;
      })}
      <EPermitSection
        subHeading={product.data.description}
        steps={product.data.steps}
      />
      <WhyChooseUsSection
        chooseImage={product.data.chooseImage}
        chooseTitle={product.data.chooseTitle}
        points={product.data.points}
      />
      <SolutionsSection
        ourTitle={product.data.solutionTitle}
        ourDescription={product.data.solutionDescription}
        ourImage={product.data.solutionImage}
      />
      <FeaturesSection applications={product.data.application} />
      <FooterBanner product={product} footerBanner={product.data.footerBanner} />
    </div>
  );
}

export default App;
