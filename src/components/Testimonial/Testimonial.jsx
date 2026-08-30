import React, { useEffect, useState } from "react";
import "./Testimonial.css";

const Testimonial = () => {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const nextReviews = () => {
    if (currentIndex < reviews.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const previousReviews = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <section className="testimonials">

      <h2 className="testimonial-heading">
        What Our Customers Say
      </h2>

      {/* Arrows */}
      <div className="review-arrows">
        <button onClick={previousReviews}>❮</button>
        <button onClick={nextReviews}>❯</button>
      </div>

      {/* Cards */}
      <div className="reviews-container">

        {reviews
          .slice(currentIndex, currentIndex + 3)
          .map((item) => (
            <div className="review-card" key={item._id}>

              <div className="rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={
                      star <= item.rating ? "active-star" : ""
                    }
                  >
                    ★
                  </span>
                ))}
              </div>

              <p className="review-text">
                "{item.review}"
              </p>

              <h3>{item.name}</h3>

            </div>
          ))}

      </div>

    </section>
  );
};

export default Testimonial;
