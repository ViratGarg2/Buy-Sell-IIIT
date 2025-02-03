import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CustomCursor from "../components/Cursor";

export default function Signup() {
  const [credentials, setCredentials] = useState({
    first_name: "",
    last_name: "",
    email: "",
    contact_number: "",
    age: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3001/api/createUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const json1 = await response.json();
    if (!json1.success) {
      setError(`Enter Valid Credentials ${json1.message}`);
    } else {
      window.location.href = "/login";
    }
  };

  const onChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: "50px" }}>
      <CustomCursor/>
      <Box
        sx={{
          padding: "30px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Signup
        </Typography>

        {error && (
          <Alert severity="error" sx={{ marginBottom: "20px" }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSignup}>
          <TextField
            fullWidth
            label="First Name"
            variant="outlined"
            name="first_name"
            value={credentials.first_name}
            onChange={onChange}
            sx={{ marginBottom: "20px" }}
            required
          />
          <TextField
            fullWidth
            label="Last Name"
            variant="outlined"
            name="last_name"
            value={credentials.last_name}
            onChange={onChange}
            sx={{ marginBottom: "20px" }}
            required
          />
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            type="email"
            name="email"
            value={credentials.email}
            onChange={onChange}
            sx={{ marginBottom: "20px" }}
            required
          />
          <TextField
            fullWidth
            label="Contact Number"
            variant="outlined"
            name="contact_number"
            value={credentials.contact_number}
            onChange={onChange}
            sx={{ marginBottom: "20px" }}
            required
          />
          <TextField
            fullWidth
            label="Age"
            variant="outlined"
            type="number"
            name="age"
            value={credentials.age}
            onChange={onChange}
            sx={{ marginBottom: "20px" }}
            required
          />
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            name="password"
            value={credentials.password}
            onChange={onChange}
            sx={{ marginBottom: "20px" }}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="success"
              sx={{ borderRadius: "10px", textTransform: "none", marginRight: "10px" }}
            >
              Signup
            </Button>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              component={Link}
              to="/login"
              sx={{ borderRadius: "10px", textTransform: "none" }}
            >
              Already a User
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}
