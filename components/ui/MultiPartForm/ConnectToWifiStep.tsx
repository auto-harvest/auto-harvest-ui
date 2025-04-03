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
  ActivityIndicator,
  Alert,
} from "react-native";
import Toast from "react-native-toast-message";

import WifiManager from "react-native-wifi-reborn";
import { useThemeColor } from "@/hooks/useThemeColor";
import SpinnerModal from "../SpinnerModal";
import { Button, Title } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
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
  console.log(isLoading);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [connectedToIotWifi, setConnectedToIotWifi] = useState<boolean>(false);
  const { theme } = useThemeColor();
  const [spinnerMessage, setSpinnerMessage] = useState<string>("Loading...");
  // Request Location Permission for Android
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
    console.log(64);

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
  }, []);

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
      console.log(147);

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
      height: 500,
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
      elevation: 5,
      margin: 20,
      backgroundColor: theme.card,
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 8,
      width: 300,
      padding: 10,
      marginBottom:20,
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
      console.log(220);

      setIsLoading(true);
      setSpinnerMessage("Connecting to controller...");
      setTimeout(() => {
        connectToWifi(item);
      }, 1000);
      connectToWifi(item);
    }
  };
  const passWifi = async () => {
    //construct a post query
    try {
      console.log(229);

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
      console.log(264);
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
          ? "2.1: Choose the Controllers Access Point"
          : "2.2: Select your local Wi-Fi network"}
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
      <SafeAreaProvider
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          elevation: 5,
          display: isModalVisible ? "flex" : "none",
        }}
      >
        <SafeAreaView>
          <Modal visible={isModalVisible} transparent animationType="slide">
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={styles.modalContent}>
                <Title style={{ color: "white", fontSize: 14 }}>
                  Connect to {selectedWifi?.SSID || "Unknown Network"}
                </Title>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Wi-Fi Password"
                  placeholderTextColor={theme.text}
                  value={password}
                  onChangeText={setPassword}
                />
                <View
                  style={{
                    width: "100%",
                    alignContent: "space-evenly",
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <Button
                    onPress={() => {
                      setIsModalVisible(false);
                      setPassword("");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    style={{ backgroundColor: theme.primary }}
                    onPress={() =>
                      connectedToIotWifi
                        ? passWifi()
                        : connectToWifi(selectedWifi!)
                    }
                  >
                    Connect
                  </Button>
                </View>
              </View>
            </View>
          </Modal>
        </SafeAreaView>
      </SafeAreaProvider>
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
