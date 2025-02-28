import { io, Socket } from 'socket.io-client';

let socket: Socket | null;

const siteurl =
  process.env.NODE_ENV == 'production'
    ? 'https://chat-app-back-another.onrender.com'
    : 'http://localhost:5000';

export const getSocket = (): Socket => {
  if (!socket) {
    socket = io(siteurl);
  }
  return socket;
};
