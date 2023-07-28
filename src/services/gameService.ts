import { useRouter } from "next/navigation";
import { Socket } from "socket.io-client";

export const emitStartGame = (socket: Socket, roomId: string) => {
  console.log(1111);
  socket.emit("startGame", roomId);
};

export const listenGameStarted = (
  socket: Socket,
  setGrid: (board: number[][]) => void,
  callback: () => void
) => {
  socket.on("gameStarted", (board) => {
    console.log(1222, board);
    setGrid(board);
    callback();
  });
};
