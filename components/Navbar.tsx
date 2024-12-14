import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "../hooks/useThemeColor";
import { RelativePathString, useRouter } from "expo-router";

interface NavbarProps {
  activeNav: string;
}

export default function Navbar({ activeNav }: NavbarProps) {
  const { theme } = useThemeColor();
  const router = useRouter();

  const styles = StyleSheet.create({
    navbar: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      backgroundColor: theme.card,
      paddingVertical: 8,
      borderTopWidth: 1,
      borderTopColor: theme.border,
    },
    navItem: {
      alignItems: "center",
    },
    activeNavItem: {
      borderTopWidth: 2,
      borderTopColor: theme.primary,
    },
    navText: {
      fontSize: 12,
      color: theme.text,
      marginTop: 4,
    },
    activeNavText: {
      color: theme.primary,
    },
  });

  const navItems = [
    { name: "dashboard", icon: "home-outline" },
    { name: "plants", icon: "leaf-outline" },
    { name: "alerts", icon: "notifications-outline" },
    { name: "settings", icon: "settings-outline" },
  ];

  return (
    <View style={styles.navbar}>
      {navItems.map((item) => (
        <TouchableOpacity
          key={item.name}
          style={[
            styles.navItem,
            activeNav === item.name && styles.activeNavItem,
          ]}
          onPress={() => {
            if (activeNav !== item.name)
              router.push(`/${item.name}` as RelativePathString);
          }}
        >
          <Ionicons
            name={item.icon}
            size={24}
            color={activeNav === item.name ? theme.primary : theme.text}
          />
          <Text
            style={[
              styles.navText,
              activeNav === item.name && styles.activeNavText,
            ]}
          >
            {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
