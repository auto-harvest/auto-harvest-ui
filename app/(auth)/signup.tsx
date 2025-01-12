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

export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { theme } = useThemeColor();
  const router = useRouter();

  const handleSignUp = () => {
    if (!email.includes("@")) {
      alert("Please enter a valid email.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    router.push("/systemSelection");
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      padding: 16,
      backgroundColor: theme.background,
    },
    card: {
      padding: 16,
      backgroundColor: theme.card,
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
      backgroundColor: theme.primary,
    },
    loginText: {
      textAlign: "center",
      color: theme.text,
    },
    loginLink: {
      color: theme.primary,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.iconContainer}>
            <Ionicons name="leaf" size={50} color={theme.primary} />
          </View>
          <Title style={styles.title}>Sign Up for Auto-Harvest</Title>
          <Paragraph style={styles.description}>
            Create an account to manage your hydroponic systems
          </Paragraph>

          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            keyboardType="email-address"
            style={styles.input}
            textColor={theme.text}
            theme={{
              colors: {
                background: theme.card,
                placeholder: theme.text,
                primary: theme.primary,
              },
            }}
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            secureTextEntry
            style={styles.input}
            textColor={theme.text}
            theme={{
              colors: {
                text: theme.text,
                background: theme.card,
                placeholder: theme.text,
                primary: theme.primary,
              },
            }}
          />
          <TextInput
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            mode="outlined"
            secureTextEntry
            style={styles.input}
            theme={{
              colors: {
                text: theme.text,
                background: theme.card,
                placeholder: theme.text,
                primary: theme.primary,
              },
            }}
          />

          <Button
            mode="contained"
            style={styles.button}
            theme={{ colors: { backdrop: theme.primary } }}
            onPress={() => {
              handleSignUp();
            }}
          >
            Sign Up
          </Button>

          <TouchableOpacity
            onPress={() => {
              router.push("/login");
            }}
          >
            <Text style={styles.loginText}>
              Already have an account?{" "}
              <Text style={styles.loginLink}>Log in</Text>
            </Text>
          </TouchableOpacity>
        </Card.Content>
      </Card>
    </SafeAreaView>
  );
}
