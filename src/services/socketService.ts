import { Player } from "@/types/socketio";
import { Socket, io } from "socket.io-client";

export const initSocket = () => {
  const socket = io(String(process.env.NEXT_PUBLIC_SERVER_URL));
  socket.on("connect", () => {
    console.log("socket initiliased: " + socket.id);
  });
  socket.on("disconnect", () => {
    // Implement logic to emit event to remove user from all rooms
    console.log("socket disconnected client: " + socket.id);
  });
  return socket;
};

export const createRoom = (socket: Socket, name: string) => {
  console.log("createRoom called");
  socket.emit("createRoom", name);
};

export const joinRoom = (socket: Socket, username: string, roomId: string) => {
  socket.emit("joinRoom", username, roomId);
};

export const roomNotFound = (socket: Socket) => {
  socket.on("roomNotFound", () => console.log("Room Not Found"));
};

export const listenRoomCreated = (
  socket: Socket,
  callback: (roomId: string) => void
) => {
  socket.on("roomCreated", callback);
};

export const listenRoomJoined = (
  socket: Socket,
  callback: (roomId: string) => void
) => {
  socket.on("roomJoined", callback);
};

export const listenSocketsInRoom = (
  socket: Socket,
  callback: (socketList: string[]) => void
) => {
  socket.on("socketsInRoom", callback);
};

export const listenLobbyUpdated = (
  socket: Socket,
  setPlayers: (players: Player[]) => void
) => {
  socket.on("lobbyUpdated", (players) => {
    setPlayers(players);
  });
};

export const startGame = (socket: Socket, roomId: string) => {
  socket.emit("startGame", roomId);
};

export const listenGameStarted = (
  socket: Socket,
  setGrid: (board: number[][]) => void
) => {
  socket.on("gameStarted", (board) => {
    console.log(1222, board);
    setGrid(board);
  });
};
