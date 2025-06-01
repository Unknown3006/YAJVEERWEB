import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Fectchdata } from '../Redux/CartSlice'; // Assuming this is your data fetching thunk
import '../CSS/ProductDetails.css'; // We'll create this CSS file
import LoadingAnimation from './LoadingAnimation';
import { FiArrowLeft, FiTrash2, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: products, loading: productsLoading, error: productsError } = useSelector((state) => state.cart);

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Find the product from the Redux store or fetch if not available (basic example)
  useEffect(() => {
    if (products && products.length > 0) {
      const foundProduct = products.find(p => p._id === id);
      setProduct(foundProduct);
    } else if (!productsLoading) {
      // Optionally, fetch single product if not in store, or rely on Fectchdata to get all
      // For simplicity, we assume Fectchdata gets all products
      // If you have an endpoint for a single product, you can call it here.
    }
  }, [products, id, productsLoading]);

  const calculateDiscountedPrice = (actualPrice, discount) => {
    return Math.round(actualPrice - (actualPrice * discount) / 100);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Replace with your actual API endpoint for deleting a product
      await axios.delete(`${import.meta.env.VITE_SERVER}/api/v1/products/admin/deleteproduct/${id}`, { withCredentials: true });
      dispatch(Fectchdata()); // Refresh the product list
      navigate('/admin/products'); // Navigate back to the products list
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete product. Please try again.');
      console.error('Delete error:', err);
    } finally {
      setIsLoading(false);
      setShowDeleteConfirm(false);
    }
  };

  const nextImage = useCallback(() => {
    if (product && product.photos && product.photos.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.photos.length);
    }
  }, [product]);

  const prevImage = () => {
    if (product && product.photos && product.photos.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.photos.length) % product.photos.length);
    }
  };
  
  // Auto slide functionality
  useEffect(() => {
    if (!product || !product.photos || product.photos.length <= 1) return;
    const timer = setInterval(nextImage, 5000); // Change image every 5 seconds
    return () => clearInterval(timer);
  }, [product, nextImage]);

  // Helper to parse potentially stringified JSON arrays (like ingredients, benefits)
  const parseArrayField = (field) => {
    if (!field) return [];
    if (Array.isArray(field)) return field;
    try {
      const parsed = JSON.parse(field);
      return Array.isArray(parsed) ? parsed : [parsed.toString()];
    } catch (e) {
      return [field.toString()]; // Fallback if not JSON
    }
  };

  if (productsLoading || isLoading) {
    return <LoadingAnimation />;
  }

  if (productsError) {
    return <div className="error-message">Error loading product details: {productsError.message || 'Unknown error'}</div>;
  }

  if (!product) {
    return <div className="product-not-found">Product not found. It might have been removed or the ID is incorrect.</div>;
  }

  const ingredientsList = parseArrayField(product.ingredients);
  const benefitsList = parseArrayField(product.benefits);

  return (
    <div className="product-details-container">
      <button onClick={() => navigate('/admin/products')} className="back-to-products-btn">
        <FiArrowLeft /> Back to Products
      </button>

      {error && <div className="error-message main-error-message">{error}</div>}

      <div className="product-details-card">
        <div className="product-gallery-detailed">
          {product.photos && product.photos.length > 0 ? (
            <>
              <img 
                src={product.photos[currentImageIndex]} 
                alt={`${product.productName} - Image ${currentImageIndex + 1}`} 
                className="main-product-image-detailed"
              />
              {product.photos.length > 1 && (
                <>
                  <button onClick={prevImage} className="gallery-nav-btn prev-btn"><FiChevronLeft /></button>
                  <button onClick={nextImage} className="gallery-nav-btn next-btn"><FiChevronRight /></button>
                  <div className="image-thumbnails-detailed">
                    {product.photos.map((photo, index) => (
                      <img
                        key={index}
                        src={photo}
                        alt={`Thumbnail ${index + 1}`}
                        className={`thumbnail-image ${index === currentImageIndex ? 'active' : ''}`}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <img src="placeholder-image.jpg" alt="Placeholder" className="main-product-image-detailed placeholder" />
          )}
        </div>

        <div className="product-info-section-detailed">
          <h1 className="product-title-detailed">{product.productName}</h1>
          
          <div className="price-section-detailed">
            <span className="current-price-detailed">
              ₹{calculateDiscountedPrice(product.actualPrice, product.discount)}
            </span>
            {product.discount > 0 && (
              <span className="original-price-detailed">₹{product.actualPrice}</span>
            )}
            {product.discount > 0 && (
              <span className="discount-badge-detailed">{product.discount}% OFF</span>
            )}
          </div>

          {product.description && (
            <div className="description-section-detailed">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>
          )}

          {ingredientsList.length > 0 && (
            <div className="list-section-detailed">
              <h3>Ingredients</h3>
              <ul>
                {ingredientsList.map((item, index) => <li key={`ing-${index}`}>{item}</li>)}
              </ul>
            </div>
          )}

          {benefitsList.length > 0 && (
            <div className="list-section-detailed">
              <h3>Benefits</h3>
              <ul>
                {benefitsList.map((item, index) => <li key={`ben-${index}`}>{item}</li>)}
              </ul>
            </div>
          )}
          
          {/* Add other product fields here as needed */}
          {/* Example: product.type, product.category etc. */}
          {product.type && <p><strong>Type:</strong> {product.type}</p>}

          <div className="delete-section">
            {!showDeleteConfirm ? (
              <button onClick={() => setShowDeleteConfirm(true)} className="delete-btn initial-delete-btn">
                <FiTrash2 /> Delete Product
              </button>
            ) : (
              <div className="confirm-delete-actions">
                <p>Are you sure you want to delete this product?</p>
                <button onClick={handleDelete} className="delete-btn confirm-delete-btn" disabled={isLoading}>
                  {isLoading ? 'Deleting...' : 'Yes, Delete'}
                </button>
                <button onClick={() => setShowDeleteConfirm(false)} className="delete-btn cancel-delete-btn" disabled={isLoading}>
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;