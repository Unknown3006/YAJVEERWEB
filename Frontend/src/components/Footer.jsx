import "../CSS/Footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Column 1 */}
        <div className="footer-column about">
          <h3>About us</h3>
          <p>
            We take pride in providing high-quality herbal products aimed at
            supporting your health and well-being.
          </p>
          <div className="social-icons">
            <Link to="#">
              <i className="bi bi-facebook"></i>
            </Link>
            <Link to="#">
              <i className="bi bi-twitter"></i>
            </Link>
            <Link to="#">
              <i className="bi bi-instagram"></i>
            </Link>
            <Link to="#">
              <i className="bi bi-youtube"></i>
            </Link>
          </div>
        </div>

        {/* Column 2 */}
        <div className="footer-column quick-links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/about">
                <i className="bi bi-info-circle"></i> About Us
              </Link>
            </li>
            <li>
              <Link to="/testimonials">
                <i className="bi bi-star"></i> Testimonials
              </Link>
            </li>
            <li>
              <Link to="/products">
                <i className="bi bi-box-seam"></i> Our Products
              </Link>
            </li>
            <li>
              <Link to="/blog">
                <i className="bi bi-newspaper"></i> Blog
              </Link>
            </li>
            <li>
              <Link to="/contact">
                <i className="bi bi-envelope"></i> Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="footer-column information">
          <h3>Information</h3>
          <ul>
            <li>
              <Link to="/faq">FAQ's</Link>
            </li>
            <li>
              <Link to="/shipping">Shipping Policy</Link>
            </li>
            <li>
              <Link to="/policies">Refund & Return Policy</Link>
            </li>
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms">Terms and Conditions</Link>
            </li>
          </ul>
        </div>

        {/* Column 4 */}
        <div className="footer-column contact">
          <h3>Contact Us</h3>
          <ul>
            <li>
              <i className="bi bi-telephone"></i> +91-7688800202
            </li>
            <li>
              <i className="bi bi-telephone"></i> +91-7688800303
            </li>
            <li>
              <i className="bi bi-envelope"></i> theamarayurveda@gmail.com
            </li>
            <li>
              <i className="bi bi-geo-alt"></i> Amar Ayurveda, 1st floor,
              Bharat Apartments, Vaishali Nagar, Jaipur, Rajasthan 302021
            </li>
            {/* <li>
              <img
                src={footerLogo}
                alt="Footer Logo"
                className="footer-logo"
              />
            </li> */}
          </ul>
        </div>
      </div>

      {/* Copyright Row */}
      <div className="footer-bottom">
        <p>
          Copyright © 2024 Amarvira Ayurvedic Pvt. Ltd. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
