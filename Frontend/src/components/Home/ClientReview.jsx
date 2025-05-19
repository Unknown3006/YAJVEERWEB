import { useState, useEffect } from 'react';
import '../../CSS/Home/ClientReview.css';

const reviews = [
  {
    name: 'Ramesh Patel',
    image: 'https://i.pravatar.cc/100?img=1',
    text: 'Using Yajveer’s diabetes powder has helped control my sugar levels naturally.',
    rating: 5
  },
  {
    name: 'Neha Sharma',
    image: 'https://i.pravatar.cc/100?img=2',
    text: 'The Karela Jamun mix works wonders. I feel more energetic and fresh!',
    rating: 4
  },
  {
    name: 'Jignesh Bhatt',
    image: 'https://i.pravatar.cc/100?img=3',
    text: 'I highly recommend the Moringa powder. Great quality and results.',
    rating: 5
  }
];

const ClientReview = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextReview();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="reviews-wrapper">
      <h2 className="reviews-heading">What Our Customers Say</h2>

      <div className="reviews-slider">
        <button className="arrow left" onClick={prevReview}>❮</button>

        <div className="review-card">
          <img src={reviews[currentIndex].image} alt="User" className="user-image" />
          <p className="review-text">"{reviews[currentIndex].text}"</p>
          <h4 className="user-name">{reviews[currentIndex].name}</h4>
          <div className="user-rating">
            {'★'.repeat(reviews[currentIndex].rating)}
            {'☆'.repeat(5 - reviews[currentIndex].rating)}
          </div>
        </div>

        <button className="arrow right" onClick={nextReview}>❯</button>
      </div>

      <div className="dots-container">
        {reviews.map((_, index) => (
          <span
            key={index}
            className={`dot1 ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ClientReview;