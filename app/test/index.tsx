import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setToken, setUser, clearAuth } from "@/store/slices/persist/authSlice";
import { RootState } from "@/store/store";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Paragraph, Title } from "react-native-paper";
import { View } from "react-native";
import { useRouter } from "expo-router";

const AuthComponent = () => {
  const dispatch = useDispatch();

  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: any) => state.auth.user);

  const router = useRouter();
  const handleLogin = () => {
    // Simulate login
    const token = "your-token-here";
    const user = { id: "1", name: "John Doe", email: "john.doe@example.com" };
    dispatch(setToken(token));
    dispatch(setUser(user));
  };

  useEffect(() => {
    if (token) {
      router.push("/(system)/addController");
    }
    // Fetch user data
    // fetch("https://api.example.com/user", {
    //   headers: {
    //
  }, [token]);
  const handleLogout = () => {
    dispatch(clearAuth());
  };

  return (
    <SafeAreaView>
      <Title>Auth Component</Title>
      {token ? (
        <View>
          <Paragraph>Logged in as {user?.name}</Paragraph>
          <Button onPress={handleLogout}>Logout</Button>
        </View>
      ) : (
        <Button onPress={handleLogin}>Login</Button>
      )}
    </SafeAreaView>
  );
};

export default AuthComponent;
