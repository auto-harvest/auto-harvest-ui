import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  Platform,
  ProgressBarAndroid,
} from "react-native";
import WifiManager from "react-native-wifi-reborn";
 
const WifiPairingStep = ({
  handleNext,
  handleBack,
}: {
  handleNext: () => void;
  handleBack: () => void;
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [wifiList, setWifiList] = useState<any[]>([]);
  const [selectedSsid, setSelectedSsid] = useState<string | null>(null);
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Request Location Permission for Android
  const requestLocationPermission = async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true; // On iOS, permission is handled automatically
  };

  // Scan for available Wi-Fi networks
  const scanWifi = async () => {
    try {
      const permissionGranted = await requestLocationPermission();
      if (!permissionGranted) {
        Alert.alert(
          "Permission Denied",
          "Location permission is required to scan Wi-Fi networks."
        );
        return;
      }
      setIsLoading(true);
      const networks = await WifiManager.loadWifiList();
      setWifiList(networks);
    } catch (error) {
      console.error("Failed to scan Wi-Fi networks:", error);
      Alert.alert("Error", "Failed to scan Wi-Fi networks.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentStep === 2) {
      scanWifi();
    }
  }, [currentStep]);

  const handleNetworkSelect = (ssid: string) => {
    setSelectedSsid(ssid);
  };

  const handleSubmit = () => {
    if (!selectedSsid) {
      Alert.alert("Select Wi-Fi", "Please select a Wi-Fi network.");
      return;
    }
    if (!password) {
      Alert.alert("Enter Password", "Please enter the Wi-Fi password.");
      return;
    }

    // Here, you would pass the SSID and password to the IoT device for pairing
    console.log("Connecting to Wi-Fi network:", selectedSsid);
    console.log("Password:", password);

    // Move to the next step
    setCurrentStep(currentStep + 1);
  };

  const progressBarValue = currentStep / 3; // Assuming 3 steps in total

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Step {currentStep} of 3</Text>
      <ProgressBarAndroid
        styleAttr="Horizontal"
        indeterminate={false}
        progress={progressBarValue}
        color="#2196F3"
      />

      {currentStep === 1 && (
        <View style={styles.stepContainer}>
          <Text style={styles.stepTitle}>Step 1: Welcome</Text>
          <Text>Start by connecting your device to Wi-Fi.</Text>
          <Button title="Next" onPress={() => setCurrentStep(2)} />
        </View>
      )}

      {currentStep === 2 && (
        <View style={styles.stepContainer}>
          <Text style={styles.stepTitle}>Step 2: Select Wi-Fi Network</Text>

          {isLoading ? (
            <Text>Loading Wi-Fi networks...</Text>
          ) : (
            <FlatList
              data={wifiList}
              keyExtractor={(item) => item.SSID}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.wifiItem,
                    selectedSsid === item.SSID && styles.selectedWifiItem,
                  ]}
                  onPress={() => handleNetworkSelect(item.SSID)}
                >
                  <Text style={styles.wifiText}>{item.SSID}</Text>
                  <Text style={styles.signalStrength}>
                    Signal Strength: {item.level} dBm
                  </Text>
                </TouchableOpacity>
              )}
            />
          )}

          {selectedSsid && (
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter Wi-Fi Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>
          )}

          <Button title="Next" onPress={handleSubmit} />
        </View>
      )}

      {currentStep === 3 && (
        <View style={styles.stepContainer}>
          <Text style={styles.stepTitle}>Step 3: Done</Text>
          <Text>Your IoT device is now connected to Wi-Fi!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  stepContainer: {
    alignItems: "center",
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  wifiItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    width: "100%",
  },
  selectedWifiItem: {
    backgroundColor: "#d3f9d8",
  },
  wifiText: {
    fontSize: 18,
  },
  signalStrength: {
    color: "#777",
  },
  passwordInputContainer: {
    marginTop: 20,
    width: "100%",
  },
  passwordInput: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    paddingLeft: 10,
    width: "100%",
    borderRadius: 5,
  },
});

export default WifiPairingStep;
