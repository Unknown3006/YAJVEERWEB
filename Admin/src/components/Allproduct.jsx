import "../CSS/Allproduct.css";
import { useSelector, useDispatch } from "react-redux";
import { FiMenu } from "react-icons/fi";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Allproduct() {
  const { data: products } = useSelector((state) => state.cart);
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarHidden(!isSidebarHidden);
    document.body.classList.toggle('sidebar-hidden');
  };

  const calculateDiscountedPrice = (actualPrice, discount) => {
    return Math.round(actualPrice - (actualPrice * discount) / 100);
  };

  if (!products?.length) {
    return (
      <>
        <button 
          className="sidebar-toggle" 
          onClick={toggleSidebar} 
          aria-label="Toggle Sidebar"
        >
          <FiMenu />
        </button>
        <div className="all-products-container">
          <h1>All Products</h1>
          <p className="no-products">No products available</p>
        </div>
      </>
    );
  }

  return (
    <>
      <button 
        className="sidebar-toggle" 
        onClick={toggleSidebar} 
        aria-label="Toggle Sidebar"
      >
        <FiMenu />
      </button>
      <div className={`all-products-container ${isSidebarHidden ? 'sidebar-hidden' : ''}`}>
        <h1>All Products</h1>
        <div className="products-grid">
          {products?.map((product) => (
            <div key={product._id} className="product-card">
              <div className="product-image">
                <img
                  src={product.photos[0]}
                  alt={product.productName}
                  className="product-img"
                />
              </div>
              <div className="product-info-preview">
                <h3 className="product-name">{product.productName}</h3>
                <div className="price-info">
                  <div className="prices">
                    <span className="actual-price">₹{product.actualPrice}</span>
                    {product.discount > 0 && (
                      <span className="discounted-price">
                        ₹{calculateDiscountedPrice(product.actualPrice, product.discount)}
                      </span>
                    )}
                  </div>
                  {product.discount > 0 && (
                    <span className="discount-badge">{product.discount}% OFF</span>
                  )}
                </div>
                <Link to={`/admin/products/product/${product._id}`} className="details-button">
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
