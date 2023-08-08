import { useMultiplayerStore } from "@/hooks/useMultiplayerStore";
import { PlayerData } from "@/types/socketio";
import { convertMapToArray } from "@/utils/convertMapToArray";
import React from "react";

function ScoreBoard() {
  const { players } = useMultiplayerStore();
  const playersArray = convertMapToArray(players);
  return (
    <div className="pt-8 pb-8">
      <div className="rounded-lg bg-[#f5f5f5] shadow-md p-6 pt-4">
        {/* Table Headers */}
        <div className="flex font-medium">
          <div className="w-6/12 px-4 py-2">Name</div>
          <div className="w-3/12 px-4 py-2">Score</div>
          <div className="w-3/12 px-4 py-2">Time</div>
        </div>

        {/* Table Rows */}
        {playersArray.map(({ id, player }: PlayerData) => (
          <div key={id} className="flex border-t text-center">
            <div className="w-6/12 px-4 py-2 flex-none text-left truncate">
              {player.name}
            </div>
            <div className="w-3/12 px-4 py-2 flex-none">{player.score}</div>
            <div className="w-3/12 px-4 py-2 flex-none">{player.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScoreBoard;
