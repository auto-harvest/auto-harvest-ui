import React from "react";
import Notification from "@/components/Notification";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { persistor, store } from "@/store/store";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Stack
          screenOptions={{
            animation: "none", // Disables stack animations
            headerShown: false, // Hides the header for all screens in this layout
          }}
        />
        <JwtGuard />
        <Notification />
      </PersistGate>
    </Provider>
  );
}

const JwtGuard = () => {
  useAuthGuard();
  return null;
};
