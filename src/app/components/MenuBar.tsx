"use client";
import React, { useEffect, useState, useContext } from "react";
import moment from "moment";
import { CellContext } from "../context/cellContext";
import { CellContextProps } from "../types/types";

const MenuBar = () => {
  const [startTime, setStartTime] = useState(moment());
  const [elapsedTime, setElapsedTime] = useState(moment.duration());
  const { generateNewSudoku } = useContext(CellContext) as CellContextProps;
  useEffect(() => {
    const timer = setInterval(() => {
      const duration = moment.duration(moment().diff(startTime));
      setElapsedTime(duration);
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);
  const formattedTime = moment
    .utc(elapsedTime.asMilliseconds())
    .format("mm ss");

  const handleRestart = () => {
    if (generateNewSudoku) generateNewSudoku();
    setStartTime(moment());
    setElapsedTime(moment.duration());
  };
  return (
    <nav className="flex space-x-8 mt-4 justify-between">
      <button className="bg-[#f5f5f5] px-4 py-2  w-20 rounded shadow-sm">
        Menu
      </button>
      <button
        onClick={handleRestart}
        className="bg-[#f5f5f5] px-4 py-2  w-20 rounded shadow-sm"
      >
        Restart
      </button>
      <div className="bg-[#f5f5f5] px-4 py-2 w-20 rounded shadow-inner">
        {formattedTime}
      </div>
    </nav>
  );
};

export default MenuBar;
