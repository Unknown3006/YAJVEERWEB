
import React from 'react';
import "../CSS/ErrorPopup.css";

const ErrorPopup = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="error-popup">
      <div className="error-content">
        <span className="error-message">{message}</span>
        <button className="close-btn" onClick={onClose}>✖</button>
      </div>
    </div>
  );
};

export default ErrorPopup;
