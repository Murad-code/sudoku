import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";

export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  roomCreated: (roomId: string) => void;
  roomJoined: (data: any) => void;
}
export interface ClientToServerEvents {
  hello: () => void;
  createRoom: () => void;
}
export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}

export type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

export interface Player {
  id: string;
  name: string;
  score: number;
  board?: number[][];
}

export interface PlayerData {
  socketId: string;
  player: Player;
}
