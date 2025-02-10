import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Message {
  text: string;
}

export interface SocketState {
  isConnected: boolean;
  messages: Message[];
}

const initialState: SocketState = {
  isConnected: false,
  messages: [],
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    connected(state) {
      state.isConnected = true;
    },
    disconnected(state) {
      state.isConnected = false;
    },
    receiveMessage(state, action: PayloadAction<Message>) {
      state.messages.push(action.payload);
    },
  },
});

// Export the actions
export const { connected, disconnected, receiveMessage } = socketSlice.actions;

// Export the reducer for the store
export default socketSlice;
