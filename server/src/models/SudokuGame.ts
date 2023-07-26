import { SudokuBoard } from "./SudokuBoard.js";
import { Player } from "./Player.js";
import generateSudoku from "../utils/generateSudoku.js";

export class SudokuGame {
  private players: Player[];
  private roomId: string;
  private board: SudokuBoard;
  private solutionBoard: SudokuBoard;

  constructor(roomId: string) {
    this.players = [];
    this.roomId = roomId;
    const { grid, solution } = generateSudoku();
    this.board = grid;
    this.solutionBoard = solution;
  }

  getRoomId = () => {
    return this.getRoomId;
  };

  getBoard = () => {
    return this.board;
  };

  getSolutionBoard = () => {
    return this.solutionBoard;
  };
}
