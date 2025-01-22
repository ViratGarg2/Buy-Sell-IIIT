import React, { useState } from "react";
// import Search1 from "../components/Search";
// Fetch the items to display
import { Link } from "react-router-dom";
const getItems = async (setUser) => {
  try {
    const response = await fetch("http://localhost:3001/search", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log("hi ");
    if (data.success) {
      console.log("data is ");
      console.log("data is ", data.Product);
      setUser(data.Product); // Update the state with the fetched product details
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
};


export default function Search() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  if (loading) {
    setLoading(false);
    getItems(setUser);
  }
  if (!user) {
    return <div>No items found.</div>; // Handle the case when no data is fetched
  }

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category) // Remove category if already selected
        : [...prev, category] // Add category if not selected
    );
  };


  const filteredItems = user.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(item.category);
    return matchesSearch && matchesCategory;
  });

  console.log('done');
  if (!user) {
    return <div>Loading...</div>; // Show loading message while fetching data
  }

  return (
    <div className="container mt-4">
      <div className="search-bar mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{borderColor:"#1e9cb3",borderStyle:"ridge",borderWidth:"4px",outline:"none"}}
          // onFocus={(e) => (e.target.style.borderColor = "#2d6e30")}
        />
      </div>

      <div className="mt-3">
        <h5>Filter by Category</h5>
        {["Electronics", "Furniture", "Clothes"].map((category) => (
          <div key={category}>
            <input
              type="checkbox"
              id={category}
              value={category}
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
            />
            <label htmlFor={category} style={{ marginLeft: "8px" }}>
              {category}
            </label>
          </div>
        ))}
      </div>


      <div className="row mt-5">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <div key={index} className="col-md-4 mb-3">
              <Link to={`/search/${item.id}`} style={{textDecoration:"none",color:"inherit"}}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">{item.description}</p>
                  <p className="card-text">
                    <strong>Price:</strong> ${item.price}
                  </p>
                  <div>
                  <p className="card-text">
                    <strong>Category:</strong> {item.category}
                  </p>
                {/* {localStorage.getItem("authToken") &&  (
                    <button style={{background:"green",color:"white",borderRadius:"10px"}} onClick = {handleAddToCart(item._id)}>Add to cart</button>
                )} */}
                  </div>
                  <p className="card-text">
                    <strong>id:</strong> {item._id}
                  </p>
                </div>
              </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="col-12">
            <p>No items found matching your search query.</p>
          </div>
        )}
      </div>
    </div>
  );
}