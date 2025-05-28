import { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FaPause, FaPlay } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './BannerCarousel.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const BannerCarousel = ({ banners = [], productsData }) => {
  const swiperRef = useRef(null);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

const handleBannerClick = (banner) => {
  // Try to find a product where any homeBanner matches the clicked banner
  const matchedProduct = productsData.find((product) =>
    product.homeBanner.includes(banner)
  );

  console.log(matchedProduct, "matched product");

  if (matchedProduct?.layoutType) {
    navigate(`/product-theme/${matchedProduct.id}`);
  } else {
    console.warn("No matching product found for banner:", banner);
  }
};


  // Toggle autoplay functionality
  const toggleAutoplay = () => {
    const swiper = swiperRef.current?.swiper;
    if (swiper) {
      if (isAutoplay) {
        swiper.autoplay.stop();
      } else {
        swiper.autoplay.start();
      }
      setIsAutoplay(!isAutoplay);
    }
  };

  // Update active index on slide change
  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
  };

  // If no banners are provided, don't render anything
  if (!banners || banners.length === 0) return null;

  return (
    <div style={{padding:"20px 50px"}}>
    <div className="banner-carousel-container">
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{ 
          delay: 5000, 
          disableOnInteraction: false 
        }}
        loop={true}
        slidesPerView={1}
        pagination={{
          clickable: true,
          el: '.banner-pagination'
        }}
        navigation={{
          nextEl: '.banner-button-next',
          prevEl: '.banner-button-prev',
        }}
        onSlideChange={handleSlideChange}
        className="banner-swiper"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index} onClick={() => handleBannerClick(banner)}>
            <div className="banner-slide">
              <img
                src={banner}
                alt={`Banner ${index + 1}`}
                className="banner-image"
              />
            </div>
          </SwiperSlide>
        ))}

        {/* Navigation Arrows - Positioned on sides */}
        <div className="banner-button-prev">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="banner-button-next">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </Swiper>

      {/* Controls Container - Bottom Center */}
      <div className="banner-controls-container">
        <div className="banner-pagination"></div>
        
        <button 
          className="banner-autoplay-button" 
          onClick={toggleAutoplay}
          aria-label={isAutoplay ? "Pause autoplay" : "Start autoplay"}
        >
          {isAutoplay ? <FaPause /> : <FaPlay />}
        </button>
      </div>
    </div>
    </div>
  );
};

export default BannerCarousel;