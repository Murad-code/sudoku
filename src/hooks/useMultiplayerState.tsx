import { create } from "zustand";

interface RoomState {
  connectedSockets: [];
  setConnectedSockets: (state: []) => void;
}

export const useMultiplayerStore = create<RoomState>((set) => ({
  connectedSockets: [],
  setConnectedSockets: () => set((state) => state),
}));
