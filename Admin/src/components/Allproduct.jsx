import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../CSS/Allproduct.css'; // We'll create this CSS file
import LoadingAnimation from './LoadingAnimation'; // Assuming you have this

const Allproduct = () => {
  const { data: products, loading, error } = useSelector((state) => state.cart); // Assuming 'cart' slice holds products
  console.log(products);
  const calculateDiscountedPrice = (actualPrice, discount) => {
    return Math.round(actualPrice - (actualPrice * discount) / 100);
  };

  if (loading) {
    return <LoadingAnimation />;
  }

  if (error) {
    return <div className="error-message">Error loading products: {error.message || 'Unknown error'}</div>;
  }

  if (!products || products.length === 0) {
    return <div className="no-products-message">No products found.</div>;
  }

  return (
    <div className="all-products-container">
      <h1 className="page-title">All Products</h1>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <Link to={`/admin/products/${product._id}`} className="product-card-link">
              <div className="product-image-container">
                <img 
                  src={product.photos && product.photos.length > 0 ? product.photos[0] : 'placeholder-image.jpg'} 
                  alt={product.productName} 
                  className="product-image"
                />
              </div>
              <div className="product-info-preview">
                <h3 className="product-name-preview">{product.productName}</h3>
                <div className="price-details-preview">
                  <span className="current-price-preview">
                    ₹{calculateDiscountedPrice(product.actualPrice, product.discount)}
                  </span>
                  {product.discount > 0 && (
                    <span className="original-price-preview">₹{product.actualPrice}</span>
                  )}
                </div>
                {product.discount > 0 && (
                  <span className="discount-badge-preview">{product.discount}% OFF</span>
                )}
              </div>
            </Link>
            <Link to={`/admin/products/${product._id}`} className="details-button-link">
              <button className="details-button">Details</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Allproduct;
