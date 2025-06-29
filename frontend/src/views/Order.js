import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
  Paper,
} from "@mui/material";
import ForbiddenAnimation from "../components/Access";
import CustomCursor from "../components/Cursor";

// TabPanel component for tabbed layout
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function Orders() {
  const [orders, setOrders] = useState({
    pendingOrders: [],
    deliveredAsSeller: [],
    deliveredAsBuyer: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      const authToken = localStorage.getItem("authToken");

      try {
        const response = await fetch(process.env.REACT_APP_BACKEND + "/getData", {
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
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <CustomCursor />
            <Typography variant="h4" gutterBottom sx={{ textAlign: "center", color: "#006400", fontWeight: "bold" }}>
              Orders
            </Typography>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
          <CircularProgress color="success" />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mt: 4 }}>{error}</Alert>
      ) : (
        <Paper elevation={2} sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="order tabs" centered>
              <Tab label="Pending" />
              <Tab label="Selling History" />
              <Tab label="Buying History" />
            </Tabs>
          </Box>
          <TabPanel value={tabValue} index={0}>
            <OrderGrid orders={orders.pendingOrders} isPending />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <OrderGrid orders={orders.deliveredAsSeller} />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <OrderGrid orders={orders.deliveredAsBuyer} />
          </TabPanel>
        </Paper>
      )}
    </Container>
  );
}

// Order Grid Component
const OrderGrid = ({ orders, isPending = false }) => (
  <Box my={2}>
    {orders.length === 0 ? (
      <Box textAlign="center" py={5}>
        <Typography variant="h6" color="text.secondary">
          No orders found in this category.
        </Typography>
      </Box>
    ) : (
      <Grid container spacing={3}>
        {orders.map((order) => (
          <Grid item xs={12} sm={6} md={4} key={order._id}>
            <Card
              sx={{
                transition: "transform 0.3s, box-shadow 0.3s",
                boxShadow: 3,
                borderRadius: 2,
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 6,
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" color="primary.main" fontWeight="bold" gutterBottom>
                  Item: {order.item || order.itemName}
                </Typography>
                <Typography variant="body1" fontWeight="bold">Amount: ₹{order.amount}</Typography>
                {isPending ? (
                  <Typography variant="body2" color="error.main">OTP: {order.hashed_otp}</Typography>
                ) : (
                  <>
                    <Typography variant="body2">{order.buyer ? `Buyer: ${order.buyer}` : `Seller: ${order.seller}`}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Date: {new Date(order.created_at).toLocaleDateString()}
                    </Typography>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    )}
  </Box>
);

