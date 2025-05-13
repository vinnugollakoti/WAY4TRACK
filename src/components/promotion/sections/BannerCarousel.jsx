import React from "react";
import { useNavigate } from "react-router-dom";

const BannerCarousel = ({ banners = [], productsData }) => {
  const navigate = useNavigate();

  if (!banners || banners.length === 0) {
    return null;
  }

  const handleBannerClick = (banner) => {
    const matchedProduct = productsData.find(
      (product) => product.homeBanner[0] === banner
    );

    console.log(matchedProduct, "matched product");

    if (matchedProduct?.layoutType) {
      navigate(`/product-theme/${matchedProduct.id}`);
    } else {
      console.warn("No matching product found for banner:", banner);
    }
  };

  return (
    <div className="banner-carousel-container">
      <div
        id="bannerCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {banners.map((banner, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              onClick={() => handleBannerClick(banner)}
            >
              <img
                src={banner}
                className="d-block w-100"
                alt={`Banner ${index + 1}`}
                style={{ maxHeight: "500px", objectFit: "cover" }}
              />
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#bannerCarousel"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#bannerCarousel"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default BannerCarousel;
