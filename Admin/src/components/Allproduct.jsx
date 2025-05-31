import "../CSS/Allproduct.css";
import { useSelector } from "react-redux";
import { FiTrash2 } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";

export default function Allproduct() {
  const { data: products } = useSelector((state) => state.cart);
  const [currentSlides, setCurrentSlides] = useState({});
  const slidesInitialized = useRef(false);

  // Initialize currentSlides state
  useEffect(() => {
    if (!products || slidesInitialized.current) return;
    
    const newSlides = {};
    products.forEach((product) => {
      newSlides[product._id] = 0;
    });

    setCurrentSlides(newSlides);
    slidesInitialized.current = true;
  }, [products]);

  // Handle automatic sliding
  useEffect(() => {
    if (!products || !slidesInitialized.current) return;

    const intervals = {};
    
    products.forEach((product) => {
      intervals[product._id] = setInterval(() => {
        setCurrentSlides(prev => ({
          ...prev,
          [product._id]: (prev[product._id] + 1) % product.photos.length
        }));
      }, 3000);
    });

    return () => {
      Object.values(intervals).forEach(interval => clearInterval(interval));
    };
  }, [products]);

  // Function to calculate discounted price
  const calculateDiscountedPrice = (actualPrice, discount) => {
    return Math.round(actualPrice - (actualPrice * discount) / 100);
  };

  // Function to parse JSON string arrays
  const parseJSONString = (str) => {
    try {
      if (typeof str === 'string') {
        const cleaned = str[0] === '[' ? JSON.parse(str) : str;
        return Array.isArray(cleaned) ? cleaned : [cleaned];
      }
      return Array.isArray(str) ? str : [str];
    } catch {
      return [];
    }
  };

  return (
    <div className="all-products-container">
      <h1>All Products</h1>
      <div className="products-grid">
        {products?.map((product, index) => (
          <div key={product._id || index} className="product-card">
            <div className="product-image">
              <div className="slider-container">
                {product.photos.map((photo, photoIndex) => (
                  <img
                    key={photoIndex}
                    src={photo}
                    alt={`${product.productName} - ${photoIndex + 1}`}
                    loading="lazy"
                    className={photoIndex === currentSlides[product._id] ? 'active' : ''}
                  />
                ))}
                <div className="slider-dots">
                  {product.photos.map((_, photoIndex) => (
                    <span
                      key={photoIndex}
                      className={`dot ${photoIndex === currentSlides[product._id] ? 'active' : ''}`}
                      onClick={() => setCurrentSlides(prev => ({
                        ...prev,
                        [product._id]: photoIndex
                      }))}
                    />
                  ))}
                </div>
              </div>
              <button className="delete-btn">
                <FiTrash2 />
              </button>
            </div>
            <div className="product-info">
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

              {product.type && (
                <div className="packaging-type">
                  Type: <span>{product.type}</span>
                </div>
              )}

              <p className="product-description">{product.description}</p>
              
              <div className="product-lists">
                <div className="ingredients">
                  <h4>Ingredients</h4>
                  <ul>
                    {parseJSONString(product.ingredients).map((ingredient, i) => (
                      <li key={i}>{ingredient}</li>
                    ))}
                  </ul>
                </div>

                <div className="benefits">
                  <h4>Benefits</h4>
                  <ul>
                    {parseJSONString(product.benefits).map((benefit, i) => (
                      <li key={i}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
