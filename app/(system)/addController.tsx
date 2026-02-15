import React from "react";
import { SafeAreaView, StyleSheet, Platform, ScrollView, View } from "react-native";
import { Text } from "react-native-paper";
import MultiPartFormWrapper from "../../components/ui/MultiPartForm/MultiPartFormWrapper";
import { router } from "expo-router";
import { useIsGuest } from "@/hooks/useIsGuest";

const IoTDevicePairingScreen: React.FC = () => {
  const isGuest = useIsGuest();

  const handleSubmit = () => {


  };

  if (Platform.OS === "web") {
    router.push("/availabilityError");
  }

  if (isGuest) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 24 }}>
          <Text variant="titleMedium">
            Demo mode — adding controllers is not available
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <MultiPartFormWrapper onSubmit={handleSubmit} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default IoTDevicePairingScreen;
