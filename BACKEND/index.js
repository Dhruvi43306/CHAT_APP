const express = require("express");
const { Server } = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);

app.get("/", (req, res) => {
  res.send("Socket.IO Chat Server Running");
});

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const messages = [];

// connection event: client connects to server
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

// server → client 
  socket.emit("oldMessages", messages);

   // client → server
  socket.on("sendMessage", (message) => {
    const msgData = {
      senderId: socket.id,
      text: message,
      time: new Date().toLocaleTimeString(),
    };

    messages.push(msgData);
    // socket.broadcast.emit("receiveMessage", msgData); reciver can show sending message but not show sender message for sending user box inside 
    // socket.emit("receiveMessage", msgData); only sender
    io.emit("receiveMessage", msgData); // server → all clients
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Server started @ 3000");
});