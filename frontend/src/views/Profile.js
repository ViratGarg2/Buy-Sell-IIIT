import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CustomCursor from "../components/Cursor";

const handleProfile = async (setUser) => {
  const authToken = localStorage.getItem("authToken");
  if (!authToken) {
    alert("Please log in first");
    return;
  }

  try {
    const response = await fetch(process.env.REACT_APP_BACKEND+"/profile/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
    });

    const data = await response.json();

    if (data.success) {
      console.log("User Profile:", data.user[0]);
      setUser(data.user[0]); // Update the state with user details
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
};

// Send update request to backend
const updateProfile = async (fields, setUser) => {
  const authToken = localStorage.getItem("authToken");
  if (!authToken) {
    alert("Please log in first");
    return;
  }
  try {
    const response = await fetch(process.env.REACT_APP_BACKEND+"/update_profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
      body: JSON.stringify(fields),
    });

    const data = await response.json();

    if (data.success) {
      alert("Profile updated successfully");
      setUser(fields);
      window.location.href = "/profile";
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("Error updating profile:", error);
  }
};

export default function Profile() {
  const [user, setUser] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [fields, setFields] = useState({});

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      handleProfile(setUser);
    }
  }, []);

  const handleEditClick = (field) => {
    setEditingField(field);
    setFields((prev) => ({ ...prev, [field]: user[field] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (field) => {
    setEditingField(null);
    setUser((prev) => ({ ...prev, [field]: fields[field] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(fields, setUser);
  };

  if (!localStorage.getItem("authToken")) {
    return (
      <Box textAlign="center" mt={4}>
        <CustomCursor/>
        <Typography variant="h4" color="error">Unauthorized Access</Typography>
        <Typography>Please login to access this page.</Typography>
      </Box>
    );
  }

  return (
    <Box mt={4} justifyContent="center">
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center", color: "#006400", fontWeight: "bold" }}>
                    Profile
                  </Typography>
      <CustomCursor />
      {!user ? (
        <Box textAlign="center">
          <CircularProgress />
        </Box>
      ) : (
        <Paper elevation={3} sx={{ padding: 4, width: "100%", maxWidth: 500, margin: "0 auto" }}>
          {[
            "first_name",
            "last_name",
            "contact_number",
            "age",
            "password",
          ].map((field) => (
            <Box
              key={field}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mb={2}
            >
              <Typography sx={{ fontWeight: "bold", flex: 1 }}>
                {field.replace("_", " ").toUpperCase()}:
              </Typography>

              {editingField === field ? (
                <>
                  <TextField
                    variant="outlined"
                    size="small"
                    name={field}
                    type={field === "password" ? "password" : "text"}
                    value={fields[field] || ""}
                    onChange={handleChange}
                    sx={{ flex: 2, marginRight: 1 }}
                  />
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<SaveIcon />}
                    onClick={() => handleSave(field)}
                  >
                    Save
                  </Button>
                </>
              ) : (
                <>
                  <Typography sx={{ flex: 2 }}>
                    {field === "password" ? "********" : user[field]}
                  </Typography>
                  <EditIcon
                    onClick={() => handleEditClick(field)}
                    sx={{ cursor: "pointer", color: "primary.main" }}
                  />
                </>
              )}
            </Box>
          ))}
          <Button
            variant="contained"
            color="success"
            fullWidth
            onClick={handleSubmit}
            sx={{ mt: 2 }}
          >
            Submit Changes
          </Button>
        </Paper>
      )}
    </Box>
  );
}
