import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
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
import JSConfetti from 'js-confetti'

export default function Login() {

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

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
      setError(json1.error);
    } else {
      localStorage.setItem("authToken", json1.authToken);
      localStorage.setItem("id", json1.id);

      const authToken = localStorage.getItem("authToken");

      // jsConfetti.addConfetti({
      //   emojis: ["🎉", "✨", "🎊", "🥳", "💥"],
      //   emojiSize: 50,
      //   confettiNumber: 1000,
      // });
      const jsConfetti = new JSConfetti()
      jsConfetti.addConfetti(
        {
        emojis: ["💸","💲","💵"],
        emojiSize: 50,
        confettiNumber: 150,
        }
      )
  
      // Redirect after a short delay to allow confetti animation
      setTimeout(() => {
        window.location.href = "/profile";
      }, 2000);
      await fetch("http://localhost:3001/getData", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
        
      });
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
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
          Login
        </Typography>

        {error && (
          <Alert severity="error" sx={{ marginBottom: "20px" }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
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

          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            name="password"
            value={credentials.password}
            onChange={onChange}
            placeholder="Enter your password"
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

          <Box sx={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
            <ReCAPTCHA
              sitekey="6LfvMcAqAAAAAPUU8hMajKcSJzLfCv4EYcnlEWqG"
              onChange={onRecaptchaChange}
            />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="success"
              disabled={!recaptchaValue}
              sx={{ borderRadius: "10px", textTransform: "none", marginRight: "10px" }}
            >
              Login
            </Button>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="success"
              sx={{ borderRadius: "10px", textTransform: "none", marginRight: "10px" }}
              onClick = {()=>{
                window.location.href = "https://login.iiit.ac.in/cas/login?service=https%3A%2F%2Fcourses.iiit.ac.in%2Flogin%2Findex.php%3FauthCAS%3DCAS";
              }}
            >
              CAS Login
            </Button>
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

          </Box>
        </form>
      </Box>
    </Container>
  );
}
