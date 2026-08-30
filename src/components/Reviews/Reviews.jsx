import React, { useEffect, useState } from "react";
import "./Reviews.css";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [visibleReviews, setVisibleReviews] = useState(6);
  const [sortOrder, setSortOrder] = useState("latest");

  // Review form states
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("https://ecomerce-backend-dun.vercel.app/reviews");

        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }

        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.log("Reviews error:", error);
      }
    };

    fetchReviews();
  }, []);

  // Sort reviews
  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortOrder === "highest") {
      return Number(b.rating) - Number(a.rating);
    }

    if (sortOrder === "lowest") {
      return Number(a.rating) - Number(b.rating);
    }

    return 0;
  });

  // Submit review
  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }

    if (!rating) {
      alert("Please select a rating");
      return;
    }

    if (!review.trim()) {
      alert("Please write your review");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("https://ecomerce-backend-dun.vercel.app/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          review: review.trim(),
          rating: rating,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      const newReview = await response.json();

      // Add new review to UI
      setReviews((prevReviews) => [
        newReview,
        ...prevReviews,
      ]);

      // Reset form
      setName("");
      setReview("");
      setRating(0);

      // Close modal
      setShowReviewForm(false);

      alert("Review submitted successfully!");

    } catch (error) {
      console.log("Submit review error:", error);
      alert("Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  const loadMoreReviews = () => {
    setVisibleReviews((prev) => prev + 6);
  };

  return (
    <section className="reviews-section">

      {/* Tabs */}
      <div className="review-tabs">
        <button className="tab">
          Product Details
        </button>

        <button className="tab active">
          Rating & Reviews
        </button>

        <button className="tab">
          FAQs
        </button>
      </div>

      {/* Header */}
      <div className="reviews-header">

        <div className="all-reviews">
          <h3>
            All Reviews{" "}
            <span>({reviews.length})</span>
          </h3>
        </div>

        <div className="review-actions">

          <button className="filter-btn">
            ⚙
          </button>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="sort-select"
          >
            <option value="latest">
              Latest
            </option>

            <option value="highest">
              Highest Rating
            </option>

            <option value="lowest">
              Lowest Rating
            </option>
          </select>

          {/* WRITE REVIEW */}
          <button
            className="write-review-btn"
            onClick={() => setShowReviewForm(true)}
          >
            Write a Review
          </button>

        </div>
      </div>

      {/* Reviews */}
      <div className="reviews-grid">

        {sortedReviews
          .slice(0, visibleReviews)
          .map((item) => (

            <div
              className="review-card"
              key={item._id}
            >

              <div className="review-top">

                <div className="stars">

                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={
                        star <= Number(item.rating)
                          ? "star active"
                          : "star"
                      }
                    >
                      ★
                    </span>
                  ))}

                </div>

                <button className="more-btn">
                  ⋯
                </button>

              </div>

              <div className="review-user">

                <h4>{item.name}</h4>

                <span className="verified">
                  ✓
                </span>

              </div>

              <p className="review-text">
                "{item.review}"
              </p>

              <p className="review-date">
                Posted on{" "}
                {item.date
                  ? new Date(item.date).toLocaleDateString(
                      "en-US",
                      {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      }
                    )
                  : item.createdAt
                  ? new Date(item.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      }
                    )
                  : "Recently"}
              </p>

            </div>
          ))}

      </div>

      {/* Load More */}
      {visibleReviews < sortedReviews.length && (
        <div className="load-more-container">

          <button
            className="load-more-btn"
            onClick={loadMoreReviews}
          >
            Load More Reviews
          </button>

        </div>
      )}

      {/* =========================
          WRITE REVIEW MODAL
      ========================= */}

      {showReviewForm && (
        <div
          className="review-modal-overlay"
          onClick={() => setShowReviewForm(false)}
        >

          <div
            className="review-modal"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Modal Header */}
            <div className="modal-header">

              <h2>Write a Review</h2>

              <button
                className="close-modal"
                onClick={() => setShowReviewForm(false)}
              >
                ×
              </button>

            </div>

            <form onSubmit={handleSubmitReview}>

              {/* Name */}
              <div className="form-group">

                <label>
                  Your Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

              </div>

              {/* Rating */}
              <div className="form-group">

                <label>
                  Your Rating
                </label>

                <div className="rating-input">

                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      className={
                        star <= rating
                          ? "rating-star selected"
                          : "rating-star"
                      }
                      onClick={() => setRating(star)}
                    >
                      ★
                    </button>
                  ))}

                </div>

              </div>

              {/* Review */}
              <div className="form-group">

                <label>
                  Your Review
                </label>

                <textarea
                  placeholder="Write your review..."
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  rows="5"
                />

              </div>

              {/* Buttons */}
              <div className="modal-buttons">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowReviewForm(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="submit-review-btn"
                  disabled={loading}
                >
                  {loading
                    ? "Submitting..."
                    : "Submit Review"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </section>
  );
};

export default Reviews;
