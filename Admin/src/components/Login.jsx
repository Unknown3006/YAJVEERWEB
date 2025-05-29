import "../CSS/Login.css";
import Ayur from "../assets/logp.jpg";
import { Link } from "react-router";
import ErrorPopup from "./ErrorPopup";
import { Navigate, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../Redux/authSlice";
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/adminlogin",
        {
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        dispatch(loginSuccess(response.data));
        console.log(response.data);
        setPopupMessage(response.data.message);
        setTimeout(() => setRedirect(true), 2000);
      } else {
        setPopupMessage(response.data.message);
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
