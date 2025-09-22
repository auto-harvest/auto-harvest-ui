import { environment } from "@/environment/environment";
import { updateSensorInfo } from "@/store/slices/api/sensorInfoSlice";
import { connected, disconnected } from "@/store/slices/socketSlice";
import { store } from "@/store/store";
import io from "socket.io-client";

export const socket = io(environment.wsBaseUrl, {
  autoConnect: false,
  transports: ["websocket"],
  reconnection: true,
});

const handle = setInterval(() => {
  const token = store.getState().auth.token;
  if (token && !socket.connected) {
    initializeSocket(store, token);
    clearInterval(handle);
  }
}, 100);
export const initializeSocket = (store: any, token: any) => {
  // Establish a socket connection when the token is set
  console.log("Initializing socket connection");
  if (socket.connected) return;
  if (token) {
    socket.io.uri += "?token=" + token; // Pass token in the WebSocket auth payload
    console.log("Initializing socket connection");
    console.log("socketMiddleware -> toke%n", token);

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
};
