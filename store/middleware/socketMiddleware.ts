import { Middleware } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { socket } from "../../utils/socket";
import { connected, disconnected, receiveMessage } from "../slices/socketSlice";
import { updateSensorInfo } from "../slices/api/sensorInfoSlice";
import { setToken, clearAuth } from "../slices/persist/authSlice";

const socketMiddleware: Middleware<{}, RootState> =
  (store) => (next) => (action: any) => {
    const state = store.getState();
    const token = state.auth.token; // Access the JWT token from authSlice
    switch (action.type) {
      case setToken.type: {
        // Establish a socket connection when the token is set
        if (token) {
          socket.io.uri += "?token=" + token; // Pass token in the WebSocket auth payload
          console.log("Initializing socket connection");
          console.log("socketMiddleware -> token", token);

          socket.connect();
          console.log(socket.id);
          socket.on("connect", () => {
            console.log("Socket connected");
            store.dispatch(connected());
            socket.emit("ping", Date.now());
          });
          socket.on("pong", (stamp: number) => {
            console.log("Pong received with latency:", Date.now() - stamp);
            socket.emit("ping", Date.now());
          });

          socket.on("disconnect", () => {
            console.log("Socket disconnected");
            store.dispatch(disconnected());
          });

          socket.on("sensor-info", (data: string) => {
            const { type, ...payload } = JSON.parse(data);
            store.dispatch(updateSensorInfo(payload));
          });

          socket.on("hello-message", (data: string) => {
            console.log("Received hello message from server:", data);
          });
          socket.on("error", (error: any) => {
            console.error("Socket error:", error);
          });

          socket.on("connect_error", (error: any) => {
            console.error("Socket connection error:", JSON.stringify(error));
          });
        }
        break;
      }

      case clearAuth.type: {
        // Disconnect the socket when the user logs out
        console.log("Clearing auth token");
        socket.disconnect();
        break;
      }

      case "SOCKET/EMIT": {
        if (token) {
          socket.emit(action.event, action.payload);
        }
        break;
      }

      default:
        break;
    }
    return next(action);
  };

export default socketMiddleware;
