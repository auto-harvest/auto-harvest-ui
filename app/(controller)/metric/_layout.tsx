import React from "react";
import { Stack } from "expo-router";

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
