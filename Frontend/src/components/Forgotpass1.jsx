import Navbar from "./navbar";
import Navbar2 from "./navbar2";
import MainNav from "./mainnav";
import Sidebar from "./Home/sidebar";
import Sidebar1 from "./Home/sidebar1";
import Footer from "./Footer/Footer";
import { useState } from "react";
import "../CSS/Forgotpass1.css";
import Ayur from "../assets/logp.jpg";
import ErrorPopup from "./ErrorPopup";
import LoadingAnimation from "./LoadingAnimation";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Forgotpass1() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [code, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  const handleOpenSidebar = () => setSidebarOpen(true);
  const handleCloseSidebar = () => setSidebarOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!code) {
      setPopupMessage("Please enter the OTP.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/v1/users/verifyOtp`,
        { email, code },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const result = response.data;
      if (result.success) {
        setPopupMessage(result.message);
        setTimeout(() => setRedirect(true), 2000);
      } else {
        setPopupMessage(result.message);
      }
    } catch (error) {
      setPopupMessage(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (redirect) {
    return <Navigate to="/forgotpassword2" />;
  }

  return (
    <>
      {isSidebarOpen && <Sidebar1 onClose={handleCloseSidebar} />}
      <Sidebar onOpenSidebar={handleOpenSidebar} />
      <Navbar />
      <Navbar2 />
      <MainNav />
      <div className="forgotMain1">
        <div className="forgotImage1">
          <img src={Ayur} alt="Ayurvedic" />
        </div>
        <div className="forgotForm1">
          <div className="form-content1">
            <h2>Verify OTP</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-field1">
                <label htmlFor="otp">Enter OTP</label>
                <input
                  type="text"
                  id="otp"
                  value={code}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP sent to your email"
                />
              </div>
              <button type="submit" disabled={isLoading}>
                {isLoading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
      {isLoading && <LoadingAnimation />}
      {popupMessage && (
        <ErrorPopup
          message={popupMessage}
          onClose={() => setPopupMessage("")}
        />
      )}
    </>
  );
}
