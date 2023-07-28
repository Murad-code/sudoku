"use client";
import React, { useEffect } from "react";
import SudokuCell from "./SudokuCell";
import { useSudokuGridStore } from "@/hooks/useSudokuStore";

function Grid() {
  const { grid, selectedNumber, checkAgainstSolution, checkIfComplete } =
    useSudokuGridStore();

  useEffect(() => {
    if (selectedNumber !== 0 || selectedNumber) checkAgainstSolution();
    checkIfComplete();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNumber, grid]);

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
