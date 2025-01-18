import React, { useState } from 'react'
// const jwt = require('jsonwebtoken');
const jwtSecret = "IAmTheGreatestOfAllTimewwwwwwwww"; 

export default function Profile() {
    return (
      localStorage.getItem("first_name") && (
        <>
          <style>{`
            .user-profile {
              margin: 20px auto;
              padding: 20px;
              border: 1px solid #ccc;
              border-radius: 10px;
              max-width: 400px;
              background-color: #f9f9f9;
              font-family: Arial, sans-serif;
            }
            .user-profile h2 {
              text-align: center;
              color: #333;
              margin-bottom: 20px;
            }
            .profile-info p {
              margin: 10px 0;
              color: #555;
              font-size: 16px;
            }
            .profile-info strong {
              color: #000;
            }
            .profile-info span {
              color: #007BFF;
            }
          `}</style>
          <div className="user-profile">
            <h2>User Profile</h2>
            <div className="profile-info">
              <p>
                <strong>Name:</strong>{" "}
                <span id="user-name">
                  {localStorage.getItem("first_name")} {localStorage.getItem("last_name")}
                </span>
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <span id="user-email">{localStorage.getItem("email")}</span>
              </p>
              <p>
                <strong>Contact No.:</strong>{" "}
                <span id="user-joined">{localStorage.getItem("contact_number")}</span>
              </p>
            </div>
          </div>
        </>
      )
    );
  }
  