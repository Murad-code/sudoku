import { Server } from "socket.io";
import { Player } from "../models/Player.js";
import { SudokuGame } from "../models/SudokuGame.js";
import { setupGameEvents } from "./gameEvents.js";

const listOfPlayers = new Map<string, Player>(); // Centralized player data storage

// Defines the socket event handlers
export const setupSocketEvents = (io: Server) => {
  io.on("connection", (socket) => {
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
      const room = Math.random().toString(36).substring(7); // Generate a random room ID

      socket.join(room);
      socket.emit("roomCreated", room);

      updateLobby(room); // Emit "lobbyUpdated" event to update lobby information for all sockets in the room
    });

    // Join route handler
    socket.on("joinRoom", (name, room) => {
      const player = new Player(socket.id, name);
      listOfPlayers.set(socket.id, player);

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

      setupGameEvents(io, socket, game);
    });

    socket.on("getLobbyPlayers", (roomId) => {
      updateLobby(roomId);
    });
  });

  // Function to emit "lobbyUpdated" event to update lobby information for all sockets in a room
  function updateLobby(room: string) {
    const socketsInRoom = Array.from(io.sockets.adapter.rooms.get(room) || []);
    const playersInRoom = socketsInRoom.map((socketId) => ({
      socketId,
      player: listOfPlayers.get(socketId),
    }));
    io.to(room).emit("lobbyUpdated", playersInRoom);
  }
};
