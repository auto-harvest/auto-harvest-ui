import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { ProgressBar, Button, TextInput } from "react-native-paper";
import WiFiPermissionComponent from "../WifiPermissionComponent";
import Step from "./Step";
// import WifiPairingStep from "./ConnectToWifiStep";
import { useThemeColor } from "../../../hooks/useThemeColor";
import WifiPairingStep from "./ConnectToWifiStep";

interface MultiPartFormWrapperProps {
  onSubmit: () => void;
}

const MultiPartFormWrapper: React.FC<MultiPartFormWrapperProps> = ({
  onSubmit,
}) => {
  const [systemName, setSystemName] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [capacity, setCapacity] = React.useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const { theme } = useThemeColor();
  const colors = theme;
  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };
  const steps = [
    <Step
      key={1}
      title="Step 1: Prepare Controller"
      description="Ensure the controller is blinking green."
    />,
    <Step
      key={2}
      title="Step 2: Disable Mobile Data"
      description="Go to your settings and turn off mobile data."
    />,
    <Step
      key={3}
      title="Step 3: Grant Location Permission"
      description="Location access is needed to scan the network."
    >
      <WiFiPermissionComponent></WiFiPermissionComponent>
    </Step>,

    <Step title="Step 4: Connect to WiFi" key={4}>
      <WifiPairingStep handleBack={handleBack} handleNext={handleNext} />
    </Step>,
    <Step
      key={5}
      title="Step 5: Pair Controller"
      description="Press the Pair button on the device."
    />,
    <Step title="Step 6: System Details" key={6}>
      <TextInput
        label="System Name"
        value={systemName}
        onChangeText={setSystemName}
        mode="outlined"
        style={{ marginBottom: 16 }}
      />
      <TextInput
        label="Location"
        value={location}
        onChangeText={setLocation}
        mode="outlined"
        style={{ marginBottom: 16 }}
      />
      <TextInput
        label="Capacity (Number of Plants) "
        value={capacity}
        onChangeText={setCapacity}
        mode="outlined"
        keyboardType="numeric"
      />
    </Step>,
  ];
  const totalSteps = steps.length;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: colors.background,
      justifyContent: "space-between",
    },
    progressBar: {
      height: 8,
      borderRadius: 4,
      marginBottom: 16,
    },
    button: {
      margin: 16,
      backgroundColor: theme.primary,
    },
    buttonGroup: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 16,
    },
  });

  return (
    <View style={styles.container}>
      <View>
        {/* Progression Bar */}
        <ProgressBar
          progress={parseInt("" + (currentStep + 1) / totalSteps)}
          color={colors.primary}
          style={styles.progressBar}
        />
        {/* Render Current Step */}
        {steps[currentStep]}
      </View>
      {/* Navigation Buttons */}
      <View style={styles.buttonGroup}>
        {currentStep > 0 && (
          <Button
            style={styles.button}
            onPress={handleBack}
            textColor={colors.text}
          >
            Back
          </Button>
        )}
        {currentStep < totalSteps - 1 ? (
          <Button
            style={styles.button}
            mode="contained"
            onPress={handleNext}
            textColor={colors.text}
          >
            Next
          </Button>
        ) : (
          <Button
            style={styles.button}
            mode="contained"
            onPress={onSubmit}
            textColor={colors.text}
          >
            Submit
          </Button>
        )}
      </View>
    </View>
  );
};

export default MultiPartFormWrapper;
