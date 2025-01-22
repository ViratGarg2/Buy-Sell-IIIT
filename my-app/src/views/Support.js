import React, { useState } from "react";
import axios from "axios";
import "./Chatbot.css"; // Import the CSS for styling

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (input.trim() === "") return;

    // Add the user's message to the chat
    const userMessage = { author: "user", content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Clear input field
    setInput("");

    try {
      // Send message to backend
      const response = await fetch("http://localhost:3001/chat", {
        method : "POST",
        headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(messages),
        });

        const data = await response.json();
        if(data.success){
            console.log(data);
        }
      // Add bot's response to the chat
      const botMessage = { author: "bot", content: data.messages };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = { author: "bot", content: "Sorry, something went wrong. Please try again." };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbox">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.author === "user" ? "message user-message" : "message bot-message"}
          >
            {msg.content}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
