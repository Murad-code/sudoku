import { Player, PlayerData } from "@/types/socketio";

export const convertObjToMap = (
  playersInRoom: PlayerData[]
): Map<string, Player> => {
  const map = new Map<string, Player>();
  playersInRoom.forEach((playerData) => {
    map.set(playerData.id, playerData.player);
  });
  return map;
};
