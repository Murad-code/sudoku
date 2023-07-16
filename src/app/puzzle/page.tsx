"use client";
import React from "react";
import Grid from "@/components/game/Grid";
import InputButtons from "@/components/game/InputButtons";
import MenuBar from "@/components/MenuBar";
import CellContextProvider from "@/hooks/useCellContext";
import CompleteDialog from "@/components/CompleteDialog";

const Puzzle = () => {
  return (
    <CellContextProvider>
      <div className="flex min-h-screen flex-col items-center p-10">
        <Grid />
        <InputButtons />
        <MenuBar />
        <CompleteDialog />
      </div>
    </CellContextProvider>
  );
};

export default Puzzle;
