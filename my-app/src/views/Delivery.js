import React, { useState, useEffect } from "react";

const Delivery = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [otpInputs, setOtpInputs] = useState({});
  const authToken = localStorage.getItem("authToken");

  // Function to check OTP
  const check_otp = async (orderId, otp) => {
    try {
      // console.log(orderId, otp);
      const response = await fetch(`http://localhost:3001/check_otp/${orderId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
        body: JSON.stringify({ otp:otp }), // Send only the OTP for the given order
      });

      const result = await response.json();

      if (result.success) {
        alert("OTP Verified Successfully!");
        window.location.href = '/delivery';
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
        setData(result.data);
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
    // console.log("OTP:",otp);
    // console.log("id is sljbv:",orderId);
    if (otp) {
      check_otp(orderId, otp);
    } else {
      alert("Please enter OTP");
    }
  };

  if (error) return <p>Error: {error}</p>;
  if(data.length == 0){
    return (
      <h1 style={{color:"green"}}>No Pending Orders</h1>
    )
  }
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
      {data.map((item) => (
        <div
          key={item.id}
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

          <form onSubmit={(e) => handleOtpSubmit(e, item.id)}>
            <p>
              <b>OTP</b>
            </p>
            <input
              type="text"
              value={otpInputs[item.id] || ""}
              onChange={(e) => handleOtpChange(item.id, e.target.value)}
              placeholder="Enter OTP"
              style={{
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "8px",
                width: "100%",
                marginBottom: "8px",
              }}
            />
            <button
              style={{
                borderRadius: "10px",
                color: "white",
                background: "green",
                padding: "8px 16px",
                border: "none",
                cursor: "pointer",
              }}
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      ))}
    </div>
  );
};

export default Delivery;
