import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import {
  Card,
  Title,
  Paragraph,
  Searchbar,
  Button,
  Text,
  Chip,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "../../hooks/useThemeColor";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import { useRouter } from "expo-router";

const plantsData = [
  {
    id: "1",
    name: "Lettuce",
    type: "Leafy Green",
    health: "Good",
    lastWatered: "2 hours ago",
  },
  {
    id: "2",
    name: "Tomato",
    type: "Fruit",
    health: "Excellent",
    lastWatered: "1 day ago",
  },
  {
    id: "3",
    name: "Basil",
    type: "Herb",
    health: "Fair",
    lastWatered: "3 hours ago",
  },
  {
    id: "4",
    name: "Strawberry",
    type: "Fruit",
    health: "Good",
    lastWatered: "5 hours ago",
  },
  {
    id: "5",
    name: "Spinach",
    type: "Leafy Green",
    health: "Excellent",
    lastWatered: "1 hour ago",
  },
];

export default function PlantsScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const { theme } = useThemeColor();
  const router = useRouter();
  const filteredPlants = plantsData.filter(
    (plant) =>
      plant.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedType === "All" || plant.type === selectedType)
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
    addButton: {
      position: "absolute",
      right: 16,
      bottom: 16,
      backgroundColor: theme.primary,
    },
  });

  const renderPlantItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.cardTitle}>{item.name}</Title>
        <Paragraph style={styles.cardParagraph}>Type: {item.type}</Paragraph>
        <Paragraph style={styles.cardParagraph}>
          Health: {item.health}
        </Paragraph>
        <Paragraph style={styles.cardParagraph}>
          Last Watered: {item.lastWatered}
        </Paragraph>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        showBackButton
        onBackPress={() => router.push("/systemSelection")}
        showUserIcon
        onUserIconPress={() => router.push("/profile")}
      />
      <Searchbar
        placeholder="Search plants..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
        inputStyle={{ color: theme.text }}
        iconColor={theme.text}
        placeholderTextColor={theme.text}
      />
      <View style={styles.filterContainer}>
        {["All", "Leafy Green", "Fruit", "Herb"].map((type) => (
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
        data={filteredPlants}
        renderItem={renderPlantItem}
        keyExtractor={(item) => item.id}
      />
      <Button
        icon="plus"
        mode="contained"
        onPress={() => {
          /* Handle adding new plant */
        }}
        style={styles.addButton}
      >
        Add Plant
      </Button>
      <Navbar activeNav="plants" />
    </SafeAreaView>
  );
}
