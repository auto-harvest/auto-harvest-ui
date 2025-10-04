import { Middleware, MiddlewareAPI, Dispatch } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { logout } from "../slices/persist/authSlice";
import { RootState } from "../store"; // Import your RootState type
import { router } from "expo-router";

// Define the shape of the decoded JWT
interface DecodedToken {
  exp: number; // Expiry field as a UNIX timestamp
}

const jwtMiddleware: Middleware =
  (storeAPI: MiddlewareAPI<Dispatch, RootState>) => (next) => (action) => {
    const state = storeAPI.getState();
    const token = state.auth?.token;

    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
          console.warn("JWT expired. Logging outa...");
          storeAPI.dispatch(logout());
          router.replace("/login");
        }
      } catch (error) {
        console.error("Invalid JWT token:", error);
      }
    }

    return next(action);
  };

export default jwtMiddleware;
