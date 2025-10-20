import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { ProgressBar, Button, TextInput } from "react-native-paper";
import WiFiPermissionComponent from "../WifiPermissionComponent";
import Step from "./Step";
// import WifiPairingStep from "./ConnectToWifiStep";
import { useThemeColor } from "../../../hooks/useThemeColor";
import WifiPairingStep from "./ConnectToWifiStep";
import CheckMobileData from "./CheckMobileDataStep";
import { useSetControllerMutation } from "@/store/slices/api/apiSlice";
import { router } from "expo-router";

interface MultiPartFormWrapperProps {
  onSubmit: () => void;
}

const MultiPartFormWrapper: React.FC<MultiPartFormWrapperProps> = () => {
  const [systemName, setSystemName] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [capacity, setCapacity] = React.useState("");
  //
  const [currentStep, setCurrentStep] = useState(0);
  const [clientId, setClientId] = useState("");
  const [canContinue, setCanContinue] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);
  const { theme } = useThemeColor();
  const colors = theme;
  const [setController, { data }] = useSetControllerMutation();
  const onSubmit = async () => {
    console.log("Submitting...");
    const response = await setController({
      code: clientId,
      name: systemName,
      location,
      capacity: +capacity,
    });
    if (response.error) {
      Alert.alert("Error", "An error occurred while setting the controller.");
      return router.push("/systemSelection");
    }
    if (response.data.error === 1) {
      Alert.alert("Error", response.data.message);
    } else {
      Alert.alert("Success", response.data.message);
    }
    return router.push("/systemSelection");
  };
  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };
  // useEffect(() => {
  //   if (currentStep === 1) {
  //     setCanContinue(false);
  //   }
  //   if (currentStep === 0) {
  //     setCanContinue(true);
  //     setCanGoBack(false);
  //   }
  //   if (currentStep === 1) {
  //     setCanGoBack(false);
  //   }
  // }, [currentStep, canGoBack]);
  
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

    <Step title="Step 2: Provide credentials to controller">
      <WifiPairingStep
        handleBack={handleBack}
        handleNext={handleNext}
        setClientId={(c: string) => {
          setClientId(c);
          setCanContinue(true);
        }}
      />
    </Step>,

    <Step title="Step 3: System Details">
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
        label="Capacity (Number of Plants)"
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
    backButton: {
      margin: 16,
    },
    buttonGroup: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
      marginTop: 0,
    },
    hiddenButton: {
      visibility: "none",
    },
  });

  return (
    <View style={styles.container}>
      <View>
        {/* Progression Bar */}
        <ProgressBar
          progress={+(currentStep / totalSteps).toFixed(2)}
          color={colors.primary}
          style={styles.progressBar}
        />
        {/* Render Current Step */}
        {steps[currentStep]}
      </View>
      {/* Navigation Buttons */}
      <View style={styles.buttonGroup}>
        <Button
          onPress={handleBack}
          style={styles.backButton}
          disabled={canGoBack === false}
        >
          Back
        </Button>

        {currentStep < totalSteps - 1 ? (
          <Button
            style={styles.button}
            mode="contained"
            onPress={handleNext}
            textColor={colors.text}
            disabled={canContinue === false}
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
