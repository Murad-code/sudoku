import { initSocket } from "@/services/socketService";
import { Player } from "@/types/socketio";
import { Socket } from "socket.io-client";
import { create } from "zustand";

interface IMultiplayerStore {
  socket: Socket;
  players: Player[];
  isHost: boolean;
  setPlayers: (players: Player[]) => void;
  roomId: string | null;
  setRoomId: (roomId: string) => void;
  setIsHost: () => void;
}

export const useMultiplayerStore = create<IMultiplayerStore>()((set) => ({
  socket: initSocket(),
  players: [],
  isHost: false,
  setPlayers: (players: Player[]) => set({ players }),
  roomId: null,
  setRoomId: (roomId: string) => set({ roomId }),
  setIsHost: () => set({ isHost: true }),


}));
