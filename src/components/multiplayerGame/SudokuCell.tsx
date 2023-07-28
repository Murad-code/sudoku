"use client";
import React, { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { SudokuCellProps } from "../../types/types";
import { useSudokuGridStore } from "@/hooks/useSudokuStore";

function SudokuCell({ value, rowIndex, columnIndex }: SudokuCellProps) {
  const [cellValue, setCellValue] = useState(value);
  const { setFocusedCellIndex, errorCellIndex } = useSudokuGridStore();

  const handleClick = () => {
    setFocusedCellIndex({ row: rowIndex, col: columnIndex });
  };

  useEffect(() => {
    setCellValue(value);
  }, [value, errorCellIndex]);

  if (cellValue === 0) {
    return (
      <div>
        <button
          className={`relative bg-gray-100 text-center flex items-center justify-center w-full h-0 aspect-w-1 aspect-h-1 p-4 outline-1 outline outline-gray-400 hover:bg-red-200 focus:bg-red-300 ${
            columnIndex === 2 || columnIndex === 5
              ? "border-r-2 border-black"
              : ""
          } ${rowIndex === 2 || rowIndex === 5 ? "border-b-2 border-black" : ""}
  ${
    errorCellIndex?.col == columnIndex && errorCellIndex?.row == rowIndex
      ? "relative"
      : ""
  }`}
          onClick={handleClick}
        >
          <Transition
            show={
              errorCellIndex?.col == columnIndex &&
              errorCellIndex?.row == rowIndex
            }
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="absolute inset-0 flex items-center justify-center border-4 border-red-500 pointer-events-none"></div>
          </Transition>
        </button>
      </div>
    );
  }

  return (
    <div
      className={`relative bg-gray-100 text-center flex items-center justify-center w-full h-0 aspect-w-1 aspect-h-1 p-4 outline-1 outline outline-gray-400 ${
        columnIndex === 2 || columnIndex === 5 ? "border-r-2 border-black" : ""
      } ${rowIndex === 2 || rowIndex === 5 ? "border-b-2 border-black" : ""}`}
    >
      {cellValue}
    </div>
  );
}

export default SudokuCell;
