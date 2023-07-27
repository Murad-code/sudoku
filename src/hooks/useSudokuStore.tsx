import { create } from "zustand";
import { ISudokuGridStore } from "../types/types";
import moment from "moment";
import generateSudoku from "@/utils/generateSudoku";

export const useSudokuGridStore = create<ISudokuGridStore>((set) => ({
  focusedCellIndex: undefined,
  selectedNumber: 0,
  grid: null,
  solution: null,
  errorCellIndex: null,
  startTime: moment(),
  elapsedTime: moment.duration(),
  isComplete: false,
  setFocusedCellIndex: (cellIndex) => set({ focusedCellIndex: cellIndex }),
  setSelectedNumber: (number) => set({ selectedNumber: number }),
  setGrid: (grid) => set({ grid }),
  setSolution: (solution) => set({ solution }),
  setErrorCellIndex: (cellIndex) => set({ errorCellIndex: cellIndex }),
  setStartTime: (startTime) => set({ startTime }),
  setElapsedTime: (elapsedTime) => set({ elapsedTime }),
  setIsComplete: (isComplete) => set({ isComplete }),

  generateNewSudoku: () => {
    const { grid, solution } = generateSudoku();
    set({ grid: grid, solution: solution });
  },

  checkAgainstSolution: () =>
    set(
      ({ selectedNumber, focusedCellIndex, grid, solution, errorMessage }) => {
        if (selectedNumber && focusedCellIndex && grid && solution) {
          const newGrid = JSON.parse(JSON.stringify(grid));
          newGrid[focusedCellIndex.row][focusedCellIndex.col] = selectedNumber;
          if (
            newGrid[focusedCellIndex.row][focusedCellIndex.col] ===
            solution[focusedCellIndex.row][focusedCellIndex.col]
          ) {
            return { grid: newGrid, selectedNumber: 0 };
          } else {
            errorMessage();
            return { selectedNumber: 0 };
          }
        }
        return {};
      }
    ),

  errorMessage: () =>
    set(({ setErrorCellIndex, focusedCellIndex }) => {
      if (focusedCellIndex) setErrorCellIndex(focusedCellIndex);
      setTimeout(() => {
        setErrorCellIndex(null);
      }, 1000);
      return {};
    }),

  checkIfComplete: () =>
    set(({ grid, solution }) => {
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
        return { isComplete: !hasMismatch }; // Set the state based on the hasMismatch flag
      }
      return {};
    }),

  handleRestart: () =>
    set(({ generateNewSudoku }) => {
      generateNewSudoku();
      return { isComplete: false };
    }),

  testCompleteGrid: () =>
    set(({ solution, setGrid }) => {
      const newGrid = JSON.parse(JSON.stringify(solution));
      setGrid(newGrid);
      return {};
    }),
}));
