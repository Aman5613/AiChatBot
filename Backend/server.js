require("dotenv").config();
const app = require("./src/app");
const { createServer } = require("http");
const { Server } = require("socket.io");
const generateResponse = require("./src/Services/ai.service");

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors:{
    origin: "http://localhost:5173"
  }
});

// chat history save karna ke -> it will give short term memory to Model
const chatHistory = [];

// socket io ka server connection ke liye
io.on("connection", (socket) => {
  console.log("A user is connected");

  socket.on("disconnect", () => {
    console.log("A user is disconnected");
  });

  // custom event for user prompt
  socket.on("prompt", async (prompt) => {
    // chat history of user
    chatHistory.push({
      role: "user",
      parts: [{ text: prompt }],
    });

    // generate response from AI model
    const resp = await generateResponse(chatHistory);

    // chat history of model
    chatHistory.push({
      role: "model",
      parts: [{ text: resp }],
    });

    // send response back to client
    socket.emit("response", { 
      role : "model",
      response : resp
     });
  });
});

httpServer.listen(3000);
