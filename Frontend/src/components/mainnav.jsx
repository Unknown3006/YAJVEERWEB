import React, { useState } from 'react';
import "../CSS/mainNav.css";
import { Link } from "react-router";

export default function MainNav() {
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleDropdownClick = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  return (
    <nav className="mainNav">
      <div className="left">
        <div className="items deep-inner-button">
          <div 
            className="title"
            onClick={() => handleDropdownClick('category')}
          >
            <p>
              All Category{" "}
              <i className="bi bi-caret-down-fill" style={{ fontSize: "1rem" }}></i>
            </p>
          </div>
          {openDropdown === 'category' && (
            <div className="Menulist">
              <p>Herbal Powder</p>
              <p>Karela powder</p>
            </div>
          )}
        </div>
      </div>

      <div className="mid">
        <div className="home deep-inner-button">
          <Link to='/'>
            <p>Home</p>
          </Link>
        </div>
        <div className="dp deep-inner-button">
          <div 
            className="title"
            onClick={() => handleDropdownClick('powder')}
          >
            <p>
              Powder{" "}
              <i className="bi bi-caret-down-fill" style={{ fontSize: "1rem" }}></i>
            </p>
          </div>
          {openDropdown === 'powder' && (
            <div className="Menulist">
              <p>Herbal Powder</p>
              <p>Karela powder</p>
            </div>
          )}
        </div>

        <div className="pack deep-inner-button">
          <div 
            className="title"
            onClick={() => handleDropdownClick('packets')}
          >
            <p>
              Packets{" "}
              <i className="bi bi-caret-down-fill" style={{ fontSize: "1rem" }}></i>
            </p>
          </div>
          {openDropdown === 'packets' && (
            <div className="Menulist">
              <p>Herbal Powder</p>
              <p>Karela powder</p>
            </div>
          )}
        </div>
        <div className="use deep-inner-button">
          <p>Instructions</p>
        </div>
        
        <div className="review deep-inner-button">
          <Link to="/reviewForm"><p>Reviews</p></Link>
        </div>
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
