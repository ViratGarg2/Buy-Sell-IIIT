import React, { useState } from "react";
import "./Chatbot.css";
import ForbiddenAnimation from "../components/Access";
import CustomCursor from "../components/Cursor";
import { Typography } from "@mui/material";
const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (input.trim() === "") return;
    // console.log("Sending message:", process.env.REACT_APP_BACKEND);
    // Add the user's message to the chat
    const userMessage = { author: "user", content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Clear input field
    setInput("");

    try {
      // Show loader
      setIsLoading(true);

      // Send the user's message to the backend
      const response = await fetch(process.env.REACT_APP_BACKEND + "/support", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      if (data.success) {
        // Add the bot's response to the chat
        const botMessage = { author: "bot", content: data.message };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        author: "bot",
        content: "Sorry, something went wrong. Please try again.",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      // Hide loader
      setIsLoading(false);
    }
  };

  if (!localStorage.getItem("authToken") || localStorage.getItem("authToken") === "") {
    return <ForbiddenAnimation />;
  }

  return (
    <div className="chatbot-container">
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center", color: "#006400", fontWeight: "bold" }}>
              Support
            </Typography>
      <CustomCursor />
      <div className="chatbox">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.author === "user"
                ? "message user-message"
                : "message bot-message"
            }
          >
            {msg.content}
          </div>
        ))}
        {isLoading && <div className="loader"></div>}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          style={{
            borderRadius: "10px",
            color: "white",
            background: "green",
          }}
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
