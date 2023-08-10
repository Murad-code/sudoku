import express from "express";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { instrument } from "@socket.io/admin-ui";
import { setupSocketEvents } from "./controllers/socketEvents.js";
import cors from "cors";

const app = express();
const testApp = express();
const port = 8080;

testApp.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://admin.socket.io",
      "https://multidoku.vercel.app",
    ],
    credentials: true,
  })
);

testApp.listen(8081, () => {
  console.log("API running on 8081");
});

testApp.get("/", (req, res) => res.json("Connected to server"));

const server = createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://admin.socket.io",
      "https://multidoku.vercel.app",
    ],
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
