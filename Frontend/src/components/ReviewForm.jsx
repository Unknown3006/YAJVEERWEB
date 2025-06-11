import { useState } from "react";
import Navbar from "./navbar";
import Navbar2 from "./navbar2";
import MainNav from "./mainnav";
import Footer from "./Footer/Footer";
import "../CSS/ReviewForm.css"; // Ensure this path is correct
import Logo from "../assets/Yajveer.png"; // Ensure this path is correct
import Sidebar from "./Home/sidebar";
import Sidebar1 from "./Home/sidebar1";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import LoadingAnimation from "./LoadingAnimation";

export default function ReviewForm() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(""); // Rating is still a string initially
  const [image, setImage] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenSidebar = () => setSidebarOpen(true);
  const handleCloseSidebar = () => setSidebarOpen(false);

  const validate = () => {
    const newErrors = {};
    const numericRating = parseFloat(rating);
    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (!image) {
      newErrors.image = "Photo is required";
    }else if (!review.trim()) {
      newErrors.review = "Review is required";
    }else if (isNaN(numericRating) || numericRating < 0 || numericRating > 5) {
      newErrors.rating = "Rating must be between 0 and 5";
    }

    if (Object.keys(newErrors).length > 0) {
      toast.error(Object.values(newErrors).join(", "));
      return false;
    }

    return true;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setSelectedFileName(file.name);
    } else {
      setImage(null);
      setSelectedFileName("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("review", review);
    formData.append("rating", parseFloat(rating)); // Ensure rating is sent as a number
    formData.append("productPhoto", image);

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/v1/users/review`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Essential for sending FormData
          },
          withCredentials: true, // If your backend requires cookies/sessions
        }
      );

      // Check for a success status if needed, though axios typically throws for non-2xx
      if (response.status === 201 || response.status === 200) {
         toast.success("Review submitted successfully!");
        // Clear form fields on successful submission
        setName("");
        setReview("");
        setRating("");
        setImage(null);
        setSelectedFileName("");
      } else {
        // Handle unexpected non-error responses
         toast.error("Failed to submit review. Unexpected response.");
      }
    } catch (err) {
      console.error("Error submitting review:", err.response?.data || err);

      if (err.response) {
        if (err.response.status === 401) {
           toast.error("Please login to submit a review.");
          setTimeout(() => {
            navigate("/login");
          }, 2000); // Redirect after a delay
        } else if (err.response.data && err.response.data.message) {
          // Use specific error message from backend if available
           toast.error(err.response.data.message);
        } else {
           toast.error("Failed to submit review. Please try again.");
        }
      } else if (err.request) {
        // The request was made but no response was received
         toast.error(
          "No response from server. Please check your network connection."
        );
      } else {
        // Something happened in setting up the request that triggered an Error
         toast.error("An unknown error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false); // Always stop loading animation
    }
  };

  return (
    <>
      {isLoading && <LoadingAnimation />}{" "}
      {/* Render LoadingAnimation when isLoading is true */}
      {/* Only render content when not loading to avoid flickering */}
      {!isLoading && (
        <>
          {isSidebarOpen && <Sidebar1 onClose={handleCloseSidebar} />}
          <Sidebar onOpenSidebar={handleOpenSidebar} />
          <Navbar />
          <Navbar2 />
          <MainNav />

          <section className="review-section">
            <div className="review-box">
              <div className="review-left">
                <img src={Logo} alt="Yajveer Ayurvedic Logo" />
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
                  <div className="image-upload-section">
                    <label className="image-upload-label">
                      Upload <span className="highlight-text">Your</span> Photo
                    </label>
                    <p className="upload-instruction">
                      Click below to select an image (JPEG, PNG, WEBP)
                    </p>

                    <div className="image-upload-container">
                      <input
                        type="file"
                        id="imageInput"
                        accept="image/png, image/jpeg, image/webp"
                        onChange={handleImageChange}
                      />
                      <label htmlFor="imageInput" className="browse-button">
                        <svg viewBox="0 0 24 24" width="18" height="18">
                          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                        </svg>
                        Browse Files
                      </label>

                      <div className="file-info">
                        {selectedFileName && (
                          <span className="file-name">{selectedFileName}</span>
                        )}
                      </div>
                    </div>

                    {image && (
                      <div className="preview-box">
                        <img
                          src={URL.createObjectURL(image)}
                          alt="Preview"
                          className="preview-image"
                        />
                        <span
                          className="remove-image"
                          onClick={() => {
                            setImage(null);
                            setSelectedFileName("");
                          }}
                        >
                          Remove Image
                        </span>
                      </div>
                    )}
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
                      placeholder="Rating (0-5)" // Placeholder updated
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      min="0" // HTML5 min attribute
                      max="5" // HTML5 max attribute
                      step="0.1" // Allow decimal ratings, e.g., 4.5
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
        </>
      )}
    </>
  );
}
