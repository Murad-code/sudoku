import React, { Dispatch, SetStateAction } from "react";

export interface CellContextProps {
  focusedCellIndex: { row: number; col: number } | undefined;
  setFocusedCellIndex: Dispatch<
    SetStateAction<{ row: number; col: number } | undefined>
  >;
  selectedNumber: number | undefined;
  setSelectedNumber: React.Dispatch<React.SetStateAction<number | undefined>>;
  grid: number[][] | null;
  setGrid?: React.Dispatch<React.SetStateAction<number[][] | null>>;
  solution: number[][] | null;
  errorCellIndex: { row: number; col: number } | null;
  setErrorCellIndex: Dispatch<
    SetStateAction<{ row: number; col: number } | null>
  >;
  generateNewSudoku?: () => void;
  handleRestart?: () => void;
  startTime: moment.Moment;
  setStartTime: React.Dispatch<React.SetStateAction<moment.Moment>>;
  elapsedTime: moment.Duration;
  setElapsedTime: React.Dispatch<React.SetStateAction<moment.Duration>>;
  isComplete: boolean;
  // testing purposes
  testCompleteGrid?: () => void;
}

export interface SudokuCellProps {
  value: number;
  rowIndex: number;
  columnIndex: number;
}