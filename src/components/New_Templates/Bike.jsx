import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "./Bike.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import HomepageProducts from "./HomepageProducts";

const Bike = ({ websiteData }) => {
  const scrollContainerRef = useRef(null);
  const { id } = useParams();
  const [selectedTruckInfo, setSelectedTruckInfo] = useState(null);
  const [stateData, setData] = useState(null);

  useEffect(() => {
    const product = websiteData.find((item) => item.id === parseInt(id));
    setData(product);
    console.log(product);
  }, [id, websiteData]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let scrollSpeed = 0.5; // Adjust this value to control scroll speed
    let animationId;

    const autoScroll = () => {
      if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth) {
        // Reset to start when reaching the end
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += scrollSpeed;
      }
      animationId = requestAnimationFrame(autoScroll);
    };
    animationId = requestAnimationFrame(autoScroll);

    // Cleanup function
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);
  const testimonials = [
    {
      name: "S E",
      time: "10 days ago",
      text: "Love this place! Awesome coaches, great vibe, and tough sessions that actually get results.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
    },
    {
      name: "Jak",
      time: "30 days ago",
      text: "Love training here – great energy, killer workouts and awesome instructors!!",
      avatar: "https://randomuser.me/api/portraits/men/33.jpg",
      rating: 5,
    },
    {
      name: "Nar",
      time: "1 month ago",
      text: "Today's hybrid class was awesome as always.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
    },
    {
      name: "Mic",
      time: "1 month ago",
      text: "For the first time I consistently went to the gym for 2 years straight! Thanks to the beautiful community.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
    },
  ];

  return (
    <div className="body">
      <Navbar />

      <img src={stateData?.blogImage} alt="" className="hero-bike" />
      <center>
        <h1 className="heading">{`Curious to know about our ${stateData?.name
          } ?`}</h1>
        <p className="curios-line">{`${stateData?.shortDescription}`}</p>
      </center>
      <div className="main-cards">
        <div className="main-cards-1">
          <h1 className="main-cards-heading">{`${stateData?.points?.[0]?.title
            }`}</h1>
          <p className="main-cards-text">{`${stateData?.points?.[0]?.description
            }`}</p>
        </div>
        <div className="main-cards-2">
          <h1 className="main-cards-heading">{`${stateData?.points?.[1]?.title
            }`}</h1>
          <p className="main-cards-text">{`${stateData?.points?.[1]?.description
            }`}</p>
        </div>
        <div className="main-cards-3">
          <h1 className="main-cards-heading">{`${stateData?.points?.[2]?.title
            }`}</h1>
          <p className="main-cards-text">{`${stateData?.points?.[2]?.description
            }`}</p>
        </div>
      </div>

      {/* RAHULS HAD THIS SECTION */}
      <div className="mining-truck-info-section">
        <div className="mining-truck-info-left">
          <div
            className="mining-truck-info-block"
            onClick={() => setSelectedTruckInfo(1)}
          >
            <p className="mining-truck-info-p">
              {stateData?.amenities?.[0]?.desc}
            </p>
          </div>
          <hr className="mining-truck-info-divider" />
          <div
            className="mining-truck-info-block"
            onClick={() => setSelectedTruckInfo(2)}
          >
            <p className="mining-truck-info-p">
              {stateData?.amenities?.[1]?.desc}
            </p>
          </div>
          <hr className="mining-truck-info-divider" />
          <div
            className="mining-truck-info-block"
            onClick={() => setSelectedTruckInfo(3)}
          >
            <p className="mining-truck-info-p">
              {stateData?.amenities?.[2]?.desc}
            </p>
          </div>
        </div>
        <div className="mining-truck-info-right">
          <img
            className={
              selectedTruckInfo === 3 ? "iphone-truck" : "default-truck"
            }
            src={
              selectedTruckInfo === 1
                ? stateData?.amenities?.[0]?.image
                : selectedTruckInfo === 2
                  ? stateData?.amenities?.[1]?.image
                  : selectedTruckInfo === 3
                    ? stateData?.amenities?.[2]?.image
                    : stateData?.amenities?.[0]?.image
            }
            alt=""
          />
        </div>
      </div>

      {/* 6 cards section */}
      <div className="six-cards-main">
        <div className="six-cards-1">
          <div className="six-cards-icon-bg">
            <img
              src={stateData?.amenities?.[3]?.image}
              alt=""
              className="six-cards-icon"
            />
          </div>
          <h1 className="six-cards-heading">
            {stateData?.amenities?.[3]?.name}
          </h1>
          <p className="six-cards-text">
            {stateData?.amenities?.[3]?.desc}
          </p>
        </div>
        <div className="six-cards-2">
          <div className="six-cards-icon-bg">
            <img
              src={stateData?.amenities?.[4]?.image}
              alt=""
              className="six-cards-icon"
            />
          </div>
          <h1 className="six-cards-heading">
            {stateData?.amenities?.[4]?.name}
          </h1>
          <p className="six-cards-text">
            {stateData?.amenities?.[4]?.desc}
          </p>
        </div>
        <div className="six-cards-3">
          <div className="six-cards-icon-bg">
            <img
              src={stateData?.amenities?.[5]?.image}
              alt=""
              className="six-cards-icon"
            />
          </div>
          <h1 className="six-cards-heading">
            {stateData?.amenities?.[5]?.name}
          </h1>
          <p className="six-cards-text">
            {stateData?.amenities?.[5]?.desc}
          </p>
        </div>
      </div>
      <div className="six-cards-main-2">
        <div className="six-cards-1">
          <div className="six-cards-icon-bg">
            <img
              src={stateData?.amenities?.[6]?.image}
              alt=""
              className="six-cards-icon"
            />
          </div>
          <h1 className="six-cards-heading">
            {stateData?.amenities?.[6]?.name}
          </h1>
          <p className="six-cards-text">
            {stateData?.amenities?.[6]?.desc}
          </p>
        </div>
        <div className="six-cards-2">
          <div className="six-cards-icon-bg">
            <img
              src={stateData?.amenities?.[7]?.image}
              alt=""
              className="six-cards-icon"
            />
          </div>
          <h1 className="six-cards-heading">
            {stateData?.amenities?.[7]?.name}
          </h1>
          <p className="six-cards-text">
            {stateData?.amenities?.[7]?.desc}
          </p>
        </div>
        <div className="six-cards-3">
          <div className="six-cards-icon-bg">
            <img
              src={stateData?.amenities?.[8]?.image}
              alt=""
              className="six-cards-icon"
            />
          </div>
          <h1 className="six-cards-heading">
            {stateData?.amenities?.[8]?.name}
          </h1>
          <p className="six-cards-text">
            {stateData?.amenities?.[8]?.desc}
          </p>
        </div>
      </div>

      <div className="gps-dashboard-div">
        <h1 className="gps-tracking-dashboard-heading">
          GPS Tracking Dashboard
        </h1>
        <div className="gps-dashboard-content">
          <img
            src={stateData?.banner1}
            alt=""
            className="gps-dashboard-img"
          />
          <div className="gps-dashboard-cards-main" style={{ marginTop: 0 }}>
            <div className="gps-dashboard-cards-main-1">
              <div className="gps-tracking-card-1-start">
                <h1 className="gps-tracking-card-1-heading">
                  {stateData?.steps?.[0]?.title}
                </h1>
                <p className="gps-tracking-card-1-text">
                  {stateData?.steps?.[0]?.description}
                </p>
              </div>
              <div className="gps-tracking-card-2-start">
                <h1 className="gps-tracking-card-1-heading">
                  {stateData?.steps?.[1]?.title}
                </h1>
                <p className="gps-tracking-card-1-text">
                  {stateData?.steps?.[1]?.description}
                </p>
              </div>
            </div>
            <div className="gps-dashboard-cards-main-1">
              <div className="gps-tracking-card-1">
                <h1 className="gps-tracking-card-1-heading">
                  {stateData?.steps?.[2]?.title}
                </h1>
                <p className="gps-tracking-card-1-text">
                  {stateData?.steps?.[2]?.description}
                </p>
              </div>
              <div className="gps-tracking-card-2">
                <h1 className="gps-tracking-card-1-heading">
                  {stateData?.steps?.[3]?.title}
                </h1>
                <p className="gps-tracking-card-1-text">
                  {stateData?.steps?.[3]?.description}
                </p>
              </div>
            </div>
            <div className="gps-dashboard-cards-main-1">
              <div className="gps-tracking-card-1">
                <h1 className="gps-tracking-card-1-heading">
                  {stateData?.steps?.[4]?.title}
                </h1>
                <p className="gps-tracking-card-1-text">
                  {stateData?.steps?.[4]?.description}
                </p>
              </div>
              <div className="gps-tracking-card-2">
                <h1 className="gps-tracking-card-1-heading">
                  {stateData?.steps?.[5]?.title}
                </h1>
                <p className="gps-tracking-card-1-text">
                  {stateData?.steps?.[5]?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TAKE FROM RAHUL */}
      <div className="mining-benefits-section">
        <h2 className="mining-benefits-header">
          Benefits of {`${stateData?.name || ''}`}
        </h2>
        <div 
          className="mining-benefits-grid" 
          ref={scrollContainerRef}
          style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}
        >
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div className="mining-benefit-card" key={i}>
              <div className="mining-benefit-icon">
                <img src={stateData?.application?.[i]?.image} alt="" />
              </div>
              <div className="mining-benefit-title">
                <h3>{stateData?.application?.[i]?.name}</h3>
              </div>
              <div className="mining-benefit-desc">
                {stateData?.application?.[i]?.desc}
              </div>
            </div>
          ))}
        </div>
    </div>

      <div className="points-card-main">
        <img
          src={stateData?.banner2}
          alt=""
          className="gps-tracking-img"
        />
        <div className="points-card-points-div">
          {[9, 10, 11, 12, 13, 14].map((i) => (
            <div className="points-card-points-div-1" key={i}>
              <div className="icon-background">
                <img
                  src={stateData?.amenities?.[i]?.image}
                  alt=""
                  className="logo-icon"
                />
              </div>
              <div className="point-card-matter">
                <p className="point-card-heading">
                  {stateData?.amenities?.[i]?.name}
                </p>
                <p className="point-card-text">
                  {stateData?.amenities?.[i]?.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* three images section */}
      <div className="three-cards-section">
        <h1 className="gps-communications-heading">GPS Communications</h1>
        <div className="three-cards">
          {[6, 7, 8].map((i) => (
            <div className="three-card-1" key={i}>
              <center>
                <h1 className="three-cards-section-heading">
                  {stateData?.application?.[i]?.name}
                </h1>
              </center>
              <p className="three-cards-section-text">
                {stateData?.application?.[i]?.desc}
              </p>
              <center>
                <img
                  src={stateData?.application?.[i]?.image}
                  alt=""
                  className="three-cards-section-img"
                />
              </center>
            </div>
          ))}
        </div>
      </div>

      {/* poster section */}
      <div className="poster-section">
        <img
          src={stateData?.footerBanner}
          alt=""
          className="poster-bike-last"
        />
      </div>

      <div className="wrapper-mining-view-more-text">
      <div className="mining-view-more-text">
          <h1>
            Want to see more ? <br />
            Check our remaining products...
          </h1>
        </div>
        </div>
      <HomepageProducts />

      <div className="testimonials-container">
        <div className="testimonials-scroll">
          {testimonials.concat(testimonials).map((t, i) => (
            <div key={i} className="testimonial-card">
              <div className="stars">{"⭐".repeat(t.rating)}</div>
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-footer">
                <img src={t.avatar} alt={t.name} className="avatar" />
                <div className="user-info">
                  <strong>{t.name}</strong>
                  <span>{t.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Bike;
