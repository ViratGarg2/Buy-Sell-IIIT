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
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CloseIcon from "@mui/icons-material/Close";
import ForbiddenAnimation from "../components/Access";
import CustomCursor from "../components/Cursor";
import { set } from "firebase/database";

const Cart = () => {
  const authToken = localStorage.getItem("authToken");
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  // for success message
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  // Dialog states
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
  const [openBuyDialog, setOpenBuyDialog] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);

  const handleRemoveClick = (itemId) => {
    setItemToRemove(itemId);
    setOpenRemoveDialog(true);
  };

  const handleBuyClick = () => {
    setOpenBuyDialog(true);
  };

  const handleCloseDialogs = () => {
    setOpenRemoveDialog(false);
    setOpenBuyDialog(false);
    setItemToRemove(null);
  };

  const confirmRemoveItem = async () => {
    if (!itemToRemove) return;
    try {
      const response = await fetch(`http://localhost:3001/remove/${itemToRemove}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
      });

      const result = await response.json();
      if (result.success) {
        setData((prevData) =>
          prevData.filter((item) => item[0].id !== itemToRemove)
        );
      } else {
        alert(result.message);
      }
    } catch (err) {
      console.error("Error removing item:", err.message);
    } finally {
      handleCloseDialogs();
    }
  };

  const confirmBuy = async () => {
    handleCloseDialogs();
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
        setOpenSnackbar(true);
        setMessage("Order placed successfully!");
        setTimeout(() => {
          window.location.href = "/cart";
        }, 2000);
      } else {
        alert(data.message);
      }
    } catch (error) {
      setError(error.message);
      console.error("Error:", error);
    } finally {
      setLoading(false);
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

  let amount=0;
  data.forEach((item) => {
    amount += parseFloat(item[0].price);
    console.log('mount is ',amount);
  });
  if(!localStorage.getItem("authToken") || localStorage.getItem("authToken")==""){
    return (
      <>
      <ForbiddenAnimation></ForbiddenAnimation>
  </>
    )  
}
  return (
    <Box sx={{ padding: "20px" }}>
      <CustomCursor/>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
    <Alert onClose={() => setOpenSnackbar(false)} severity="success" variant="filled">
      {message}
    </Alert>
  </Snackbar>

      <Typography variant="h4" gutterBottom sx={{ textAlign: "center", color: "#006400", fontWeight: "bold" }}>
                    My Cart
                  </Typography>
      <Box align="center">
  {data.length === 0 ? (
    <img src="/empty-cart.svg"
    alt="Empty Cart"
    style={{ transform: "scale(0.5)", width: "50%", height: "auto" }}/>
  ) : (
    <Typography variant="h6"></Typography> // Or simply null
  )}
</Box>

      {error && <Alert severity="error">{error}</Alert>}
      <Grid container spacing={3}>


        {data.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ position: "relative", boxShadow: 3 }}>
              <IconButton
                onClick={() => handleRemoveClick(item[0].id)}
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
          onClick={handleBuyClick}
          disabled={loading || data.length === 0}
          // style={{alignSelf:"center"}}
          sx={{ textTransform: "none", fontWeight: "bold"}}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Buy"}
        </Button>
      </Box>

      {/* Remove Item Confirmation Dialog */}
      <Dialog open={openRemoveDialog} onClose={handleCloseDialogs}>
        <DialogTitle>Confirm Removal</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove this item from your cart?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogs}>Cancel</Button>
          <Button onClick={confirmRemoveItem} color="error" variant="contained">
            Remove
          </Button>
        </DialogActions>
      </Dialog>

      {/* Buy Confirmation Dialog */}
      <Dialog open={openBuyDialog} onClose={handleCloseDialogs}>
        <DialogTitle>Confirm Your Order</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your order for a total of <strong>₹{amount}</strong> is ready to be placed. Do you want to confirm?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogs}>Cancel</Button>
          <Button onClick={confirmBuy} color="success" variant="contained">
            Confirm Order
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Cart;
