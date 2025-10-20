import React from "react";
import { Provider } from "react-redux";

import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { useThemeColor } from "../../../hooks/useThemeColor";

interface StepProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

const Step: React.FC<StepProps> = ({ title, description, children }) => {
  const { theme } = useThemeColor();
  const colors = theme; 

  const styles = StyleSheet.create({
    container: {
      marginBottom: 16,
      height: "88%", 
      color: colors.background,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 8,
    },
    description: {
      fontSize: 16,
      color: colors.text,
      marginBottom: 16,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
      {children}
    </View>
  );
};

export default Step;
