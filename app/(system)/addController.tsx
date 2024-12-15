import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import MultiPartFormWrapper from "../../components/ui/MultiPartForm/MultiPartFormWrapper";

const IoTDevicePairingScreen: React.FC = () => {
  const handleSubmit = () => {
    console.log("Form submitted:", { location });
  };

  return (
    <SafeAreaView style={styles.container}>
      <MultiPartFormWrapper onSubmit={handleSubmit} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
});

export default IoTDevicePairingScreen;
