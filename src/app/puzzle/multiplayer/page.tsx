"use client";
import CompleteDialog from "@/components/CompleteDialog";
import MenuBar from "@/components/MenuBar";
import Grid from "@/components/game/Grid";
import InputButtons from "@/components/game/InputButtons";
import { usePlayerStore } from "@/hooks/useMultiplayerState";
import { useSudokuGridStore } from "@/hooks/useSudokuStore";
import { listenGameStarted } from "@/services/socketService";
import { useEffect } from "react";

export default function MultiplayerPuzzle() {
  const { socket } = usePlayerStore();
  const { setGrid } = useSudokuGridStore();

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
