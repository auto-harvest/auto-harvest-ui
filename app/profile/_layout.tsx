import { useAuthGuard } from "@/hooks/useAuthGuard";
import { Stack } from "expo-router";
import React from "react";

export default function LoginLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Hides the header for all screens in this layout
      }}
    />
  );
}
