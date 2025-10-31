import React, { useState, useEffect } from "react";
import ApiService, { initialAuthState } from "../Services/ApiServices";
import "./ProductReviewForm.css";

const ratingDescriptions = ["Poor", "Fair", "Good", "Very Good", "Excellent"];
const ratingIcons = ["😞", "😐", "😊", "😄", "🤩"];

const ProductReviewForm = ({ item, initialRating = 0, onUpdateReview, onClose }) => {
  const [review, setReview] = useState(null);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);

  const companyCode = initialAuthState.companyCode;
  const unitCode = initialAuthState.unitCode;
  const clientId = localStorage.getItem("client_id");
  const clientDbId = localStorage.getItem("client_db_id");

  useEffect(() => {
    if (item) {
      fetchReviews();
    }
  }, [item]);

  useEffect(() => {
    setCharacterCount(description.length);
  }, [description]);

  const fetchReviews = async () => {
    const value = item?.deviceId;
    try {
      const response = await ApiService.post("/client/getClientReviewsById", {
        companyCode,
        unitCode,
        clientId,
      });

      if (response.status) {
        const allReviews = response.data?.review || [];
        const filteredReviews = allReviews.filter(
          (r) => r.deviceId.id === value
        );

        if (filteredReviews.length > 0) {
          const existingReview = filteredReviews[0];
          setReview(existingReview);
          setRating(existingReview.rating);
          setDescription(existingReview.review || "");
          setTitle(existingReview.title || "");
        } else {
          setReview(null);
          setRating(initialRating);
          setDescription("");
          setTitle("");
        }
      }
    } catch (error) {
      console.error("Reviews fetching failed:", error);
    }
  };

  const handleUpdateReview = async (updatedReview) => {
    setIsSubmitting(true);
    try {
      const response = await ApiService.post("/review/handleReviewDetails", {
        companyCode,
        unitCode,
        clientId: clientDbId,
        orderId: review?.orderId?._id || "",
        deviceId: item.deviceId,
        rating: updatedReview.rating,
        review: updatedReview.description,
        title: updatedReview.title,
        id: updatedReview.id,
      });

      if (response.status) {
        if (onUpdateReview) {
          onUpdateReview(updatedReview);
        }
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Update review error:", error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      alert("Please select a rating before submitting.");
      return;
    }

    if (description.trim() === "") {
      alert("Please provide a review description.");
      return;
    }

    if (description.length < 10) {
      alert("Please write a more detailed review (at least 10 characters).");
      return;
    }

    const reviewData = {
      rating,
      title: title.trim() || `Review for ${item.name}`,
      description: description.trim(),
      id: review?.id || "",
    };

    const success = await handleUpdateReview(reviewData);
    
    if (success) {
      alert(review ? "Review updated successfully!" : "Review submitted successfully!");
      if (onClose) {
        onClose();
      }
    } else {
      alert("Failed to submit review. Please try again.");
    }
  };

  const handleClearForm = () => {
    setRating(0);
    setDescription("");
    setTitle("");
    setHover(0);
  };

  const isFormValid = rating > 0 && description.trim().length >= 10;

  return (
    <div className="ProductReviewForm">
      <div className="review-header">
        <h2>Write a Review</h2>
        <p>Share your experience with {item?.name}</p>
      </div>

      {/* Rating Section */}
      <div className="rating-section">
        <h3>How would you rate this product?*</h3>
        <div className="stars-container">
          <div className="stars-wrapper">
            {[1, 2, 3, 4, 5].map((star) => (
              <div key={star} className="star-item">
                <button
                  className={`star-button ${star <= (hover || rating) ? "filled" : ""}`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  aria-label={`Rate ${star} star${star > 1 ? "s" : ""} - ${ratingDescriptions[star - 1]}`}
                  type="button"
                >
                  <span className="star-icon">★</span>
                </button>
                {hover === star && (
                  <div className="rating-tooltip">
                    <span className="tooltip-emoji">{ratingIcons[star - 1]}</span>
                    <span className="tooltip-text">{ratingDescriptions[star - 1]}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {rating > 0 && (
            <div className="rating-display">
              <span className="rating-value">{rating}.0</span>
              <span className="rating-description">{ratingDescriptions[rating - 1]}</span>
            </div>
          )}
        </div>
      </div>

      {/* Review Form Section */}
      <div className="review-form-section">
        <div className="form-group">
          <label htmlFor="reviewTitle" className="form-label">
            Review Title (Optional)
          </label>
          <input
            id="reviewTitle"
            type="text"
            placeholder="Summarize your experience in a few words..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
            maxLength={100}
          />
          <div className="character-count">{title.length}/100</div>
        </div>

        <div className="form-group">
          <label htmlFor="reviewDescription" className="form-label">
            Your Review*
          </label>
          <textarea
            id="reviewDescription"
            placeholder="Share detailed feedback about the product quality, performance, and your overall experience. What did you like or dislike?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-textarea"
            rows={6}
            maxLength={1000}
          />
          <div className="textarea-footer">
            <div className="character-count">
              {characterCount}/1000 characters
            </div>
            <div className="minimum-chars">
              {characterCount < 10 && (
                <span className="char-warning">
                  Minimum 10 characters required
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button
          type="button"
          className="btn-secondary"
          onClick={handleClearForm}
          disabled={isSubmitting}
        >
          Clear
        </button>
        
        {onClose && (
          <button
            type="button"
            className="btn-cancel"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </button>
        )}
        
        <button
          type="button"
          className="btn-primary"
          onClick={handleSubmit}
          disabled={!isFormValid || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner"></span>
              {review ? "Updating..." : "Submitting..."}
            </>
          ) : (
            review ? "Update Review" : "Submit Review"
          )}
        </button>
      </div>

      {/* Review Guidelines */}
      <div className="review-guidelines">
        <h4>Review Guidelines</h4>
        <ul>
          <li>Be specific about your experience with the product</li>
          <li>Focus on product features and performance</li>
          <li>Avoid personal information or offensive language</li>
          <li>Your review will help other customers make better decisions</li>
        </ul>
      </div>
    </div>
  );
};

export default ProductReviewForm;