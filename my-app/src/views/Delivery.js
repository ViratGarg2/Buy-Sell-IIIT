import React, { useState, useEffect } from "react";

const Delivery = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/delivery", {
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken, 
          },
        });

        const data1 = await response.json();

        // console.log('data is ',data1);
        // console.log('data1 is ',data);

        setData(data1.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    if (authToken) {
      fetchData();
    }
  }, [authToken]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
<div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
  {data.map((item, index) => (
    <div
      key={index}
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        width: "300px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h3 style={{ marginBottom: "8px" }}>{item.itemName}</h3>
      <p>
        <strong>Buyer:</strong> {item.buyerName}
      </p>
      <p>
        <strong>Order Value:</strong> {item.orderValue}
      </p>
    </div>
  ))}
</div>
  );
};

export default Delivery;
