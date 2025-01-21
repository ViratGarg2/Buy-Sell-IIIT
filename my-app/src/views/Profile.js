import React, { useState } from "react";

// Get user data from backend
const handleProfile = async (setUser) => {
  const authToken = localStorage.getItem("authToken");
  if (!authToken) {
    alert("Please log in first");
    return;
  }

  try {
    const response = await fetch("http://localhost:3001/profile/get", {
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

// send update request to backend
const updateProfile = async (fields, setUser) => {
  const authToken = localStorage.getItem("authToken");
  if (!authToken) {
    alert("Please log in first");
    return;
  }
  try {
    const response = await fetch("http://localhost:3001/update_profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
      body: JSON.stringify(fields),
    });
    console.log(fields,'hello');
    const data = await response.json();

    if (data.success) {
      alert("Profile updated successfully");
      setUser(fields);
      window.location.href = '/profile';
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
      <div>
        <h1>Unauthorized Access</h1>
        <p>Please login to access this page</p>
      </div>
    );
  }

  return (
    <div>
      {!user ? (
        <form
          onSubmit={(e) => {
            e.preventDefault(); // Prevent form submission
            handleProfile(setUser);
          }}
        ><div style={{justifyContent:"center",marginTop:"100px"}}>
          <center>
          <button style={{borderRadius: "10px",color:"white",background:"green"}} type="submit">Get Profile</button>
          </center>
          </div>
        </form>
      ) : (
        <div>
          <style>{`
            .profile-container {
              margin: 20px auto;
              padding: 20px;
              border: 1px solid #ccc;
              border-radius: 10px;
              max-width: 400px;
              background-color: #f9f9f9;
              font-family: Arial, sans-serif;
            }
            .profile-field {
              margin: 10px 0;
              font-size: 16px;
            }
            .edit-icon {
              margin-left: 10px;
              cursor: pointer;
              color: #007BFF;
            }
            .text-box {
              font-size: 16px;
              padding: 5px;
              border: 1px solid #ccc;
              border-radius: 5px;
              margin-right: 10px;
            }
            .save-button {
              padding: 5px 10px;
              font-size: 14px;
              background-color: #007BFF;
              color: white;
              border: none;
              border-radius: 5px;
              cursor: pointer;
            }
            .save-button:hover {
              background-color: #0056b3;
            }
            .submit-button {
              margin-top: 20px;
              padding: 10px 20px;
              font-size: 16px;
              background-color: green;
              color: white;
              border: none;
              border-radius: 5px;
              cursor: pointer;
            }
            .submit-button:hover {
              background-color: darkgreen;
            }
          `}</style>

          <div className="profile-container">
            <h2>Edit Profile</h2>
            {["first_name", "last_name", "contact_number"].map((field) => (
              <div className="profile-field" key={field}>
                <strong>
                  {field.replace("_", " ").toUpperCase()}:
                </strong>
                {editingField === field ? (
                  <>
                    <input
                      type="text"
                      className="text-box"
                      name={field}
                      value={fields[field]}
                      onChange={handleChange}
                    />
                    <button
                      className="save-button"
                      onClick={() => handleSave(field)}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <span>{user[field]}</span>
                    <span
                      className="edit-icon"
                      onClick={() => handleEditClick(field)}
                    >
                      ✏️
                    </span>
                  </>
                )}
              </div>
            ))}
            <button style={{borderRadius: "10px",color:"white",background:"green"}} onClick={handleSubmit}>Submit Changes</button>
          </div>
        </div>
      )}
    </div>
  );
}
