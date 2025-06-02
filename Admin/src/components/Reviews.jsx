import "../CSS/Reviews.css";
import { useSelector, useDispatch } from "react-redux";

export default function Reviews() {
  const dispatch = useDispatch();
  const { data: Reviews } = useSelector((state) => state.reviews);

  const handleDelete = (id) => {
    // Dispatch delete action or perform API call
    dispatch({ type: "DELETE_REVIEW", payload: id });
    // You can replace this with an API call if needed
  };

  return (
    <div className="reviews-container-vertical">
      {Reviews && Reviews.length > 0 ? (
        Reviews.map((review, index) => (
          <div className="review-card-vertical" key={index}>
            <img
              src={review.productPhoto}
              alt={review.name}
              className="user-photo-vertical"
            />
            <h3 className="user-name">{review.name}</h3>
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < review.rating ? "filled" : ""}>
                  ★
                </span>
              ))}
            </div>
            <p className="review-text">{review.review}</p>
            <p className="review-date">
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
            <button
              className="delete-button"
              onClick={() => handleDelete(review._id || index)}
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
}
