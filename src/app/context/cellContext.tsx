"use client";
import React, { createContext, useEffect, useState, ReactNode } from "react";
import generateSudoku from "../utils/generateSudoku";
import { CellContextProps } from "../types/types";

export const CellContext = createContext<CellContextProps | null>(null);

const CellContextProvider = ({ children }: { children: ReactNode }) => {
  const [cellIndex, setCellIndex] = useState<
    { row: number; col: number } | undefined
  >();
  const [selectedNumber, setSelectedNumber] = useState<number | undefined>();
  const [board, setBoard] = useState<{
    grid: number[][];
    solution: number[][];
  } | null>(null);

  const grid = board?.grid;
  const solution = board?.solution;

  useEffect(() => {
    setBoard(generateSudoku());
  }, []);

  useEffect(() => {
    checkAgainstSolution(selectedNumber);
  }, [selectedNumber]);

  const checkAgainstSolution = (selectedNumber: number | undefined) => {
    if (selectedNumber && cellIndex && grid && solution) {
      grid[cellIndex.row][cellIndex.col] = selectedNumber;
      if (
        (grid[cellIndex.row][cellIndex.col] =
          solution[cellIndex.row][cellIndex.col])
      ) {
        console.log(6111, grid[cellIndex.row][cellIndex.col]);
        console.log(6222, solution[cellIndex.row][cellIndex.col]);
        setBoard({ grid: grid, solution: solution });
      }
    }
  };
  // Function to check if selectedNumber in the grid[cellIndex] equals to the number in solution[cellIndex]
  // If yes, update the board.grid
  // If no, call function to trigger incorrect answer message

  const contextValue: CellContextProps = {
    cellIndex,
    setCellIndex,
    selectedNumber,
    setSelectedNumber,
    grid,
    solution,
  };
  return (
    <CellContext.Provider value={contextValue}>{children}</CellContext.Provider>
  );
};

export default CellContextProvider;
