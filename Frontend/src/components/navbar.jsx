import { Link } from "react-router";
import { useState, useEffect } from "react";
import "../CSS/navbar.css";
import ErrorPopup from "./ErrorPopup";
import axios from "axios";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  // Check localStorage on component mount
  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoginUser") === "true";
    setIsLoggedIn(loginStatus);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "https://yajveer-testing.vercel.app/api/v1/users/userlogout",
        {},
        { withCredentials: true }
      );

      const result = response.data;
      if (result.success) {
        localStorage.setItem("isLoginUser", "false");
        setIsLoggedIn(false);
        setPopupMessage("Logout successful");
      } else {
        setPopupMessage("Logout failed: " + result.message);
      }
    } catch (error) {
      localStorage.setItem("isLoginUser", "true"); // Keep user logged in on error
      if (error.response?.data?.message) {
        setPopupMessage(error.response.data.message);
      } else {
        setPopupMessage("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <p>Become A Seller</p>
          <Link to="/aboutUs">
            <p>About Us</p>
          </Link>
          <p>Free Delivery</p>
          <p>Returns Policy</p>
        </div>
        <div className="navbar-right">
          <div className="navbar-dropdown">
            <p>Help Center</p>
            <ul className="dropdown-menu">
              <li>
                <i className="bi bi-headset"></i> Call Center
              </li>
              <li>
                <i className="bi bi-chat-dots"></i> Live Chat
              </li>
            </ul>
          </div>
          <i className="bi bi-person-circle"></i>
          {!isLoggedIn ? (
            <Link to="/login">
              <button className="account-button">My Account</button>
            </Link>
          ) : (
            <button className="account-button" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </nav>
      <ErrorPopup message={popupMessage} onClose={() => setPopupMessage("")} />
    </>
  );
}
