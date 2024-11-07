import React, { useState } from "react";
import { Send } from "lucide-react";
import axios from "axios";

export default function Chatbot() {
  const [messages, setMessages] = useState([{ text: "Hello! I'm a simple chatbot. How can I help you today?", isBot: true }]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim() === "") return;

    // Add user message
    setMessages((prevMessages) => [...prevMessages, { text: inputMessage, isBot: false }]);

    axios
      .post("/chat/send-message", {
        message: inputMessage,
      })
      .then((res) => {
        setMessages((prevMessages) => [...prevMessages, { text: `${res.data.response}`, isBot: true }]);
      });

    setInputMessage("");
  };

  return (
    <div className="mx-auto flex w-full flex-col">
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
            <div className={`max-w-xs rounded-lg p-3 ${message.isBot ? "bg-gray-200 text-gray-800" : "bg-blue-500 text-white"}`}>{message.text}</div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="border-t p-4">
        <div className="flex items-center">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-l-md border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="rounded-r-md bg-blue-500 p-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
