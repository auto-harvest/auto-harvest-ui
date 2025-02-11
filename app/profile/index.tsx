import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, Button, Card, Switch, Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor, useDarkTheme } from "../../hooks/useThemeColor";
import Header from "../../components/Header";
import { Redirect, useRouter } from "expo-router";
import { logout, setAllowPush,setTheme } from "@/store/slices/persist/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/overrides";

export default function ProfileScreen() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const User = useAppSelector((state) => state.auth.user);
  const allowPush = useAppSelector((state) => state.auth.allowPush);

  const username = User?.username ?? "JohnDoe";
  const email = User?.email ?? "john.doe@mail.com";

  const { theme } = useThemeColor();
  const isDarkTheme = useDarkTheme();

  const handleThemeChange = (value: boolean) => {
    if (value) {
      dispatch(setTheme("dark"));
    } else {
      dispatch(setTheme("light"));
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      alignItems: "center",
      padding: 20,
      backgroundColor: theme.card,
    },
    name: {
      fontSize: 24,
      fontWeight: "bold",
      marginTop: 10,
      color: theme.text,
    },
    email: {
      fontSize: 16,
      color: theme.secondary,
    },
    card: {
      margin: 10,
      backgroundColor: theme.card,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
      color: theme.text,
    },
    attention: {
      color: theme.secondary,
    },
    input: {
      marginBottom: 10,
      backgroundColor: theme.card,
    },
    settingItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 8,
    },
    settingText: {
      color: theme.text,
    },
    button: {
      marginVertical: 5,
    },
    logoutButton: {
      marginTop: 20,
      backgroundColor: "#D32F2F",
    },
  });

  return (
    (!User && <Redirect href="/availabilityError" />) || (
      <SafeAreaView style={styles.container}>
        <Header
          title="Profile"
          showBackButton
          onBackPress={() => router.back()}
        />
        <ScrollView>
          <View style={styles.header}>
            <Avatar.Image
              size={80}
              source={{
                uri: "https://avatar.iran.liara.run/public",
              }}
            />
            <Text style={styles.name}>{username}</Text>
            <Text style={styles.email}>{email}</Text>
          </View>
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.sectionTitle}>App Settings</Text>
              <Text style={styles.attention}>
                Attention! Some notifications may not be visible in web app.
              </Text>
              <View style={styles.settingItem}>
                <Text style={styles.settingText}>Enable Notifications</Text>
                <Switch
                  value={allowPush}
                  onValueChange={(value) => {
                    dispatch(setAllowPush(!!value));
                  }}
                  color={theme.primary}
                />
              </View>
              <View style={styles.settingItem}>
                <Text style={styles.settingText}>Dark Mode</Text>
                <Switch
                  value={isDarkTheme}
                  onValueChange={(value) => {
                    handleThemeChange(!!value);
                  }}
                  color={theme.primary}
                />
              </View>
            </Card.Content>
          </Card>
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.sectionTitle}>Account</Text>
              <Button
                mode="contained"
                onPress={() => {
                  // Handle logout logic here
                  dispatch(logout());
                  router.push("/login");
                }}
                style={[styles.button, styles.logoutButton]}
                icon={() => (
                  <Ionicons name="log-out-outline" size={20} color="white" />
                )}
              >
                Logout
              </Button>
            </Card.Content>
          </Card>
        </ScrollView>
      </SafeAreaView>
    )
  );
}
