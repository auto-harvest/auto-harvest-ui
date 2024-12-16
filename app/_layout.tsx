import { persistor, RootState, store } from "@/store/store";
import { useNavigationState } from "@react-navigation/native";
import { Stack, useNavigation, useRouter } from "expo-router";
import { useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <JwtGuard />
        <Stack
          screenOptions={{
            animation: "none", // Disables stack animations
            headerShown: false, // Hides the header for all screens in this layout
          }}
        />
      </PersistGate>
    </Provider>
  );
}

const JwtGuard = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const router = useRouter();
  const currentRoute = useNavigationState((state) => state.routes[state.index]);

  useEffect(() => {
    console.log(currentRoute);
    if (
      currentRoute &&
      !token &&
      currentRoute.name !== "/login" &&
      currentRoute.name !== "(login)"
    ) {
      console.log("No token found, redirecting to login...");
      router.push("/login");
    }
  }, [token, currentRoute, router]);
  return null;
};
