import React, { useState, useEffect } from "react";
import OpenAi from "openai";
import "./chat.css";

const openai = new OpenAi({
  apiKey: import.meta.env.VITE_API_KEY,
  dangerouslyAllowBrowser: true,
});
function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputText.trim() === "") return;

    // Send user message
    setMessages([...messages, { text: inputText, sender: "user" }]);

    try {
      // Generate AI response with specific topic or context
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", // Use the latest model
        messages: [
          { role: "user", content: inputText },
          { role: "assistant", content: "" }, // Assistant will fill this in
        ],
        max_tokens: 400,
        n: 1,
        temperature: 1.17,
      });

      console.log(response);

      // Check if response is valid
      if (response && response.choices && response.choices[0] && response.choices[0].message && response.choices[0].message.content) {
        // Add AI response to messages
        setMessages([...messages, { text: response.choices[0].message.content, sender: "AI" }]);
      } else {
        console.error("Invalid response format:", response);
      }
    } catch (error) {
      console.error("Error generating AI response:", error);
    }

    setInputText("");
  };

  // Add AI response to messages

  // Load initial messages or any other initial setup
  useEffect(() => {
    // Example of loading initial messages
    setMessages([{ text: "Welcome to the chat!", sender: "AI" }]);
  }, []);

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-light my-5">
      <div className="chat-window w-50">
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className="message">
              <div className={`message-bubble ${message.sender === "User" ? "user" : "AI"}`}>
                <span className="sender">{message.sender}:</span> {message.text}
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="input-form">
          <div className="input-group">
            <input
              type="text"
              className="form-control message-input"
              placeholder="Type your message..."
              value={inputText}
              onChange={handleInputChange}
            />
            <button type="submit" className="btn btn-primary">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Chat;
