import React, { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import '../CSS/Products.css';

const Products = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="products-container">
      <div className="products-header">
        <h1>Products</h1>
        <button className="add-product-btn" onClick={() => setShowForm(true)}>
          <FiPlus /> Add Product
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={(e) => {
          // Close modal when clicking on overlay
          if (e.target.className === 'modal-overlay') {
            setShowForm(false);
          }
        }}>
          <div className="modal-content">
            <button className="modal-close-btn" onClick={() => setShowForm(false)}>
              <FiX />
            </button>
            <h2>Add New Product</h2>
            {/* Add your form fields here */}
            <form>
              <div className="form-group">
                <label htmlFor="productName">Product Name</label>
                <input type="text" id="productName" name="productName" required />
              </div>
              <div className="form-group">
                <label htmlFor="productDescription">Description</label>
                <textarea id="productDescription" name="productDescription" required></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="productImage">Image</label>
                <input type="file" id="productImage" name="productImage" accept="image/*" />
              </div>
              <div className="form-group">
                <label htmlFor="productPrice">Price</label>
                <input type="number" id="productPrice" name="productPrice" required />
              </div>
              <button type="submit" className="submit-btn">
                <AiOutlineCloudUpload /> Upload Product
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Product List will go here */}
      <div className="products-list">
        {/* We'll add the product list implementation later */}
      </div>
    </div>
  );
};

export default Products;