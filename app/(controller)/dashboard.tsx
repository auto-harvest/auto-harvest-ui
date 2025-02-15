import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Card,
  Title,
  Paragraph,
  Switch,
  Text,
  Button,
} from "react-native-paper";
import { useThemeColor } from "../../hooks/useThemeColor";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import { useRouter } from "expo-router";
import { useAppSelector } from "@/store/overrides";

export default function HydroponicsDashboard() {
  const router = useRouter();
  const [isPumpOn, setIsPumpOn] = useState(false);
  const [isAirPumpOn, setIsAirPumpOn] = useState(false);
  const sensorData = useAppSelector((state) => state.sensorInfo.data);
  const { theme } = useThemeColor();
  console.log(sensorData);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    metricsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      padding: 8,
    },
    card: {
      width: "48%",
      marginBottom: 16,
      backgroundColor: theme.card,
    },
    cardTitle: {
      fontSize: 14,
      color: theme.text,
    },
    cardValue: {
      fontSize: 24,
      height: 32,
      verticalAlign: "middle",
      fontWeight: "bold",
      color: theme.text,
    },
    cardDesc: {
      fontSize: 12,
      color: theme.text,
    },
    chartCard: {
      margin: 16,
      backgroundColor: theme.card,
    },
    alertsCard: {
      margin: 16,
      backgroundColor: theme.card,
    },
    controlsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      padding: 16,
    },
    controlCard: {
      width: "48%",
      marginBottom: 16,
      backgroundColor: theme.card,
    },
    switchContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 8,
    },
    switchText: {
      color: theme.text,
    },
  });

  interface MetricCardProps {
    title: string;
    value: string;
    desc: string;
  }

  const handleMetricPress = (title: string): void => {
    if (Platform.OS === "web") {
      router.push(`/metric/${title.toLowerCase()}`);
    } else {
      router.push("/availabilityErrorAndroid");
    }
  };

  const renderMetricCard = ({ title, value, desc }: MetricCardProps) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.cardTitle}>{title}</Title>
        <Paragraph style={styles.cardValue}>{value}</Paragraph>
        <Paragraph style={styles.cardDesc}>{desc}</Paragraph>

        {title !== "Water Level" && (
          <Button
            onPress={() => handleMetricPress(title)}
            textColor={theme.secondary}
          >
            Show Detailed View
          </Button>
        )}
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header
          showBackButton
          onBackPress={() => router.push("/systemSelection")}
          showUserIcon
          onUserIconPress={() => {
            router.push("/profile");
          }}
        />

        {/* //? Metrics */}
        <View style={styles.controlsContainer}>
          {renderMetricCard({
            title: "Temperature",
            value: `${sensorData["temperature"]?.value}°C`,
            desc: "Optimal range: 20-26°C",
          })}
          {renderMetricCard({
            title: "Humidity",
            value: `${sensorData["humidity"]?.value}%`,
            desc: "Optimal range: 50-70%",
          })}
          {renderMetricCard({
            title: "Water Temperature",
            value: `${sensorData["water-temperature"]?.value}%`,
            desc: "Optimal range: 18-22°C",
          })}
          {renderMetricCard({
            title: "pH Level",
            value: `${sensorData["ph"]?.value}`,
            desc: "Optimal range: 5.5-6.5",
          })}
          {renderMetricCard({
            title: "TDS",
            value: `${sensorData["tds"]?.value} ppm`,
            desc: "Optimal range: 150-250 ppm",
          })}
          {renderMetricCard({
            title: "Water Level",
            value: `Full`,
            desc: "Water Level could be Attention Needed, Low, Full",
          })}
        </View>

        {/* //? Controls */}
        <View style={styles.controlsContainer}>
          <Card style={styles.controlCard}>
            <Card.Content>
              <Title style={{ color: theme.text }}>Pump Control</Title>
              <View style={styles.switchContainer}>
                <Text style={styles.switchText}>Off</Text>
                <Switch
                  value={isPumpOn}
                  onValueChange={() => setIsPumpOn(!isPumpOn)}
                  color={theme.primary}
                />
                <Text style={styles.switchText}>On</Text>
              </View>
            </Card.Content>
          </Card>
          <Card style={styles.controlCard}>
            <Card.Content>
              <Title style={{ color: theme.text }}>Air Pump Control</Title>
              <View style={styles.switchContainer}>
                <Text style={styles.switchText}>Off</Text>
                <Switch
                  value={isAirPumpOn}
                  onValueChange={() => setIsAirPumpOn(!isAirPumpOn)}
                  color={theme.primary}
                />
                <Text style={styles.switchText}>On</Text>
              </View>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
      <Navbar activeNav="dashboard" />
    </SafeAreaView>
  );
}
