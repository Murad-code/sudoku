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
import { listenIfTimeout } from "@/services/socketService";
import { useEffect } from "react";
import { Player } from "@/types/socketio";
import { toast } from "react-toastify";
import ConfettiAnimation from "@/components/ConfettiAnimation";
import { CellIndex } from "@/types/types";
import { handleTimeout } from "@/utils/handleTimeout";

interface MultiplayerPuzzleProps {
  params: {
    roomId: string;
  };
}

export default function MultiplayerPuzzle({ params }: MultiplayerPuzzleProps) {
  const { socket, setPlayers } = useMultiplayerStore();
  const {
    elapsedTime,
    isComplete,
    finalTime,
    setErrorCellIndex,
    errorMessage,
    setGrid,
    setIsComplete,
    setFinalTime,
  } = useSudokuGridStore();

  useEffect(() => {
    if (socket) {
      listenIncorrectValue(socket, handleIncorrectValue);
      listenIfPlayerDataUpdated(socket, handlePlayerDataUpdate);
      listenIfComplete(socket, handleComplete);
      listenIfOthersCompleted(socket, handleOthersCompleted);
      listenIfTimeout(socket, handleTimeout);
    }
  }, [socket]);

  const handleIncorrectValue = (errorCellIndex: CellIndex) => {
    setErrorCellIndex(errorCellIndex);
    errorMessage();
  };

  const handleComplete = (isComplete: boolean) => {
    setIsComplete(isComplete);
  };

  const handleOthersCompleted = (player: Player) => {
    toast(`${player.name} has finished! 🎉`);
  };

  const handlePlayerDataUpdate = (players: Map<string, Player>) => {
    const myPlayer = players.get(socket.id);
    if (myPlayer) {
      setGrid(myPlayer.board);
    }
    setPlayers(players);
  };

  useEffect(() => {
    if (isComplete) {
      setFinalTime(elapsedTime);
    }
  }, [isComplete]);

  useEffect(() => {
    emitFinalTime(socket, finalTime);
  }, [finalTime]);

  return (
    <div className="flex min-h-screen flex-col items-center p-10">
      <ConfettiAnimation />
      <Grid />
      <InputButtons />
      <MenuBar />
      <CompleteDialog />
    </div>
  );
}
