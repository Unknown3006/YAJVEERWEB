import React, { useState, useRef } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside';
import "../../CSS/Footer/ContactUs.css";
import Navbar from '../navbar';
import Navbar2 from '../navbar2';
import MainNav from '../mainnav';
import Footer from '../Footer/Footer';
import Sidebar from '../Home/sidebar';
import Sidebar1 from '../Home/sidebar1';

function ContactUs() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState('');
    const dropdownRef = useRef(null);

    useClickOutside(dropdownRef, () => setIsDropdownOpen(false));

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
            <div className="contact-container">
                <h1>Contact Us</h1>
                <div className="contact-content">
                    <div className="map-container">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15879.875528466388!2d72.96434355463337!3d21.267708210875632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be046985d6c0e71%3A0xad929c7d3ca842d9!2sMG%20Dreams!5e0!3m2!1sen!2sin!4v1747891642873!5m2!1sen!2sin" 
                            width="100%" 
                            height="100%"
                            style={{
                                border: 0,
                                borderRadius: '8px',
                                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                            }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>

                    <div className="contact-form">
                        <h2>Send us a Message</h2>
                        <form>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Your Phone"
                                    required
                                />
                            </div>
                            <div className="custom-select" ref={dropdownRef}>
                                <div 
                                    className="select-header" 
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                >
                                    {selectedSubject || 'Select Subject'}
                                </div>
                                {isDropdownOpen && (
                                    <div className="Menulist">
                                        <p onClick={() => {
                                            setSelectedSubject('Delivery & Order');
                                            setIsDropdownOpen(false);
                                        }}>Delivery & Order</p>
                                        <p onClick={() => {
                                            setSelectedSubject('Diet & Exercise');
                                            setIsDropdownOpen(false);
                                        }}>Diet & Exercise</p>
                                        <p onClick={() => {
                                            setSelectedSubject('Share Your Success');
                                            setIsDropdownOpen(false);
                                        }}>Share Your Success</p>
                                        <p onClick={() => {
                                            setSelectedSubject('Wholesale And Returns');
                                            setIsDropdownOpen(false);
                                        }}>Wholesale And Returns</p>
                                    </div>
                                )}
                            </div>
                            <div className="form-group">
                                <textarea
                                    name="message"
                                    placeholder="Your Message"
                                    required
                                ></textarea>
                            </div>
                            <button type="submit">Send Message</button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ContactUs;