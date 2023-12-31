import express from "express";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { instrument } from "@socket.io/admin-ui";
import { setupSocketEvents } from "./controllers/socketEvents.js";

const app = express();
const port = 8080;

const allowedOrigins = [
  "http://localhost:3000",
  "https://admin.socket.io",
  "https://multidoku.vercel.app",
];

const server = createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

setupSocketEvents(io);

instrument(io, {
  auth: false,
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
