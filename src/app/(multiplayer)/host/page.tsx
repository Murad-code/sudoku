"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { emitCreateRoom, listenRoomCreated } from "@/services/socketService";
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

  useEffect(() => {
    if (socket) listenRoomCreated(socket, handleRoomCreated);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  const handleRoomCreated = (roomId: string) => {
    setRoomId(roomId);
    setIsHost();
    router.push(`/${roomId}/lobby`);
  };

  const onSubmit = ({ username }: IForm) => {
    if (socket) emitCreateRoom(socket, username);
  };

  return (
    <>
      <h1 className="text-2xl text-center text-black py-2 px-12 mt-12">
        Host a new sudoku game!
      </h1>
      <div className="flex min-h-screen flex-col items-center p-6">
        <form
          className="bg-[#fafafa] shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 mt-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4">
            <input
              {...register("username", { required: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded shadow"
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
