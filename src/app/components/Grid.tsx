"use client";

import React, { useContext, useState } from "react";
import SudokuCell from "./SudokuCell";
import { CellContext } from "../context/cellContext";
import { CellContextProps } from "../types/types";

function Grid() {
  const sudokuGrid = [
    [3, 0, 6, 5, 0, 8, 4, 0, 0],
    [5, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 8, 7, 0, 0, 0, 0, 3, 1],
    [0, 0, 3, 0, 1, 0, 0, 8, 0],
    [9, 0, 0, 8, 6, 3, 0, 0, 5],
    [0, 5, 0, 0, 9, 0, 6, 0, 0],
    [1, 3, 0, 0, 0, 0, 2, 5, 0],
    [0, 0, 0, 0, 0, 0, 0, 7, 4],
    [0, 0, 5, 2, 0, 6, 3, 0, 0],
  ];
  const { grid, solution } = useContext(CellContext) as CellContextProps;
  const [focusCell, setFocusCell] = useState();
  console.log(4111, grid);
  console.log(5111, solution);

  return (
    <div className="grid grid-cols-9 mx-auto max-w-md">
      {grid?.map((row, rowIndex) =>
        row.map((cell, columnIndex) => (
          <SudokuCell
            key={`${rowIndex}-${columnIndex}`}
            value={cell}
            rowIndex={rowIndex}
            columnIndex={columnIndex}
            focusCell={focusCell}
            setFocusCell={setFocusCell}
          />
        ))
      )}
    </div>
  );
}

export default Grid;
