import { useState } from "react";
import "../CSS/login.css";
import Navbar from "./navbar";
import Navbar2 from "./navbar2";
import Ayur from "../assets/logp.jpg";
import { Link } from "react-router";
import MainNav from "./mainnav";
import Footer from "./Footer/Footer";
import Sidebar1 from "./Home/sidebar1";
import Sidebar from "./Home/sidebar";
import ErrorPopup from "./ErrorPopup";
import { Navigate } from "react-router";
import axios from "axios";

export default function Login() {

  const [redirect, setRedirect] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [popupMessage, setPopupMessage] = useState("");
  const validate = () => {
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|icloud\.com|protonmail\.com|hotmail\.com)$/i;

    if (!formData.email || !emailRegex.test(formData.email)) {
      setPopupMessage("Please enter a valid email address.");
      return false;
    }

    if (!formData.password || formData.password.length < 6) {
      setPopupMessage("Password must be at least 6 characters.");
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      // const response = await fetch(
      //   "https://yajveer-testing.vercel.app/api/v1/users/userlogin",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     credentials: "include",
      //     body: JSON.stringify(formData),
      //   }
      // );

      const response = await axios.post(
        "https://yajveer-testing.vercel.app/api/v1/users/userlogin",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // equivalent to fetch's `credentials: "include"`
        }
      );

      const result = response.data;
      if (result.success) {
        localStorage.setItem("isLoginUser", "true");
        setPopupMessage(result.message);
        setTimeout(() => setRedirect(true), 2000);
      } else {
        localStorage.setItem("isLoginUser", "false");
        setPopupMessage(result.message);
      }
    } catch (error) {
      localStorage.setItem("isLoginUser", "false");
      if (error.response?.data?.message) {
        setPopupMessage(error.response.data.message);
      } else {
        setPopupMessage("Something went wrong. Please try again.");
      }
    }
  };

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const handleOpenSidebar = () => setSidebarOpen(true);
  const handleCloseSidebar = () => setSidebarOpen(false);

  if (redirect) {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      {isSidebarOpen && <Sidebar1 onClose={handleCloseSidebar} />}
      <Sidebar onOpenSidebar={handleOpenSidebar} />
      <Navbar></Navbar>
      <Navbar2></Navbar2>
      <MainNav></MainNav>
      <div className="log">
        <div className="imgsec">
          <img src={Ayur} alt="Yajveer" />
        </div>
        <div className="logform ">
          <div className="mainlog">
            <div className="wel">
              <p className="logn">Login</p>
              <p>Welcome to Yajveer!</p>
              <p> Please Login to your account</p>
            </div>
            <div className="field">
              <form action="" className="logf" onSubmit={handleSubmit}>
                <div className="usn">
                  <label htmlFor="email">Email : </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Enter Your Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="usp">
                  <label htmlFor="password">Password : </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter Your Password"
                    value={formData.password}
                    onChange={handleChange}
                  ></input>
                </div>
                <p>Forgot Your Password</p>
                <button>Login</button>
              </form>

              <div className="newus">
                <p className="ne">New User ? </p>
                <Link to="/signUp">
                  <p className="ne1">SignUp</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
      <ErrorPopup message={popupMessage} onClose={() => setPopupMessage("")} />
    </>
  );
}
