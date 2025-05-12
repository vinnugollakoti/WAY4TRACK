import { useEffect } from 'react'
import AOS from 'aos'
import HeroSection from './HeroSection'
import MiningVehiclesSection from './MiningVehiclesSection'
import GpsTrackingSection from './GpsTrackingSection'
import EPermitSection from './EPermitSection'
import WhyChooseUsSection from './WhyChooseUsSection'
import SolutionsSection from './SolutionsSection'
import FeaturesSection from './FeaturesSection'
import FooterBanner from './FooterBanner'
import './Landingpage2.css'

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: false
    })
  }, [])

  return (
    <div className="app-container">
      <HeroSection />
      <MiningVehiclesSection />
      <GpsTrackingSection />
      <EPermitSection />
      <WhyChooseUsSection />
      <SolutionsSection />
      <FeaturesSection />
      <FooterBanner />
    </div>
  )
}

export default App