import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../hooks/useThemeColor";

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  showUserIcon?: boolean;
  onUserIconPress?: () => void;
}

export default function Header({
  title = "Auto Harvest",
  showBackButton = false,
  onBackPress,
  showUserIcon = false,
  onUserIconPress,
}: HeaderProps) {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 16,
      backgroundColor: theme.card,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme.text,
    },
    iconContainer: {
      width: 32,
    },
  });

  return (
    <View style={styles.header}>
      <View style={styles.iconContainer}>
        {showBackButton && (
          <TouchableOpacity onPress={onBackPress}>
            <Ionicons name="arrow-back" size={24} color={theme.text} />
          </TouchableOpacity>
        )}
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons
          name="leaf"
          size={24}
          color={theme.primary}
          style={{ marginRight: 8 }}
        />
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.iconContainer}>
        {showUserIcon && (
          <TouchableOpacity onPress={onUserIconPress}>
            <Ionicons
              name="person-circle-outline"
              size={32}
              color={theme.primary}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
