import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StarRating from '../components/StarRating';

const add_to_cart = async(id)=>{
    console.log('done');
    const authToken = localStorage.getItem('authToken');
        try {
          const response = await fetch(`http://localhost:3001/add_to_cart/${id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": authToken,
            },
          });
          const data = await response.json();
          if(data.success){
            alert('Item added to cart');
          }else{
            alert(data.message);
          }
        }
          catch(error){
            console.log(`An error occured ${error}`);
          }
}

const ItemDetails = () => {
  const { id } = useParams(); // Extract the id from the URL
  const [itemDetails, setItemDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/search/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        if (data.success) {
            console.log('hi');
            // console.log('data coming is',data);
          setItemDetails(data.Product); // Assuming API returns { success: true, item: {...} }
        } else {
          alert(data.message || "Failed to fetch item details");
        }
      } catch (error) {
        console.error("Error fetching item details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; // Show loading while fetching data
  }

  if (!itemDetails) {
    return <div>Item not found!</div>; // Handle case when no data is fetched
  }

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h3>{itemDetails.name}</h3>
        </div>
        <div className="card-body">
          <p>
            <strong>Description:</strong> {itemDetails.description}
          </p>
          <p>
            <strong>Price:</strong> {itemDetails.price}
          </p>
          <p>
            <strong>Seller name:</strong> {itemDetails.seller_first_name} {itemDetails.seller_last_name}
          </p>
      <h3>Reviews</h3>
      {itemDetails.seller_reviews.map((review, index) => (
        <div style={{ marginBottom: '10px',border: '2px solid #ccc',borderRadius: '8px',padding: '10px',}}>
            <strong>{review.name}</strong>
            <br></br>
          <StarRating rating={review.rating} />
          <p>"{review.comment}"</p>
        </div>
      ))}
         <button style={{borderRadius: "10px",color:"white",background:"green"}} onClick = {()=>add_to_cart(itemDetails.id)}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;

