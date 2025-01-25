import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Grid,
  Alert,
} from "@mui/material";

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [error, setError] = useState("");

  const onRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3001/api/login_check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
        value: recaptchaValue,
      }),
    });

    const json1 = await response.json();

    if (!json1.success) {
      setError(json1.error); // Show error in alert
    } else {
      localStorage.setItem("authToken", json1.authToken);
      localStorage.setItem("first_name", json1.first_name);
      localStorage.setItem("last_name", json1.last_name);
      localStorage.setItem("contact_number", json1.contact_number);
      localStorage.setItem("email", json1.email);
      localStorage.setItem("id", json1.id);

      const authToken = localStorage.getItem("authToken");

      await fetch("http://localhost:3001/getData", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
      });

      window.location.href = "/profile";
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: "50px" }}>
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
          Login
        </Typography>

        {error && (
          <Alert severity="error" sx={{ marginBottom: "20px" }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            type="email"
            name="email"
            value={credentials.email}
            onChange={onChange}
            placeholder="name@example.iiit.ac.in"
            sx={{ marginBottom: "20px" }}
            required
          />

          {/* Password Field */}
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
            placeholder="Enter your password"
            sx={{ marginBottom: "20px" }}
            required
          />

          {/* reCAPTCHA */}
          <Box sx={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
            <ReCAPTCHA
              sitekey="6LfvMcAqAAAAAPUU8hMajKcSJzLfCv4EYcnlEWqG"
              onChange={onRecaptchaChange}
            />
          </Box>

          {/* Buttons */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="success"
                disabled={!recaptchaValue}
                sx={{ borderRadius: "10px", textTransform: "none" }}
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                component={Link}
                to="/Signup"
                sx={{ borderRadius: "10px", textTransform: "none" }}
              >
                New User
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}
