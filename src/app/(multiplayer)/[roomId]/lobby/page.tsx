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

interface MultiplayerPuzzleProps {
  params: {
    roomId: string;
  };
}

export default function Lobby({ params }: MultiplayerPuzzleProps) {
  const { roomId } = params;
  const { socket, players, setPlayers, isHost } = useMultiplayerStore();
  const { setGrid } = useSudokuGridStore();
  const router = useRouter();
  useEffect(() => {
    if (socket) emitGetLobbyPlayers(socket, roomId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (socket) {
      listenLobbyUpdated(socket, setPlayers);
      listenGameStarted(socket, setGrid, handleReroute);
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
    toast("Room ID copied");
  };

  return (
    <div className="flex min-h-screen flex-col items-center p-10">
      <div>
        Your Room ID is: <button onClick={() => showCopied()}>{roomId}</button>
      </div>
      <div>
        <h2>Lobby</h2>
        {players &&
          Array.from(players.values()).map((player) => (
            <ul key={player.id}>{player.name}</ul>
          ))}
        {/* Add lobby content here */}
      </div>
      {isHost && (
        <button
          onClick={() => handleStartGame()}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-8 rounded shadow"
        >
          Start Game
        </button>
      )}
    </div>
  );
}
