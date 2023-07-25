"use client";
import Lobby from "@/components/Lobby";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  createRoom,
  listenRoomCreated,
  initSocket,
} from "@/services/socketService";
import { usePlayerStore, useRoomStore } from "@/hooks/useMultiplayerState";

interface IForm {
  username: string;
}

const HostPage = () => {
  const { socket } = usePlayerStore();
  const { roomId, setRoomId } = useRoomStore();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IForm>();

  useEffect(() => {
    if (socket) listenRoomCreated(socket, handleRoomCreated);
  }, [socket]);

  const handleRoomCreated = (roomId: string) => {
    setRoomId(roomId);
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
        {roomId ? (
          <div>
            <Lobby socket={socket} roomId={roomId} />
          </div>
        ) : (
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
        )}
      </div>
    </>
  );
};

export default HostPage;
