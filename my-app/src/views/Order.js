import React, { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState({
    pendingOrders: [],
    deliveredAsSeller: [],
    deliveredAsBuyer: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch orders from the backend
  useEffect(() => {
    const fetchOrders = async () => {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        setError("Please log in to view your orders.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:3001/getData", {
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  // Render cards
  return (
    <div className="container">
      <h1>Your Orders</h1>
      
      <div className="mb-4">
        <h2>Pending Orders</h2>
        <div className="row">
          {orders.pendingOrders.map((order) => (
            <div key={order._id} className="col-md-4">
              <div className="card mt-3">
                <div className="card-body">
                  <h5 className="card-title">Order ID: {order._id}</h5>
                  <p className="card-text">Amount: {order.amount}</p>
                  <p className="card-text">Status: {order.status}</p>
                  <p className="card-text">OTP: {order.hashed_otp}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h2>Delivered Orders (As Seller)</h2>
        <div className="row">
          {orders.deliveredAsSeller.map((order) => (
            <div key={order._id} className="col-md-4 mt-3">
              <div className="card mt-3">
                <div className="card-body">
                  <h5 className="card-title">Order ID: {order._id}</h5>
                  <p className="card-text">Amount: ${order.amount}</p>
                  <p className="card-text">Buyer ID: {order.buyer_id}</p>
                  <b><p className="card-text">Ordered on: {order.created_at.substring(0,10)}</p></b>
                  {/* <p className="card-text">Status: {order.status}</p> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2>Delivered Orders (As Buyer)</h2>
        <div className="row">
          {orders.deliveredAsBuyer.map((order) => (
            <div key={order._id} className="col-md-4 mt-3">
              <div className="card mt-3">
                <div className="card-body">
                  <h5 className="card-title">Order ID: {order._id}</h5>
                  <p className="card-text">Amount: ${order.amount}</p>
                  <p className="card-text">Buyer ID: {order.buyer_id}</p>
                 <b> <p className="card-text">Bought on: {order.created_at.substring(0,10)}</p></b>
                  {/* <p className="card-text">Status: {order.status}</p> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
