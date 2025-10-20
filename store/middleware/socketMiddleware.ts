import { Middleware } from "@reduxjs/toolkit";
import { initializeSocket, socket } from "../../utils/socket";
import { setToken, logout } from "../slices/persist/authSlice";
import { RootState } from "../overrides";

const socketMiddleware: Middleware<{}, RootState> = (store) => {
  const state = store.getState();
  const token = state.auth.token;

  return (next) => (action: any) => {
    const state = store.getState();
    const token = state.auth.token; // Access the JWT token from authSlice
    switch (action.type) {
      case setToken.type:
        initializeSocket();
        break;

      case logout.type: {
        // Disconnect the socket when the user logs out
        console.log("Clearing auth token");
        socket?.disconnect();
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
};

export default socketMiddleware;
