"use client";
import React, { useEffect } from "react";
import { useSudokuGridStore } from "@/hooks/useSudokuStore";

function InputButtons() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const {
    selectedNumber,
    grid,
    setSelectedNumber,
    checkAgainstSolution,
    checkIfComplete,
  } = useSudokuGridStore();

  const handleClick = (number: number) => {
    setSelectedNumber(number);
  };

  useEffect(() => {
    if (selectedNumber !== 0) checkAgainstSolution();
    checkIfComplete();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNumber, grid]);

  return (
    <div className="grid grid-flow-row grid-cols-3 grid-rows-3 gap-4 mt-4">
      {numbers.map((number) => (
        <button
          key={number}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-10 rounded"
          onClick={() => handleClick(number)}
        >
          {number}
        </button>
      ))}
    </div>
  );
}

export default InputButtons;
