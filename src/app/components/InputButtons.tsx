"use client";

import React, { useContext } from "react";
import { CellContext } from "../context/cellContext";
import { CellContextProps } from "../types/types";

function InputButtons() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const { setSelectedNumber } = useContext(CellContext) as CellContextProps;
  const handleClick = (number: number) => {
    setSelectedNumber(number);
  };
  return (
    <div className="grid grid-flow-row grid-cols-3 grid-rows-3 gap-4 mt-4">
      {numbers.map((number) => (
        <button
          key={number}
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-10 rounded"
          onClick={() => handleClick(number)}
        >
          {number}
        </button>
      ))}
    </div>
  );
}

export default InputButtons;
