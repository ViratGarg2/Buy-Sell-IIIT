import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Alert,
} from "@mui/material";

export default function Buy() {
  const [credentials, setCredentials] = useState({
    name: "",
    price: 0,
    description: "",
    category: "",
    img_link: "",
  });
  const [error, setError] = useState(null);

  const handleBuy = async (e) => {
    e.preventDefault();
    const authToken = localStorage.getItem("authToken");
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
        img_link: credentials.img_link,
        id: localStorage.getItem("id"),
      }),
    });

    const json1 = await response.json();
    if (!json1.success) {
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

  if (!localStorage.getItem("authToken")) {
    return (
      <Typography variant="h4" color="green" textAlign="center">
        Please login to sell
      </Typography>
    );
  }

  return (
    <Container maxWidth="sm">
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
        <TextField
          label="Image Link"
          name="img_link"
          value={credentials.img_link}
          onChange={onChange}
          fullWidth
          required
        />
        <Button type="submit" variant="contained" color="success" fullWidth>
          Submit
        </Button>
      </Box>
    </Container>
  );
}