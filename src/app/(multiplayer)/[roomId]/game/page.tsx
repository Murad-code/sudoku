"use client";
import CompleteDialog from "@/components/multiplayerGame/CompleteDialog";
import MenuBar from "@/components/multiplayerGame/MenuBar";
import Grid from "@/components/multiplayerGame/Grid";
import InputButtons from "@/components/multiplayerGame/InputButtons";
import { useMultiplayerStore } from "@/hooks/useMultiplayerStore";
import { useSudokuGridStore } from "@/hooks/useSudokuStore";
import {
  listenIfPlayerDataUpdated,
  listenIncorrectValue,
  listenIfComplete,
  listenIfOthersCompleted,
  emitFinalTime,
} from "@/services/gameService";
import { useEffect } from "react";
import { Player } from "@/types/socketio";

interface MultiplayerPuzzleProps {
  params: {
    roomId: string;
  };
}

export default function MultiplayerPuzzle({ params }: MultiplayerPuzzleProps) {
  const { socket, updatePlayers, setPlayers } = useMultiplayerStore();
  const {
    elapsedTime,
    isComplete,
    finalTime,
    setErrorCellIndex,
    setGrid,
    setIsComplete,
    grid,
    setFinalTime,
  } = useSudokuGridStore();

  useEffect(() => {
    if (socket) {
      listenIncorrectValue(socket, setErrorCellIndex);
      listenIfPlayerDataUpdated(socket, handlePlayerDataUpdate);
      listenIfComplete(socket, handleComplete);
      listenIfOthersCompleted(socket, handleOthersCompleted);
    }
  }, [socket]);

  const handleComplete = (isComplete: boolean) => {
    setIsComplete(isComplete);
  };

  const handleOthersCompleted = (player: Player) => {
    console.log("Someone's already done!: ", player);
  };

  const handlePlayerDataUpdate = (players: Map<string, Player>) => {
    const myPlayer = players.get(socket.id);
    if (myPlayer) {
      setGrid(myPlayer.board);
    }
    setPlayers(players);
    // updatePlayers(id, player);
    // if (player.board) setGrid(player.board);
  };

  useEffect(() => {
    if (isComplete) {
      emitFinalTime(socket, finalTime);
      setFinalTime(elapsedTime);
    }
  }, [isComplete]);

  return (
    <div className="flex min-h-screen flex-col items-center p-10">
      <Grid />
      <InputButtons />
      <MenuBar />
      <CompleteDialog />
    </div>
  );
}
