import { initSocket } from "@/services/socketService";
import { Player } from "@/types/socketio";
import { Socket } from "socket.io-client";
import { create } from "zustand";

interface IMultiplayerStore {
  socket: Socket;
  players: Map<string, Player>;
  isHost: boolean;
  setPlayers: (players: Map<string, Player>) => void;
  updatePlayers: (id: string, players: Player) => void;
  roomId: string | null;
  setRoomId: (roomId: string) => void;
  setIsHost: () => void;
}

export const useMultiplayerStore = create<IMultiplayerStore>()((set) => ({
  socket: initSocket(),
  players: new Map<string, Player>(),
  isHost: false,
  setPlayers: (players) => set({ players: players }),
  updatePlayers: (id, player) =>
    set(({ players }) => {
      const newPlayersMap = new Map(players);
      newPlayersMap.set(id, player);
      return { players: newPlayersMap };
    }),
  roomId: null,
  setRoomId: (roomId) => set({ roomId }),
  setIsHost: () => set({ isHost: true }),
}));
