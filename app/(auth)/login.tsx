import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  TextInput,
  Button,
  Text,
  Card,
  Title,
  Paragraph,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "../../hooks/useThemeColor";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { theme } = useThemeColor();
  const router = useRouter();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      padding: 16,
      backgroundColor: theme.background,
    },
    card: {
      padding: 16,
    },
    iconContainer: {
      alignItems: "center",
      marginBottom: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 8,
      color: theme.text,
    },
    description: {
      textAlign: "center",
      marginBottom: 24,
      color: theme.text,
    },
    input: {
      marginBottom: 16,
    },
    button: {
      marginTop: 8,
      marginBottom: 16,
    },
    signupText: {
      textAlign: "center",
      color: theme.text,
    },
    signupLink: {
      color: theme.primary,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Card style={styles.card} theme={{ colors: { background: theme.card } }}>
        <Card.Content>
          <View style={styles.iconContainer}>
            <Ionicons name="leaf" size={50} color={theme.primary} />
          </View>
          <Title style={styles.title}>Login to Auto-Harvest</Title>
          <Paragraph style={styles.description}>
            Enter your email and password to access your systems
          </Paragraph>
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            textColor={theme.text}
            keyboardType="email-address"
            style={styles.input}
            theme={{
              colors: {
                text: theme.text,
                primary: theme.primary,
                background: theme.card,
              },
            }}
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            textColor={theme.text}
            secureTextEntry
            style={styles.input}
            theme={{
              colors: {
                text: theme.text,
                primary: theme.primary,
                background: theme.card,
              },
            }}
          />
          <Button
            mode="contained"
            style={styles.button}
            theme={{ colors: { backdrop: theme.primary } }}
            onPress={() => {
              router.push("/systemSelection");
            }}
          >
            Sign In
          </Button>

          <TouchableOpacity
            onPress={() => {
              router.push("/signup");
            }}
          >
            <Text style={styles.signupText}>
              Don't have an account?{" "}
              <Text style={styles.signupLink}>Sign up</Text>
            </Text>
          </TouchableOpacity>
        </Card.Content>
      </Card>
    </SafeAreaView>
  );
}
