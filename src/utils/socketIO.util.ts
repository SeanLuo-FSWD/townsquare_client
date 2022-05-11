import socketIO from "socket.io-client";
import dotenv from "dotenv";
dotenv.config();

const connectionOptions = {
  "force new connection": true,
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ["websocket"],
  withCredentials: true,
  autoConnect: false,
} as any;

const port = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : "http://localhost:8000";

console.log('zzzzzzzzzzzzzzzzzzzzzzz____process.env.NODE_ENV');
console.log(port);

const socket = socketIO(port, {
  withCredentials: true,
  autoConnect: false,
});

export default socket;
