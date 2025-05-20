import React, { useEffect, useState } from "react";
import ApiService, { initialAuthState } from "../Services/ApiServices";
import "./DeviceReviewCOmponent.css";

const reviewsData = [
  {
    rating: 5,
    title: "Highly Accurate and Reliable",
    emojis: ["📍", "✅"],
    author: "Ravi Sharma",
    date: "Aug, 2024",
    location: "Pune",
    helpful: 22,
    notHelpful: 1,
  },
  {
    rating: 4,
    title: "Good for Fleet Management",
    emojis: ["🚚", "🛰️"],
    author: "Fleet Ops Manager",
    date: "Jul, 2024",
    location: "Nagpur",
    helpful: 14,
    notHelpful: 3,
  },
  {
    rating: 3,
    title: "Decent but Battery Drains Fast",
    emojis: ["🔋", "⚠️"],
    author: "Sakshi Verma",
    date: "Jun, 2024",
    location: "Bengaluru",
    helpful: 9,
    notHelpful: 4,
  },
  {
    rating: 4,
    title: "Easy to Install, Works Well",
    emojis: ["🧰", "📦"],
    author: "Kiran Rao",
    date: "May, 2024",
    location: "Hyderabad",
    helpful: 5,
    notHelpful: 0,
  },
  {
    rating: 2,
    title: "Signal Drops in Remote Areas",
    emojis: ["📡", "🚫"],
    author: "Deepak Kumar",
    date: "Apr, 2024",
    location: "Shimla",
    helpful: 3,
    notHelpful: 6,
  },
];

const filters = [
  "Overall",
  "Look",
  "Colour",
  "Comfort",
  "Material Quality",
  "Light Weight",
  "True to Specs",
];

const DeviceReviewComponent = ({device}) => {
  const [reviews, setReviews] = useState([]);
  const clientDbId = localStorage.getItem("client_db_id");

  useEffect(() => {
    fetchReviews();
  },[]);

  const fetchReviews = async () => {
    try {
      const response = await ApiService.post("review/getReviewDetails", {
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
        // id: Number(clientDbId),
      });
      if (response.status) {

        const data=response.data
        const deviceReviews=data.filter((item)=> (item.deviceId.id===device.id))
        setReviews(deviceReviews)
        console.log(deviceReviews, " device reviews");
      } else {
        console.error("Error while fetching the reviews");
      }
    } catch (err) {
      console.error("Error fetching revies");
    }
  };
  return (
    <div className="ReviewComponent-container">
      <div className="ReviewComponent-header">
        <div className="ReviewComponent-ratingBox">
          <div className="ReviewComponent-ratingValue">4.1★</div>
          <div className="ReviewComponent-ratingText">
            843 ratings and 48 reviews
          </div>
        </div>
        <div className="ReviewComponent-bars">
          {[5, 4, 3, 2, 1].map((star, i) => {
            const counts = [457, 202, 74, 34, 76];
            const widths = ["83%", "50%", "20%", "16%", "25%"];
            const colors = [
              "#22c55e",
              "#4ade80",
              "#9ca3af",
              "#facc15",
              "#f87171",
            ];
            return (
              <div key={star} className="ReviewComponent-barRow">
                <span>{star}★</span>
                <div className="ReviewComponent-barContainer">
                  <div
                    className="ReviewComponent-barFill"
                    style={{ width: widths[i], backgroundColor: colors[i] }}
                  ></div>
                </div>
                <span>{counts[i]}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="ReviewComponent-filterSection">
        <p className="ReviewComponent-filterTitle">
          Read reviews that mention:
        </p>
        {/* <div className="ReviewComponent-filterButtons">
          {filters.map((filter) => (
            <button key={filter} className="ReviewComponent-filterButton">
              {filter}
            </button>
          ))}
        </div> */}
      </div>

      <div className="ReviewComponent-reviewList">
        {reviews.map((review, index) => (
          <div key={index} className="ReviewComponent-reviewItem">
            <div className="ReviewComponent-reviewHeader">
              <span className="ReviewComponent-starBadge">
                {review.rating}★
              </span>
              <span className="ReviewComponent-reviewTitle">
                {review.review}
              </span>
              {/* {review.emojis &&
                review.emojis.map((emoji, idx) => (
                  <span key={idx}>{emoji}</span>
                ))} */}
            </div>
            <div className="ReviewComponent-reviewMeta">
              <span className="ReviewComponent-reviewAuthor">
                {review.clientId.name}
              </span>
              {review.updatedAt && ` · ${review.updatedAt}`}
              <div className="ReviewComponent-reviewLocation">
                ✔ Certified Buyer
                {/* , {review.location} */}
              </div>
            </div>
            {/* <div className="ReviewComponent-reviewFeedback">
              <span>👍 {review.helpful}</span>
              <span>👎 {review.notHelpful}</span>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeviceReviewComponent;
