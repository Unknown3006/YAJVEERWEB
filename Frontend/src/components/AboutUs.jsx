import React, { useState } from 'react';
import '../CSS/AboutUs.css';
import yajveerLogo from '../assets/yajveer-logo.jpg';
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from './navbar';
import Navbar2 from './navbar2';
import MainNav from './mainnav';
import Footer from './Footer/Footer';
import Sidebar from './Home/sidebar';
import Sidebar1 from './Home/sidebar1';

function AboutUs() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const handleOpenSidebar = () => setSidebarOpen(true);
  const handleCloseSidebar = () => setSidebarOpen(false);
  
  return (
    <>
      {isSidebarOpen && <Sidebar1 onClose={handleCloseSidebar} />}
      <Sidebar onOpenSidebar={handleOpenSidebar} />
      <Navbar />
      <Navbar2></Navbar2>
      <MainNav></MainNav>
      <div className="about-section">
      <div className="about-container">
        <div className="about-header">
          <h1>About Yajveer</h1>
          <p>Empowering Health Through Nature's Wisdom</p>
        </div>

        <div className="about-content">
          <div className="about-card">
            <h3>Our Story</h3>
            <p>Founded with a vision to bring the ancient wisdom of natural healing to modern wellness, Yajveer has been at the forefront of providing premium quality Ayurvedic and herbal products. Our journey began with a simple mission: to make traditional healing accessible to everyone.</p>
          </div>

          <div className="about-card">
            <h3>Our Mission</h3>
            <p>We are committed to promoting holistic wellness through carefully crafted natural products. Each product in our range is developed with extensive research, combining traditional knowledge with modern scientific methods.</p>
          </div>
        </div>

        <div className="about-image">
          <img src={yajveerLogo} alt="Yajveer Store" />
        </div>

        <div className="values-section">
          <div className="about-header">
            <h1>Our Values</h1>
          </div>
          
          <div className="value-cards">
            <div className="value-card">
                <i className="bi bi-heart-pulse"></i>
                <h3>Quality</h3>
                <p>We never compromise on the quality of our products, ensuring each item meets the highest standards.</p>
            </div>

            <div className="value-card">
                <i className="bi bi-tree"></i>
                <h3>Sustainability</h3>
                <p>Our commitment to the environment is reflected in our eco-friendly practices and packaging.</p>
            </div>

            <div className="value-card">
                <i className="bi bi-shield-check"></i>
                <h3>Trust</h3>
                <p>Building lasting relationships through transparency and authenticity in everything we do.</p>
            </div>

            <div className="value-card">
                <i className="bi bi-flower1"></i>
                <h3>100% Indigenous and Ayurvedic</h3>
                <p>Our products are purely based on traditional Ayurvedic principles and indigenous herbs.</p>
            </div>

            <div className="value-card">
                <i className="bi bi-patch-check"></i>
                <h3>No Harmful Side Effects</h3>
                <p>All our products are natural and free from any harmful chemicals or adverse effects.</p>
            </div>

            <div className="value-card">
                <i className="bi bi-shield-fill-check"></i>
                <h3>Safe and Effective</h3>
                <p>Scientifically tested formulations ensuring both safety and effectiveness.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
    </>
  );
}

export default AboutUs;