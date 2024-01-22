"use client";
import React, { useState } from "react";

const AddBike = ({ onBikeAdded }) => {
  const [bikeData, setBikeData] = useState({
    title: "",
    description: "",
    year: null,
    price: null,
    condition: "",
    availabilityStatus: false,
    color: "",
    category: "", // Added category property
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    setBikeData({ ...bikeData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setBikeData({ ...bikeData, [e.target.name]: e.target.checked });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setBikeData({ ...bikeData, image: reader.result });
      setImagePreview(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("image", bikeData.image);
      formData.append("title", bikeData.title);
      formData.append("description", bikeData.description);
      formData.append("year", bikeData.year);
      formData.append("price", bikeData.price);
      formData.append("condition", bikeData.condition);
      formData.append("availabilityStatus", bikeData.availabilityStatus);
      formData.append("color", bikeData.color);
      formData.append("category", bikeData.category); // Added category to formData

      // Simulate the API call
      console.log("Sending data:", Object.fromEntries(formData.entries()));

      setBikeData({
        title: "",
        description: "",
        year: null,
        price: null,
        condition: "",
        availabilityStatus: false,
        color: "",
        category: "", // Reset category after submission
        image: null,
      });

      setImagePreview(null);

      if (onBikeAdded) {
        onBikeAdded();
      }
    } catch (error) {
      console.error("Error saving bike:", error);
    }
  };

  return (
    <div className="container">
      <form encType="multipart/form-data">
        <div className="formContainer">
          <div className="section1">
            <input
              type="number"
              name="buyingPrice"
              placeholder="Buying Price"
              value={bikeData.buyingPrice}
              onChange={handleChange}
            />
            <input
              type="number"
              name="sellingPrice"
              placeholder="Selling Price"
              value={bikeData.sellingPrice}
              onChange={handleChange}
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={bikeData.price}
              onChange={handleChange}
            />
          </div>

          <div className="section2">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={bikeData.title}
              onChange={handleChange}
            />
            <input
              name="description"
              rows="4"
              placeholder="Description"
              value={bikeData.description}
              onChange={handleChange}
            />
            <input
              type="text"
              name="color"
              placeholder="Color"
              value={bikeData.color}
              onChange={handleChange}
            />
            <input
              type="number"
              name="year"
              placeholder="Year"
              value={bikeData.year}
              onChange={handleChange}
            />
            <input
              type="text"
              name="condition"
              placeholder="Condition"
              value={bikeData.condition}
              onChange={handleChange}
            />
          </div>

          <div className="section3">
            {/* <label className="availabilityStatus">
              <input
                type="checkbox"
                name="availabilityStatus"
                checked={bikeData.availabilityStatus}
                onChange={handleCheckboxChange}
              />
              Availability Status
            </label> */}
            <label className="category">
              {/* Category: */}
              <select
                name="category"
                value={bikeData.category}
                onChange={handleChange}
              >
                <option value="bikes">Bike</option>
                <option value="scooters">Scooter</option>
              </select>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ marginTop: "12px" }}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Bike Preview"
                style={{ maxWidth: "100%", marginTop: "10px" }}
                className="previewImg"
              />
            )}
          </div>
          <button className="submitButton" type="button" onClick={handleSubmit}>
            Save Bike
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBike;
