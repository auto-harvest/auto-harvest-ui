import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import {
  Card,
  Title,
  Paragraph,
  Searchbar,
  Text,
  Chip,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "../../hooks/useThemeColor";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import { useRouter } from "expo-router";

const alertsData = [
  {
    id: "1",
    type: "Critical",
    message: "Water level critically low",
    timestamp: "2023-04-15 09:23",
  },
  {
    id: "2",
    type: "Warning",
    message: "pH level out of range",
    timestamp: "2023-04-14 14:56",
  },
  {
    id: "3",
    type: "Info",
    message: "Nutrient solution refilled",
    timestamp: "2023-04-13 22:10",
  },
  {
    id: "4",
    type: "Critical",
    message: "Pump malfunction detected",
    timestamp: "2023-04-12 11:05",
  },
  {
    id: "5",
    type: "Warning",
    message: "Temperature above optimal range",
    timestamp: "2023-04-11 16:30",
  },
];

export default function AlertsScreen() {
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const { theme } = useThemeColor();
  const router = useRouter();
  const filteredAlerts = alertsData.filter(
    (alert) =>
      alert.message.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedType === "All" || alert.type === selectedType)
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    searchBar: {
      margin: 16,
      backgroundColor: theme.card,
    },
    filterContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginBottom: 16,
    },
    chip: {
      backgroundColor: theme.card,
    },
    selectedChip: {
      backgroundColor: theme.primary,
    },
    chipText: {
      color: theme.text,
    },
    selectedChipText: {
      color: theme.card,
    },
    card: {
      margin: 8,
      backgroundColor: theme.card,
    },
    cardTitle: {
      color: theme.text,
    },
    cardParagraph: {
      color: theme.text,
    },
    criticalAlert: {
      color: "#FF0000",
    },
    warningAlert: {
      color: "#FFA500",
    },
    infoAlert: {
      color: "#0000FF",
    },
  });

  const renderAlertItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title
          style={[styles.cardTitle, styles[`${item.type.toLowerCase()}Alert`]]}
        >
          {item.type}
        </Title>
        <Paragraph style={styles.cardParagraph}>{item.message}</Paragraph>
        <Paragraph style={styles.cardParagraph}>{item.timestamp}</Paragraph>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        showBackButton
        onBackPress={() => router.push("/systemSelection")}
        showUserIcon
        onUserIconPress={() => {
          router.push("/profile");
        }}
      />
      <Searchbar
        placeholder="Search alerts..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
        inputStyle={{ color: theme.text }}
        iconColor={theme.text}
        placeholderTextColor={theme.text}
      />
      <View style={styles.filterContainer}>
        {["All", "Critical", "Warning", "Info"].map((type) => (
          <Chip
            key={type}
            selected={selectedType === type}
            onPress={() => setSelectedType(type)}
            style={selectedType === type ? styles.selectedChip : styles.chip}
          >
            <Text
              style={
                selectedType === type
                  ? styles.selectedChipText
                  : styles.chipText
              }
            >
              {type}
            </Text>
          </Chip>
        ))}
      </View>
      <FlatList
        data={filteredAlerts}
        renderItem={renderAlertItem}
        keyExtractor={(item) => item.id}
      />
      <Navbar activeNav="alerts" />
    </SafeAreaView>
  );
}
