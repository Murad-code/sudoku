"use client";
import React, { createContext, useEffect, useState, ReactNode } from "react";
import generateSudoku from "../utils/generateSudoku";
import { CellContextProps } from "../types/types";
import moment from "moment";

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
  const [startTime, setStartTime] = useState(moment());
  const [elapsedTime, setElapsedTime] = useState(moment.duration());
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    generateNewSudoku();
  }, []);

  const testCompleteGrid = () => {
    const newGrid = JSON.parse(JSON.stringify(solution));
    setGrid(newGrid);
  };

  useEffect(() => {
    if (selectedNumber !== 0) checkAgainstSolution(selectedNumber);
    checkIfComplete();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNumber, grid]);

  const errorMessage = () => {
    if (focusedCellIndex) setErrorCellIndex(focusedCellIndex);
    setTimeout(() => {
      setErrorCellIndex(null);
    }, 1000);
  };

  const generateNewSudoku = () => {
    const { grid, solution } = generateSudoku();
    setGrid(grid);
    setSolution(solution);
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

  function checkIfComplete() {
    if (grid && solution) {
      let hasMismatch = false; // Flag to track if any mismatched values are found

      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (grid[i][j] !== solution[i][j]) {
            hasMismatch = true;
            break; // Exit the inner loop if a mismatch is found
          }
        }
        if (hasMismatch) {
          break; // Exit the outer loop if a mismatch is found
        }
      }
      setIsComplete(!hasMismatch); // Set the state based on the hasMismatch flag
    }
  }
  const handleRestart = () => {
    generateNewSudoku();
    setIsComplete(false);
    setStartTime(moment());
    setElapsedTime(moment.duration());
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
    startTime,
    setStartTime,
    elapsedTime,
    setElapsedTime,
    isComplete,
    handleRestart,
    testCompleteGrid,
  };
  return (
    <CellContext.Provider value={contextValue}>{children}</CellContext.Provider>
  );
};

export default CellContextProvider;
