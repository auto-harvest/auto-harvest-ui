// app/metric/[metric].tsx
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import { Card, Title } from "react-native-paper";

import { useThemeColor } from "@/hooks/useThemeColor";
import Header from "@/components/Header";
import sampleData from "@/sampleData";
import MeasurementLineChart from "@/components/LineGraph";
import CrossPlatformDatePicker from "@/components/CrossPlatformDatePicker";

// Enums
import { ValueType } from "@/constants/enums/ValueType.enum";
import { DateRange } from "@/constants/enums/DateRange.enum";

export default function MetricDetails() {
  const { metric } = useLocalSearchParams<{ metric: string }>();
  const router = useRouter();
  const { theme } = useThemeColor();

  const [rangeType, setRangeType] = useState<DateRange>(DateRange.DAY);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  function mapMetric(m: string): ValueType {
    switch (m.toLowerCase()) {
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
        return ValueType.PH;
    }
  }

  const measurementType: ValueType = mapMetric(metric ?? "");
  if (!Object.values(ValueType).includes(measurementType)) {
    console.log("Invalid metric type:", metric);
    router.push("/+not-found",);
  }

  const getDataForRange = () => {
    switch (rangeType) {
      case DateRange.DAY:
        return sampleData[measurementType]?.day;
      case DateRange.WEEK:
        return sampleData[measurementType]?.week;
      case DateRange.MONTH:
        return sampleData[measurementType]?.["month-daily"];
      case DateRange.YEAR:
        return sampleData[measurementType]?.month;
      default:
        return [];
    }
  };

  // Map our DateRange to CrossPlatformDatePicker "mode"
  function getPickerMode(range: DateRange) {
    switch (range) {
      case DateRange.DAY: return "day";
      case DateRange.WEEK: return "week";
      case DateRange.MONTH: return "month";
      case DateRange.YEAR: return "year";
      default: return "day";
    }
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Header
        showBackButton
        onBackPress={() => router.back()}
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
                    rangeType === DateRange.DAY && { backgroundColor: theme.primary },
                  ]}
                  onPress={() => setRangeType(DateRange.DAY)}
                >
                  <Text style={styles.rangeBoxText}>Day</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.rangeBox,
                    rangeType === DateRange.WEEK && { backgroundColor: theme.primary },
                  ]}
                  onPress={() => setRangeType(DateRange.WEEK)}
                >
                  <Text style={styles.rangeBoxText}>Week</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.rangeBox,
                    rangeType === DateRange.MONTH && { backgroundColor: theme.primary },
                  ]}
                  onPress={() => setRangeType(DateRange.MONTH)}
                >
                  <Text style={styles.rangeBoxText}>Month</Text>
                </TouchableOpacity>

              </View>
            </View>

            {/* 1) Our CrossPlatformDatePicker to pick day/week/month/year */}
            <CrossPlatformDatePicker
              mode={getPickerMode(rangeType)}
              value={selectedDate}
              onChange={(newDate) => setSelectedDate(newDate)}
            />

            {/* 2) The chart with the chosen data */}
            <MeasurementLineChart
              measurementType={measurementType}
              rangeType={rangeType}
              date={selectedDate}
              dataPoints={getDataForRange()}
            />
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "flex-end" },
  scroll: { paddingHorizontal: 16},
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
