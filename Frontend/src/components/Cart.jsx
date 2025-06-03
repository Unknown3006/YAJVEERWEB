import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, updateQuantity, clearCart } from '../Redux/CartSlice';
import { toast } from 'react-hot-toast';
import Navbar from './navbar';
import Navbar2 from './navbar2';
import MainNav from './mainnav';
import Footer from './Footer/Footer';
import Sidebar from './Home/sidebar';
import Sidebar1 from './Home/sidebar1';
import '../CSS/Cart.css';

export default function Cart() {
  const dispatch = useDispatch();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const cartItems = useSelector(state => state.cart.items);
  const cartTotal = useSelector(state => 
    state.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0)
  );

  const handleOpenSidebar = () => setSidebarOpen(true);
  const handleCloseSidebar = () => setSidebarOpen(false);

  const handleQuantityChange = (item, change) => {
    const newQuantity = item.quantity + change;
    if (newQuantity <= 0) {
      dispatch(removeFromCart({
        _id: item._id,
        selectedWeight: item.selectedWeight
      }));
      toast.success('Item removed from cart');
    } else {
      dispatch(updateQuantity({
        _id: item._id,
        selectedWeight: item.selectedWeight,
        quantity: newQuantity
      }));
    }
  };

  const handleRemoveItem = (item) => {
    dispatch(removeFromCart({
      _id: item._id,
      selectedWeight: item.selectedWeight
    }));
    toast.success('Item removed from cart');
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success('Cart cleared');
  };

  const handleCheckout = () => {
    // Save cart items to local storage before checkout
    localStorage.setItem('checkoutItems', JSON.stringify(cartItems));
    toast.success('Proceeding to checkout!');
  };

  return (
    <>
      {isSidebarOpen && <Sidebar1 onClose={handleCloseSidebar} />}
      <Sidebar onOpenSidebar={handleOpenSidebar} />
      <Navbar />
      <Navbar2 />
      <MainNav />
      <div className="cart-container">
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <Link to="/" className="continue-shopping">Continue Shopping</Link>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={`${item._id}-${item.selectedWeight}`} className="cart-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.productName} />
                  </div>
                  <div className="item-details">
                    <h3>{item.productName}</h3>
                    <p>Weight: {item.selectedWeight}</p>
                    <p>Price: ₹{item.price}</p>
                    <div className="quantity-controls">
                      <button onClick={() => handleQuantityChange(item, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item, 1)}>+</button>
                    </div>
                    <p>Total: ₹{item.price * item.quantity}</p>
                    <button 
                      className="remove-item"
                      onClick={() => handleRemoveItem(item)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <div className="cart-total">
                <h3>Cart Total: ₹{cartTotal}</h3>
              </div>
              <div className="cart-actions">
                <button className="clear-cart" onClick={handleClearCart}>
                  Clear Cart
                </button>
                <button className="checkout-button" onClick={handleCheckout}>
                  Proceed to Checkout (₹{cartTotal})
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}