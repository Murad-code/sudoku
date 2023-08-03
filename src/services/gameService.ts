import { Player, PlayerData } from "@/types/socketio";
import { CellIndex } from "@/types/types";
import { convertObjToMap } from "@/utils/convertObjToMap";
import { Socket } from "socket.io-client";

export const emitStartGame = (socket: Socket, roomId: string) => {
  socket.emit("startGame", roomId);
};

export const listenGameStarted = (
  socket: Socket,
  setGrid: (board: number[][]) => void,
  setIsComplete: (isComplete: boolean) => void,
  setElapsedTimeToZero: () => void,
  callback: () => void
) => {
  socket.on("gameStarted", (board) => {
    setGrid(board);
    setIsComplete(false);
    setElapsedTimeToZero();
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

export const emitFinalTime = (socket: Socket, finalTime: string) => {
  socket.emit("setFinalTime", socket.id, finalTime);
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

export const listenIfOthersCompleted = (
  socket: Socket,
  callback: (player: Player) => void
) => {
  socket.on("otherPlayerCompleted", (player) => {
    callback(player);
  });
};

export const listenIfPlayerDataUpdated = (
  socket: Socket,
  callback: (players: Map<string, Player>) => void
) => {
  socket.on("playerDataUpdated", (playersInRoom: PlayerData[]) => {
    const map = convertObjToMap(playersInRoom);
    callback(map);
  });
};

export const emitDevCompleteBoard = (socket: Socket, playerId: string) => {
  socket.emit("devCompleteBoard", playerId);
};

export const emitRestartGame = (socket: Socket, roomId: string) => {
  socket.emit("startGame", roomId);
};
