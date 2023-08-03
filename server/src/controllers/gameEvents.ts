import { Server, Socket } from "socket.io";
import { CellIndex } from "../types/types.js";
import { SudokuGame } from "../models/SudokuGame.js";
import { Player } from "../models/Player.js";

export const setupGameEvents = (
  io: Server,
  socket: Socket,
  game: SudokuGame
) => {
  socket.on(
    "checkAgainstSolution",
    (playerId: string, selectedNumber: number, focusedCellIndex: CellIndex) => {
      const player = game.getPlayerData(playerId);
      const board = player?.getBoard();
      const solution = game.getSolutionBoard();
      if (selectedNumber && focusedCellIndex && board && solution) {
        const newGrid = JSON.parse(JSON.stringify(board));
        newGrid[focusedCellIndex.row][focusedCellIndex.col] = selectedNumber;
        if (
          newGrid[focusedCellIndex.row][focusedCellIndex.col] ===
          solution[focusedCellIndex.row][focusedCellIndex.col]
        ) {
          if (player) {
            player.setBoard(newGrid);
            player.incrementScore();
            emitPlayerDataUpdate(playerId); // if check needed because map.get returns Player | undefined
          }
          checkIfComplete(playerId, newGrid, solution);
        } else {
          if (player) {
            player.decrementScore();
            emitPlayerDataUpdate(playerId); // if check needed because map.get returns Player | undefined
          }

          emitIncorrectValue(playerId, focusedCellIndex);
        }
      }
    }
  );

  socket.on("devCompleteBoard", (playerId: string) => {
    const player = game.getPlayerData(playerId);
    const solution = game.getSolutionBoard();
    player?.setBoard(solution);
    if (player) emitPlayerDataUpdate(playerId); // if check needed because map.get returns Player | undefined
    checkIfComplete(playerId, game.getSolutionBoard(), solution);
  });

  socket.on("setFinalTime", (playerId: string, finalTime: string) => {
    const player = game.getPlayerData(playerId);
    if (player) {
      player.setTime(finalTime);
      emitPlayerDataUpdate(playerId);
    }
  });

  const checkIfComplete = (
    playerId: string,
    grid: number[][],
    solution: number[][]
  ) => {
    if (grid && solution) {
      let hasMismatch = false; // Flag to track if any mismatched values are found

      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (grid[i][j] !== solution[i][j]) {
            hasMismatch = true;
            break; // Exit the inner loop if a mismatch is found
          }
        }
        if (hasMismatch) {
          break; // Exit the outer loop if a mismatch is found
        }
      }
      if (!hasMismatch) {
        emitPlayerCompleted(playerId);
      }
    }
  };

  const emitPlayerCompleted = (playerId: string) => {
    const roomId = game.getRoomId();
    const player = game.getPlayerData(playerId);
    socket.emit("completed", true);
    socket.to(roomId).emit("otherPlayerCompleted", player);
  };

  const emitPlayerDataUpdate = (playerId: string) => {
    const roomId = game.getRoomId();
    const players = game.getListOfPlayers();
    const playersArray: { id: string; player: Player }[] = Array.from(
      players,
      ([key, player]) => ({
        id: key,
        player,
      })
    );
    io.to(roomId).emit("playerDataUpdated", playersArray);
  };

  const emitIncorrectValue = (
    playerId: string,
    focusedCellIndex: CellIndex
  ) => {
    io.to(playerId).emit("incorrectValue", focusedCellIndex);
  };
};
