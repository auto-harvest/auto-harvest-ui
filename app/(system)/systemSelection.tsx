import React, { useState } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import {
  Card,
  Title,
  Paragraph,
  Searchbar,
  Button,
  Text,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "../../hooks/useThemeColor";
import { Link, Redirect } from "expo-router";

export interface SystemInterface {
  id: number;
  name: string;
  plants: number;
  lastUpdated: string;
}

export const systems: SystemInterface[] = [
  {
    id: 1,
    name: "Basement Lettuce Farm",
    plants: 48,
    lastUpdated: "2 hours ago",
  },
  {
    id: 2,
    name: "Rooftop Tomato Garden",
    plants: 24,
    lastUpdated: "1 day ago",
  },
  {
    id: 3,
    name: "Indoor Herb Collection",
    plants: 12,
    lastUpdated: "3 hours ago",
  },
  {
    id: 4,
    name: "Experimental Strawberry Setup",
    plants: 36,
    lastUpdated: "Just now",
  },
];

export default function SystemsScreen({}) {
  const [searchQuery, setSearchQuery] = useState("");
  const { theme } = useThemeColor();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 16,
      backgroundColor: theme.card,
    },
    titleContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    icon: {
      marginRight: 8,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme.text,
    },
    searchBar: {
      margin: 16,
      backgroundColor: theme.card,
    },
    listContent: {
      padding: 16,
    },
    card: {
      marginBottom: 16,
      backgroundColor: theme.card,
    },
    cardTitle: {
      color: theme.text,
    },
    cardParagraph: {
      color: theme.text,
    },
    addButton: {
      margin: 16,
      backgroundColor: theme.primary,
    },
  });

  const filteredSystems = systems.filter((system) =>
    system.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSystemSelect = (systemId: number) => {
    return <Redirect href="/dashboard" />;
  };

  const renderSystemItem = ({ item }: { item: SystemInterface }) => (
    <Card style={styles.card} onPress={() => handleSystemSelect(item.id)}>
      <Link href={"/dashboard"}>
        <Card.Content>
          <Title style={styles.cardTitle}>{item.name}</Title>
          <Paragraph style={styles.cardParagraph}>
            {item.plants} plants
          </Paragraph>
          <Paragraph style={styles.cardParagraph}>
            Last updated: {item.lastUpdated}
          </Paragraph>
        </Card.Content>
      </Link>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Ionicons
            name="leaf"
            size={24}
            color={theme.primary}
            style={styles.icon}
          />
          <Text style={styles.title}>Auto-Harvest Systems</Text>
        </View>
        <TouchableOpacity>
          <Link href={"/profile"}>
            <Ionicons name="log-out-outline" size={24} color={theme.text} />
          </Link>
        </TouchableOpacity>
      </View>
      <Searchbar
        placeholder="Search systems..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
        inputStyle={{ color: theme.text }}
        iconColor={theme.text}
        placeholderTextColor={theme.text}
      />
      <FlatList
        data={filteredSystems}
        renderItem={renderSystemItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
      <Button
        mode="contained"
        icon="plus"
        onPress={() => {
          /* Handle adding new system */
        }}
        style={styles.addButton}
        color={theme.primary}
      >
        <Link href="/addController">Add New System</Link>
      </Button>
    </SafeAreaView>
  );
}
