import React, { useState } from "react";
import {
  Platform,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Text, TextInput } from "react-native-paper";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useThemeColor } from "../hooks/useThemeColor";

// Types for the custom date picker
interface Props {
  mode: "day" | "week" | "month" | "year";
  value: Date; // The currently selected date or reference date
  onChange: (date: Date) => void;
}

export default function CrossPlatformDatePicker({ mode, value, onChange }: Props) {
  const [showAndroidPicker, setShowAndroidPicker] = useState<boolean>(false);
  const { theme } = useThemeColor();

  const styles = StyleSheet.create({
    container: {
      marginVertical: 10,
    },
    label: {
      fontSize: 14,
      fontWeight: "600",
      marginBottom: 6,
      color: theme.text,
    },
    webInput: {
      padding: 8,
      fontSize: 16,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 6,
      backgroundColor: theme.card,
      color: theme.text,
    },
    androidPickerButton: {
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 6,
      paddingVertical: 8,
      paddingHorizontal: 12,
      marginTop: 4,
      backgroundColor: theme.card,
      width: 140,
    },
    androidPickerButtonText: {
      fontSize: 16,
      color: theme.text,
    },
  });

  // If running on web, we render HTML <input> fields.
  if (Platform.OS === "web") {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{`Select ${mode.charAt(0).toUpperCase() + mode.slice(1)}`}</Text>

        {mode === "year" ? (
          // For "year" specifically
          <input
            type="number"
            placeholder="YYYY"
            defaultValue={value.getFullYear().toString()}
            onChange={(e) => {
              const newYear = parseInt(e.target.value, 10);
              if (!isNaN(newYear)) {
                const newDate = new Date(value);
                newDate.setFullYear(newYear);
                onChange(newDate);
              }
            }}
            style={styles.webInput}
          />
        ) : (
          <input
            type={getInputType(mode)}
            value={getWebInputValue(mode, value)}
            onChange={(e) => {
              const newVal = e.target.value;
              onChange(webValueToDate(mode, newVal, value));
            }}
            style={styles.webInput}
          />
        )}
      </View>
    );
  }

  // Android Implementation
  if (Platform.OS === "android") {
    // If mode = day => use DateTimePicker
    if (mode === "day") {
      return (
        <View style={styles.container}>
          <Text style={styles.label}>{`Select Day`}</Text>
          {showAndroidPicker && (
            <DateTimePicker
              mode="date"
              display="calendar"
              value={value}
              onChange={(event: DateTimePickerEvent, date?: Date) => {
                setShowAndroidPicker(false);
                if (date) {
                  onChange(date);
                }
              }}
            />
          )}

          <TouchableOpacity
            onPress={() => setShowAndroidPicker(true)}
            style={styles.androidPickerButton}
          >
            <Text style={styles.androidPickerButtonText}>
              {formatDateDisplay(value)}
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      // Fallback or minimal approach for week/month/year
      return (
        <View style={styles.container}>
          <Text style={styles.label}>{`Select ${mode.charAt(0).toUpperCase() + mode.slice(1)}`}</Text>
          <TouchableOpacity
            onPress={() => {
              // Here you can implement custom logic for week/month/year selection
              // For now, we'll use a TextInput as a placeholder
            }}
            style={styles.androidPickerButton}
          >
            <TextInput
              value={placeholderForMode(mode, value)}
              onChangeText={(text) => {
                // Implement custom logic for parsing the input and updating the date
                // This is a simplified example and may need more robust parsing
                const newDate = new Date(value);
                if (mode === "year") {
                  newDate.setFullYear(parseInt(text, 10));
                } else if (mode === "month") {
                  newDate.setMonth(parseInt(text, 10) - 1);
                }
                // For week, you might need more complex logic
                onChange(newDate);
              }}
              style={styles.androidPickerButtonText}
            />
          </TouchableOpacity>
        </View>
      );
    }
  }

  // Fallback for other platforms (or if none of the above conditions are met)
  return null;
}

/* -------------------- HELPER FUNCTIONS -------------------- */

function getInputType(mode: "day" | "week" | "month" | "year") {
  switch (mode) {
    case "week":
      return "week";
    case "month":
      return "month";
    case "day":
      return "date";
    default:
      return "date";
  }
}

function getWebInputValue(mode: string, date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");

  if (mode === "day") {
    return `${y}-${m}-${d}`;
  }
  if (mode === "week") {
    const weekNum = getWeekNumber(date);
    return `${y}-W${String(weekNum).padStart(2, "0")}`;
  }
  if (mode === "month") {
    return `${y}-${m}`;
  }
  // fallback
  return "";
}

function webValueToDate(mode: string, newVal: string, oldDate: Date): Date {
  const result = new Date(oldDate);
  if (mode === "day") {
    const [year, month, day] = newVal.split("-");
    result.setFullYear(parseInt(year, 10));
    result.setMonth(parseInt(month, 10) - 1);
    result.setDate(parseInt(day, 10));
  } else if (mode === "week") {
    // "YYYY-W##"
    const [yearStr, weekStr] = newVal.split("-W");
    const year = parseInt(yearStr, 10);
    const week = parseInt(weekStr, 10);
    return weekToDate(year, week);
  } else if (mode === "month") {
    // "YYYY-MM"
    const [year, month] = newVal.split("-");
    result.setFullYear(parseInt(year, 10));
    result.setMonth(parseInt(month, 10) - 1);
    result.setDate(1);
  }
  return result;
}

function weekToDate(year: number, week: number): Date {
  const date = new Date(year, 0, 1);
  const days = (week - 1) * 7;
  date.setDate(date.getDate() + days);
  return date;
}

function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return weekNo;
}

function placeholderForMode(mode: string, date: Date): string {
  if (mode === "week") return "Tap to choose Week";
  if (mode === "month") return "Tap to choose Month";
  if (mode === "year") return date.getFullYear().toString();
  return "Pick a date";
}

function formatDateDisplay(date: Date) {
  return date.toISOString().slice(0, 10);
}