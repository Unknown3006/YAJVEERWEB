import Navbar from "./navbar";
import Navbar2 from "./navbar2";
import MainNav from "./mainnav";
import Sidebar from "./Home/sidebar";
import Sidebar1 from "./Home/sidebar1";
import Footer from "./Footer/Footer";
import { Link } from "react-router";
import { useState } from "react";
import "../CSS/Forgotpass.css";
import Ayur from "../assets/logp.jpg";
import ErrorPopup from "./ErrorPopup";

export default function Forgotpassword() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [popupMessage,setPopupMessage] = useState("");

  const handleOpenSidebar = () => setSidebarOpen(true);
  const handleCloseSidebar = () => setSidebarOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
     setPopupMessage("Please enter your email.");
    } else {
     setPopupMessage("OTP sent to your email! 📧");
      // API call logic here
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
              <p className="logn">Forgot Password</p>
              <p>Enter your registered email</p>
              <p>We’ll send you an OTP!</p>
            </div>
            <div className="field">
            <form className="logf" onSubmit={handleSubmit}>
              <div className="usn">
                <label htmlFor="email">Email : </label>
                <input
                  type="text"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Link to="/forgotpassword1"><button type="submit">Send OTP</button></Link>
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
