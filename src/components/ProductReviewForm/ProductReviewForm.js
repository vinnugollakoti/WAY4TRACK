import React, { useState, useEffect } from "react";
import ApiService, { initialAuthState } from "../Services/ApiServices";

import "./ProductReviewForm.css";

const ratingDescriptions = ["Poor", "Fair", "Good", "Very Good", "Excellent"];

const ProductReviewForm = ({ item, initialRating = 0, onUpdateReview }) => {
  const [review, setReview] = useState(null); // changed from [] to null
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

  const companyCode = initialAuthState.companyCode;
  const unitCode = initialAuthState.unitCode;
  const clientId = localStorage.getItem("client_id");
  const clientDbId = localStorage.getItem("client_db_id");

  useEffect(() => {
    if (item) {
      fetchReviews();
    }
  }, [item]);

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
          setRating(0);
          setDescription("");
          setTitle("");
        }
      }
    } catch (error) {
      console.error("Reviews fetching failed:", error);
      alert("Failed to fetch reviews.");
    }
  };

  const handleUpdateReview = async (updatedReview) => {
    try {
      const response = await ApiService.post("/review/handleReviewDetails", {
        companyCode,
        unitCode,
        clientId:clientDbId,
        orderId: review?.orderId?._id || "", 
        deviceId: item.deviceId,
        rating: updatedReview.rating,
        review: updatedReview.description,
        title: updatedReview.title,
        id: updatedReview.id,
      });

      if (response.status) {
        alert("Review updated successfully.");
        fetchReviews();
      } else {
        alert("Failed to update review.");
      }
    } catch (error) {
      console.error("Update review error:", error);
      alert("Something went wrong while updating the review.");
    }
  };

  const handleSubmit = () => {
    if (rating === 0 || description.trim() === "") {
      alert("Please provide a rating and description.");
      return;
    }

    const reviewData = {
      rating,
      title,
      description,
      id: review?.id || "", // existing review ID if updating
    };

    if (review && review.id) {
      // Update if review exists
      handleUpdateReview(reviewData);
    } else {
      // Else call onUpdateReview passed as prop (maybe to create new)
      if (onUpdateReview) {
        onUpdateReview(reviewData);
        alert("Review submitted successfully!");
      }
    }
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
            role="button"
            tabIndex={0}
            aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
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
