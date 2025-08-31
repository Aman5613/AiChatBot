import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";



export default function App() {
  const[socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", content: input }]);
    socket.emit("prompt", input); // frontend se backend pe prompt send kar rhe hai
    setInput("");
  };

  useEffect(() => {
    const socketInstance = io("http://localhost:3000");
    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      console.log("Connected to server");
    });

    socketInstance.on("response", (message) => {
      // If message is an object with a 'response' property, use that as content
      const msgObj =
      typeof message === "object" && message.response
        ? { role: "model", content: message.response }
        : message;
      setMessages((prevMessages) => [...prevMessages, msgObj]);
      console.log(msgObj);
    });


    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold mb-4">ChatBot</h2>
        <button className="bg-gray-700 px-3 py-2 rounded-lg mb-2 text-left hover:bg-gray-600">
          + New Chat
        </button>
        <div className="flex-1 overflow-y-auto">
          <p className="text-gray-400 text-sm">Recent chats...</p>
        </div>
        <button className="bg-gray-800 px-3 py-2 rounded-lg mt-2 hover:bg-gray-700">
          Settings
        </button>
      </div>

      {/* Main Chat Window */}
      <div className="flex flex-col flex-1">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-2xl ${
                  msg.role === "user"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-300 text-gray-900 rounded-bl-none"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        {/* Input Box */}
        <div className="p-4 border-t bg-white flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Send a message..."
            className="flex-1 px-4 py-2 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-2xl hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
