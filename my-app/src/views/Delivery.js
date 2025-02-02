import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  TextField,
  Grid,
  Alert,
} from "@mui/material";
import CustomCursor from "../components/Cursor";

import ForbiddenAnimation from "../components/Access";

const Delivery = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [otpInputs, setOtpInputs] = useState({});
  const authToken = localStorage.getItem("authToken");

  // Function to check OTP
  const check_otp = async (orderId, otp) => {
    try {
      const response = await fetch(`http://localhost:3001/check_otp/${orderId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
        body: JSON.stringify({ otp: otp }),
      });

      const result = await response.json();

      if (result.success) {
        alert("OTP Verified Successfully!");
        window.location.href = "/delivery";
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error("OTP Verification Error:", err);
      alert("Error verifying OTP");
    }
  };

  // Fetch delivery data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/delivery", {
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
        });

        const result = await response.json();
        if(result.success){
        setData(result.data);
        }else{
          alert('Not able to load');
        }
      } catch (err) {
        setError(err.message);
      }
    };

    if (authToken) {
      fetchData();
    }
  }, [authToken]);

  // Handle OTP input change
  const handleOtpChange = (orderId, value) => {
    setOtpInputs((prev) => ({
      ...prev,
      [orderId]: value,
    }));
  };

  // Handle OTP submission
  const handleOtpSubmit = (e, orderId) => {
    e.preventDefault();
    const otp = otpInputs[orderId];
    if (otp) {
      check_otp(orderId, otp);
    } else {
      alert("Please enter OTP");
    }
  };

  if (error) return <Alert severity="error">{error}</Alert>;
  // if (data.length === 0) {
  //   return (
  //     <Typography
  //       variant="h4"
  //       align="center"
  //       sx={{ color: "green", marginTop: "20px" }}
  //     >
  //       No Pending Orders
  //     </Typography>
  //   );
  // }
//   if(!localStorage.getItem("authToken") || localStorage.getItem("authToken")==""){
//     return (
//       <>
//       <ForbiddenAnimation></ForbiddenAnimation>
//   </>
//     )  
// }
  return (
    <Box sx={{ padding: "20px" }}>
      <CustomCursor/>
      <Typography variant="h4" gutterBottom sx={{ color: "green", mb: 3 }}>
        Pending Deliveries
      </Typography>

      <Grid container spacing={3}>
        {data.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card
              sx={{
                boxShadow: 3,
                borderRadius: 2,
                "&:hover": { boxShadow: 6 },
                border: "1px solid #ddd",
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ color: "green", fontWeight: "bold" }}
                >
                  {item.itemName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Buyer:</strong> {item.buyerName}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  <strong>Order Value:</strong> ₹{item.orderValue}
                </Typography>
                <form onSubmit={(e) => handleOtpSubmit(e, item.id)}>
                  <TextField
                    variant="outlined"
                    size="small"
                    label="Enter OTP"
                    value={otpInputs[item.id] || ""}
                    onChange={(e) => handleOtpChange(item.id, e.target.value)}
                    fullWidth
                    sx={{ marginBottom: 2 }}
                  />
                  <CardActions>
                    <Button
                      variant="contained"
                      color="success"
                      fullWidth
                      type="submit"
                      sx={{
                        textTransform: "none",
                        fontWeight: "bold",
                        borderRadius: 1,
                      }}
                    >
                      Submit
                    </Button>
                  </CardActions>
                </form>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Delivery;
