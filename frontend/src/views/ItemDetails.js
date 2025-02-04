import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StarRating from '../components/StarRating';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
// import Button from "@mui/material/Button";
import CommentIcon from "@mui/icons-material/Comment";
import { TextField, Button, Box, Typography, Rating,Card, CardContent, CardMedia,Snackbar} from "@mui/material";
import ForbiddenAnimation from "../components/Access";
import CustomCursor from "../components/Cursor";
import JSConfetti from "js-confetti";
import Alert from '@mui/material/Alert';


const add_comment = async(id,comment)=>{
  console.log('done');
  const authToken = localStorage.getItem('authToken');
      try {
        const response = await fetch(process.env.REACT_APP_BACKEND+`/add_comment/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
          body: JSON.stringify({
            comment,
          }),

        });
        const data = await response.json();
        if(data.success){
          alert('Comment added');
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
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentData, setCommentData] = useState({ rating: 0, comment: "" });
  const [openSnackbar, setOpenSnackbar] = useState(false);
const [message, setMessage] = useState("");



const add_to_cart = async(id)=>{

  // console.log('done');
  const authToken = localStorage.getItem('authToken');
      try {
        const response = await fetch(process.env.REACT_APP_BACKEND+`/add_to_cart/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
        });
        const data = await response.json();
        if(data.success){
          const jsConfetti = new JSConfetti();
          jsConfetti.addConfetti(
            {
            emojiSize: 70,
            confettiNumber: 150,
            }
          )
          setTimeout(()=>{
          },3000,);

      setOpenSnackbar(true);
      setMessage("Item added to cart");

          // alert('Item added to cart');
        }else{
          alert(data.message);
        }
      }
        catch(error){
          console.log(`An error occured ${error}`);
        }
}

  const handleAddComment = () => {
    if (commentData.rating === 0 || commentData.comment.trim() === "") {
      alert("Please provide a rating and a comment!");
      return;
    }
    // Call add_comment with the comment data
    add_comment(itemDetails.id, commentData);
    setCommentData({ rating: 0, comment: "" }); // Reset fields
    setShowCommentBox(false); // Close the comment box
  };

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_BACKEND+`/search/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("authToken"),
          },
        });

        const data = await response.json();
        if (data.success) {
            console.log('hi');
          setItemDetails(data.Product); // Assuming API returns { success: true, item: {...} }
        } else {
          alert("Login to proceed");
          window.location.href = "/search";
          // alert(data.message || "Failed to fetch item details");
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
  if(localStorage.getItem('authToken')===null || localStorage.getItem('authToken') == ""){
    return <div>Please login to view this page</div>;
  }
  return (
    <div className="container mt-4">
      <CustomCursor/>
      <div className="card">
        <div className="card-header">
          <h3>{itemDetails.name}</h3>
        </div>
        <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" variant="filled">
          {message}
        </Alert>
      </Snackbar>
        <div className="card-body">
        <CardMedia
  component="img"
  height="300" // Adjust height for better visibility
  image={itemDetails.img_link}
  alt={itemDetails.name} // Use the product name as the alt text
  sx={{
    borderRadius: "8px", // Add rounded corners for a soft look
    objectFit: "contain", // Ensure the image covers the area without distortion
    boxShadow: "0px 10px 10px rgba(0, 0, 0, 0.1)", // Add a subtle shadow for depth
    marginBottom: "16px", // Add spacing below the image
    width: "50%", // Ensure the image takes up the full width of the card
  }}
/>
          <p>
            <strong>Description:</strong> {itemDetails.description}
          </p>
          <p>
            <strong>Price:</strong> ₹{itemDetails.price}
          </p>
          <p>
            <strong>Seller name:</strong> {itemDetails.seller_first_name} {itemDetails.seller_last_name}
          </p>
          <h3>Reviews</h3>
          {itemDetails.seller_reviews.map((review, index) => (
            <div
              key={index}
              style={{
                marginBottom: "10px",
                border: "2px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
              }}
            >
              <strong>{review.name}</strong>
              <br />
              <StarRating rating={review.rating} />
              <p>"{review.comment}"</p>
            </div>
          ))}
          <div style={{ display: "flex", marginTop: "10px", gap: "10px" }}>
            <Button
      variant="contained"
      color="primary"
      onClick={()=>setShowCommentBox(true)}
      startIcon={<CommentIcon />}
      style={{
        borderRadius: "20px",
        textTransform: "none",
        backgroundColor: "#008000",
      }}
    >
      Add Comment
    </Button>
            <Button
      variant="contained"
      color="success"
      startIcon={<AddShoppingCartIcon />}
      onClick={()=>{add_to_cart(itemDetails.id)}}
      style={{ borderRadius: "20px", textTransform: "none" }}
    >
      Add to Cart
    </Button>
          </div>

          {/* Comment Box */}
          {showCommentBox && (
            <div
              style={{
                marginTop: "20px",
                border: "2px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
              }}
            >
              <h4>Add Your Comment</h4>
              <Box
      sx={{
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        maxWidth: "500px",
        margin: "20px auto",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Add Your Comment
      </Typography>

      {/* Rating */}
      <Box sx={{ marginBottom: "20px" }}>
        <Typography variant="body1" gutterBottom>
          <strong>Rating:</strong>
        </Typography>
        <Rating
          name="rating"
          value={commentData.rating}
          onChange={(event, newValue) =>
            setCommentData({ ...commentData, rating: newValue })
          }
          precision={0.5} // Allows half-star ratings
        />
      </Box>

      {/* Comment Box */}
      <Box sx={{ marginBottom: "20px" }}>
        <Typography variant="body1" gutterBottom>
          <strong>Comment:</strong>
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          value={commentData.comment}
          onChange={(e) =>
            setCommentData({ ...commentData, comment: e.target.value })
          }
          placeholder="Write your comment here..."
        />
      </Box>

      {/* Buttons */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
        <Button
          variant="contained"
          color="success"
          onClick={handleAddComment}
          sx={{ borderRadius: "10px", textTransform: "none" }}
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => setShowCommentBox(false)}
          sx={{ borderRadius: "10px", textTransform: "none" }}
        >
          Cancel
        </Button>
      </Box>
    </Box>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;

