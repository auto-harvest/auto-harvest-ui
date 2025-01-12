import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Card,
  Title,
  Paragraph,
  DataTable,
  Switch,
  Text,
} from "react-native-paper";
import { LineChart, BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { useThemeColor } from "../../hooks/useThemeColor";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import { router } from "expo-router";

const screenWidth = Dimensions.get("window").width;

export default function HydroponicsDashboard() {
  const [isPumpOn, setIsPumpOn] = useState(false);
  const [isSystemOn, setIsSystemOn] = useState(true);
  const [isAirPumpOn, setIsAirPumpOn] = useState(false);
  const { theme } = useThemeColor();

  const temperatureHumidityData = {
    labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
    datasets: [
      {
        data: [22, 21, 23, 26, 25, 24],
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: [60, 62, 58, 55, 57, 59],
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ["Temperature", "Humidity"],
  };

  const nutrientLevelsData = {
    labels: ["Nitrogen", "Phosphorus", "Potassium", "Calcium", "Magnesium"],
    datasets: [
      {
        data: [200, 50, 150, 100, 40],
      },
    ],
  };

  const alertsData = [
    { id: 1, type: "Low Water Level", timestamp: "2023-04-15 09:23" },
    { id: 2, type: "High EC", timestamp: "2023-04-14 14:56" },
    { id: 3, type: "Pump Malfunction", timestamp: "2023-04-13 22:10" },
  ];

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

  const renderMetricCard = (title, value, desc) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.cardTitle}>{title}</Title>
        <Paragraph style={styles.cardValue}>{value}</Paragraph>
        <Paragraph style={styles.cardDesc}>{desc}</Paragraph>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header
          showBackButton
          onBackPress={() => {
            router.back();
          }}
          showUserIcon
          onUserIconPress={() => {
            router.push("/profile");
          }}
        />

        <View style={styles.metricsContainer}>
          {renderMetricCard("Temperature", "24°C", "Optimal range: 20-26°C")}
          {renderMetricCard("Humidity", "60%", "Optimal range: 50-70%")}
          {renderMetricCard("pH Level", "6.2", "Optimal range: 5.5-6.5")}
          {renderMetricCard("EC", "1.8 mS/cm", "Optimal range: 1.5-2.5 mS/cm")}
        </View>

        <Card style={styles.chartCard}>
          <Card.Content>
            <Title style={{ color: theme.text }}>Temperature & Humidity</Title>
            <LineChart
              data={temperatureHumidityData}
              width={screenWidth - 40}
              height={220}
              chartConfig={{
                backgroundColor: theme.card,
                backgroundGradientFrom: theme.card,
                backgroundGradientTo: theme.card,
                decimalPlaces: 1,
                color: (opacity = 1) => theme.text,
                labelColor: (opacity = 1) => theme.text,
                style: {
                  borderRadius: 16,
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </Card.Content>
        </Card>

        <Card style={styles.chartCard}>
          <Card.Content>
            <Title style={{ color: theme.text }}>Nutrient Levels</Title>
            <BarChart
              data={nutrientLevelsData}
              width={screenWidth - 40}
              height={220}
              yAxisLabel=""
              chartConfig={{
                backgroundColor: theme.card,
                backgroundGradientFrom: theme.card,
                backgroundGradientTo: theme.card,
                decimalPlaces: 0,
                color: (opacity = 1) => theme.primary,
                labelColor: (opacity = 1) => theme.text,
                style: {
                  borderRadius: 16,
                },
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </Card.Content>
        </Card>

        <Card style={styles.alertsCard}>
          <Card.Content>
            <Title style={{ color: theme.text }}>Recent Alerts</Title>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title textStyle={{ color: theme.text }}>
                  Alert Type
                </DataTable.Title>
                <DataTable.Title textStyle={{ color: theme.text }}>
                  Timestamp
                </DataTable.Title>
              </DataTable.Header>
              {alertsData.map((alert) => (
                <DataTable.Row key={alert.id}>
                  <DataTable.Cell textStyle={{ color: theme.text }}>
                    {alert.type}
                  </DataTable.Cell>
                  <DataTable.Cell textStyle={{ color: theme.text }}>
                    {alert.timestamp}
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </Card.Content>
        </Card>

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
              <Title style={{ color: theme.text }}>System Control</Title>
              <View style={styles.switchContainer}>
                <Text style={styles.switchText}>Off</Text>
                <Switch
                  value={isSystemOn}
                  onValueChange={() => setIsSystemOn(!isSystemOn)}
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
