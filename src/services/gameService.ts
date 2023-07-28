import { Socket } from "socket.io-client";

export const emitStartGame = (socket: Socket, roomId: string) => {
  socket.emit("startGame", roomId);
};

export const listenGameStarted = (
  socket: Socket,
  setGrid: (board: number[][]) => void,
  callback: () => void
) => {
  socket.on("gameStarted", (board) => {
    setGrid(board);
    callback();
  });
};
