import { Middleware } from "@reduxjs/toolkit";
import { REHYDRATE } from "redux-persist";
import { initializeSocket, socket } from "../../utils/socket";
import { setToken, logout } from "../slices/persist/authSlice";
import { RootState } from "../overrides";

const socketMiddleware: Middleware<{}, RootState> = (store) => {
  return (next) => (action: any) => {
    switch (action.type) {
      case setToken.type: {
        // Let the token land in state first, then initialize
        const result = next(action);
        initializeSocket();
        return result;
      }

      case REHYDRATE: {
        // Let rehydrated state land first, then check for token
        const result = next(action);
        const token = store.getState().auth.token;
        if (token) {
          initializeSocket();
        }
        return result;
      }

      case logout.type: {
        // Disconnect the socket when the user logs out
        console.log("Clearing auth token");
        socket?.disconnect();
        break;
      }

      case "SOCKET/EMIT": {
        const state = store.getState();
        const token = state.auth.token;
        const email = state.auth.user?.email;
        // Block emits for guest accounts (defense in depth)
        if (token && !(email && email.startsWith("guest@"))) {
          socket?.emit(action.event, action.payload);
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
