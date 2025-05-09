  import React, { useEffect, useState } from "react";
  // import Navbar from "../Navbar/Navbar";
  import ApiService from "../Services/ApiServices";
  import "bootstrap/dist/css/bootstrap.min.css";
  import Promotionapi from "../../components/Home/PromotionApi";
  import "./Homepage.css";
  import { Swiper, SwiperSlide } from "swiper/react";

  import {
    Autoplay,
    EffectCoverflow,  
    Pagination,
    Navigation,
  } from "swiper/modules";

  import "swiper/css";
  import "swiper/css/navigation";
  import "swiper/css/pagination";
  import "swiper/css/effect-coverflow";

  import { HiArrowNarrowRight } from "react-icons/hi";

  const Homepage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
      const payload = {
        companyCode: "WAY4TRACK",
        unitCode: "WAY4",
      };

      ApiService.post("website-product/getWebsiteProductDetails", payload)
        .then((response) => {
          const allProducts = response?.data || [];
          console.log("Product Data:", allProducts);

          // Convert each homeBanner string to array
          const formattedProducts = allProducts.map((product) => ({
            ...product,
            homeBanner:
              typeof product.homeBanner === "string"
                ? product.homeBanner.split(",").map((url) => url.trim())
                : [],
          }));

          setProducts(formattedProducts);
        })
        .catch((error) => {
          console.error("Failed to fetch product details:", error);
        });
    }, []);

    // Collect all home banners from all products
    const allBanners = products.flatMap((product) => product.homeBanner || []);

    return (
      <>
        <div>
          {/* <Navbar /> */}

          {/* Carousel */}
          <section>
            <div>
              {allBanners.length > 0 && (
                <div
                  id="bannerCarousel"
                  className="carousel slide"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-inner">
                    {allBanners.map((banner, index) => (
                      <div
                        key={index}
                        className={`carousel-item ${index === 0 ? "active" : ""}`}
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
              )}
            </div>
          </section>

          {/* Promotion Sections */}
          <section>
            <Promotionapi theme="Session-1" />
          </section>
          <section>
            <Promotionapi theme="Session-3" />
          </section>

          {/* Product Icon (first product only) */}

          <section className="py-4">
            <div className="container">
              <div className="row">
                {products[0]?.productIcon && (
                  <div className="col-md-4">
                    <div className="product-box">
                      <h5
                        className="products-name"
                        style={{ fontWeight: "bold" }}
                      >
                        {products[0]?.name}
                      </h5>
                      <p className="product-desc">
                        {products[0]?.shortDescription}
                      </p>

                      <div className="image-with-icon d-flex align-items-center gap-3">
                        <div
                          style={{
                            border: "1px solid lightgray",
                            borderRadius: "50%",
                            padding: "8px",
                            backgroundColor: "transparent",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "50px",
                            height: "50px",
                          }}
                        >
                          <span className="custom-arrow">
                            <HiArrowNarrowRight size={25} />
                          </span>
                        </div>

                        <img
                          className="product-icon"
                          src={products[0].productIcon}
                          alt="Banner"
                          style={{
                            objectFit: "cover",
                            width: "calc(100% - 80px)",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          <section>
            <Promotionapi theme="Session-2" />
          </section>

          {/* GPS Devices (from first product) */}
          <section className="py-4">
            <div className="container">
              <h4 className="mb-4 text-center text-md-start">Our GPS Devices</h4>
              <Swiper
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                coverflowEffect={{
                  rotate: 50,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true,
                }}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                navigation
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                  },
                  576: {
                    slidesPerView: 1.5,
                  },
                  768: {
                    slidesPerView: 2,
                  },
                  992: {
                    slidesPerView: 3,
                  },
                }}
                modules={[Autoplay, EffectCoverflow, Pagination, Navigation]}
                className="mySwiper"
              >
                {products[0]?.device?.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="card h-100 shadow-sm">
                      <img
                        src={item.image}
                        className="card-img-top"
                        alt={item.name}
                        style={{ height: "220px", objectFit: "cover" }}
                      />
                      <div className="card-body text-center">
                        <h5 className="card-title">{item.name || "N/A"}</h5>
                        <p className="card-text">Model: {item.model || "N/A"}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </section>

          <section>
            <Promotionapi theme="Session-5" />
          </section>
          <section>
            <Promotionapi theme="Session-6" />
          </section>
          <section>
            <Promotionapi theme="Session-7" />
          </section>
          <section>
            <Promotionapi theme="Session-8" />
          </section>
          <section>
            <Promotionapi theme="Session-9" />
          </section>
          <section>
            <Promotionapi theme="Session-10" />
          </section>

          <section>
            <Promotionapi theme="Session-4" />
          </section>
        </div>
      </>
    );
  };

  export default Homepage;
