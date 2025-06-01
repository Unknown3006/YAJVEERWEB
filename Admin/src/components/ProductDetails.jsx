import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FiArrowLeft, FiTrash2 } from "react-icons/fi";
import axios from "axios";
import { Fectchdata } from "../Redux/CartSlice";
import "../CSS/ProductDetails.css";
import LoadingAnimation from "./LoadingAnimation";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: products } = useSelector((state) => state.cart);
  
  const [product, setProduct] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  useEffect(() => {
    if (products?.length) {
      const foundProduct = products.find(p => p._id === id);
      if (foundProduct) {
        setProduct(foundProduct);
      }
    }
  }, [products, id]);

  // Auto slide functionality
  useEffect(() => {
    if (!product || product.photos.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % product.photos.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [product]);

  const calculateDiscountedPrice = (actualPrice, discount) => {
    return Math.round(actualPrice - (actualPrice * discount) / 100);
  };

  const handleDeleteProduct = async () => {
    if (!deleteConfirm) {
      setDeleteConfirm(true);
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER}/api/v1/products/admin/deleteproduct/${id}`,
        { withCredentials: true }
      );
      
      if (response.status === 200) {
        // Refresh products list
        dispatch(Fectchdata());
        navigate("/admin/products");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete product");
    } finally {
      setIsLoading(false);
      setDeleteConfirm(false);
    }
  };

  const parseJSONString = (jsonString) => {
    try {
      return JSON.parse(jsonString);
    } catch (e) {
      return [];
    }
  };

  if (isLoading) {
    return <LoadingAnimation />;
  }

  if (!product) {
    return (
      <div className="product-details-container">
        <div className="back-button" onClick={() => navigate("/admin/products")}>
          <FiArrowLeft /> Back to Products
        </div>
        <div className="product-not-found">
          <h2>Product not found</h2>
          <p>The product you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-details-container">
      {error && <div className="error-message">{error}</div>}
      
      <div className="back-button" onClick={() => navigate("/admin/products")}>
        <FiArrowLeft /> Back to Products
      </div>
      
      <div className="product-details-content">
        <div className="product-gallery">
          <div className="main-image-container">
            {product.photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`${product.productName} - ${index + 1}`}
                className={`main-image ${index === currentSlide ? 'active' : ''}`}
              />
            ))}
          </div>
          
          {product.photos.length > 1 && (
            <div className="image-thumbnails">
              {product.photos.map((photo, index) => (
                <div 
                  key={index} 
                  className={`thumbnail ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                >
                  <img src={photo} alt={`Thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="product-info-detailed">
          <h1 className="product-title">{product.productName}</h1>
          
          <div className="price-section">
            <div className="price-display">
              <span className="current-price">₹{calculateDiscountedPrice(product.actualPrice, product.discount)}</span>
              {product.discount > 0 && (
                <span className="original-price">₹{product.actualPrice}</span>
              )}
            </div>
            {product.discount > 0 && (
              <span className="discount-tag">{product.discount}% OFF</span>
            )}
          </div>
          
          <div className="packaging-info">
            <span className="info-label">Packaging Type:</span>
            <span className="info-value">{product.type}</span>
          </div>
          
          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>
          
          <div className="product-details-lists">
            <div className="ingredients-list">
              <h3>Ingredients</h3>
              <ul>
                {parseJSONString(product.ingredients).map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
            
            <div className="benefits-list">
              <h3>Benefits</h3>
              <ul>
                {parseJSONString(product.benefits).map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <button 
            className={`delete-product-btn ${deleteConfirm ? 'confirm' : ''}`}
            onClick={handleDeleteProduct}
          >
            <FiTrash2 />
            {deleteConfirm ? 'Confirm Delete' : 'Delete Product'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;