import React, { useState, useEffect } from "react";
import {
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  Platform,
  View,
  Text,
} from "react-native";
import WifiManager from "react-native-wifi-reborn";

const ConnectToWifiStep = ({
  handleNext,
  handleBack,
}: {
  handleNext: () => void;
  handleBack: () => void;
}) => {
  const [wifiList, setWifiList] = useState<any[]>([]);
  const [selectedSsid, setSelectedSsid] = useState<string | null>(null);
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Request Location Permission for Android
  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "We need access to your location to scan for Wi-Fi networks",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can use the location");
          loadWifiList();
        } else {
          console.log("Location permission denied");
        }
      } else {
        loadWifiList();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const loadWifiList = async () => {
    try {
      setIsLoading(true);
      const wifiList = await WifiManager.loadWifiList();
      setWifiList(wifiList);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to scan Wi-Fi networks:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Wi-Fi Pairing Step</Text>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={wifiList}
          keyExtractor={(item) => item.SSID}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setSelectedSsid(item.SSID)}>
              <Text>{item.SSID}</Text>
            </TouchableOpacity>
          )}
        />
      )}
      {selectedSsid && (
        <View>
          <TextInput
            placeholder="Enter Wi-Fi Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button title="Connect" onPress={() => console.log("Connect to Wi-Fi")} />
        </View>
      )}
      <Button title="Back" onPress={handleBack} />
      <Button title="Next" onPress={handleNext} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ConnectToWifiStep;