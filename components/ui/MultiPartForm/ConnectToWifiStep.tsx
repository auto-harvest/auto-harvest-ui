import React, { useState, useEffect } from "react";
import {
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  View,
  Text,
  Modal,
  Button,
  ActivityIndicator,
} from "react-native";
import Toast from "react-native-toast-message";

import WifiManager from "react-native-wifi-reborn";
import { useThemeColor } from "@/hooks/useThemeColor";
import SpinnerModal from "../SpinnerModal";
const _Alert = (title: string, message: string) =>
  Alert.alert(title, message, undefined, {
    userInterfaceStyle: "dark",
  });
const ConnectToWifiStep = ({
  handleNext,
  setClientId,
}: React.PropsWithChildren<{
  handleNext: any;
  handleBack: any;
  setClientId: any;
}>) => {
  const [wifiList, setWifiList] = useState<any[]>([]);
  const [selectedWifi, setSelectedWifi] =
    useState<WifiManager.WifiEntry | null>(null);

  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [connectedToIotWifi, setConnectedToIotWifi] = useState<boolean>(false);
  const { theme } = useThemeColor();
  const [spinnerMessage, setSpinnerMessage] = useState<string>("Loading...");
  // Request Location Permission for Android
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const requestLocationPermission = async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message:
            "We need access to your location to scan for Wi-Fi networks.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert("Permission denied", "Cannot scan for Wi-Fi networks.");
        return;
      }
    }
    setIsLoading(true);
    await loadWifiList();
    setIsLoading(false);
  };

  // Load available Wi-Fi networks
  const loadWifiList = async () => {
    try {
      let wifiList: WifiManager.WifiEntry[];
      try {
        wifiList = await WifiManager.reScanAndLoadWifiList();
        if (!Array.isArray(wifiList)) {
          wifiList = await WifiManager.loadWifiList();
        }
      } catch (e) {
        wifiList = await WifiManager.loadWifiList();
      }
      wifiList.sort((a, b) => b.level - a.level);

      //sort by signal strength
      setWifiList(wifiList);
      setTimeout(() => {
        loadWifiList();
      }, 35000);
    } catch (error) {
      console.error("Failed to scan Wi-Fi networks:", error);
      _Alert("Error", "Unable to load Wi-Fi networks.");
    } finally {
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, [requestLocationPermission]);

  // Connect to Wi-Fi with or without a password
  const connectToWifi = async (selectedWifi: WifiManager.WifiEntry) => {
    let resultStatus = false;

    try {
      if (
        selectedWifi.capabilities.includes("WEP") ||
        selectedWifi.capabilities.includes("WPA")
      ) {
        await WifiManager.connectToProtectedSSID(
          selectedWifi.SSID,
          password,
          false,
          false
        );
      } else {
        await WifiManager.connectToProtectedSSID(
          selectedWifi.SSID,
          null,
          false,
          false
        );
      }
      await WifiManager.forceWifiUsageWithOptions(true, { noInternet: true });
      const clientId = await WifiManager.getBSSID();
      try {
        const result = await fetch("http://5.5.5.5/");
        resultStatus = result.status === 200;

        console.log("Connected to Wi-Fi:");
        _Alert(
          "Success",
          `Connected to ${selectedWifi.SSID}! ${await result.text()}`
        );
      } catch (e) {
        _Alert(
          "Error",
          "Failed to connect to the Wi-Fi network." + (e as any).message
        );
      }

      const ip = await WifiManager.getIP();
      _Alert("Success", `Connected to ${selectedWifi.SSID}! ${ip}`);
    } catch (error) {
      console.error("Failed to connect to Wi-Fi:", error);
      _Alert("Error", "Failed to connect to the Wi-Fi network.");
    } finally {
      setConnectedToIotWifi(resultStatus);
      setIsLoading(false);
      setIsModalVisible(false);
      setPassword("");
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      padding: 20,
    },
    listContainer: {
      flex: 1,
      marginTop: 10,
    },
    listItem: {
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    listText: {
      fontSize: 16,
      color: theme.text,
    },
    details: {
      fontSize: 12,
      color: theme.secondaryText,
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      width: "80%",

      backgroundColor: theme.card,
      borderRadius: 10,
      padding: 20,
      alignItems: "center",
      height: 200,
      flex: 1,
    },
    input: {
      width: "100%",
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 8,
      padding: 10,
      marginVertical: 10,
      color: theme.text,
      backgroundColor: theme.inputBackground,
    },
    loadingIndicator: {
      marginTop: 20,
    },
  });

  const connectToWifiPress = (item) => {
    setSelectedWifi(item);
    console.log("heehe");
    if (
      item.capabilities.includes("WEP") ||
      item.capabilities.includes("WPA")
    ) {
      setIsModalVisible(true);
    } else {
      // Directly connect to open networks
      setIsLoading(true);
      setSpinnerMessage("Connecting to controller...");

      connectToWifi(item);
    }
  };
  const passWifi = async () => {
    //construct a post query
    try {
      setIsLoading(true);
      setSpinnerMessage("Controller is trying to connect...");
      const formData = new URLSearchParams();
      formData.append("ssid", selectedWifi!.SSID); // Add form data field
      formData.append("password", password); // Add form data field
      const formDataString = formData.toString();
      const contentLength = formDataString.length.toString();
      const response = await fetch("http://5.5.5.5/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // The content type for form submissions
          "Content-Length": contentLength, // The length of the body
        },
        body: formDataString,
      });

      if (response.ok) {
        await WifiManager.forceWifiUsageWithOptions(false, {
          noInternet: false,
        });
        await WifiManager.disconnect();
        setClientId(selectedWifi!.BSSID);
        handleNext();
      } else {
        _Alert(
          "Error",
          "Failed to connect IoT device to Wi-Fi" + (await response.text())
        );
      }
    } catch (e) {
      _Alert(
        "Error",
        "Failed to connect IoT device to Wi-Fi" + (e as any).message
      );
    } finally {
      setIsLoading(false);
    }
  };
  const passWifiPress = async (item) => {
    setSelectedWifi(item);
    if (
      item.capabilities.includes("WEP") ||
      item.capabilities.includes("WPA")
    ) {
      setIsModalVisible(true);
    } else {
      await passWifi();
    }
  };
  return (
    <View style={styles.container}>
      <SpinnerModal visible={isLoading} text={spinnerMessage} />
      <Text style={styles.listText}>
        {!connectedToIotWifi
          ? "Choose the Controllers Access Point"
          : "Select your local Wi-Fi network"}
      </Text>
      {isLoading || (
        <FlatList
          style={styles.listContainer}
          data={wifiList.filter((item) =>
            connectedToIotWifi
              ? !["ESP8266", "AutoHarvest"].find((v) => item.SSID.includes(v))
              : true
          )}
          keyExtractor={(item) => item.BSSID}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.listItem}
              onPress={() =>
                connectedToIotWifi
                  ? passWifiPress(item)
                  : connectToWifiPress(item)
              }
            >
              <View>
                <Text style={styles.listText}>
                  {item.SSID || "Hidden Network"}
                </Text>
                <Text style={styles.listText}>
                  Signal Strength: {item.level} | Security:{" "}
                  {item.capabilities.includes("WEP") ||
                  item.capabilities.includes("WPA")
                    ? "WEP/WPA"
                    : "None"}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Modal for Wi-Fi Password */}
      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.listText}>
              Connect to {selectedWifi?.SSID || "Unknown Network"}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Wi-Fi Password"
              placeholderTextColor={theme.text}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <View
              style={{
                marginTop: 10,
                flex: 1,
                alignContent: "space-between",

                marginBottom: 10,
              }}
            >
              <Button
                title="Connect"
                color={theme.primary}
                onPress={() =>
                  connectedToIotWifi ? passWifi() : connectToWifi(selectedWifi!)
                }
              />

              <Button
                title="Cancel"
                color={theme.secondary}
                onPress={() => {
                  setIsModalVisible(false);
                  setPassword("");
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
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
