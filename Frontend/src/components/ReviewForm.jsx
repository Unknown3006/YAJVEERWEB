import { useState } from "react";
import Navbar from "./navbar";
import Navbar2 from "./navbar2";
import MainNav from "./mainnav";
import Footer from "./Footer/Footer";
import "../CSS/ReviewForm.css";
import Logo from "../assets/Yajveer.png";
import Sidebar from "./Home/sidebar";
import Sidebar1 from "./Home/sidebar1";
import axios from "axios";
import ErrorPopup from "./ErrorPopup";
import { useNavigate } from "react-router";
import LoadingAnimation from "./LoadingAnimation";

export default function ReviewForm() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const [image, setImage] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenSidebar = () => setSidebarOpen(true);
  const handleCloseSidebar = () => setSidebarOpen(false);

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    else if (!image) newErrors.image = "Photo is required";
    else if (!review.trim()) newErrors.review = "Review is required";
    else if (!rating || rating < 1 || rating > 5)
      newErrors.rating = "Rating must be between 1 and 5";

    if (Object.keys(newErrors).length > 0) {
      setPopupMessage(Object.values(newErrors).join(", "));
      return false;
    }

    return true;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setSelectedFileName(file ? file.name : "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("review", review);
    formData.append("rating", rating);
    formData.append("productPhoto", image);

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/v1/users/review`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      setPopupMessage("Review submitted successfully!");
      setName("");
      setReview("");
      setRating("");
      setImage(null);
      setSelectedFileName("");
    } catch (err) {
      console.error("Error submitting review:", err.response?.data || err);

      if (err.response) {
        if (err.response.status === 401) {
          setPopupMessage("Please login to submit a review.");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          setPopupMessage(
            err.response.data.message ||
              "Failed to submit review. Please try again."
          );
        }
      } else {
        console.error("Error submitting review:", err);
        setPopupMessage("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <>
          {isSidebarOpen && <Sidebar1 onClose={handleCloseSidebar} />}
          <Sidebar onOpenSidebar={handleOpenSidebar} />
          <Navbar />
          <Navbar2 />
          <MainNav />

          <section className="review-section">
            <div className="review-box">
              <div className="review-left">
                <img src={Logo} alt="Ayurvedic Review" />
              </div>
              <div className="review-right">
                <h2>Share Your Experience</h2>
                <form className="review-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-group image-upload-section">
                    <label className="image-upload-label">
                      Upload Your Photo
                    </label>
                    <div className="image-upload-container">
                      <input
                        type="file"
                        id="imageInput"
                        accept="image/png, image/jpeg"
                        onChange={handleImageChange}
                      />
                      <label htmlFor="imageInput" className="browse-button">
                        Browse
                      </label>
                      <span className="file-name">
                        {selectedFileName || "No file chosen"}
                      </span>
                    </div>
                  </div>
                  <div className="form-group">
                    <textarea
                      placeholder="Write your review..."
                      rows="4"
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <input
                      type="number"
                      placeholder="Rating (1-5)"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="submit-btn">
                    Submit Review
                  </button>
                </form>
              </div>
            </div>
          </section>
          <Footer />
          <ErrorPopup
            message={popupMessage}
            onClose={() => setPopupMessage("")}
          />
        </>
      )}
    </>
  );
}
