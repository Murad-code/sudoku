import { Duration } from "moment";

export class Player {
  private id: string;
  private name!: string;
  private score: number;
  private board?: number[][];
  private time?: Duration; // Only stores the time taken to complete puzzle, set by client side

  constructor(id: string, name?: string, board?: number[][]) {
    this.id = id;
    if (name !== undefined) this.name = name;
    if (board !== undefined) this.board = board;
    this.score = 0;
  }

  getId() {
    return this.id;
  }

  setName(name: string) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  getScore() {
    return this.score;
  }

  setBoard(board: number[][]) {
    this.board = board;
  }

  getBoard() {
    return this.board;
  }

  getTime() {
    return this.time;
  }

  setTime(time: Duration) {
    this.time = time;
  }

  incrementScore() {
    this.score += 10;
  }

  decrementScore() {
    this.score -= 5;
  }

  // Sets the focused cell to have red borders (to show it was an incorrect answer)
  errorMessage() {}
}
