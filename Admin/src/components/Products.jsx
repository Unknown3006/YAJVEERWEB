import React, { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import '../CSS/Products.css';

const Products = () => {
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  
  const handleArrayInput = (index, value, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  
  const addArrayField = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  
  const removeArrayField = (index, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + formData.photos.length > 7) {
      alert('You can only upload up to 7 photos');
      return;
    }
    
    const newPhotos = files.map(file => URL.createObjectURL(file));
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...newPhotos]
    }));
  };

 
  const handleEditProduct = (product) => {
    setFormData(product);
    setIsEditing(true);
    setEditingId(product.id);
    setShowForm(true);
  };

  
  const resetForm = () => {
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
    setIsEditing(false);
    setEditingId(null);
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update existing product
      setProducts(prev => 
        prev.map(product => 
          product.id === editingId ? { ...formData, id: editingId } : product
        )
      );
    } else {
      
      setProducts(prev => [...prev, { ...formData, id: Date.now() }]);
    }
    setShowForm(false);
    resetForm();
  };

  
  const handleDeleteProduct = (productId) => {
    setProducts(prev => prev.filter(product => product.id !== productId));
  };

  
  const handleCloseForm = () => {
    setShowForm(false);
    resetForm();
  };

  return (
    <div className="products-container">
      <div className="products-header">
        <h1>Products</h1>
        <button className="add-product-btn" onClick={() => setShowForm(true)}>
          <FiPlus /> Add Product
        </button>
      </div>

      
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
              
              
              {product.ingredients && product.ingredients.length > 0 && (
                <div className="product-details">
                  <h4>Ingredients:</h4>
                  <ul className="details-list">
                    {product.ingredients.map((ingredient, index) => (
                      ingredient && <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
              )}

              
              {product.benefits && product.benefits.length > 0 && (
                <div className="product-details">
                  <h4>Benefits:</h4>
                  <ul className="details-list">
                    {product.benefits.map((benefit, index) => (
                      benefit && <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="product-actions">
              <button 
                className="edit-btn"
                onClick={() => handleEditProduct(product)}
              >
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

      
      {showForm && (
        <div className="modal-overlay" onClick={(e) => {
          if (e.target.className === 'modal-overlay') {
            handleCloseForm();
          }
        }}>
          <div className="modal-content">
            <button className="modal-close-btn" onClick={handleCloseForm}>
              <FiX />
            </button>
            <h2>{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSubmit} className="product-form">
              
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
                <button type="button" onClick={handleCloseForm} className="cancel-btn">
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  {isEditing ? 'Update Product' : 'Add Product'}
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