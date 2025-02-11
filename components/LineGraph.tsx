import React, { useEffect, useState } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  Text,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useThemeColor } from "@/hooks/useThemeColor";

const screenWidth = Dimensions.get("window").width;

// 1) Define the types for clarity
export type MeasurementType = "ph" | "temp" | "water-temp" | "tds" | "hum";
export type DateRangeType = "day" | "week" | "month" | "year";

/**
 * Props:
 * - measurementType: which measurement to plot (ph, temp, etc.)
 * - rangeType: time range for the X axis (day, week, month, year)
 * - date: a Date object representing a specific day or the start date
 * - dataPoints?: optional array of data values to plot. If not provided, random data is generated.
 */
interface MeasurementLineChartProps {
  measurementType: MeasurementType;
  rangeType: DateRangeType;
  date: Date;
  dataPoints?: number[];
}

// Your color map
const colors = {
  temp: "",
  hum: "",
  "water-temp": "",
  ph: "",
  tds: "",
};

// Helper: convert a hex color to RGBA string
const hexToRGBA = (hex: string, alpha: number = 1): string => {
  // Remove leading “#” if present
  const cleanHex = hex.replace(/^#/, "");
  // Parse r, g, b
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const MeasurementLineChart: React.FC<MeasurementLineChartProps> = ({
  measurementType,
  rangeType,
  date,
  dataPoints,
}) => {
  // Local state for data
  const [chartLabels, setChartLabels] = useState<string[]>([]);
  const [chartValues, setChartValues] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { theme } = useThemeColor();

  const colors = {
    temp: theme.secondary,
    hum: theme.tertiary,
    "water-temp": theme.quinary,
    ph: theme.quaternary,
    tds: theme.primary,
  };

  // Decide how many data points we expect based on rangeType
  const getExpectedPointsCount = (range: DateRangeType): number => {
    switch (range) {
      case "day":
        return 24; // 24 hourly points
      case "week":
        return 7; // 7 daily points
      case "month":
        return 30; // daily points in a single month
      case "year":
        return 12; // monthly points in a year
      default:
        return 7;
    }
  };

  // Generate the corresponding labels
  const generateLabels = (range: DateRangeType): string[] => {
    switch (range) {
      case "day":
        return Array.from({ length: 24 }, (_, i) => `${i}:00`);
      case "week":
        return Array.from({ length: 7 }, (_, i) => `Day ${i + 1}`);
      case "month":
        // 30 daily labels
        return Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`);
      case "year":
        // 12 monthly labels
        return [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
      default:
        return ["A", "B", "C", "D", "E", "F", "G"];
    }
  };

  // Generate random data if user doesn't provide dataPoints
  const generateRandomData = (
    measurement: MeasurementType,
    count: number
  ): number[] => {
    let minVal = 0;
    let maxVal = 100;

    switch (measurement) {
      case "ph":
        minVal = 4;
        maxVal = 10;
        break;
      case "temp":
      case "water-temp":
        minVal = 10;
        maxVal = 40;
        break;
      case "tds":
        minVal = 200;
        maxVal = 600;
        break;
      case "hum":
        minVal = 0;
        maxVal = 100;
        break;
      default:
        break;
    }

    return Array.from({ length: count }, () =>
      Math.round(minVal + Math.random() * (maxVal - minVal))
    );
  };

  // Main data fetch function
  const fetchChartData = async () => {
    const expectedPointsCount = getExpectedPointsCount(rangeType);
    const labels = generateLabels(rangeType);

    if (dataPoints && dataPoints.length !== expectedPointsCount) {
      throw new Error(
        `Provided dataPoints length (${dataPoints.length}) does not match expected length (${expectedPointsCount}) for rangeType="${rangeType}".`
      );
    }

    const finalValues = dataPoints
      ? dataPoints
      : generateRandomData(measurementType, expectedPointsCount);

    return { labels, values: finalValues };
  };

  // useEffect to fetch data when props change
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { labels, values } = await fetchChartData();
        setChartLabels(labels);
        setChartValues(values);
      } catch (error) {
        console.error("Error fetching chart data:", error);
        // In case of error, set empty data (or handle differently)
        setChartLabels([]);
        setChartValues([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [measurementType, rangeType, date, dataPoints]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    );
  }

  // Get the color for this measurement from the map
  const lineHexColor = colors[measurementType] ?? theme.primary;

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: lineHexColor }]}>
        {measurementType.toUpperCase()} ({rangeType.toUpperCase()}) -{" "}
        {date.toDateString()}
      </Text>

      <LineChart
        data={{
          labels: chartLabels,
          datasets: [
            {
              data: chartValues,
              color: (opacity = 1) => hexToRGBA(lineHexColor, opacity),
            },
          ],
        }}
        width={screenWidth - 100}
        height={220}
        fromZero
        chartConfig={{
          backgroundColor: theme.card,
          backgroundGradientFrom: theme.card,
          backgroundGradientTo: theme.card,
          decimalPlaces: 2,
          style: {
            borderRadius: 16,
          },
          color: (opacity = 1) => theme.text,
          labelColor: (opacity = 1) => theme.text,
          propsForDots: {
            r: "3",
            strokeWidth: "2",
            stroke: lineHexColor,
          },
        }}
        style={styles.chart}
      />
    </View>
  );
};

export default MeasurementLineChart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
