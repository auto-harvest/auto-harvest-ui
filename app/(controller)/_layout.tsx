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
