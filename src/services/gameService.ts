import { Player } from "@/types/socketio";
import { CellIndex } from "@/types/types";
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

export const emitCheckAgainstSolution = (
  socket: Socket,
  selectedNumber: number,
  focusedCellIndex: CellIndex
) => {
  socket.emit(
    "checkAgainstSolution",
    socket.id,
    selectedNumber,
    focusedCellIndex
  );
};

export const listenCorrectValue = (
  socket: Socket,
  setGrid: (grid: number[][]) => void
) => {
  socket.on("correctValue", (grid) => {
    setGrid(grid);
  });
};

export const listenIncorrectValue = (
  socket: Socket,
  setErrorCellIndex: (cellIndex: CellIndex) => void
) => {
  socket.on("incorrectValue", (cellIndex) => {
    setErrorCellIndex(cellIndex);
  });
};

export const listenIfComplete = (
  socket: Socket,
  callback: (isComplete: boolean) => void
) => {
  socket.on("completed", (isComplete) => {
    callback(isComplete);
  });
};

export const listenIfOthersComplete = (
  socket: Socket,
  callback: (playerId: string) => void
) => {
  socket.on("otherPlayerCompleted", (playerId) => {
    // setState on Players inside zustand only updating the player completed
  });
};

export const listenIfPlayerDataUpdated = (
  socket: Socket,
  callback: (id: string, player: Player) => void
) => {
  socket.on("playerDataUpdated", (id, player) => {
    callback(id, player);
  });
};

export const emitDevCompleteBoard = (socket: Socket, playerId: string) => {
  socket.emit("devCompleteBoard", playerId);
};
