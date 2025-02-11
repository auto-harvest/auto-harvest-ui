// app/metric/[metric].tsx
import React from "react";
import { Redirect, useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView, ScrollView, Text, StyleSheet } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import { useThemeColor } from "@/hooks/useThemeColor";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import sampleData from "@/sampleData";
import MeasurementLineChart from "@/components/LineGraph";
// Enums for your chart's measurementType + rangeType
import { ValueType } from "@/constants/enums/ValueType.enum";
import { DateRange } from "@/constants/enums/DateRange.enum";

export default function MetricDetails() {
  // 1) Grab the [metric] param from the URL
  const { metric } = useLocalSearchParams<{ metric: string }>();
  // Router for navigation if you want a back button
  const router = useRouter();
  // Use your theme
  const { theme } = useThemeColor();

  // 2) Convert the string (e.g. "temperature") to your enum (ValueType.TEMPERATURE)
  //    For simplicity, here's a basic map. Adapt as needed.
  const metricKeyMap: Record<string, ValueType> = {
    temperature: ValueType.TEMPERATURE,
    humidity: ValueType.HUMIDITY,
    "water temperature": ValueType.WATER_TEMPERATURE,
    ph: ValueType.PH,
    tds: ValueType.TDS,
    // Add any others you have
  };

  const mapMetric = (metric: string): ValueType => {
    switch (metric.toLowerCase()) {
      case "temperature":
        return ValueType.TEMPERATURE;
      case "humidity":
        return ValueType.HUMIDITY;
      case "water temperature":
        return ValueType.WATER_TEMPERATURE;
      case "ph":
        return ValueType.PH;
      case "tds":
        return ValueType.TDS;
      default:
        return ValueType.PH; // Default to PH if unknown
    }
  };

  const measurementType: ValueType = mapMetric(metric);
  if (!Object.values(ValueType).includes(measurementType)) {
    router.push("/+not-found");
  }

  let chartData: number[] = [];
  try {
    chartData = sampleData[measurementType]?.week || [];
  } catch (err) {
    chartData = [];
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <Header
        showBackButton
        onBackPress={() => router.back()}
        showUserIcon
        onUserIconPress={() => router.push("/profile")}
      />

      <ScrollView style={styles.scroll}>
        {/* Title showing just the metric name */}
        <Text style={[styles.title, { color: theme.text }]}>
          {metric?.toUpperCase() || "METRIC"} DETAILS
        </Text>

        {/* Navbar */}
        {/* Example Chart Card */}
        <Card style={[styles.card, { backgroundColor: theme.card }]}>
          <Card.Content>
            <Title style={{ color: theme.text }}>Day Data</Title>
            <MeasurementLineChart
              measurementType={measurementType}
              rangeType={DateRange.DAY}
              date={new Date()}
              dataPoints={sampleData[measurementType]?.day}
            />
          </Card.Content>
        </Card>

        <Card style={[styles.card, { backgroundColor: theme.card }]}>
          <Card.Content>
            <Title style={{ color: theme.text }}>Weekly Data</Title>
            <MeasurementLineChart
              measurementType={measurementType}
              rangeType={DateRange.WEEK}
              date={new Date()}
              dataPoints={sampleData[measurementType]?.week}
            />
          </Card.Content>
        </Card>

        <Card style={[styles.card, { backgroundColor: theme.card }]}>
          <Card.Content>
            <Title style={{ color: theme.text }}>Month Data</Title>
            <MeasurementLineChart
              measurementType={measurementType}
              rangeType={DateRange.MONTH}
              date={new Date()}
              dataPoints={sampleData[measurementType]["month-daily"]}
            />
          </Card.Content>
        </Card>

        <Card style={[styles.card, { backgroundColor: theme.card }]}>
          <Card.Content>
            <Title style={{ color: theme.text }}>Year Data</Title>
            <MeasurementLineChart
              measurementType={measurementType}
              rangeType={DateRange.YEAR}
              date={new Date()}
              dataPoints={sampleData[measurementType]["month"]}
            />
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
  },
  card: {
    marginBottom: 16,
  },
  cardValue: {
    fontSize: 24,
    height: 32,
    verticalAlign: "middle",
    fontWeight: "bold",
  },
  cardDesc: {
    fontSize: 12,
  },
});
