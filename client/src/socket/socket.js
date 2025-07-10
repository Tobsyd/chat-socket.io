import { io } from 'socket.io-client';
let socket = null;
export function initSocket(token) {
  socket = io(import.meta.env.VITE_SERVER_URL || "http://localhost:5000", {
    auth: { token }, transports: ['websocket']
  });
  return socket;
}
export function getSocket() { return socket; }