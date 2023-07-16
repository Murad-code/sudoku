"use client";
import Lobby from "@/components/Lobby";
import { ServerToClientEvents, ClientToServerEvents } from "@/types/socketio";
import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useForm, SubmitHandler } from "react-hook-form";
let socket: Socket<ServerToClientEvents, ClientToServerEvents>;
interface IForm {
  username: string;
  roomId: string;
}
export default function JoinPage() {
  const [username, setUsername] = useState<string | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [hasUserJoinedRoom, setHasUserJoinedRoom] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IForm>();

  const onSubmit = ({ username, roomId }: IForm) => {
    socket = io(String(process.env.NEXT_PUBLIC_SERVER_URL), {
      query: {
        username: username,
        socketId: roomId,
      },
    });
    socket?.on("connect", () => {
      console.log(`Joined with id: ${socket.id}`);
      setHasUserJoinedRoom(true);
    });
  };

  useEffect(() => {
    if (socket) {
      socket.on("roomJoined", (data) => {
        console.log("Room Joined its working! ", data);
      });
    }
  }, [socket]);

  const JoinRoomForm = () => {
    return (
      <>
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
      </>
    );
  };

  return (
    <div className="w-full max-w-xs mx-auto flex flex-col mt-20">
      {hasUserJoinedRoom && roomId ? (
        <Lobby roomId={roomId} />
      ) : (
        <JoinRoomForm />
      )}
    </div>
  );
}
