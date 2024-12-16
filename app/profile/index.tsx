import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Avatar,
  Button,
  Card,
  Switch,
  Text,
  TextInput,
} from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useThemeColor } from "../../hooks/useThemeColor";
import Header from "../../components/Header";
import { Link, useRouter } from "expo-router";

export default function ProfileScreen() {
  const [name, setName] = React.useState("John Doe");
  const [email, setEmail] = React.useState("john.doe@example.com");
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);
  const { theme, toggleTheme } = useThemeColor();
  const router = useRouter();

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
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Personal Information</Text>
            <TextInput
              label="Name"
              value={name}
              onChangeText={setName}
              mode="outlined"
              textColor={theme.text}
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
              label="Email"
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              keyboardType="email-address"
              textColor={theme.text}
              style={styles.input}
              theme={{
                colors: {
                  text: theme.text,
                  primary: theme.primary,
                  background: theme.card,
                },
              }}
            />
          </Card.Content>
        </Card>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>App Settings</Text>
            <View style={styles.settingItem}>
              <Text style={styles.settingText}>Enable Notifications</Text>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                color={theme.primary}
              />
            </View>
            <View style={styles.settingItem}>
              <Text style={styles.settingText}>Dark Mode</Text>
              <Switch
                value={darkModeEnabled}
                onValueChange={(value) => {
                  setDarkModeEnabled(value);
                  toggleTheme();
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
              mode="outlined"
              onPress={() => {}}
              style={styles.button}
              textColor={theme.text}
              icon={() => (
                <Ionicons name="key-outline" size={20} color={theme.primary} />
              )}
            >
              Change Password
            </Button>
            <Button
              mode="outlined"
              onPress={() => {}}
              style={styles.button}
              textColor={theme.text}
              icon={() => (
                <Ionicons
                  name="cloud-download-outline"
                  size={20}
                  color={theme.primary}
                />
              )}
            >
              Export Data
            </Button>
            <Button
              mode="contained"
              onPress={() => {
                // Handle logout logic here
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
  );
}
