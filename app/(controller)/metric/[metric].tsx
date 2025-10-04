// app/metric/[metric].tsx
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import { Card, Paragraph } from "react-native-paper";

import { useThemeColor } from "@/hooks/useThemeColor";
import Header from "@/components/Header";
import sampleData from "@/sampleData";
import MeasurementLineChart from "@/components/LineGraph";
import CrossPlatformDatePicker from "@/components/CrossPlatformDatePicker";

// Enums
import { ValueType } from "@/constants/enums/ValueType.enum";
import { DateRange } from "@/constants/enums/DateRange.enum";
import { useGetHistoricSensorInfoQuery } from "@/store/slices/api/squashedSensorInfoSlice";
import HumidityChart from "@/components/Chart";
import CurrencyGraph from "@/components/NewChart";
import TelemetryLineChart from "@/components/NewChart";

export default function MetricDetails() {
  const { metric } = useLocalSearchParams<{ metric: string }>();
  const router = useRouter();
  const { theme } = useThemeColor();

  const [rangeType, setRangeType] = useState<DateRange>(DateRange.DAY);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { isLoading, data } = useGetHistoricSensorInfoQuery({
    type: metric?.toString() ?? "ph",
    range: rangeType.toString().toLowerCase(),
    start: new Date(selectedDate).toISOString(),
  });
  useEffect(() => {
    console.log(selectedDate);
  }, [selectedDate]);
  function mapMetric(m: string): ValueType {
    switch (m.toLowerCase()) {
      case "temperature":
        return ValueType.TEMPERATURE;
      case "humidity":
        return ValueType.HUMIDITY;
      case "water-temperature":
        return ValueType.WATER_TEMPERATURE;
      case "ph":
        return ValueType.PH;
      case "tds":
        return ValueType.TDS;
      default:
        return ValueType.TEMPERATURE;
    }
  }
  const telemetryConfigMap = {
    [ValueType.TEMPERATURE]: {
      unit: "°C",
      color: "#e22626",
      areaFill: {
        start: "#ff3e3b",
        end: "#8c00ff",
        startOpacity: 0.2,
        endOpacity: 0.1,
      },
    },
    [ValueType.HUMIDITY]: {
      unit: "%",
      color: "#2652e2",
      areaFill: {
        start: "#3b69ff",
        end: "#ff99008d",
        startOpacity: 0.2,
        endOpacity: 0.1,
      },
    },
    [ValueType.WATER_TEMPERATURE]: {
      unit: "°C",
      color: "#e23226",
      areaFill: {
        start: "#ff483b",
        end: "#00f7ff",
        startOpacity: 0.2,
        endOpacity: 0.1,
      },
    },
    [ValueType.TDS]: {
      unit: "ppm",
      color: "#26e294",
      areaFill: {
        start: "#3bffa3",
        end: "#ffffff",
        startOpacity: 0.2,
        endOpacity: 0.1,
      },
    },
    [ValueType.PH]: {
      unit: "pH",
      color: "#2652e2",
      areaFill: {
        start: "#3b4fff",
        end: "#e62626",
        startOpacity: 0.2,
        endOpacity: 0.1,
      },
    },
  };
  const measurementType: ValueType = mapMetric(metric ?? "");
  if (!Object.values(ValueType).includes(measurementType)) {
    console.log("Invalid metric type:", metric);
    router.push("/+not-found");
  }

  const getDataForRange = () => {
    console.log("Fetched data:", data);
    return data?.map((entry: any) => entry.average) || [];
  };

  // Map our DateRange to CrossPlatformDatePicker "mode"
  function getPickerMode(range: DateRange) {
    switch (range) {
      case DateRange.DAY:
        return "day";
      case DateRange.WEEK:
        return "week";
      case DateRange.MONTH:
        return "month";
      case DateRange.YEAR:
        return "year";
      default:
        return "day";
    }
  }
  if (isLoading) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <Header showBackButton onBackPress={() => router.back()} />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ color: theme.text }}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <Header
        showBackButton
        onBackPress={() => router.replace("/dashboard")}
        showUserIcon
        onUserIconPress={() => router.push("/profile")}
      />
      <ScrollView style={styles.scroll}>
        <Text style={[styles.title, { color: theme.text }]}>
          {metric?.toUpperCase()} DETAILS
        </Text>

        <Card style={[styles.card, { backgroundColor: theme.card }]}>
          <Card.Content>
            <View style={styles.cardHeader}>
              {/* Range buttons */}
              <View style={styles.rangePickerContainer}>
                <TouchableOpacity
                  style={[
                    styles.rangeBox,
                    rangeType === DateRange.DAY && {
                      backgroundColor: theme.primary,
                    },
                  ]}
                  onPress={() => setRangeType(DateRange.DAY)}
                >
                  <Text style={styles.rangeBoxText}>Day</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.rangeBox,
                    rangeType === DateRange.WEEK && {
                      backgroundColor: theme.primary,
                    },
                  ]}
                  onPress={() => setRangeType(DateRange.WEEK)}
                >
                  <Text style={styles.rangeBoxText}>Week</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.rangeBox,
                    rangeType === DateRange.MONTH && {
                      backgroundColor: theme.primary,
                    },
                  ]}
                  onPress={() => setRangeType(DateRange.MONTH)}
                >
                  <Text style={styles.rangeBoxText}>Month</Text>
                </TouchableOpacity>
              </View>
            </View>
            <CrossPlatformDatePicker
              mode={getPickerMode(rangeType)}
              value={selectedDate}
              onChange={(newDate) =>
                newDate.setHours(0, 0, 0, 0) && setSelectedDate(newDate)
              }
            />
            {/* 1) Our CrossPlatformDatePicker to pick day/week/month/year */}

            {/* 2) The chart with the chosen data */}
            <View>
              <TelemetryLineChart
                docs={data}
                {...telemetryConfigMap[measurementType]}
              ></TelemetryLineChart>
              {/* <HumidityChart
                docs={data}
                unit="°C"
                color="#F39C12"
                areaFill={{
                  start: "#F39C12",
                  end: "#F39C12",
                  startOpacity: 0.2,
                  endOpacity: 0.02,
                }}
              /> */}
              {/* <MeasurementLineChart
                measurementType={measurementType}
                rangeType={rangeType}
                date={selectedDate}
                dataPoints={getDataForRange()}
              /> */}
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "flex-end" },
  scroll: { paddingHorizontal: 0 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
  },
  card: {
    marginBottom: 0,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  rangePickerContainer: {
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  rangeBox: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#ccc",
    marginLeft: 4,
    borderRadius: 4,
  },
  rangeBoxText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
});
