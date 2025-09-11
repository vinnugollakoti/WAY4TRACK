import { useEffect } from 'react'
import Hero from './Hero'
import Mission from './Mission'
import Services from './Services'
import Stats from './Stats'
// import Team from './Team'
import Testimonials from './Testimonials'
import Coverage from './Coverage'
import Technology from './Technology'
import History from './History'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Navbar from '../New_Templates/Navbar'


const AboutUs = () => {
  // Refresh AOS on component mount
  useEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, []);


  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true
    })
  }, [])

  return (
    <div className="about-us">
      <Navbar />
      <Hero />
      <Mission />
      <Services />
      <Stats />
      {/* <Team /> */}
      <Testimonials />
      <Technology />
      <Coverage />
      <History />
    </div>
  )
}

export default AboutUs