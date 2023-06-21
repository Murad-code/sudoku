function generateSudoku(): { grid: number[][]; solution: number[][] } {
  const grid: number[][] = Array.from({ length: 9 }, () =>
    Array.from({ length: 9 }, () => 0)
  );

  function isValid(row: number, col: number, num: number): boolean {
    // Check if num exists in the row
    for (let i = 0; i < 9; i++) {
      if (grid[row][i] === num) {
        return false;
      }
    }

    // Check if num exists in the column
    for (let i = 0; i < 9; i++) {
      if (grid[i][col] === num) {
        return false;
      }
    }

    // Check if num exists in the 3x3 grid
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[startRow + i][startCol + j] === num) {
          return false;
        }
      }
    }

    return true;
  }

  function solveSudoku(): boolean {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === 0) {
          const values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
          for (let i = 0; i < 9; i++) {
            const randomIndex = Math.floor(Math.random() * values.length);
            const num = values[randomIndex];
            values.splice(randomIndex, 1);
            if (isValid(row, col, num)) {
              grid[row][col] = num;
              if (solveSudoku()) {
                return true;
              }
              grid[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  function removeValues(grid: number[][]): number[][] {
    const cloneGrid: number[][] = JSON.parse(JSON.stringify(grid));
    const totalToRemove = 40; // Adjust the number of values to remove as needed

    let count = 0;
    while (count < totalToRemove) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);

      if (cloneGrid[row][col] !== 0) {
        cloneGrid[row][col] = 0;

        if (!hasUniqueSolution()) {
          cloneGrid[row][col] = grid[row][col];
        } else {
          count++;
        }
      }
    }

    return cloneGrid;
  }

  function hasUniqueSolution(): boolean {
    return solveSudoku();
  }

  solveSudoku();
  const solution = JSON.parse(JSON.stringify(grid)); // This makes a deep copy of the original grid because arrays/objects are pass-by-reference in js
  const reducedGrid = removeValues(grid);
  return { grid: reducedGrid, solution };
}

export default generateSudoku;
