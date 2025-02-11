import React from "react";
import { SafeAreaView, StyleSheet, Platform } from "react-native";
import MultiPartFormWrapper from "../../components/ui/MultiPartForm/MultiPartFormWrapper";
import { router } from "expo-router";

const IoTDevicePairingScreen: React.FC = () => {
  
  const handleSubmit = () => {
    
    
  };

  if (Platform.OS === "web") {
    router.push("/availabilityError");
  }

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
