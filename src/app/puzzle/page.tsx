"use client";
import React, { useEffect } from "react";
import Grid from "@/components/singleGame/Grid";
import InputButtons from "@/components/singleGame/InputButtons";
import MenuBar from "@/components/singleGame/MenuBar";
import CompleteDialog from "@/components/singleGame/CompleteDialog";
import { useSudokuGridStore } from "@/hooks/useSudokuStore";
import ConfettiAnimation from "@/components/ConfettiAnimation";

const Puzzle = () => {
  const { generateNewSudoku, setIsComplete } = useSudokuGridStore();

  useEffect(() => {
    setIsComplete(false);
    generateNewSudoku();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center p-10">
      <ConfettiAnimation />
      <Grid />
      <InputButtons />
      <MenuBar />
      <CompleteDialog />
    </div>
  );
};

export default Puzzle;
