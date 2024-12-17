import React from "react";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { Stack, Tabs } from "expo-router";

export default function Layout() {

  return (
    <Stack
      screenOptions={{
        animation: "none", // Disables stack animations
        headerShown: false,
      }}
    />
  );
}
