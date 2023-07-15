"use client";
import React, { useEffect, useContext } from "react";
import moment from "moment";
import { CellContext } from "../hooks/useCellContext";
import { CellContextProps } from "../types/types";
import Link from "next/link";

const MenuBar = () => {
  const {
    startTime,
    elapsedTime,
    setElapsedTime,
    handleRestart,
    testCompleteGrid,
    isComplete,
  } = useContext(CellContext) as CellContextProps;

  useEffect(() => {
    if (!isComplete) {
      const timer = setInterval(() => {
        const duration = moment.duration(moment().diff(startTime));
        setElapsedTime(duration);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isComplete, startTime]);

  const formattedTime = moment
    .utc(elapsedTime.asMilliseconds())
    .format("mm ss");

  return (
    <>
      <nav className="flex space-x-8 mt-4 justify-between text-center items-center">
        <Link
          href="/"
          className="bg-[#f5f5f5] px-4 py-2 w-20 rounded shadow-sm"
        >
          Menu
        </Link>
        <button
          onClick={handleRestart}
          className="bg-[#f5f5f5] px-4 py-2 rounded w-20 shadow-sm"
        >
          Restart
        </button>

        <div className="bg-[#f5f5f5] px-4 py-2 rounded w-20 shadow-inner">
          {formattedTime}
        </div>
      </nav>
      <div>
        <button
          onClick={testCompleteGrid}
          className="bg-[#f5f5f5] px-4 py-2 rounded shadow-sm mt-8"
        >
          Complete
        </button>
      </div>
    </>
  );
};

export default MenuBar;
