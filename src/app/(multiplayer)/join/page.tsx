"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { joinRoom, listenRoomJoined } from "@/services/socketService";
import { useMultiplayerStore } from "@/hooks/useMultiplayerStore";
import { useRouter } from "next/navigation";
interface IForm {
  username: string;
  roomId: string;
}
export default function JoinPage() {
  const { socket, setRoomId } = useMultiplayerStore();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();

  const onSubmit = ({ username, roomId }: IForm) => {
    if (socket) joinRoom(socket, username, roomId);
  };

  useEffect(() => {
    if (socket) listenRoomJoined(socket, handleRoomJoined);
    return () => {
      socket.on("disconnect", () => {
        // Implement logic to emit event to remove user from all rooms
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  const handleRoomJoined = (roomId: string) => {
    setRoomId(roomId);
    router.push(`/${roomId}/lobby`);
  };

  return (
    <div className="w-full max-w-xs mx-auto flex flex-col mt-20">
      <h1 className="text-xl font-semibold">Join a room</h1>
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            {...register("username", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Room ID
          </label>
          <input
            {...register("roomId", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="roomId"
            type="text"
            placeholder="Room ID"
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Enter room
        </button>
      </form>
    </div>
  );
}
