import Navbar from "./navbar";
import Navbar2 from "./navbar2";
import MainNav from "./mainnav";
import Sidebar from "./Home/sidebar";
import Sidebar1 from "./Home/sidebar1";
import Footer from "./Footer/Footer";
import { Link } from "react-router";
import { useState } from "react";
import "../CSS/Forgotpass2.css";
import Ayur from "../assets/logp.jpg";
import ErrorPopup from "./ErrorPopup";

export default function Forgotpass2() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [popupMessage, setPopupMessage] = useState("");

  const handleOpenSidebar = () => setSidebarOpen(true);
  const handleCloseSidebar = () => setSidebarOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !otp || !password) {
      setMessage("Please fill in all fields.");
    } else {
      setMessage("Password successfully set 🔒");
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
              <p className="logn">Reset Password</p>
              <p>Enter your details below.</p>
            </div>
            <div className="field">
              <form className="logf" onSubmit={handleSubmit}>
                <div className="usn">
                  <label htmlFor="email">Email : </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="usn">
                  <label htmlFor="otp">OTP : </label>
                  <input
                    type="text"
                    id="otp"
                    placeholder="Enter the OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
                <div className="usn">
                  <label htmlFor="password">New Password : </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Link to="/login">
                  <button type="submit">Reset Password</button>
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
