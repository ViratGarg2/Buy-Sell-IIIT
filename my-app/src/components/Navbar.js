import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";

const logout = function () {
  localStorage.removeItem("authToken"); // Remove the token completely
  alert("You have been logged out");
  window.location.href = "/profile";
};

export default function Navbar() {
  const isAuthenticated = !!localStorage.getItem("authToken"); // Check if authToken exists
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#185227" }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ 
    flexGrow: 1, 
    display: "flex", 
    height: "64px"
  }}>
  <Link to="/">
    <img src="./logo512.png" alt="lBuy" style={{ width: "80px", height: "80px",scale:"2"}} />
  </Link>
</Typography>


        {/* Tabs for Navigation */}
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          textColor="inherit"
          indicatorColor="secondary"
          aria-label="navbar tabs"
          sx={{
            "& .MuiTab-root": { textTransform: "none", fontSize: "16px" },
          }}
        >
           <Tab label="Home" component={Link} to="/" />
          <Tab label="Search" component={Link} to="/search" />
          <Tab label="History" component={Link} to="/history" />
          <Tab label="Delivery" component={Link} to="/delivery" />
          <Tab label="Cart" component={Link} to="/cart" />
          <Tab label="Support" component={Link} to="/support" />
          <Tab label="Sell" component={Link} to="/sell" />
        </Tabs>

        {/* Auth Buttons */}
        {!isAuthenticated ? (
          <div style={{ display: "flex", gap: "10px", marginLeft: "auto" }}>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/login"
              sx={{
                textTransform: "none",
                backgroundColor: "#00796b",
              }}
            >
              Login
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              component={Link}
              to="/signup"
              sx={{
                textTransform: "none",
                color: "white",
                borderColor: "white",
              }}
            >
              Signup
            </Button>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            {/* Profile Button */}
            <Link to="/profile" style={{ textDecoration: "none", color: "inherit" }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AccountCircleIcon />}
                sx={{
                  borderRadius: "20px",
                  textTransform: "none",
                  backgroundColor: "#4caf50", // Green color
                  color: "white",
                }}
              >
                Profile
              </Button>
            </Link>
            {/* Logout Button */}
            <Button
              variant="contained"
              color="primary"
              onClick={logout}
              startIcon={<LogoutIcon />}
              sx={{
                borderRadius: "20px",
                textTransform: "none",
                backgroundColor: "#ff4d4d", // Red color
                color: "white",
              }}
            >
              Logout
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}
