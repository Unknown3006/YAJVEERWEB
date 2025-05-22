// import React, { useState, useRef, useEffect } from 'react';
// import "../../CSS/Footer/ContactUs.css";
// import Navbar from '../Navbar';
// import Navbar2 from '../Navbar2';
// import MainNav from '../Footer/MainNav';
// import Footer from './Footer';
// import Sidebar from '../Home/sidebar';
// import Sidebar1 from '../Home/sidebar1';
import React, { useState,useRef,useEffect } from 'react';
import "../../CSS/Footer/ContactUs.css";
import Navbar from '../Navbar';
import Navbar2 from '../Navbar2';
import MainNav from '../MainNav';
import Footer from '../Footer/Footer';
import Sidebar from '../Home/sidebar';
import Sidebar1 from '../Home/sidebar1';

function ContactUs() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '', 
        message: ''
    });
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState('');
    const dropdownRef = useRef(null);

    const handleOpenSidebar = () => setSidebarOpen(true);
    const handleCloseSidebar = () => setSidebarOpen(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log('Form submitted:', formData);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Add click outside handler
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            {isSidebarOpen && <Sidebar1 onClose={handleCloseSidebar} />}
            <Sidebar onOpenSidebar={handleOpenSidebar} />
            <Navbar />
            <Navbar2 />
            <MainNav />

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
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Your Phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
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
                                            setFormData({...formData, subject: 'delivery'});
                                        }}>Delivery & Order</p>
                                        <p onClick={() => {
                                            setSelectedSubject('Diet & Exercise');
                                            setIsDropdownOpen(false);
                                            setFormData({...formData, subject: 'diet'});
                                        }}>Diet & Exercise</p>
                                        <p onClick={() => {
                                            setSelectedSubject('Share Your Success');
                                            setIsDropdownOpen(false);
                                            setFormData({...formData, subject: 'success'});
                                        }}>Share Your Success</p>
                                        <p onClick={() => {
                                            setSelectedSubject('Wholesale And Returns');
                                            setIsDropdownOpen(false);
                                            setFormData({...formData, subject: 'wholesale'});
                                        }}>Wholesale And Returns</p>
                                    </div>
                                )}
                            </div>
                            <div className="form-group">
                                <textarea
                                    name="message"
                                    placeholder="Your Message"
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
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