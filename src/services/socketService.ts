import { Socket, io } from "socket.io-client";

export const initSocket = (callback: (socket: Socket) => void) => {
  const socket = io(String(process.env.NEXT_PUBLIC_SERVER_URL));
  socket.on("connect", () => {
    callback(socket);
  });
  socket.on("disconnect", () => {
    // Implement logic to emit event to remove user from all rooms
  });
};

export const createRoom = (socket: Socket, name: string) => {
  console.log("createRoom called");
  socket.emit("createRoom", name);
};

export const joinRoom = (socket: Socket, roomId: string) => {
  socket.emit("joinRoom", roomId);
};

export const listenRoomCreated = (
  socket: Socket,
  callback: (roomId: string) => void
) => {
  socket.on("roomCreated", callback);
};

export const listenSocketsInRoom = (
  socket: Socket,
  callback: (socketList: string[]) => void
) => {
  socket.on("socketsInRoom", callback);
};
