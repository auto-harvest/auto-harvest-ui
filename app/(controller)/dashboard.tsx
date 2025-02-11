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
import { Dimensions } from "react-native";
import { useThemeColor } from "../../hooks/useThemeColor";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import { useRouter } from "expo-router";
import { useAppSelector } from "@/store/overrides";
import MeasurementLineChart from "@/components/LineGraph";
import sampleData from "../../sampleData";
const screenWidth = Dimensions.get("window").width;

export default function HydroponicsDashboard() {
  const router = useRouter();
  const [isPumpOn, setIsPumpOn] = useState(false);
  const [isAirPumpOn, setIsAirPumpOn] = useState(false);
  const sensorData = useAppSelector((state) => state.sensorInfo.data);

  console.log(sensorData);
  const { theme } = useThemeColor();

  const colors = {
    temperature: theme.secondary,
    humidity: theme.tertiary,
    "water-temperature": theme.quinary,
    ph: theme.quaternary,
    tds: theme.primary,
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

  const renderMetricCard = ({ title, value, desc }: MetricCardProps) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.cardTitle}>{title}</Title>
        <Paragraph style={styles.cardValue}>{value}</Paragraph>
        {/* <Paragraph style={[styles.cardValue, {color=calculateColor(title, value)}]}>{value}</Paragraph> */}
        <Paragraph style={styles.cardDesc}>{desc}</Paragraph>
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
          })},
          {renderMetricCard({
            title: "Water Level",
            value: `Full`,
            desc: "Water Level could be Attention Needed, Low, Full"
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

        {/* //? Charts */}
        <Card style={styles.chartCard}>
          <Card.Content>
            <Title style={{ color: theme.text }}>PH</Title>
            <MeasurementLineChart
              measurementType="ph"
              rangeType="day"
              date={new Date(2025, 1, 15)}
              dataPoints={sampleData.ph.day} // matches the rangeType "week" → 7 points
            />
          </Card.Content>
        </Card>

        <Card style={styles.chartCard}>
          <Card.Content>
            <Title style={{ color: theme.text }}>Temperature</Title>
            <MeasurementLineChart
              measurementType="temp"
              rangeType="week"
              date={new Date(2025, 1, 15)}
              dataPoints={sampleData.temp.week} // matches the rangeType "week" → 7 points
            />
          </Card.Content>
        </Card>

        <Card style={styles.chartCard}>
          <Card.Content>
            <Title style={{ color: theme.text }}>Humidity</Title>
            <MeasurementLineChart
              measurementType="hum" // matches the "humidity" key in your color map
              rangeType="month" // "month" expects 12 data points
              date={new Date(2025, 4, 10)} // May 10, 2025 (example)
              dataPoints={sampleData.hum["month-daily"]} // Provide the 12 humidity values
            />
          </Card.Content>
        </Card>

        <Card style={styles.chartCard}>
          <Card.Content>
            <Title style={{ color: theme.text }}>TDS</Title>
            <MeasurementLineChart
              measurementType="tds" // matches the "humidity" key in your color map
              rangeType="month" // "month" expects 12 data points
              date={new Date(2025, 4, 10)} // May 10, 2025 (example)
              dataPoints={sampleData.tds["month-daily"]} // Provide the 12 humidity values
            />
          </Card.Content>
        </Card>

        <Card style={styles.chartCard}>
          <Card.Content>
            <Title style={{ color: theme.text }}>water-temp</Title>
            <MeasurementLineChart
              measurementType="water-temp" // matches the "humidity" key in your color map
              rangeType="week" // "month" expects 12 data points
              date={new Date(2025, 4, 10)} // May 10, 2025 (example)
              dataPoints={sampleData["water-temp"].week} // Provide the 12 humidity values
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
      </ScrollView>

      <Navbar activeNav="dashboard" />
    </SafeAreaView>
  );
}
