import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  IconButton,
  Alert,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Cart = () => {
  const authToken = localStorage.getItem("authToken");
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const removeItem = async (itemId) => {
    const confirmRemove = window.confirm(
      "Are you sure you want to remove this item from your cart?"
    );
    if (confirmRemove) {
      try {
        const response = await fetch(`http://localhost:3001/remove/${itemId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
        });

        const result = await response.json();
        if (result.success) {
          setData((prevData) =>
            prevData.filter((item) => item[0].id !== itemId)
          );
        } else {
          alert(result.message);
        }
      } catch (err) {
        console.error("Error removing item:", err.message);
      }
    }
  };

  const buy = async () => {
    const confirmOrder = window.confirm(
      "Your order is ready to be placed. Do you want to confirm?"
    );
    if (confirmOrder) {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:3001/buy", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
        });

        const data = await response.json();
        if (data.success) {
          alert("Order Placed Successfully");
          window.location.href = "/cart";
        } else {
          alert(data.message);
        }
      } catch (error) {
        setError(error.message);
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/getcart", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
        });

        const data1 = await response.json();
        if (data1.success) {
          setData(data1.data);
        } else {
          setError(data1.message);
          alert(data1.message);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    if (authToken) {
      fetchData();
    }
  }, [authToken]);

  if (!authToken) {
    return (
      <Typography variant="h5" align="center" color="green" mt={4}>
        Please Login to See Your Cart
      </Typography>
    );
  }

  let amount=0;
  data.forEach((item) => {
    amount += parseFloat(item[0].price);
    console.log('mount is ',amount);
  });

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ color: "green" }}>
        Your Cart
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <Grid container spacing={3}>
        {data.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ position: "relative", boxShadow: 3 }}>
              <IconButton
                onClick={() => removeItem(item[0].id)}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  backgroundColor: "red",
                  color: "white",
                  "&:hover": { backgroundColor: "#b71c1c" },
                }}
                size="small"
              >
                <CloseIcon fontSize="small" />
              </IconButton>
              <Link
                to={`/search/${item[0].id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {item[0].name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Category:</strong> {item[0].category}
                  </Typography>
                  <Typography variant="body1" color="green" mt={1}>
                    <b>₹{item[0].price}</b>
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    {item[0].description}
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* <Typography variant="h5"> */}
          <strong>Total: ₹{amount}</strong>
        {/* </Typography> */}
        <Button
          variant="contained"
          color="success"
          onClick={() => buy()}
          disabled={loading}
          // style={{alignSelf:"center"}}
          sx={{ textTransform: "none", fontWeight: "bold"}}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Buy"}
        </Button>
      </Box>
    </Box>
  );
};

export default Cart;
