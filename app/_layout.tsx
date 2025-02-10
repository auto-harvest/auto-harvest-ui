import { useAuthGuard } from "@/hooks/useAuthGuard";
import { persistor, store } from "@/store/store";
import { useNavigationState } from "@react-navigation/native";
import { Stack, useNavigation, useRouter } from "expo-router";
import { useEffect } from "react";
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
      </PersistGate>
    </Provider>
  );
}

const JwtGuard = () => {
  useAuthGuard();
  return null;
};
