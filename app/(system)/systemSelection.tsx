import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList } from "react-native";
import { Card, Title, Paragraph, Searchbar, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "../../hooks/useThemeColor";
import { Link, router } from "expo-router";

import Header from "@/components/Header";
import { useGetControllersQuery } from "@/store/slices/api/apiSlice";

export default function SystemsScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const { theme } = useThemeColor();
  const { data, isLoading, isError } = useGetControllersQuery({});
  const [filteredSystems, setFilteredSystems] = useState<SystemInterface[]>([]);
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
  useEffect(() => {
    if (!data) return;
    setFilteredSystems(
      data.filter((system) =>
        system.code.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [data, searchQuery]);
  useEffect(() => {
    if (!data) return;
    setFilteredSystems(data);
    console.log("Fetched Controllers:", data);
  }, [data]);
  const handleSystemSelect = () => {
    return router.push(`../dashboard`);
  };

  const renderSystemItem = ({ item }) => (
    <Card style={styles.card} onPress={() => handleSystemSelect()}>
      <Link href={"/dashboard"}>
        <Card.Content>
          <Title style={styles.cardTitle}>{item.code}</Title>
          <Paragraph style={styles.cardParagraph}>
            Crop: {item.cropType}
          </Paragraph>
          <Paragraph style={styles.cardParagraph}>
            Status: {item.systemStatus}
          </Paragraph>
          <Paragraph style={styles.cardParagraph}>
            Last update:{" "}
            {new Date(item.lastMaintenanceDate).toLocaleString()}
          </Paragraph>
        </Card.Content>
      </Link>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Auto-Harvest Systems"
        showUserIcon
        onUserIconPress={() => {
          router.push("/profile");
        }}
      />
      <Searchbar
        placeholder="Search systems..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
        inputStyle={{ color: theme.text }}
        iconColor={theme.text}
        placeholderTextColor={theme.text}
      />
      {filteredSystems.length === 0 && !isLoading && (
        <Paragraph style={{ textAlign: "center", color: theme.text }}>
          No systems found.
        </Paragraph>
      )}
      <FlatList
        data={filteredSystems}
        renderItem={renderSystemItem}
        keyExtractor={(item) => "" + item.id}
        contentContainerStyle={styles.listContent}
      />
      <Button
        mode="contained"
        icon="plus"
        onPress={() => {
          router.push("/addController");
        }}
        style={styles.addButton}
      >
        Add New System
      </Button>
    </SafeAreaView>
  );
}
