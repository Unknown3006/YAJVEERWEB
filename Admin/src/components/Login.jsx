import "../CSS/Login.css";
import Ayur from "../assets/logp.jpg";
import { Link } from "react-router";
import ErrorPopup from "./ErrorPopup";
import { Navigate } from "react-router";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
export default function Login() {
  const [redirect, setRedirect] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedInAdmin");
    if (isLoggedIn === "true") {
      setRedirect(true);
    }
  }, []);

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
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/v1/users/adminlogin`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const result = response.data;
      if (result.success) {
        console.log(result);
        sessionStorage.setItem("isLoggedInAdmin", "true");
        setPopupMessage(result.message);
        setTimeout(() => setRedirect(true), 2000);
      } else {
        setPopupMessage(result.message);
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setPopupMessage(error.response.data.message);
      } else {
        setPopupMessage("Something went wrong. Please try again.");
      }
    }
  };

  if (redirect) {
    return <Navigate to="/admin" replace />;
  }
  return (
    <>
      <div className="welcome-header">
        <h1>Welcome to Yajveer!</h1>
        <p>Please Login to your account</p>
      </div>
      <div className="log">
        <div className="imgsec">
          <img src={Ayur} alt="Yajveer" />
        </div>
        <div className="logform">
          <div className="mainlog">
            <h2 className="form-title">Admin Login</h2>
            <div className="field">
              <form action="" className="logf" onSubmit={handleSubmit}>
                <div className="usn">
                  <label htmlFor="userName">Email : </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Enter Your email"
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
                <Link to="/forgotpassword">
                  <p className="fogpass">Forgot Your Password</p>
                </Link>
                <button>Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ErrorPopup message={popupMessage} onClose={() => setPopupMessage("")} />
    </>
  );
}
