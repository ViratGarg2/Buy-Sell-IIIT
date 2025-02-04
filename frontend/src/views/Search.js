import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, TextField, Checkbox, FormControlLabel, CircularProgress, Card, CardContent, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import ForbiddenAnimation from "../components/Access";
import CustomCursor from "../components/Cursor";
// Fetch the items to display
const getItems = async (setUser, setLoading) => {
  try {
    const response = await fetch(process.env.REACT_APP_BACKEND+"/search", {
      method: "GET",
      headers: { "Content-Type": "application/json",
        "auth-token" : localStorage.getItem("authToken"),
       },
    });

    const data = await response.json();
    if (data.success) {
      setUser(data.Product); // Update the state with the fetched product details
    } else {
      console.log("item not found");
      return (
        <ForbiddenAnimation/>
      )
    }
  } catch (error) {
    console.error("Error fetching items:", error);
  } finally {
    setLoading(false);
  }
};

export default function Search() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    getItems(setUser, setLoading);
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category) // Remove category if already selected
        : [...prev, category] // Add category if not selected
    );
  };

  const filteredItems = user.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(item.category);
    return matchesSearch && matchesCategory;
  });

  return (
    
    <Box sx={{ p: 4, backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <CustomCursor/>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center", color: "#006400", fontWeight: "bold" }}>
        Search Items
      </Typography>

      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          label="Search by name"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            borderColor: "#006400",
            borderRadius: 1,
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": { borderColor: "#006400" },
            },
            color:"green",
          }}
        />
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ color: "#006400" }}>
          Filter by Category
        </Typography>
        {["Electronics", "Furniture", "Clothes"].map((category) => (
          <FormControlLabel
            key={category}
            control={
              <Checkbox
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                sx={{ color: "#006400", "&.Mui-checked": { color: "#006400" } }}
              />
            }
            label={category}
          />
        ))}
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress color="success" />
      </Box>
      ) : filteredItems.length > 0 ? (
        <Grid container spacing={3}>
          {filteredItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Link to={`/search/${item.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <Card
                  sx={{
                    borderRadius: 2,
                    boxShadow: "0 4px 8px rgba(0, 128, 0, 0.3)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 6px 12px rgba(0, 128, 0, 0.5)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.img_link}
                    alt= "loading"
                    sx={{ backgroundColor: "#f0f0f0" }}
                  />
                  <CardContent>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ color: "#006400", fontWeight: "bold" }}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      gutterBottom
                      sx={{ color: "#006400", fontStyle: "italic" }}
                    >
                      {item.description}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ color: "#006400", fontWeight: "bold" }}
                    >
                      Price: ₹{item.price}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#006400" }}
                    >
                      Category: {item.category}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6" sx={{ textAlign: "center", color: "#666" }}>
          No items found matching your search query.
        </Typography>
      )}
    </Box>
  );
}
