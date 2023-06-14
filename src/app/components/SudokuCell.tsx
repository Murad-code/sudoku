"use client";
import React, { useContext, useEffect, useState } from "react";
import { CellContext } from "../context/cellContext";
import { CellContextProps, SudokuCellProps } from "../types/types";

function SudokuCell({ value, rowIndex, columnIndex }: SudokuCellProps) {
  const [cellValue, setCellValue] = useState(value);
  const { setFocusedCellIndex } = useContext(CellContext) as CellContextProps;

  const handleClick = () => {
    setFocusedCellIndex({ row: rowIndex, col: columnIndex });
  };

  useEffect(() => {
    setCellValue(value);
  }, [value]);

  if (cellValue === 0) {
    return (
      <div>
        <button
          className={`bg-gray-100 text-center flex items-center justify-center w-full h-0 aspect-w-1 aspect-h-1 p-4 outline-1 outline outline-gray-400 hover:bg-red-200 focus:bg-red-300 ${
            columnIndex === 2 || columnIndex === 5
              ? "border-r-2 border-black"
              : ""
          } ${rowIndex === 2 || rowIndex === 5 ? "border-b-2 border-black" : ""}
          `}
          onClick={handleClick}
        ></button>
      </div>
    );
  }

  return (
    <div
      className={`bg-gray-100 text-center flex items-center justify-center w-full h-0 aspect-w-1 aspect-h-1 p-4 outline-1 outline outline-gray-400 ${
        columnIndex === 2 || columnIndex === 5 ? "border-r-2 border-black" : ""
      } ${rowIndex === 2 || rowIndex === 5 ? "border-b-2 border-black" : ""}`}
    >
      {cellValue}
    </div>
  );
}

export default SudokuCell;
