require("dotenv").config();
const app = require("./src/app");
const { createServer } = require("http");
const { Server } = require("socket.io");

const generateResponse = require('./src/Services/ai.service')

const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
});

io.on("connection", (socket) => {
  console.log("A user is connected");

  socket.on("disconnect", () => {
    console.log("A user is disconnected");
  });


  socket.on("prompt", async (prompt) => {
    console.log("Prompt", prompt);

    const resp = await generateResponse(prompt)

    socket.emit('response', { response: resp });
  });

});

httpServer.listen(3000);
