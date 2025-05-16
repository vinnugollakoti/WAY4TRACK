import React from 'react';
import './DeviceReviewCOmponent.css';

const reviewsData = [
  {
    rating: 4,
    title: 'Very nice shoes',
    emojis: ['👟', '👠'],
    author: 'Flipkart Customer',
    date: 'Oct, 2023',
    location: 'Dumka',
    helpful: 13,
    notHelpful: 3,
  },
  {
    rating: 4,
    title: 'Super super',
    author: 'nagendrababu sanaga',
    date: 'Nov, 2023',
    location: 'Gudur',
    helpful: 2,
    notHelpful: 0,
  },
  {
    rating: 4,
    title: 'Nice Shoes Look Wise and All Good',
    author: '',
    date: '',
    location: '',
    helpful: 0,
    notHelpful: 0,
  },
];

const filters = ['Overall', 'Look', 'Colour', 'Comfort', 'Material Quality', 'Light Weight', 'True to Specs'];

const DeviceReviewComponent = () => {
  return (
    <div className="ReviewComponent-container">
      <div className="ReviewComponent-header">
        <div className="ReviewComponent-ratingBox">
          <div className="ReviewComponent-ratingValue">4.1★</div>
          <div className="ReviewComponent-ratingText">843 ratings and 48 reviews</div>
        </div>
        <div className="ReviewComponent-bars">
          {[5, 4, 3, 2, 1].map((star, i) => {
            const counts = [457, 202, 74, 34, 76];
            const widths = ['83%', '50%', '20%', '16%', '25%'];
            const colors = ['#22c55e', '#4ade80', '#9ca3af', '#facc15', '#f87171'];
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
        <p className="ReviewComponent-filterTitle">Read reviews that mention:</p>
        {/* <div className="ReviewComponent-filterButtons">
          {filters.map((filter) => (
            <button key={filter} className="ReviewComponent-filterButton">
              {filter}
            </button>
          ))}
        </div> */}
      </div>

      <div className="ReviewComponent-reviewList">
        {reviewsData.map((review, index) => (
          <div key={index} className="ReviewComponent-reviewItem">
            <div className="ReviewComponent-reviewHeader">
              <span className="ReviewComponent-starBadge">{review.rating}★</span>
              <span className="ReviewComponent-reviewTitle">{review.title}</span>
              {review.emojis &&
                review.emojis.map((emoji, idx) => <span key={idx}>{emoji}</span>)}
            </div>
            <div className="ReviewComponent-reviewMeta">
              <span className="ReviewComponent-reviewAuthor">{review.author}</span>
              {review.date && ` · ${review.date}`}
              <div className="ReviewComponent-reviewLocation">✔ Certified Buyer, {review.location}</div>
            </div>
            <div className="ReviewComponent-reviewFeedback">
              <span>👍 {review.helpful}</span>
              <span>👎 {review.notHelpful}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeviceReviewComponent;
