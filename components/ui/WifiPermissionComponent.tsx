import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import * as Location from "expo-location";
import { Button } from "react-native-paper";

const WiFiPermissionComponent = () => {
  const [permissionStatus, setPermissionStatus] = useState<string | null>(null);

  const requestLocationPermission = async () => {
    try {
      // Request location permission
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        setPermissionStatus("granted");
        Alert.alert(
          "Permission Granted",
          "You can now scan for WiFi networks."
        );
      } else {
        setPermissionStatus("denied");
        Alert.alert(
          "Permission Denied",
          "WiFi scanning requires location permissions. Please enable it in settings."
        );
      }
    } catch (error) {
      console.error("Permission Request Error:", error);
      Alert.alert("Error", "An error occurred while requesting permissions.");
    }
  };

  const checkPermissionStatus = async () => {
    try {
      // Check current permission status
      const { status } = await Location.getForegroundPermissionsAsync();
      setPermissionStatus(status);
    } catch (error) {
      console.error("Permission Check Error:", error);
    }
  };

  useEffect(() => {
    // Check permission status on component mount
    checkPermissionStatus();
  }, []);

  return (
    <View style={styles.container}>
      {(permissionStatus === "granted" && (
        <Text style={styles.text}>
          Location permissions already granted. You can now scan for WiFi
          networks.
        </Text>
      )) || (
        <Button onPress={requestLocationPermission}>
          Request Location Permission
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 16,
    height: 200,
  },
  text: {
    marginBottom: 20,
    fontSize: 16,
    textAlign: "center",
  },
});

export default WiFiPermissionComponent;
