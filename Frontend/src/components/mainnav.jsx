import React, { useState, useRef } from 'react';
import "../CSS/mainNav.css";
import { Link } from "react-router";
import { useClickOutside } from '../hooks/useClickOutside';

export default function MainNav() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const categoryRef = useRef(null);
  const powderRef = useRef(null);
  const packetsRef = useRef(null);

  useClickOutside(categoryRef, () => {
    if (openDropdown === 'category') setOpenDropdown(null);
  });

  useClickOutside(powderRef, () => {
    if (openDropdown === 'powder') setOpenDropdown(null);
  });

  useClickOutside(packetsRef, () => {
    if (openDropdown === 'packets') setOpenDropdown(null);
  });

  const handleDropdownClick = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  return (
    <nav className="mainNav">
      <div className="left">
        <div className="items deep-inner-button" ref={categoryRef}>
          {/* Made the entire title div clickable */}
          <div
            className="title"
            onClick={() => handleDropdownClick('category')}
            style={{ cursor: 'pointer', width: '100%' }}
          >
            <p>
              All Category{" "}
              <i className="bi bi-caret-down-fill" style={{ fontSize: "1rem" }}></i>
            </p>
          </div>          <div className={`Menulist ${openDropdown === 'category' ? 'active' : ''}`}>
            <p>Herbal Powder</p>
            <p>Karela powder</p>
          </div>
        </div>
      </div>      <div className="mid">
        <Link to="/" className="nav-link deep-inner-button">
          <p>Home</p>
        </Link>

        <div className="dp deep-inner-button" ref={powderRef}>
          <div className="title" onClick={() => handleDropdownClick('powder')}>
            <p>
              Powder <i className="bi bi-caret-down-fill"></i>
            </p>
          </div>
          <div className={`Menulist ${openDropdown === 'powder' ? 'active' : ''}`}>
            <Link to="/herbal-powder" className="dropdown-link"><p>Herbal Powder</p></Link>
            <Link to="/karela-powder" className="dropdown-link"><p>Karela powder</p></Link>
          </div>
        </div>

        <div className="pack deep-inner-button" ref={packetsRef}>
          <div className="title" onClick={() => handleDropdownClick('packets')}>
            <p>
              Packets <i className="bi bi-caret-down-fill"></i>
            </p>
          </div>
          <div className={`Menulist ${openDropdown === 'packets' ? 'active' : ''}`}>
            <Link to="/herbal-packets" className="dropdown-link"><p>Herbal Powder</p></Link>
            <Link to="/karela-packets" className="dropdown-link"><p>Karela powder</p></Link>
          </div>
        </div>

        <Link to="/instructions" className="nav-link deep-inner-button">
          <p>Instructions</p>
        </Link>

        <Link to="/reviewForm" className="nav-link deep-inner-button">
          <p>Reviews</p>
        </Link>
      </div>

      <div className="right">
        <div className="mail deep-inner-button">
          <i className="bi bi-envelope"></i>
          <p>Contact</p>
        </div>
        <div className="call deep-inner-button">
          <i className="bi bi-telephone"></i>
          <p>Call </p>
        </div>
      </div>
    </nav>
  );
}
