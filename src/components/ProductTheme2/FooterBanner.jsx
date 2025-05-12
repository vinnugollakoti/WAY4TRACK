import { useEffect, useRef } from 'react'

const FooterBanner = (footerBanner) => {
  const bannerRef = useRef(null)

  console.log(footerBanner,"footerjnfe")

  useEffect(() => {
    const handleScroll = () => {
      if (!bannerRef.current) return
      
      const scrollPosition = window.scrollY
      const parallaxFactor = 0.4
      
      bannerRef.current.style.transform = `translateY(${scrollPosition * parallaxFactor}px)`
    }
    
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="position-relative overflow-hidden" style={{ height: '300px' }}>
      <div 
        ref={bannerRef}
        className="w-100 h-100 position-absolute" 
        style={{
          backgroundImage: `url(${footerBanner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -1,
          position: 'relative',
        }}
      />
      <div 
        className="w-100 h-100 d-flex flex-column justify-content-center align-items-center position-relative"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
      >
        {/* <img src={footerBanner} /> */}
        {/* <h2 className="text-white text-center mb-4 display-5 fw-bold" data-aos="fade-up">
          AIS-140 MINING DEVICE
        </h2> */}
        <button 
          className="btn btn-success btn-lg btn-custom rounded-pill"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          CLICK HERE TO GET FREE DEMO
        </button>
      </div>
    </div>
  )
}

export default FooterBanner