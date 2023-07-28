"use client";
import CompleteDialog from "@/components/CompleteDialog";
import MenuBar from "@/components/MenuBar";
import Grid from "@/components/game/Grid";
import InputButtons from "@/components/game/InputButtons";
import { useMultiplayerStore } from "@/hooks/useMultiplayerStore";
import { useSudokuGridStore } from "@/hooks/useSudokuStore";
import { listenGameStarted, startGame } from "@/services/socketService";
import { useEffect } from "react";

interface MultiplayerPuzzleProps {
  params: {
    roomId: string;
  };
}

export default function MultiplayerPuzzle({ params }: MultiplayerPuzzleProps) {
  const { socket, roomId } = useMultiplayerStore();
  const { setGrid } = useSudokuGridStore();

  // TODO: add logic so players who join via link

  useEffect(() => {
    startGame(socket, roomId);
  }, []);

  useEffect(() => {
    if (socket) listenGameStarted(socket, setGrid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return (
    <div className="flex min-h-screen flex-col items-center p-10">
      <Grid />
      <InputButtons />
      <MenuBar />
      <CompleteDialog />
    </div>
  );
}
