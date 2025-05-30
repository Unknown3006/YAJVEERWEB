import React, { useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiX } from "react-icons/fi";
import { AiOutlineCloudUpload } from "react-icons/ai";
import ErrorPopup from "./ErrorPopup";
import "../CSS/Products.css";
import LoadingAnimation from "./LoadingAnimation";
import axios from "axios";

const Products = () => {
  const [showForm, setShowForm] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    photos: [],
    productName: "",
    description: "",
    discount: 0,
    ingredients: [""],
    benefits: [""],
    actualPrice: "",
    files: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleArrayInput = (index, value, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const addArrayField = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeArrayField = (index, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + formData.photos.length > 7) {
      setPopupMessage("You can only upload up to 7 photos");
      return;
    }

    const newPhotos = files.map((file) => URL.createObjectURL(file));
    setFormData((prev) => ({
      ...prev,
      photos: [...prev.photos, ...newPhotos],
      files: [...prev.files, ...files], // Store actual File objects
    }));
  };

  const validateForm = () => {
    if (!formData.productName.trim()) {
      setPopupMessage("Product name is required");
      return false;
    }
    if (!formData.description.trim()) {
      setPopupMessage("Description is required");
      return false;
    }
    if (!formData.actualPrice || formData.actualPrice <= 0) {
      setPopupMessage("Valid price is required");
      return false;
    }
    if (formData.discount < 0 || formData.discount > 100) {
      setPopupMessage("Discount must be between 0 and 100");
      return false;
    }
    if (formData.ingredients.some((ing) => !ing.trim())) {
      setPopupMessage("All ingredients must be filled");
      return false;
    }
    if (formData.benefits.some((ben) => !ben.trim())) {
      setPopupMessage("All benefits must be filled");
      return false;
    }
    return true;
  };

  const resetForm = () => {
    setFormData({
      photos: [],
      productName: "",
      description: "",
      discount: 0,
      ingredients: [""],
      benefits: [""],
      actualPrice: "",
      files: [],
      rating: 0,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("productName", formData.productName);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("discount", formData.discount);
      formDataToSend.append("actualPrice", formData.actualPrice);
      formDataToSend.append(
        "ingredients",
        JSON.stringify(formData.ingredients.filter((ing) => ing.trim()))
      );
      formDataToSend.append(
        "benefits",
        JSON.stringify(formData.benefits.filter((ben) => ben.trim()))
      );

      formData.files.forEach((file, index) => {
        formDataToSend.append("photos", file);
      });

      await axios.post(
        `${import.meta.env.VITE_SERVER}/api/v1/products/admin/addproducts`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      setShowForm(false);
      resetForm();
      setPopupMessage("Product successfully added!");
    } catch (error) {
      setPopupMessage(
        "Error adding product: " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    resetForm();
  };

  return (
    <>
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <div className="products-container">
          <div className="products-header">
            <h1>Products</h1>
            <button
              className="add-product-btn"
              onClick={() => setShowForm(true)}
            >
              <FiPlus /> Add Product
            </button>
          </div>

          <div className="products-grid">
            <p>Products will be displayed from database</p>
          </div>

          {showForm && (
            <div
              className="modal-overlay"
              onClick={(e) => {
                if (e.target.className === "modal-overlay") {
                  handleCloseForm();
                }
              }}
            >
              <div className="modal-content">
                <button className="modal-close-btn" onClick={handleCloseForm}>
                  <FiX />
                </button>
                <h2>Add New Product</h2>
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
                              setFormData((prev) => ({
                                ...prev,
                                photos: prev.photos.filter(
                                  (_, i) => i !== index
                                ),
                                files: prev.files.filter((_, i) => i !== index),
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
                    />
                  </div>

                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
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
                      />
                    </div>

                    <div className="form-group">
                      <label>Discount (%)</label>
                      <input
                        type="number"
                        name="discount"
                        value={formData.discount}
                        onChange={handleChange}
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
                          onChange={(e) =>
                            handleArrayInput(
                              index,
                              e.target.value,
                              "ingredients"
                            )
                          }
                          placeholder="Enter ingredient"
                        />
                        {formData.ingredients.length > 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              removeArrayField(index, "ingredients")
                            }
                            className="remove-btn"
                          >
                            <FiTrash2 />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addArrayField("ingredients")}
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
                          onChange={(e) =>
                            handleArrayInput(index, e.target.value, "benefits")
                          }
                          placeholder="Enter benefit"
                        />
                        {formData.benefits.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeArrayField(index, "benefits")}
                            className="remove-btn"
                          >
                            <FiTrash2 />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addArrayField("benefits")}
                      className="add-array-btn"
                    >
                      <FiPlus /> Add Benefit
                    </button>
                  </div>

                  <div className="form-actions">
                    <button
                      type="button"
                      onClick={handleCloseForm}
                      className="cancel-btn"
                    >
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
          <ErrorPopup
            message={popupMessage}
            onClose={() => setPopupMessage("")}
          />
        </div>
      )}
    </>
  );
};

export default Products;
