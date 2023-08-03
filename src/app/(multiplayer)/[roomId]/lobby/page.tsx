"use client";
import {
  emitGetLobbyPlayers,
  listenLobbyUpdated,
} from "@/services/socketService";
import { useEffect } from "react";
import { useMultiplayerStore } from "@/hooks/useMultiplayerStore";
import { useRouter } from "next/navigation";
import { listenGameStarted, emitStartGame } from "@/services/gameService";
import { useSudokuGridStore } from "@/hooks/useSudokuStore";
import { toast } from "react-toastify";
import copy from "copy-to-clipboard";

interface MultiplayerPuzzleProps {
  params: {
    roomId: string;
  };
}

export default function Lobby({ params }: MultiplayerPuzzleProps) {
  const { roomId } = params;
  const { socket, players, setPlayers, isHost } = useMultiplayerStore();
  const { setGrid, setIsComplete, setElapsedTimeToZero } = useSudokuGridStore();
  const router = useRouter();
  useEffect(() => {
    if (socket) emitGetLobbyPlayers(socket, roomId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (socket) {
      listenLobbyUpdated(socket, setPlayers);
      listenGameStarted(
        socket,
        setGrid,
        setIsComplete,
        setElapsedTimeToZero,
        handleReroute
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  const handleStartGame = () => {
    // Your custom logic for handling the start game action
    emitStartGame(socket, roomId);
  };

  const handleReroute = () => {
    router.push(`/${roomId}/game`);
  };

  const showCopied = () => {
    copy(roomId);
    toast("Room ID copied");
  };

  return (
    <div className="flex min-h-screen flex-col items-center p-10 mt-6">
      <div className="p-8 py-14 pt-2 bg-[#f7f7f8] rounded drop-shadow text-center">
        <h2 className="text-3xl">Lobby</h2>
        <div className="text-lg mt-2">
          Your Room ID is:{" "}
          <button onClick={() => showCopied()}>{roomId}</button>
        </div>
        <div className="mt-4">
          {players &&
            Array.from(players.values()).map((player) => (
              <ul key={player.id} className="text-2xl">
                {player.name}
              </ul>
            ))}
        </div>
        {/* Add lobby content here */}
      </div>
      {isHost && (
        <button
          onClick={() => handleStartGame()}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 mt-8 rounded shadow"
        >
          Start Game
        </button>
      )}
    </div>
  );
}
