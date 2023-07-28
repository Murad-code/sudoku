"use client";
import { listenLobbyUpdated } from "@/services/socketService";
import { useEffect } from "react";
import { useMultiplayerStore } from "@/hooks/useMultiplayerStore";
import Link from "next/link";

interface MultiplayerPuzzleProps {
  params: {
    roomId: string;
  };
}

export default function Lobby({ params }: MultiplayerPuzzleProps) {
  const { socket, roomId, players, setPlayers, isHost } = useMultiplayerStore();

  useEffect(() => {
    if (socket) listenLobbyUpdated(socket, setPlayers);
  }, [socket]);

  return (
    <div className="flex min-h-screen flex-col items-center p-10">
      <div>Your Room ID is: {roomId}</div>
      <div>
        <h2>Lobby</h2>
        {players &&
          players.map((player) => <ul key={player.id}>{player.name}</ul>)}
        {/* Add lobby content here */}
      </div>
      {isHost && (
        <Link href={`/puzzle/multiplayer/${roomId}`}>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-8 rounded shadow">
            Start Game
          </button>
        </Link>
      )}
    </div>
  );
}
