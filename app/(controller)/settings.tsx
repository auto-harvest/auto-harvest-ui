import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Card, Title, Paragraph, Switch, Button, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "../../hooks/useThemeColor";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import { useRouter } from "expo-router";

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [wateringInterval, setWateringInterval] = useState("6");
  const [nutrientDosage, setNutrientDosage] = useState("5");
  const { theme } = useThemeColor();
  const router = useRouter();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    card: {
      margin: 16,
      backgroundColor: theme.card,
    },
    cardTitle: {
      color: theme.text,
    },
    cardParagraph: {
      color: theme.text,
    },
    settingItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    },
    input: {
      backgroundColor: theme.card,
      color: theme.text,
    },
    saveButton: {
      margin: 16,
      backgroundColor: theme.primary,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Header
        showBackButton
        onBackPress={() => router.push("/systemSelection")}
        showUserIcon
        onUserIconPress={() => router.push("/profile")}
      />
      <ScrollView>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Notifications</Title>
            <View style={styles.settingItem}>
              <Paragraph style={styles.cardParagraph}>
                Enable Notifications
              </Paragraph>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                color={theme.primary}
              />
            </View>
          </Card.Content>
        </Card>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Appearance</Title>
            <View style={styles.settingItem}>
              <Paragraph style={styles.cardParagraph}>Dark Mode</Paragraph>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                color={theme.primary}
              />
            </View>
          </Card.Content>
        </Card>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>System Settings</Title>
            <View style={styles.settingItem}>
              <Paragraph style={styles.cardParagraph}>
                Watering Interval (hours)
              </Paragraph>
              <TextInput
                value={wateringInterval}
                onChangeText={setWateringInterval}
                keyboardType="numeric"
                style={styles.input}
                theme={{ colors: { text: theme.text, primary: theme.primary } }}
              />
            </View>
            <View style={styles.settingItem}>
              <Paragraph style={styles.cardParagraph}>
                Nutrient Dosage (ml/L)
              </Paragraph>
              <TextInput
                value={nutrientDosage}
                onChangeText={setNutrientDosage}
                keyboardType="numeric"
                style={styles.input}
                theme={{ colors: { text: theme.text, primary: theme.primary } }}
              />
            </View>
          </Card.Content>
        </Card>
        <Button
          mode="contained"
          onPress={() => {
            /* Handle saving settings */
          }}
          style={styles.saveButton}
        >
          Save Settings
        </Button>
      </ScrollView>
      <Navbar activeNav="settings" />
    </SafeAreaView>
  );
}
