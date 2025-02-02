import React, { useEffect, useState } from "react";
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

  // Fetch orders from the backend
  useEffect(() => {
    const fetchOrders = async () => {
      const authToken = localStorage.getItem("authToken");

      try {
        const response = await fetch("http://localhost:3001/getData", {
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
        });

        if (!response.ok) {
          // console.log(response.success);
          return response.json({"error":"Not able to fetch"});
        }

        const data = await response.json();
        console.log("Hello there you are fucked");  
        console.log(data);
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

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  if(!localStorage.getItem("authToken") || localStorage.getItem("authToken")==""){
    return (
      <>
      <ForbiddenAnimation></ForbiddenAnimation>
  </>
    )  
}
  return (
    <div className="container">
      <CustomCursor/>
      <div className="mb-4">
        <h2 style={{color:"darkgreen"}}>Pending Orders</h2>
        <div className="row" style={{color:"green"}}>
          {orders.pendingOrders.map((order,index) => (
            <div key={order._id} className="col-md-4" style={{
              transition: "transform 0.3s, box-shadow 0.3s",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "12px",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0px 6px 12px rgba(0, 128, 0, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.1)";
            }}>
              <div className="card mt-3">
                <div className="card-body" style={{color:"green"}}>
                  <p className="card-text" style={{color:"darkgreen"}}><b>Amount: ₹{order.amount}</b></p>
                  <p className="card-text">Item: {order.itemName}</p>
                  <p className="card-text">OTP: {order.hashed_otp}</p>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h2 style={{color:"darkgreen"}}>Delivered Orders (As Seller)</h2>
        <div className="row">
          {orders.deliveredAsSeller.map((order) => (
              <div key={order._id} className="col-md-4" style={{
                transition: "transform 0.3s, box-shadow 0.3s",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "12px",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0px 6px 12px rgba(0, 128, 0, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.1)";
              }}>
              <div className="card mt-3">
                <div className="card-body" style={{color:"green"}}>
                  <p className="card-text" style={{color:"darkgreen"}}><b>Amount: ₹{order.amount}</b></p>
                  <p className="card-text">Buyer Name: {order.buyer}</p>
                  <p className="card-text">Item: {order.item}</p>
                  <p className="card-text">Ordered on: {order.created_at.substring(0,10)}</p>
                  {/* <p className="card-text">Status: {order.status}</p> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 style={{color:"darkgreen"}}>Delivered Orders (As Buyer)</h2>
        <div className="row">
          {orders.deliveredAsBuyer.map((order) => (
              <div key={order._id} className="col-md-4" style={{
                transition: "transform 0.3s, box-shadow 0.3s",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "12px",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0px 6px 12px rgba(0, 128, 0, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.1)";
              }}>
              <div className="card mt-3">
                <div className="card-body" style={{color:"green"}}>
                 <b> <p className="card-text" style={{color:"darkgreen"}}>Amount:₹{order.amount}</p></b>
                  <p className="card-text">Seller: {order.seller}</p>
                  <p className="card-text">Item: {order.item}</p>
                 <p className="card-text">Bought on: {order.created_at.substring(0,10)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
