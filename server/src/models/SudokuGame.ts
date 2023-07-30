import { Player } from "./Player.js";
import generateSudoku from "../utils/generateSudoku.js";

export class SudokuGame {
  private listOfPlayers: Map<string, Player>;
  private roomId: string;
  private board: number[][];
  private solutionBoard: number[][];

  constructor(roomId: string, listOfPlayers: Map<string, Player>) {
    this.roomId = roomId;
    this.listOfPlayers = listOfPlayers;
    const { grid, solution } = generateSudoku();
    this.board = grid;
    this.solutionBoard = solution;
    this.initBoardForPlayers(grid);
  }

  initBoardForPlayers = (board: number[][]) => {
    this.listOfPlayers.forEach((player) => player.setBoard(board));
  };

  getRoomId = () => {
    return this.roomId;
  };

  getListOfPlayers = () => {
    return this.listOfPlayers;
  };

  getPlayerData = (id: string): Player | undefined => {
    return this.listOfPlayers.get(id);
  };

  getBoard = () => {
    return this.board;
  };

  getSolutionBoard = () => {
    return this.solutionBoard;
  };
}
