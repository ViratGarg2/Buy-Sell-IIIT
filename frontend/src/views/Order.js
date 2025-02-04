import React, { useEffect, useState } from "react";
import { Container, Grid, Card, CardContent, Typography, Box, CircularProgress, Alert } from "@mui/material";
import ForbiddenAnimation from "../components/Access";
import CustomCursor from "../components/Cursor";

export default function Orders() {
  const [orders, setOrders] = useState({
    pendingOrders: [],
    deliveredAsSeller: [],
    deliveredAsBuyer: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      const authToken = localStorage.getItem("authToken");

      try {
        const response = await fetch(process.env.REACT_APP_BACKEND+"/getData", {
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch orders.");
        }

        const data = await response.json();
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to fetch orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (!localStorage.getItem("authToken")) {
    return <ForbiddenAnimation />;
  }

  return (
    <Container>
      <CustomCursor />
      {loading ? (
        // <h1>Loading</h1>
        <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
          <CircularProgress color="success" />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          <OrderSection title="Pending Orders" orders={orders.pendingOrders} isPending />
          {orders.pendingOrders.length > 0 && <h1>No orders found.</h1>}
          <OrderSection title="Delivered Orders (As Seller)" orders={orders.deliveredAsSeller} />
          <OrderSection title="Delivered Orders (As Buyer)" orders={orders.deliveredAsBuyer} />
        </>
      )}
    </Container>
  );
}

// Order Section Component
const OrderSection = ({ title, orders, isPending = false }) => (
  <Box my={4}>
    <Typography variant="h5" color="darkgreen" fontWeight="bold" gutterBottom>
      {title}
    </Typography>
    <Grid container spacing={3}>
      {orders.length === 0 ? (
        <h1>
          No orders found.
        </h1>
      ) : (
        orders.map((order) => (
          <Grid item xs={12} sm={6} md={4} key={order._id}>
            <Card
              sx={{
                transition: "transform 0.3s, box-shadow 0.3s",
                boxShadow: 2,
                borderRadius: 2,
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 5,
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" color="darkgreen" fontWeight="bold">
                  Amount: ₹{order.amount}
                </Typography>
                <Typography variant="body2">Item: {order.item || order.itemName}</Typography>
                {isPending ? (
                  <Typography variant="body2">OTP: {order.hashed_otp}</Typography>
                ) : (
                  <>
                    <Typography variant="body2">{order.buyer ? `Buyer: ${order.buyer}` : `Seller: ${order.seller}`}</Typography>
                    <Typography variant="body2">Bought on: {order.created_at?.substring(0, 10)}</Typography>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  </Box>
);

