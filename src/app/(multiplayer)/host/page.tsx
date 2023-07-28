"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  createRoom,
  listenRoomCreated,
  startGame,
} from "@/services/socketService";
import { useMultiplayerStore } from "@/hooks/useMultiplayerStore";
import { useRouter } from "next/navigation";

interface IForm {
  username: string;
}

const HostPage = () => {
  const { socket, roomId, setRoomId, setIsHost } = useMultiplayerStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();
  const router = useRouter();

  const handleStartGame = (roomId: string) => {
    // Your custom logic for handling the start game action
    startGame(socket, roomId);

    // After the custom logic, redirect to the desired page
  };

  useEffect(() => {
    if (socket) listenRoomCreated(socket, handleRoomCreated);
  }, [socket]);

  const handleRoomCreated = (roomId: string) => {
    setRoomId(roomId);
    setIsHost();
    router.push(`/${roomId}/lobby`);
  };

  const onSubmit = ({ username }: IForm) => {
    if (socket) createRoom(socket, username);
  };

  return (
    <>
      <h1 className="text-4xl text-center font-bold bg-blue-500 text-white py-8 px-12">
        Host a new sudoku game!
      </h1>
      <div className="flex min-h-screen flex-col items-center p-10">
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
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow"
            type="submit"
          >
            Create Room
          </button>
        </form>
      </div>
    </>
  );
};

export default HostPage;
