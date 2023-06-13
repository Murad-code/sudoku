import React, { Dispatch, SetStateAction } from "react";

export interface CellContextProps {
  cellIndex: { row: number; col: number } | undefined;
  setCellIndex: Dispatch<
    SetStateAction<{ row: number; col: number } | undefined>
  >;
  selectedNumber: number | undefined;
  setSelectedNumber: React.Dispatch<React.SetStateAction<number | undefined>>;
  grid: number[][] | undefined;
  solution: number[][] | undefined;
}
