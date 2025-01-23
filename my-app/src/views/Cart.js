import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const Cart = ()=>{
    const authToken = localStorage.getItem("authToken");
    const [error,setError] = useState(null);
    const [data,setData] = useState([]);
    const [loading, setLoading] = useState(false);

    // setLoading = {
    //     (loading) => {
    //         setLoading(loading);
    //     }
    // }
    const buy = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch('http://localhost:3001/buy', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('authToken'),
            },
          });
    
          const data = await response.json();
          // Handle the response data as needed
          console.log(data.success);
          if(data.success){
            alert('Order Placed Successfully');
          }else{
            alert(data.message);
          }
        } catch (error) {
          setError(error.message);
          console.error('Error:', error);
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
             <Link to={`/search/${item[0].id}`} style={{textDecoration:"none",color:"inherit"}}>
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
            <h2 style={{ margin: "5px 0" }}>{item[0].name}</h2>
            <p>
              <strong>Category:</strong> {item[0].category}
            </p>
            <p>{item[0].description}</p>
          </div>
          </Link>
        ))}
        </div>
        <button disabled = {loading}  style={{borderRadius: "10px",color:"white",background:"green",marginLeft:"20em",paddingInline:"10px",paddingRight:"10px",padding:"10px"}} onClick = {()=>buy()} >{loading?'Processing..':'Buy'}</button>

        </>
    );
}

export default Cart;