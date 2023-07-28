"use client";
import React, { useEffect } from "react";
import Grid from "@/components/singleGame/Grid";
import InputButtons from "@/components/singleGame/InputButtons";
import MenuBar from "@/components/MenuBar";
import CompleteDialog from "@/components/CompleteDialog";
import { useSudokuGridStore } from "@/hooks/useSudokuStore";

const Puzzle = () => {
  const { generateNewSudoku } = useSudokuGridStore();

  useEffect(() => {
    generateNewSudoku();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center p-10">
      <Grid />
      <InputButtons />
      <MenuBar />
      <CompleteDialog />
    </div>
  );
};

export default Puzzle;
