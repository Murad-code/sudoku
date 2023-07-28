import React, { Dispatch, SetStateAction } from "react";

export type CellIndex = { row: number; col: number } | undefined;

export interface ISudokuGridStore {
  focusedCellIndex: CellIndex | undefined;
  selectedNumber: number;
  grid: number[][] | null;
  solution: number[][] | null;
  errorCellIndex: CellIndex | null;
  startTime: moment.Moment;
  elapsedTime: moment.Duration;
  isComplete: boolean;
  setFocusedCellIndex: (cellIndex: CellIndex | undefined) => void;
  setSelectedNumber: (number: number | undefined) => void;
  setGrid: (grid: number[][] | null) => void;
  setSolution: (solution: number[][] | null) => void;
  setErrorCellIndex: (cellIndex: CellIndex | null) => void;
  setStartTime: (startTime: moment.Moment) => void;
  setElapsedTime: (elapsedTime: moment.Duration) => void;
  setElapsedTimeToZero: () => void;
  setIsComplete: (isComplete: boolean) => void;
  generateNewSudoku: () => void;
  errorMessage: () => void;
  checkIfComplete: () => void;
  checkAgainstSolution: () => void;
  handleRestart: () => void;
  testCompleteGrid: () => void;
}

export interface SudokuCellProps {
  value: number;
  rowIndex: number;
  columnIndex: number;
}
