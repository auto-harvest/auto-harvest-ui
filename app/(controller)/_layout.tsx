import { Tabs } from "expo-router";

export default () => {
  return (
    <Tabs>
      <Tabs.Screen name="dashboard" options={{ headerShown: false }} />
      <Tabs.Screen name="plants" options={{ headerShown: false }} />
      <Tabs.Screen name="alerts" options={{ headerShown: false }} />
      <Tabs.Screen name="settings" options={{ headerShown: false }} />
    </Tabs>
  );
};
