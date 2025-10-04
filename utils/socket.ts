import { environment } from "@/environment/environment";
import { updateSensorInfo } from "@/store/slices/api/sensorInfoSlice";
import { connected, disconnected } from "@/store/slices/socketSlice";
import { store } from "@/store/store";
import { io, Socket } from "socket.io-client";

// Pick ONE path that matches your server/proxy:
// - If Nginx exposes Socket.IO at /socket.io:
const SOCKET_PATH = "/socket.io";
// - If behind /report-server/ prefix: const SOCKET_PATH = "/report-server/socket.io";

export let socket: Socket | null = null;
let listenersAttached = false;

export function initializeSocket() {
  const token = store.getState().auth.token;
  if (!token) return; // nothing to do yet

  if (!socket) {
    console.log({
      autoConnect: false,
      path: SOCKET_PATH,
      transports: ["websocket", "polling"], // keep fallback
      reconnection: true,
      auth: { token }, // <-- pass token safely
    });
    socket = io(environment.wsBaseUrl, {
      autoConnect: false,
      path: SOCKET_PATH,
      transports: ["websocket", "polling"], // keep fallback
      reconnection: true,
      auth: { token }, // <-- pass token safely
    });
  } else {
    // Update auth on reconnects if token changed
    (socket.io as any).opts.auth = { token };
  }

  if (!listenersAttached) {
    listenersAttached = true;

    socket.on("connect", () => {
      store.dispatch(connected());
      console.log("socket connected", socket?.id);
    });

    socket.on("disconnect", (reason) => {
      store.dispatch(disconnected());
      console.log("socket disconnected:", reason);
    });

    // Optional: throttle your custom ping/pong
    let pingTimer: any = null;
    socket.on("connect", () => {
      clearInterval(pingTimer);
      pingTimer = setInterval(() => {
        socket?.emit("ping", Date.now());
      }, 5000);
    });
    socket.on("disconnect", () => clearInterval(pingTimer));
    socket.on("pong", (stamp: number) => {
      console.log("latency(ms):", Date.now() - stamp);
    });

    socket.on("sensor-info", (data: any) => {
      try {
        // If server already sends an object, use it directly
        const payload = typeof data === "string" ? JSON.parse(data) : data;
        const { type, ...rest } = payload ?? {};
        store.dispatch(updateSensorInfo(rest));
      } catch (e) {
        console.error("bad sensor-info payload", e, data);
      }
    });

    socket.on("hello-message", (data: string) => {
      console.log("hello from server:", data);
    });

    socket.on("error", (err: any) => console.error("socket error:", err));
    socket.io.on("reconnect_attempt", () => {
      // ensure latest token on attempts
      const t = store.getState().auth.token;
      (socket!.io as any).opts.auth = { token: t };
    });
    socket.on("connect_error", (err) => {
      console.error("connect_error:", err?.message || err);
    });
  }

  if (!socket.connected) socket.connect();
}

//Example: start when token appears
const tokenInterval = setInterval(() => {
  if (socket?.connected) return;
  const t = store.getState().auth.token;
  if (t) {
    console.log("TOKENNNNNN", t);
    initializeSocket();
    //clearInterval(tokenInterval);
  }
}, 200);
