import express from "express";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";

const app = express();
const port = 8080;

const server = createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
