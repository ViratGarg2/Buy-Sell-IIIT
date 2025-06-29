import React, { useState, useEffect } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { styled } from "@mui/system";
import CustomCursor from "../components/Cursor";

const HeroSection = styled(Box)({
  background: "linear-gradient(to right, #0288d1, #43a047)",
  color: "white",
  padding: "60px 0",
  textAlign: "center",
  position: "relative",  // Important for cursor positioning
});

const TestimonialSection = styled(Box)({
  display: "flex",
  justifyContent: "center",
  gap: "40px",
  flexWrap: "wrap",
  backgroundColor: "#f5f5f5",
  padding: "40px 0",
});

const Home = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div>
      <CustomCursor />
      <HeroSection>
      <Box sx={{ textAlign: "center", py: 6 }}>
        <Typography variant="h2">Welcome to IIIT-H Marketplace</Typography>
        <Typography variant="h5" paragraph>
          The best place to buy and sell products with ease.
        </Typography>
        <Button variant="contained" color="secondary" size="large" onClick={() => (window.location.href = "/search")}>
          Start Shopping
        </Button>
      </Box>
      </HeroSection>
      <Typography
        component="div"
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",  // Center content horizontally
          scale: "1",
          marginLeft: "0",  // Remove the unnecessary left margin
        }}
      >
        <img
          src="./back.jpg"
          alt="Background"
          style={{
            display: "block",  // Remove inline-block behavior of img
            marginLeft: "auto",  // Center image horizontally
            marginRight: "auto", // Center image horizontally
          }}
        />
      </Typography>
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom align="center">
          Popular Categories
        </Typography>
        <Box display="flex" justifyContent="center" gap={4} flexWrap="wrap">
          <a href="/search?category=Electronics" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Box
              width="250px"
              textAlign="center"
              sx={{
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: 3,
                "&:hover": { boxShadow: 6 },
              }}
            >
              <img
                src="/electronics.png"
                alt="Electronics"
                style={{ width: "100%", height: "180px", objectFit: "cover" }}
              />
              <Typography variant="h6" sx={{ p: 2 }}>
                Electronics
              </Typography>
            </Box>
          </a>
          <a href="/search?category=Fashion" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Box
              width="250px"
              textAlign="center"
              sx={{
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: 3,
                "&:hover": { boxShadow: 6 },
              }}
            >
              <img
                src="/fashion.png"
                alt="Fashion"
                style={{ width: "100%", height: "180px", objectFit: "cover" }}
              />
              <Typography variant="h6" sx={{ p: 2 }}>
                Fashion
              </Typography>
            </Box>
          </a>
          <a href="/search?category=Furniture" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Box
              width="250px"
              textAlign="center"
              sx={{
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: 3,
                "&:hover": { boxShadow: 6 },
              }}
            >
              <img
                src="/furniture.png"
                alt="Furniture"
                style={{ width: "100%", height: "180px", objectFit: "cover" }}
              />
              <Typography variant="h6" sx={{ p: 2 }}>
                Furniture
              </Typography>
            </Box>
          </a>
        </Box>
      </Container>
      
      <Container sx={{ py: 6, backgroundColor: "#f5f5f5" }}>
        <Typography variant="h4" gutterBottom align="center">
          What Our Customers Say
        </Typography>
        <TestimonialSection>
          <Box width="250px" textAlign="center">
            <Typography variant="body1" sx={{ fontStyle: "italic" }}>
              "I found the best deals here! The user interface is amazing, and the service is top-notch."
            </Typography>
            <Typography variant="h6" align="center" sx={{ mt: 1 }}>
              John Doe
            </Typography>
          </Box>
          <Box width="250px" textAlign="center">
            <Typography variant="body1" sx={{ fontStyle: "italic" }}>
              "Fast shipping and great customer support. I love this platform!"
            </Typography>
            <Typography variant="h6" align="center" sx={{ mt: 1 }}>
              Jane Smith
            </Typography>
          </Box>
        </TestimonialSection>
      </Container>
      <footer style={{ backgroundColor: "#333", color: "white", padding: "20px 0" }}>
        <Container>
          <Box display="flex" justifyContent="center">
            <Box textAlign="center" sx={{ px: 4 }}>
              <Typography variant="h6" gutterBottom>
                Buy-Sell Marketplace
              </Typography>
              <Typography variant="body2">© 2025 All rights reserved</Typography>
            </Box>
            <Box textAlign="center" sx={{ px: 4 }}>
              <Typography variant="h6" gutterBottom>
                Links
              </Typography>
              <Typography variant="body2"><a href="/" style={{ color: 'inherit', textDecoration: 'none' }}>About Us</a></Typography>
              <Typography variant="body2"><a href="/support" style={{ color: 'inherit', textDecoration: 'none' }}>Contact Us</a></Typography>
            </Box>
          </Box>
        </Container>
      </footer>

    </div>
  );
};

export default Home;
