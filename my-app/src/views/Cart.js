import React, { useState, useEffect } from "react";

const Cart = ()=>{
    const authToken = localStorage.getItem("authToken");
    const [error,setError] = useState(null);
    const [data,setData] = useState([]);
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
          if(data1.success){
          setData(data1.data);
          }else{
            setError(error);
            alert(`${error}`);
          }
        } catch (err) {
          setError(err.message);
        //   setLoading(false);
        }
      };
      
      if (authToken) {
        fetchData();
      }
    }, [authToken]);

    if(!authToken){
        return (
            <>
            <h1 style={{color:"green"}}>Please Login to See your cart</h1>
            </>
        )
    }
    return (
        <>
        <h1>Your Cart</h1>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {data.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "10px",
              width: "250px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2 style={{ margin: "5px 0" }}>{item.name}</h2>
            <p>
              <strong>Category:</strong> {item.category}
            </p>
            <p>{item.description}</p>
          </div>
        ))}
        </div>
        </>
    );
}

export default Cart;