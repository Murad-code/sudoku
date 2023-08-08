"use client";
import React, { useEffect } from "react";
import moment from "moment";
import Link from "next/link";
import { useSudokuGridStore } from "@/hooks/useSudokuStore";
import { emitDevCompleteBoard, emitRestartGame } from "@/services/gameService";
import { useMultiplayerStore } from "@/hooks/useMultiplayerStore";
import ScoreBoard from "./ScoreBoard";

const MenuBar = () => {
  const {
    startTime,
    elapsedTime,
    isComplete,
    setElapsedTime,
    setElapsedTimeToZero,
  } = useSudokuGridStore();

  const { socket, roomId } = useMultiplayerStore();

  useEffect(() => {
    if (!isComplete) {
      const timer = setInterval(() => {
        const duration = moment.duration(moment().diff(startTime));
        setElapsedTime(duration);
      }, 1000);
      return () => clearInterval(timer);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isComplete, startTime]);

  useEffect(() => {
    setElapsedTimeToZero();
  }, []);

  const formattedTime = moment
    .utc(elapsedTime.asMilliseconds())
    .format("mm: ss");

  const handleComplete = () => {
    emitDevCompleteBoard(socket, socket.id);
  };

  const handleRestart = () => {
    if (roomId) emitRestartGame(socket, roomId);
  };

  return (
    <>
      <nav className="flex space-x-8 mt-10 justify-between text-center items-center">
        <Link
          href="/"
          className="bg-[#f5f5f5] hover:bg-[#e0e0e0] px-4 py-2 w-20 rounded shadow-sm"
        >
          Menu
        </Link>
        <div className="bg-[#f5f5f5] px-4 py-2 rounded w-20 shadow-inner">
          {formattedTime}
        </div>
      </nav>
      <div>
        <button
          onClick={handleComplete}
          className="bg-[#f5f5f5] hover:bg-[#e0e0e0] px-4 py-2 rounded shadow-sm mt-8"
        >
          Complete
        </button>
      </div>
      <ScoreBoard />
    </>
  );
};

export default MenuBar;
