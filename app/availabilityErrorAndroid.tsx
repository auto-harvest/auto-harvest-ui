import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";
import { useRouter } from "expo-router";
import { useThemeColor } from "../hooks/useThemeColor";
import witheredPlant from "../assets/images/404-withered-plant.png";

export default function NotFoundScreen() {
  const router = useRouter();
  const { theme } = useThemeColor();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    content: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
    },
    image: {
      width: 200,
      height: 200,
      marginBottom: 24,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: theme.primary,
      marginBottom: 8,
    },
    message: {
      fontSize: 16,
      color: theme.secondary,
      textAlign: "center",
      marginBottom: 24,
    },
    button: {
      marginTop: 16,
      backgroundColor: theme.primary,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Functionality Unavailable" />
      <View style={styles.content}>
        <Image
          source={witheredPlant}
          style={styles.image}
          accessibilityLabel="A wilted plant illustration"
        />
        <Text style={styles.title}>Oops! Functionality Unavailable</Text>
        <Text style={styles.message}>
          The requested functionality is not available in Android Preview. Please
          use the web app to access this feature.
        </Text>
        <Button
          mode="contained"
          onPress={() => router.push("/systemSelection")}
          style={styles.button}
          icon={({ size, color }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          )}
        >
          Return to Dashboard
        </Button>
      </View>
    </SafeAreaView>
  );
}
