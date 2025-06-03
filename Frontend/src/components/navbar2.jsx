import "../CSS/navabar2.css";
import Logo from "../assets/yajveer-logo.jpg";
import { useSelector } from 'react-redux';
import { selectCartItemsCount } from '../Redux/CartSlice';
import { Link } from 'react-router-dom';

export default function Navbar2() {
  const cartItemsCount = useSelector(selectCartItemsCount);
  return (
    <>
      <nav className="Navbar2">
        <div className="logo">
          <img src={Logo} alt="Yajveer" />
        </div>
        <div className="search">
          <div className="s1">
            <div className="list">
              <div className="title">
                <p>
                  All Categories{" "}
                  <i
                    className="bi bi-caret-down-fill"
                    style={{ fontSize: "1rem" }}
                  ></i>
                </p>
              </div>
              <div className="Menulist">
                <p>Herbal Powder</p>
                <p>Karela powder</p>
              </div>
            </div>
            <div className="content">
              <div className="input">
                <input type="text" placeholder="Search For the Product" />
              </div>
              <div className="s2">
                <div className="con">
                  <i className="bi bi-search fs-1"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="addtocart">
          <div className="like">
            <i className="bi bi-heart" style={{ color: "white" }}></i>
            <p>Wishlist</p>
          </div>
          <Link to="/cart" className="add">
            <div className="cart-icon-container" style={{ position: 'relative' }}>
              <i className="bi bi-cart-plus" style={{ color: "white" }}></i>
              {cartItemsCount > 0 && (
                <span className="cart-count" style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  background: '#ff4444',
                  color: 'white',
                  borderRadius: '50%',
                  padding: '2px 6px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  {cartItemsCount}
                </span>
              )}
            </div>
            <p>Cart</p>
          </Link>
        </div>
      </nav>
    </>
  );
}
