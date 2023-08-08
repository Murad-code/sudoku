import { Server } from "socket.io";
import { Player } from "../models/Player.js";
import { SudokuGame } from "../models/SudokuGame.js";
import { setupGameEvents } from "./gameEvents.js";

interface ActiveSocket {
  [socketId: string]: number; // Store the timestamp of last activity
}

const activeSockets: ActiveSocket = {};
const listOfPlayers = new Map<string, Player>(); // Centralized player data storage

// Defines the socket event handlers
export const setupSocketEvents = (io: Server) => {
  io.on("connection", (socket) => {
    updateLastActiveTime(socket.id);
    console.log("a user connected as: " + socket.id);
    socket.on("disconnect", () => {
      console.log("user disconnected: " + socket.id);
      // Clean up player data when socket disconnects
      if (listOfPlayers.has(socket.id)) {
        listOfPlayers.delete(socket.id);
      }
    });

    // Host route handler
    socket.on("createRoom", (name) => {
      const player = new Player(socket.id, name);
      listOfPlayers.set(socket.id, player);
      updateLastActiveTime(socket.id);

      const room = Math.random().toString(36).substring(7); // Generate a random room ID

      socket.join(room);
      socket.emit("roomCreated", room);

      updateLobby(room); // Emit "lobbyUpdated" event to update lobby information for all sockets in the room
    });

    // Join route handler
    socket.on("joinRoom", (name, room) => {
      const player = new Player(socket.id, name);
      listOfPlayers.set(socket.id, player);
      updateLastActiveTime(socket.id);

      if (io.sockets.adapter.rooms.has(room)) {
        socket.join(room);
        socket.emit("roomJoined", room);
        updateLobby(room); // Emit "lobbyUpdated" event to update lobby information for all sockets in the room
      } else {
        socket.emit("roomNotFound");
      }
    });

    socket.on("startGame", (roomId) => {
      const game = new SudokuGame(roomId, listOfPlayers);
      io.to(roomId).emit("gameStarted", game.getBoard());

      // Loop through all sockets in the room and call setupGameEvents for each socket
      const socketsInRoom = Array.from(
        io.sockets.adapter.rooms.get(roomId) || []
      );
      socketsInRoom.forEach((socketId) => {
        updateLastActiveTime(socketId);
        const socketInRoom = io.sockets.sockets.get(socketId);
        if (socketInRoom) {
          setupGameEvents(io, socketInRoom, game, updateLastActiveTime);
        }
      });
    });

    socket.on("getLobbyPlayers", (roomId) => {
      updateLobby(roomId);
    });

    // Set up a periodic check to disconnect inactive sockets
    setInterval(() => {
      console.log("checking: ", Date.now());
      const currentTime = Date.now();
      const timeoutDuration = 60 * 10000; // 10 minutes

      Object.keys(activeSockets).forEach((socketId) => {
        const lastActivityTime = activeSockets[socketId];
        if (currentTime - lastActivityTime > timeoutDuration) {
          console.log("timeout should emit");
          // Disconnect the socket if it has been inactive for too long
          io.to(socketId).emit("timeout"); // Notify the client about the timeout
          io.sockets.sockets.get(socketId)?.disconnect();
          delete activeSockets[socketId];
        }
      });
    }, 60000); // Check every minute
  });

  function updateLastActiveTime(socketId: string) {
    activeSockets[socketId] = Date.now();
  }

  // Function to emit "lobbyUpdated" event to update lobby information for all sockets in a room
  function updateLobby(room: string) {
    const socketsInRoom = Array.from(io.sockets.adapter.rooms.get(room) || []);
    const playersInRoom = socketsInRoom.map((id) => ({
      id,
      player: listOfPlayers.get(id),
    }));
    io.to(room).emit("lobbyUpdated", playersInRoom);
  }
};
