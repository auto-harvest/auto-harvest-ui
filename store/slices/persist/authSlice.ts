// store/slices/persist/authSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../api/types";
import { Appearance } from "react-native";
interface AuthState {
  token: string | null;
  user: User | null;
  allowPush: boolean;
  pushToken: string | null;
  theme: string;
}

const initialState: AuthState = {
  token: null,
  user: null,
  allowPush: false,
  pushToken: null,
  theme: Appearance.getColorScheme() ?? "light",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearAuth: (state) => {
      state.token = null;
      state.user = null;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
    setAllowPush: (state, action: PayloadAction<boolean>) => {
      state.allowPush = action.payload;
    },
    setPushToken: (state, action: PayloadAction<string>) => {
      state.pushToken = action.payload
    },
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
    }
  },
});

export const { setToken, setUser, clearAuth, logout, setAllowPush, setPushToken, setTheme } = authSlice.actions;
export default authSlice;
