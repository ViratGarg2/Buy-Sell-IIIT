import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Alert,
  CircularProgress,
} from "@mui/material";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase"; // Ensure this points to your Firebase configuration
import CustomCursor from "../components/Cursor";

export default function Sell() {
  const [credentials, setCredentials] = useState({
    name: "",
    price: 0,
    description: "",
    category: "",
  });
  const [image, setImage] = useState(null); // To store the selected file
  const [imageUploading, setImageUploading] = useState(false); // To track upload progress
  const [imageUrl, setImageUrl] = useState(""); // To store the uploaded image URL
  const [error, setError] = useState(null);

  const handleBuy = async (e) => {
    e.preventDefault();
    const authToken = localStorage.getItem("authToken");

    if (!imageUrl) {
      setError("Please upload an image before submitting.");
      return;
    }

    const response = await fetch("http://localhost:3001/sell", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
      body: JSON.stringify({
        name: credentials.name,
        price: credentials.price,
        description: credentials.description,
        category: credentials.category,
        img_link: imageUrl, // Use the uploaded image URL
        id: localStorage.getItem("id"),
      }),
    });

    const json1 = await response.json();
    if (!json1.success) {
      alert("Invalid Token");
      window.location.href = "/search";
      setError(json1.message);
    } else {
      window.location.href = "/search";
    }
  };

  const onChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleImageUpload = async () => {
    if (!image) {
      setError("Please select an image to upload.");
      return;
    }

    setImageUploading(true);
    const storageRef = ref(storage, `images/${image.name}`);

    try {
      // Upload the file to Firebase Storage
      await uploadBytes(storageRef, image);
      const url = await getDownloadURL(storageRef);
      setImageUrl(url);
      setError(null);
      alert("Image uploaded successfully!");
    } catch (err) {
      setError("Failed to upload image. Please try again.");
    } finally {
      setImageUploading(false);
    }
  };

  // if (!localStorage.getItem("authToken")) {
  //   return (
  //     <Typography variant="h4" color="green" textAlign="center">
  //       Please login to sell
  //     </Typography>
  //   );
  // }

  return (
    <Container maxWidth="sm">
      <CustomCursor/>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ color: "green", marginTop: 4 }}
      >
        Add Item
      </Typography>

      {error && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {`Enter Valid details: ${error}`}
        </Alert>
      )}

      <Box
        component="form"
        onSubmit={handleBuy}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Name"
          name="name"
          value={credentials.name}
          onChange={onChange}
          fullWidth
          required
        />
        <TextField
          label="Category"
          name="category"
          value={credentials.category}
          onChange={onChange}
          fullWidth
          required
        />
        <TextField
          label="Description"
          name="description"
          value={credentials.description}
          onChange={onChange}
          fullWidth
          required
        />
        <TextField
          label="Price"
          type="number"
          name="price"
          value={credentials.price}
          onChange={onChange}
          fullWidth
          required
        />

        {/* File Input for Image */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ marginTop: "1rem" }}
        />
        <Button
          variant="outlined"
          color="primary"
          onClick={handleImageUpload}
          disabled={imageUploading}
        >
          {imageUploading ? <CircularProgress size={20} /> : "Upload Image"}
        </Button>

        {imageUrl && (
          <Alert severity="success" sx={{ marginBottom: 2 }}>
            Image uploaded successfully.
          </Alert>
        )}

        <Button type="submit" variant="contained" color="success" fullWidth>
          Submit
        </Button>
      </Box>
    </Container>
  );
}
