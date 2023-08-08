"use client";
import React from "react";
import { useSudokuGridStore } from "@/hooks/useSudokuStore";
import { emitCheckAgainstSolution } from "@/services/gameService";
import { useMultiplayerStore } from "@/hooks/useMultiplayerStore";

function InputButtons() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const { socket } = useMultiplayerStore();
  const { focusedCellIndex } = useSudokuGridStore();

  const handleClick = (number: number) => {
    emitCheckAgainstSolution(socket, number, focusedCellIndex);
  };

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
