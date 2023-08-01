import { Player, PlayerData } from "@/types/socketio";

export const convertMapToArray = (players: Map<string, Player>): PlayerData[] =>
  Array.from(players, ([key, player]) => ({
    id: key,
    player,
  }));
