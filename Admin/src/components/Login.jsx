import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/Login.css";
import logpImage from "../assets/logp.jpg";

function Login() {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // Using the exact schema validation for email
  const validateEmail = (email) => {
    const emailRegex = /^\w+([.+-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    let isValid = true;

    // Email validation using schema regex
    if (!validateEmail(formData.email)) {
      newErrors.email = "Please provide a valid email";
      isValid = false;
    }

    // Password validation from schema
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    console.log("Login data:", formData);
    alert("Login successful!");
    navigate('/home'); // Navigate to home page after successful login
  };

  return (
    <div className="auth-container">
      <div className="auth-headline">
        <h1>Yajveer Ayurvedic</h1>
        <p>Admin Dashboard Login</p>
      </div>
      <div className="auth-wrapper">
        <div className="auth-image">
          <img src={logpImage} alt="Ayurvedic" />
        </div>
        <div className="auth-content">
          <div className="auth-box">
            <h2>Admin Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                  className={errors.email ? "error" : ""}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                  className={errors.password ? "error" : ""}
                  minLength="6"
                />
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>
              <div className="forgot-password">
                <Link to="/forgotPassword" className="forgot-btn">
                  Forgot Password?
                </Link>
              </div>
              <button type="submit" className="login-btn">Login</button>
            </form>
            <div className="newus">
              <p className="ne">New User? </p>
              <Link to='/register'>
                <p className="ne1">SignUp</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;