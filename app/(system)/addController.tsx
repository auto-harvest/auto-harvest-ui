import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  TextInput,
  Button,
  Text,
  HelperText,
  Card,
  useTheme,
} from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";

export default function AddNewSystemScreen() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [systemName, setSystemName] = useState("");
  const [systemType, setSystemType] = useState("nft");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const [nameError, setNameError] = useState("");

  const handleSubmit = () => {
    if (systemName.trim() === "") {
      setNameError("System name is required");
      return;
    }
    // Here you would typically handle the form submission,
    // e.g., sending the data to an API or storing it locally
    console.log("New system:", { systemName, systemType, location, capacity });
    navigation.goBack();
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      padding: 16,
    },
    input: {
      marginBottom: 16,
      backgroundColor: colors.surface,
    },
    pickerContainer: {
      marginBottom: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: colors.outline,
      overflow: "hidden",
    },
    picker: {
      backgroundColor: colors.surface,
      color: colors.onSurface,
    },
    submitButton: {
      marginTop: 16,
    },
    card: {
      marginBottom: 16,
      backgroundColor: colors.surface,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 8,
      color: colors.onSurface,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Add New System"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView style={styles.content}>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>System Details</Text>
            <TextInput
              label="System Name"
              value={systemName}
              onChangeText={(text) => {
                setSystemName(text);
                setNameError("");
              }}
              mode="outlined"
              style={styles.input}
              error={!!nameError}
            />
            <HelperText type="error" visible={!!nameError}>
              {nameError}
            </HelperText>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={systemType}
                onValueChange={(itemValue) => setSystemType(itemValue)}
                style={styles.picker}
              >
                <Picker.Item
                  label="NFT (Nutrient Film Technique)"
                  value="nft"
                />
                <Picker.Item label="DWC (Deep Water Culture)" value="dwc" />
                <Picker.Item label="Ebb and Flow" value="ebb_flow" />
                <Picker.Item label="Drip System" value="drip" />
                <Picker.Item label="Aeroponics" value="aeroponics" />
              </Picker>
            </View>
            <TextInput
              label="Location"
              value={location}
              onChangeText={setLocation}
              mode="outlined"
              style={styles.input}
            />
            <TextInput
              label="Capacity (number of plants)"
              value={capacity}
              onChangeText={setCapacity}
              mode="outlined"
              style={styles.input}
              keyboardType="numeric"
            />
          </Card.Content>
        </Card>
        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.submitButton}
        >
          Add System
        </Button>
      </ScrollView>
      <Navbar
        activeNav="dashboard"
        setActiveNav={(navItem) => {
          if (navItem !== "dashboard") {
            navigation.navigate(navItem);
          }
        }}
      />
    </SafeAreaView>
  );
}
