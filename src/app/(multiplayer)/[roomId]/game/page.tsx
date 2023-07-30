"use client";
import CompleteDialog from "@/components/multiplayerGame/CompleteDialog";
import MenuBar from "@/components/MenuBar";
import Grid from "@/components/multiplayerGame/Grid";
import InputButtons from "@/components/multiplayerGame/InputButtons";
import { useMultiplayerStore } from "@/hooks/useMultiplayerStore";
import { useSudokuGridStore } from "@/hooks/useSudokuStore";
import {
  listenCorrectValue,
  listenIfPlayerDataUpdated,
  listenIncorrectValue,
} from "@/services/gameService";
import { useEffect } from "react";
import { Player } from "@/types/socketio";

interface MultiplayerPuzzleProps {
  params: {
    roomId: string;
  };
}

export default function MultiplayerPuzzle({ params }: MultiplayerPuzzleProps) {
  const { socket, updatePlayers } = useMultiplayerStore();
  const { setErrorCellIndex, setGrid } = useSudokuGridStore();

  useEffect(() => {
    if (socket) {
      listenIncorrectValue(socket, setErrorCellIndex);
      listenCorrectValue(socket, setGrid);
      listenIfPlayerDataUpdated(socket, handlePlayerDataUpdate);
    }
  }, [socket]);

  const handlePlayerDataUpdate = (id: string, player: Player) => {
    updatePlayers(id, player);
  };

  return (
    <div className="flex min-h-screen flex-col items-center p-10">
      <Grid />
      <InputButtons />
      <MenuBar />
      <CompleteDialog />
    </div>
  );
}
