import { Server, Socket } from "socket.io";
import { Player } from "./models/Player.js";


const playerData: { [id: string]: Player } = {}; // Centralized player data storage


// Defines the socket event handlers
export const setupSocketEvents = (io: Server) => {
  io.on("connection", (socket) => {
    console.log("a user connected as: " + socket.id);
    socket.on("disconnect", () => {
      console.log("user disconnected");
      // Clean up player data when socket disconnects
      if (playerData[socket.id]) {
        delete playerData[socket.id];
      }
    });

    // Host route handler
    socket.on("createRoom", (name) => {
      const player = new Player(socket.id, name);
      playerData[socket.id] = player; // Store player data

      const room = Math.random().toString(36).substring(7); // Generate a random room ID
      socket.join(room);
      socket.emit("roomCreated", room);

      updateLobby(room); // Emit "lobbyUpdated" event to update lobby information for all sockets in the room
    });

    // Join route handler
    socket.on("join", (room, name) => {
      const player = new Player(socket.id, name);
      playerData[socket.id] = player; // Store player data

      if (io.sockets.adapter.rooms.has(room)) {
        socket.join(room);
        socket.emit("roomJoined", room);
        updateLobby(room); // Emit "lobbyUpdated" event to update lobby information for all sockets in the room
      } else {
        socket.emit("roomNotFound");
      }
    });
  });

  // Function to emit "lobbyUpdated" event to update lobby information for all sockets in a room
  function updateLobby(room: string) {
    const socketsInRoom = Array.from(io.sockets.adapter.rooms.get(room) || []);
    const playersInRoom = socketsInRoom.map((socketId) => playerData[socketId]);
    io.to(room).emit("lobbyUpdated", playersInRoom);
  }
};
