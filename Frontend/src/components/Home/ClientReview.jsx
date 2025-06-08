import { useState, useEffect } from "react";
import "../../CSS/Home/ClientReview.css";
import { useSelector } from "react-redux";

const ClientReview = () => {
  const { data: Reviews } = useSelector((state) => state.reviews);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;

  const nextReviews = () => {
    setCurrentIndex((prev) => (prev + itemsPerPage) % Reviews.length);
  };

  const prevReviews = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev - itemsPerPage;
      return newIndex < 0 ? Reviews.length - itemsPerPage : newIndex;
    });
  };

  const visibleReviews = Reviews.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );
  if (visibleReviews.length < itemsPerPage) {
    visibleReviews.push(
      ...Reviews.slice(0, itemsPerPage - visibleReviews.length)
    );
  }

  return (
    <div className="reviews-wrapper">
      <h2 className="reviews-heading">What Our Customers Say</h2>

      <div className="reviews-slider">
        <button className="arrow left" onClick={prevReviews}>
          ❮
        </button>

        <div className="review-cards-container">
          {visibleReviews.map((review, idx) => (
            <div className="review-card" key={idx}>
              <img
                src={review.productPhoto}
                alt="User"
                className="user-image"
              />
              <p className="review-text">"{review.review}"</p>
              <h4 className="user-name">{review.name}</h4>
              <div className="user-rating">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </div>
            </div>
          ))}
        </div>

        <button className="arrow right" onClick={nextReviews}>
          ❯
        </button>
      </div>
    </div>
  );
};

export default ClientReview;
