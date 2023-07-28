"use client";
import CompleteDialog from "@/components/CompleteDialog";
import MenuBar from "@/components/MenuBar";
import Grid from "@/components/multiplayerGame/Grid";
import InputButtons from "@/components/multiplayerGame/InputButtons";
import { useMultiplayerStore } from "@/hooks/useMultiplayerStore";
import { useSudokuGridStore } from "@/hooks/useSudokuStore";
import { listenGameStarted } from "@/services/gameService";
import { useEffect } from "react";

interface MultiplayerPuzzleProps {
  params: {
    roomId: string;
  };
}

export default function MultiplayerPuzzle({ params }: MultiplayerPuzzleProps) {
  return (
    <div className="flex min-h-screen flex-col items-center p-10">
      <Grid />
      <InputButtons />
      <MenuBar />
      <CompleteDialog />
    </div>
  );
}
