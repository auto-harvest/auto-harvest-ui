import { environment } from "@/environment/environment";
import io from "socket.io-client";

export const socket = io(environment.wsBaseUrl, {
  autoConnect: false,
  transports: ["websocket"],
  reconnection: true,
});
