// store/slices/persist/authSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../api/types";

interface AuthState {
  token: string | null;
  user: User | null;
  allowPush: boolean;
  pushToken: string | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
  allowPush: false,
  pushToken: null,
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
    }
  },
});

export const { setToken, setUser, clearAuth, logout, setAllowPush, setPushToken } = authSlice.actions;
export default authSlice;
