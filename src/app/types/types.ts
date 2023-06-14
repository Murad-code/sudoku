import React, { Dispatch, SetStateAction } from "react";

export interface CellContextProps {
  focusedCellIndex: { row: number; col: number } | undefined;
  setFocusedCellIndex: Dispatch<
    SetStateAction<{ row: number; col: number } | undefined>
  >;
  selectedNumber: number | undefined;
  setSelectedNumber: React.Dispatch<React.SetStateAction<number | undefined>>;
  grid: number[][] | null;
  solution: number[][] | null;
}

export interface SudokuCellProps {
  value: number;
  rowIndex: number;
  columnIndex: number;
}
