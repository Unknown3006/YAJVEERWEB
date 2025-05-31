import Navbar from "./navbar";
import Navbar2 from "./navbar2";
import MainNav from "./mainnav";
import Sidebar from "./Home/sidebar";
import Sidebar1 from "./Home/sidebar1";
import Footer from "./Footer/Footer";
import { Link } from "react-router";
import { useState } from "react";
import "../CSS/Forgotpass1.css";
import Ayur from "../assets/logp.jpg";
import ErrorPopup from "./ErrorPopup";

export default function Forgotpass1() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [popupMessage, setPopupMessage] = useState("");

  const handleOpenSidebar = () => setSidebarOpen(true);
  const handleCloseSidebar = () => setSidebarOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!otp) {
      setMessage("Please enter the OTP.");
    } else {
      setMessage("OTP verified successfully ✅");
      // OTP verification logic
    }
  };

  return (
    <>
      {isSidebarOpen && <Sidebar1 onClose={handleCloseSidebar} />}
      <Sidebar onOpenSidebar={handleOpenSidebar} />
      <Navbar />
      <Navbar2 />
      <MainNav />
      <div className="log">
        <div className="imgsec">
          <img src={Ayur} alt="Yajveer" />
        </div>
        <div className="logform">
          <div className="mainlog">
            <div className="wel">
              <p className="logn">OTP Verification</p>
              <p>Please enter the OTP sent to your email.</p>
            </div>
            <div className="field">
              <form className="logf" onSubmit={handleSubmit}>
                <div className="usn">
                  <label htmlFor="otp">OTP : </label>
                  <input
                    type="text"
                    id="otp"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
                <Link to="/forgotpassword2">
                  <button type="submit">Verify OTP</button>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ErrorPopup message={popupMessage} onClose={() => setPopupMessage("")} />
    </>
  );
}
