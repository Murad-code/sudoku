"use client";
import React, { createContext, useEffect, useState, ReactNode } from "react";
import generateSudoku from "../utils/generateSudoku";
import { CellContextProps } from "../types/types";

export const CellContext = createContext<CellContextProps | null>(null);

const CellContextProvider = ({ children }: { children: ReactNode }) => {
  const [focusedCellIndex, setFocusedCellIndex] = useState<
    { row: number; col: number } | undefined
  >();
  const [selectedNumber, setSelectedNumber] = useState<number | undefined>();
  const [grid, setGrid] = useState<number[][] | null>(null);
  const [solution, setSolution] = useState<number[][] | null>(null);
  const [errorCellIndex, setErrorCellIndex] = useState<{
    row: number;
    col: number;
  } | null>(null);

  useEffect(() => {
    const { grid, solution } = generateSudoku();
    setGrid(grid);
    setSolution(solution);
  }, []);

  useEffect(() => {
    if (selectedNumber !== 0) checkAgainstSolution(selectedNumber);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNumber]);

  const errorMessage = () => {
    if (focusedCellIndex) setErrorCellIndex(focusedCellIndex);
    setTimeout(() => {
      setErrorCellIndex(null);
    }, 1000);
  };

  const checkAgainstSolution = (selectedNumber: number | undefined) => {
    if (selectedNumber && focusedCellIndex && grid && solution) {
      const newGrid = JSON.parse(JSON.stringify(grid));
      newGrid[focusedCellIndex.row][focusedCellIndex.col] = selectedNumber;
      if (
        newGrid[focusedCellIndex.row][focusedCellIndex.col] ===
        solution[focusedCellIndex.row][focusedCellIndex.col]
      ) {
        setSelectedNumber(0);
        setGrid(newGrid);
      } else {
        errorMessage();
        setSelectedNumber(0);
      }
    }
  };

  const contextValue: CellContextProps = {
    focusedCellIndex,
    setFocusedCellIndex,
    selectedNumber,
    setSelectedNumber,
    grid,
    setGrid,
    solution,
    errorCellIndex,
    setErrorCellIndex,
  };
  return (
    <CellContext.Provider value={contextValue}>{children}</CellContext.Provider>
  );
};

export default CellContextProvider;
