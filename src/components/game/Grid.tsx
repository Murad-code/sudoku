"use client";

import React, { useContext } from "react";
import SudokuCell from "./SudokuCell";
import { CellContext } from "@/hooks/useCellContext";
import { CellContextProps } from "@/types/types";

function Grid() {
  const { grid } = useContext(CellContext) as CellContextProps;

  return (
    <div className="grid grid-cols-9 mx-auto max-w-md">
      {grid?.map((row, rowIndex) =>
        row.map((cell, columnIndex) => (
          <SudokuCell
            key={`${rowIndex}-${columnIndex}`}
            value={cell}
            rowIndex={rowIndex}
            columnIndex={columnIndex}
          />
        ))
      )}
    </div>
  );
}

export default Grid;
