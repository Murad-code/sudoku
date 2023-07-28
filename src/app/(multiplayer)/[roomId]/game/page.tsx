"use client";
import CompleteDialog from "@/components/CompleteDialog";
import MenuBar from "@/components/MenuBar";
import Grid from "@/components/multiplayerGame/Grid";
import InputButtons from "@/components/multiplayerGame/InputButtons";
import { useSudokuGridStore } from "@/hooks/useSudokuStore";
import { useEffect } from "react";

interface MultiplayerPuzzleProps {
  params: {
    roomId: string;
  };
}

export default function MultiplayerPuzzle({ params }: MultiplayerPuzzleProps) {
  const { setElapsedTimeToZero } = useSudokuGridStore();



  return (
    <div className="flex min-h-screen flex-col items-center p-10">
      <Grid />
      <InputButtons />
      <MenuBar />
      <CompleteDialog />
    </div>
  );
}
