import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/Register.css";
import logpImage from "../assets/logp.jpg";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    mobileNumber: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    mobileNumber: "",
  });

  // Using exact schema validation
  const validateEmail = (email) => {
    const emailRegex = /^\w+([.+-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
  };

  const validateMobileNumber = (number) => {
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(number);
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

    // Schema validations
    if (!validateEmail(formData.email)) {
      newErrors.email = "Please provide a valid email";
      isValid = false;
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    if (!validateMobileNumber(formData.mobileNumber)) {
      newErrors.mobileNumber = "Please enter valid 10-digit Indian mobile number";
      isValid = false;
    }

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    console.log("Register data:", formData);
    alert("Registration successful! Please login to continue.");
    navigate('/');
  };

  return (
    <div className="auth-container">
      <div className="auth-headline">
        <h1>Yajveer Ayurvedic</h1>
        <p>Admin Dashboard Registration</p>
      </div>
      <div className="auth-wrapper">
        <div className="auth-image">
          <img src={logpImage} alt="Ayurvedic" />
        </div>
        <div className="auth-content">
          <div className="auth-box">
            <h2>Admin Registration</h2>
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
              <div className="form-group">
                <label htmlFor="mobileNumber">Mobile Number</label>
                <input
                  type="tel"
                  id="mobileNumber"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  required
                  placeholder="Enter your mobile number"
                  className={errors.mobileNumber ? "error" : ""}
                />
                {errors.mobileNumber && (
                  <span className="error-message">{errors.mobileNumber}</span>
                )}
              </div>
              <button type="submit" className="register-btn">Register</button>
            </form>
            <div className="newus">
              <p className="ne">Already have an account? </p>
              <Link to='/'>
                <p className="ne1">Login</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;