import React, { useState } from "react";
import "../../CSS/Footer/ContactUs.css";
import Navbar from "../navbar";
import Navbar2 from "../navbar2";
import MainNav from "../mainnav";
import Footer from "./Footer";
import Sidebar from "../Home/sidebar";
import Sidebar1 from "../Home/sidebar1";

const ContactUs = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const handleOpenSidebar = () => setSidebarOpen(true);
    const handleCloseSidebar = () => setSidebarOpen(false);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState("Select a subject");
    
    const subjects = ["General Inquiry", "Product Information", "Order Status", "Other"];

    const handleSubjectSelect = (subject) => {
        setSelectedSubject(subject);
        setIsDropdownOpen(false);
    };

    return (
        <>
            {isSidebarOpen && <Sidebar1 onClose={handleCloseSidebar} />}
            <Sidebar onOpenSidebar={handleOpenSidebar} />
            <Navbar />
            <Navbar2></Navbar2>
            <MainNav></MainNav>
            
            <div className="contact-container">
                <div className="map-container">                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3718.053170918609!2d72.96525697530076!3d21.269362779471205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be046985d6c0e71%3A0xad929c7d3ca842d9!2sMG%20Dreams!5e0!3m2!1sen!2sin!4v1747919794962!5m2!1sen!2sin"
                        style={{border: 0}}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>

                <div className="form-container">
                    <h2 className="form-title">Contact Us</h2>
                    <form className="contact-form">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input 
                                type="text" 
                                id="name" 
                                name="name" 
                                placeholder="Enter your name"
                                required 
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                placeholder="Enter your email"
                                required 
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input 
                                type="tel" 
                                id="phone" 
                                name="phone" 
                                placeholder="Enter your phone number"
                                required 
                            />
                        </div>

                        <div className="form-group">
                            <label>Subject</label>
                            <div className="subject-select-container">
                                <div 
                                    className="selected-option"
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                >
                                    {selectedSubject}
                                    <i className={`bi bi-caret-down-fill ${isDropdownOpen ? 'rotate' : ''}`}></i>
                                </div>
                                <div className={`options-list ${isDropdownOpen ? 'show' : ''}`}>
                                    {subjects.map((subject, index) => (
                                        <div 
                                            key={index} 
                                            className="option"
                                            onClick={() => handleSubjectSelect(subject)}
                                        >
                                            {subject}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea 
                                id="message" 
                                name="message" 
                                rows="5" 
                                placeholder="Enter your message"
                                required
                            ></textarea>
                        </div>

                        <button type="submit" className="submit-btn">
                            Submit
                        </button>
                    </form>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default ContactUs;