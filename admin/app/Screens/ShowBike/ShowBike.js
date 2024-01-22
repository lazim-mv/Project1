"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Container,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CardMedia,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";

const ShowBike = ({ bikeAdded }) => {
  const [bikes, setBikes] = useState([]);
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [editedBike, setEditedBike] = useState(null);

  useEffect(() => {
    // Fetch the list of used bikes from your API
    const fetchBikes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/products/admin/api/bikes"
        );
        setBikes(response.data);
      } catch (error) {
        console.error("Error fetching bikes:", error);
      }
    };

    // Call fetchBikes initially
    fetchBikes();
  }, [editFormVisible, bikeAdded]);

  const handleEdit = (id) => {
    // Find the bike with the specified ID
    const bikeToEdit = bikes.find((bike) => bike._id === id);

    // Set the bike data to be edited in the form
    setEditedBike(bikeToEdit);

    // Set the visibility of the edit form
    setEditFormVisible(true);
  };

  const handleEditFormClose = () => {
    setEditFormVisible(false);
    setEditedBike(null);
  };

  const handleDelete = async (id) => {
    // Implement the delete functionality here
    try {
      // Make an API call to delete the bike
      await axios.delete(
        `http://localhost:3001/products/admin/api/bikes/${id}`
      );

      // Update the local state to reflect the deletion
      setBikes((prevBikes) => prevBikes.filter((bike) => bike._id !== id));

      console.log(`Successfully deleted bike with ID: ${id}`);
    } catch (error) {
      console.error(`Error deleting bike with ID ${id}:`, error);
    }
  };

  const handleSaveEdit = async () => {
    try {
      // Make an API call to update the bike details
      await axios.put(
        `http://localhost:3001/products/admin/api/bikes/${editedBike._id}`,
        editedBike
      );

      // Close the edit form
      setEditFormVisible(false);
      setEditedBike(null);

      console.log(`Successfully edited bike with ID: ${editedBike._id}`);
    } catch (error) {
      console.error(`Error editing bike with ID ${editedBike._id}:`, error);
    }
  };

  const handleEditFormChange = (e) => {
    // Update the editedBike state based on the form input changes
    setEditedBike({
      ...editedBike,
      [e.target.name]: e.target.value,
    });
  };

  const categories = ["Bike", "Scooter"];

  // console.log(bikes.Image ,"bikeImage")

  return (
    <div
    className="showBikeCards" 
    >
      {bikes.map((bike) => (
        <div className="showBikeCard" key={bike._id}>
          <div className="showBikeCardContent">
            <h6 variant="h6" component="">
              {bike.title}
            </h6>
            <h6 variant="body2" color="text.secondary">
              Price: ${bike.price}
            </h6>
            <h6 variant="body2" color="text.secondary">
              Year: ${bike.Year}
            </h6>
            <CardMedia
              component="img"
              height="50"
              image={bike.image}
              alt="Paella dish"
              className="bikeImage"
            />
            <IconButton
              onClick={() => handleEdit(bike._id)}
              color="primary"
              aria-label="edit"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => handleDelete(bike._id)}
              color="secondary"
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      ))}
      {/* Edit Form Dialog */}
      <Dialog open={editFormVisible} onClose={handleEditFormClose}>
        <DialogTitle>Edit Bike</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            name="title"
            fullWidth
            margin="normal"
            value={editedBike?.title || ""}
            onChange={handleEditFormChange}
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            fullWidth
            margin="normal"
            value={editedBike?.price || 0}
            onChange={handleEditFormChange}
          />
          <TextField
            label="Description"
            name="description"
            fullWidth
            margin="normal"
            value={editedBike?.description || ""}
            onChange={handleEditFormChange}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={editedBike?.category || ""}
              onChange={handleEditFormChange}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditFormClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ShowBike;
