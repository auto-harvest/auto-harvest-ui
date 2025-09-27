import { UnknownAction } from "redux";

export const SOCKET_CONNECT = "SOCKET/CONNECT";
export const SOCKET_DISCONNECT = "SOCKET/DISCONNECT";
export const SOCKET_EMIT = "SOCKET/EMIT";
export const SOCKET_CONNECTED = "SOCKET/CONNECTED";
export const SOCKET_DISCONNECTED = "SOCKET/DISCONNECTED";
export const SOCKET_RECEIVE_MESSAGE = "SOCKET/RECEIVE_MESSAGE";

// Define all possible action shapes
export interface ConnectSocketAction {
  type: typeof SOCKET_CONNECT;
}

export interface DisconnectSocketAction {
  type: typeof SOCKET_DISCONNECT;
}

export interface EmitSocketEventAction {
  type: typeof SOCKET_EMIT;
  event: string;
  payload: any;
}

export interface SocketConnectedAction {
  type: typeof SOCKET_CONNECTED;
}

export interface SocketDisconnectedAction {
  type: typeof SOCKET_DISCONNECTED;
}

export interface SocketReceiveMessageAction {
  type: typeof SOCKET_RECEIVE_MESSAGE;
  payload: { text: string };
}

// Union of all action types
export type SocketActions =
  | ConnectSocketAction
  | DisconnectSocketAction
  | EmitSocketEventAction
  | SocketConnectedAction
  | SocketDisconnectedAction
  | SocketReceiveMessageAction;

// Action creators
export const connectSocket = (): ConnectSocketAction => ({
  type: SOCKET_CONNECT,
});

export const disconnectSocket = (): DisconnectSocketAction => ({
  type: SOCKET_DISCONNECT,
});

export const emitSocketEvent = (
  event: string,
  payload: any
): EmitSocketEventAction & UnknownAction => ({
  type: SOCKET_EMIT,
  event,
  payload,
});
