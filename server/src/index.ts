import express from "express";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { Server } from "socket.io";
import { instrument } from "@socket.io/admin-ui";
import { SudokuGame } from "./models/SudokuGame.js";
import { SudokuBoard } from "./models/SudokuBoard.js";
import { setupSocketEvents } from "./socketEvents.js";

const app = express();
const port = 8080;

const server = createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: ["http://localhost:3000", "https://admin.socket.io"],
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
