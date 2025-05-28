import React, { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import '../CSS/Products.css';

const Products = () => {
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    photos: [],
    productName: '',
    description: '',
    discount: 0,
    ingredients: [''],
    benefits: [''],
    actualPrice: '',
    rating: 0
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle array inputs (ingredients and benefits)
  const handleArrayInput = (index, value, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  // Add new input field for arrays
  const addArrayField = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  // Remove array field
  const removeArrayField = (index, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + formData.photos.length > 7) {
      alert('You can only upload up to 7 photos');
      return;
    }
    // Convert files to URLs for preview
    const newPhotos = files.map(file => URL.createObjectURL(file));
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...newPhotos]
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add new product to the products array
    setProducts(prev => [...prev, { ...formData, id: Date.now() }]);
    // Reset form
    setFormData({
      photos: [],
      productName: '',
      description: '',
      discount: 0,
      ingredients: [''],
      benefits: [''],
      actualPrice: '',
      rating: 0
    });
    setShowForm(false);
  };

  // Handle product deletion
  const handleDeleteProduct = (productId) => {
    setProducts(prev => prev.filter(product => product.id !== productId));
  };

  return (
    <div className="products-container">
      <div className="products-header">
        <h1>Products</h1>
        <button className="add-product-btn" onClick={() => setShowForm(true)}>
          <FiPlus /> Add Product
        </button>
      </div>

      {/* Product List */}
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              {product.photos[0] && (
                <img src={product.photos[0]} alt={product.productName} />
              )}
            </div>
            <div className="product-info">
              <h3>{product.productName}</h3>
              <div className="product-price">
                <span className="actual-price">₹{product.actualPrice}</span>
                {product.discount > 0 && (
                  <span className="discount">-{product.discount}%</span>
                )}
              </div>
              <p className="product-description">{product.description}</p>
            </div>
            <div className="product-actions">
              <button className="edit-btn">
                <FiEdit2 /> Edit
              </button>
              <button 
                className="delete-btn"
                onClick={() => handleDeleteProduct(product.id)}
              >
                <FiTrash2 /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="modal-overlay" onClick={(e) => {
          if (e.target.className === 'modal-overlay') {
            setShowForm(false);
          }
        }}>
          <div className="modal-content">
            <button className="modal-close-btn" onClick={() => setShowForm(false)}>
              <FiX />
            </button>
            <h2>Add New Product</h2>
            <form onSubmit={handleSubmit} className="product-form">
              {/* Image Upload Section */}
              <div className="image-upload-section">
                <label className="upload-label">
                  <AiOutlineCloudUpload className="upload-icon" />
                  <span>Upload Photos (Max 7)</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                <div className="image-preview">
                  {formData.photos.map((photo, index) => (
                    <div key={index} className="preview-image">
                      <img src={photo} alt={`Preview ${index + 1}`} />
                      <button
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            photos: prev.photos.filter((_, i) => i !== index)
                          }));
                        }}
                        className="remove-image"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Basic Information */}
              <div className="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Actual Price (₹)</label>
                  <input
                    type="number"
                    name="actualPrice"
                    value={formData.actualPrice}
                    onChange={handleChange}
                    min="0"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Discount (%)</label>
                  <input
                    type="number"
                    name="discount"
                    value={formData.discount}
                    onChange={handleChange}
                    min="0"
                    max="100"
                  />
                </div>
              </div>

              {/* Ingredients Section */}
              <div className="form-group">
                <label>Ingredients</label>
                {formData.ingredients.map((ingredient, index) => (
                  <div key={index} className="array-input">
                    <input
                      type="text"
                      value={ingredient}
                      onChange={(e) => handleArrayInput(index, e.target.value, 'ingredients')}
                      placeholder="Enter ingredient"
                    />
                    {formData.ingredients.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayField(index, 'ingredients')}
                        className="remove-btn"
                      >
                        <FiTrash2 />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayField('ingredients')}
                  className="add-array-btn"
                >
                  <FiPlus /> Add Ingredient
                </button>
              </div>

              {/* Benefits Section */}
              <div className="form-group">
                <label>Benefits</label>
                {formData.benefits.map((benefit, index) => (
                  <div key={index} className="array-input">
                    <input
                      type="text"
                      value={benefit}
                      onChange={(e) => handleArrayInput(index, e.target.value, 'benefits')}
                      placeholder="Enter benefit"
                    />
                    {formData.benefits.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayField(index, 'benefits')}
                        className="remove-btn"
                      >
                        <FiTrash2 />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayField('benefits')}
                  className="add-array-btn"
                >
                  <FiPlus /> Add Benefit
                </button>
              </div>

              <div className="form-actions">
                <button type="button" onClick={() => setShowForm(false)} className="cancel-btn">
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;