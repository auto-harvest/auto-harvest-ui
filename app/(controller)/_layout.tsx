import { Stack } from "expo-router";
import React from "react";

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
