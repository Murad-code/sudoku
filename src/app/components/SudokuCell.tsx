"use client";
import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { CellContext } from "../context/cellContext";
import { CellContextProps } from "../types/types";

interface SudokuCellProps {
  value: number;
  rowIndex: number;
  columnIndex: number;
  focusCell: { row: number; col: number } | undefined;
  setFocusCell: Dispatch<
    SetStateAction<{ row: number; col: number } | undefined>
  >;
}

function SudokuCell({
  value,
  rowIndex,
  columnIndex,
  focusCell,
  setFocusCell,
}: SudokuCellProps) {
  const [cellValue, setCellValue] = useState(value);
  const { cellIndex, setCellIndex } = useContext(
    CellContext
  ) as CellContextProps;

  const handleClick = () => {
    setCellIndex({ row: rowIndex, col: columnIndex });
    setFocusCell(cellIndex || undefined);
  };

  if (cellValue === 0) {
    return (
      <div>
        <button
          //   key={`${rowIndex}-${columnIndex}`}
          className={`bg-gray-100 text-center flex items-center justify-center w-full h-0 aspect-w-1 aspect-h-1 p-4 outline-1 outline outline-gray-400 hover:bg-blue-300 focus:outline-blue-300 ${
            columnIndex === 2 || columnIndex === 5
              ? "border-r-2 border-black"
              : ""
          } ${
            rowIndex === 2 || rowIndex === 5 ? "border-b-2 border-black" : ""
          }${
            focusCell &&
            focusCell.row === rowIndex &&
            focusCell.col === columnIndex
              ? "outline-blue-300" // Add the outline styling if the cell is focused
              : ""
          }`}
          onClick={handleClick}
        ></button>
      </div>
    );
  }

  return (
    <div
      //   key={`${rowIndex}-${columnIndex}`}
      className={`bg-gray-100 text-center flex items-center justify-center w-full h-0 aspect-w-1 aspect-h-1 p-4 outline-1 outline outline-gray-400 ${
        columnIndex === 2 || columnIndex === 5 ? "border-r-2 border-black" : ""
      } ${rowIndex === 2 || rowIndex === 5 ? "border-b-2 border-black" : ""}`}
    >
      {cellValue}
    </div>
  );
}

export default SudokuCell;
