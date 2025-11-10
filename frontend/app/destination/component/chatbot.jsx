import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleKeyPress = async (e) => {
    if (e.key === "Enter" && input.trim()) {
      const newMessage = { sender: "user", text: input };
      setMessages((prev) => [...prev, newMessage]);
      const userInput = input;
      setInput("");

      try {
        const res = await axios.post("http://localhost:5000/api/chat", {
          message: userInput,
        });
        const botMessage = { sender: "bot", text: res.data.reply };
        setMessages((prev) => [...prev, botMessage]);
      } catch (err) {
        console.error(err);
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "Server error. Try again later." },
        ]);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-semibold mt-10 mb-6 text-gray-800">
        How can I help you?
      </h1>

      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-6 flex flex-col h-[70vh]">
        <div className="flex-1 overflow-y-auto space-y-3 mb-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-2xl text-white ${
                  msg.sender === "user"
                    ? "bg-blue-500 rounded-br-none"
                    : "bg-gray-400 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask me anything..."
            className="flex-1 bg-gray-100 border border-gray-300 h-12 rounded-2xl pl-4 pr-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
