"use client";
import { ServerToClientEvents, ClientToServerEvents } from "@/types/socketio";
import React, { useEffect } from "react";
import { io, Socket } from "socket.io-client";

const Page = () => {
  // useEffect((): any => {
  //   const socket = new (ClientIO as any)(process.env.NEXT_SERVER_URL, {
  //     addTrailingSlash: false,
  //   });
  // }, []);

  const socketInitialiser = () => {
    // please note that the types are reversed
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
      String(process.env.NEXT_PUBLIC_SERVER_URL)
    );
  };

  useEffect(() => {
    socketInitialiser();
  }, []);
  return <div>Page</div>;
};

export default Page;
