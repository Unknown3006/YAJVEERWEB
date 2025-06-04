import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../CSS/CheckoutForm.css';

const CheckoutForm = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    pincode: ''
  });

  const [errors, setErrors] = useState({});

  const cartTotal = useSelector(state => 
    state.cart.items.reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity) || 0;
      return total + (price * quantity);
    }, 0)
  ).toFixed(2);

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (!/^[a-zA-Z\s]{3,30}$/.test(formData.name)) {
      newErrors.name = 'Enter a valid name (3-30 characters)';
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    // Mobile validation
    if (!formData.mobile) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Enter a valid 10-digit mobile number';
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    } else if (formData.address.length < 10) {
      newErrors.address = 'Address should be at least 10 characters long';
    }

    // Pincode validation
    if (!formData.pincode) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^[0-9]{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Enter a valid 6-digit pincode';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      // Future payment implementation will go here
    }
  };

  const handleBackToCart = () => {
    navigate('/cart');
  };

  return (
    <div className="checkout-form-container">
      <div className="form-header">
        <h2>Checkout Details</h2>
        {/* <button 
          className="back-to-cart-btn"
          onClick={handleBackToCart}
          type="button"
        >
          Back to Cart
        </button> */}
      </div>
      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
            required
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
            required
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="mobile">Mobile Number</label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className={errors.mobile ? 'error' : ''}
            required
          />
          {errors.mobile && <span className="error-message">{errors.mobile}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="address">Delivery Address</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={errors.address ? 'error' : ''}
            required
          />
          {errors.address && <span className="error-message">{errors.address}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="pincode">Pincode</label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            className={errors.pincode ? 'error' : ''}
            maxLength="6"
            required
          />
          {errors.pincode && <span className="error-message">{errors.pincode}</span>}
        </div>

        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="total-amount">
            <span>Total Amount:</span>
            <span>₹{cartTotal}</span>
          </div>
        </div>

        <button type="submit" className="proceed-payment-btn">
          Proceed to Payment
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;