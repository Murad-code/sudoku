import { initSocket } from "@/services/socketService";
import { Player } from "@/types/socketio";
import { Socket } from "socket.io-client";
import { create } from "zustand";

interface IPlayerStore {
  socket: Socket;
  players: Player[];
  setPlayers: (players: Player[]) => void;
}
interface IRoomStore {
  roomId: string | null;
  setRoomId: (roomId: string) => void;
}

export const usePlayerStore = create<IPlayerStore>()((set) => ({
  socket: initSocket(),
  players: [],
  setPlayers: (players: Player[]) => set({ players }),
}));

export const useRoomStore = create<IRoomStore>()((set) => ({
  roomId: null,
  setRoomId: (roomId: string) => set({ roomId }),
}));
