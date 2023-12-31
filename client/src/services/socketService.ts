import { Player, PlayerData } from "@/types/socketio";
import { convertObjToMap } from "@/utils/convertObjToMap";
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

export const emitCreateRoom = (socket: Socket, name: string) => {
  console.log("createRoom called");
  socket.emit("createRoom", name);
};

export const emitJoinRoom = (
  socket: Socket,
  username: string,
  roomId: string
) => {
  socket.emit("joinRoom", username, roomId);
};

export const listenRoomNotFound = (socket: Socket) => {
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

export const emitGetLobbyPlayers = (socket: Socket, roomId: string) => {
  socket.emit("getLobbyPlayers", roomId);
};

export const listenLobbyUpdated = (
  socket: Socket,
  setPlayers: (players: Map<string, Player>) => void
) => {
  socket.on("lobbyUpdated", (playersInRoom: PlayerData[]) => {
    const map = convertObjToMap(playersInRoom);
    setPlayers(map);
  });
};

export const listenIfTimeout = (socket: Socket, handleTimeout: () => void) => {
  socket.on("timeout", () => {
    handleTimeout();
  });
};
