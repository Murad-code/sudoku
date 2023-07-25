import { listenLobbyUpdated } from "@/services/socketService";
import {
  ClientToServerEvents,
  Player,
  ServerToClientEvents,
} from "@/types/socketio";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { usePlayerStore } from "@/hooks/useMultiplayerState";
import { useStore } from "zustand";

interface ILobby {
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null;
  roomId: string;
}

export default function Lobby({ socket, roomId }: ILobby) {
  const { players, setPlayers } = usePlayerStore();

  useEffect(() => {
    if (socket) listenLobbyUpdated(socket, setPlayers);
  }, [socket]);

  return (
    <>
      <div>Your Room ID is: {roomId}</div>
      <div>
        <h2>Lobby</h2>
        {players &&
          players.map((player) => <ul key={player.id}>{player.name}</ul>)}
        {/* Add lobby content here */}
      </div>
    </>
  );
}
