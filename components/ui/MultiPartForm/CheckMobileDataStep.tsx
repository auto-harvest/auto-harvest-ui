import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Network from "expo-network";

export default function CheckMobileData() {
  const [isCellular, setIsCellular] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const checkNetworkStatus = async () => {
      try {
        const networkState = await Network.getNetworkStateAsync();
        setIsCellular(networkState.type === Network.NetworkStateType.CELLULAR);
        setIsConnected(networkState.isConnected!);
      } catch (error) {
        console.error("Error checking network state:", error);
      }
    };

    checkNetworkStatus();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {isConnected
          ? isCellular
            ? "Mobile Data is enabled and connected."
            : "Connected to Wi-Fi."
          : "No internet connection."}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
