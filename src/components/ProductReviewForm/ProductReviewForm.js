import React, { useState } from "react";
import "./ProductReviewForm.css";

const ratingDescriptions = ["Poor", "Fair", "Good", "Very Good", "Excellent"];

const ProductReviewForm = ({ initialRating = 0 }) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    if (rating === 0 || description.trim() === "") {
      alert("Please provide a rating and description.");
      return;
    }

    const reviewData = {
      rating,
      title,
      description,
    };

    console.log("Review submitted:", reviewData);
    alert("Review submitted successfully!");

    // Reset form (optional)
    setRating(0);
    setHover(0);
    setDescription("");
    setTitle("");
  };

  return (
    <div className="ProductReviewForm">
      <h3>Rate this product</h3>
      <div className="ProductReviewForm-stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= (hover || rating) ? "filled" : ""}`}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
          >
            ★
            {hover === star && (
              <span className="tooltip">{ratingDescriptions[star - 1]}</span>
            )}
          </span>
        ))}
        {rating > 0 && (
          <span className="rating-label">{ratingDescriptions[rating - 1]}</span>
        )}
      </div>

      <h3>Review this product</h3>
      <div className="ProductReviewForm-box">
        <label>
          Description
          <textarea
            placeholder="Description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Title (optional)
          <input
            type="text"
            placeholder="Review title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
      </div>

      <button className="ProductReviewForm-submitBtn" onClick={handleSubmit}>
        Submit Review
      </button>
    </div>
  );
};

export default ProductReviewForm;
