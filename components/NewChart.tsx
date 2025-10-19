"use client";
import React, { useState } from "react";
import { useMemo } from "react";
import { View, Text, useWindowDimensions, ScrollView } from "react-native";
import { LineChart } from "react-native-gifted-charts";

// ---- Your backend document shape ----
type RawDoc = {
  type: string;
  interval: "minute" | "hour" | "day";
  timestamp: string | { $date: string };
  average?: number;
  averageValue?: number;
  max?: { date?: string; value: number } | any;
  min?: { date?: string; value: number } | any;
  [k: string]: any;
};

// ---- Props for this wrapper ----
type Props = {
  docs?: RawDoc[];
  height?: number;
  unit?: string;
  color?: string;
  areaFill?: {
    start: string;
    end: string;
    startOpacity?: number;
    endOpacity?: number;
  };
};

/** Format labels the way users read them */
function fmtLabel(d: Date, interval: RawDoc["interval"]) {
  if (interval === "minute" || interval === "hour") {
    return d.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }
  return d.toLocaleDateString([], { day: "2-digit", month: "short" });
}

/** Map your docs to Gifted Charts' lineDataItem[] */
function mapDocs(docs: RawDoc[] = [], fallback: RawDoc["interval"] = "minute") {
  const sorted = [...docs].sort(
    (a, b) =>
      new Date(
        typeof a.timestamp === "string"
          ? a.timestamp
          : a.timestamp?.$date ?? a.timestamp
      ).getTime() -
      new Date(
        typeof b.timestamp === "string"
          ? b.timestamp
          : b.timestamp?.$date ?? b.timestamp
      ).getTime()
  );
  const interval = sorted[0]?.interval ?? fallback;

  const items = sorted.map((doc) => {
    const ts =
      typeof doc.timestamp === "string"
        ? doc.timestamp
        : doc.timestamp?.$date ?? String(doc.timestamp);
    const time = new Date(ts);
    const avg = Number(
      doc.averageValue ?? doc.average ?? doc.max?.value ?? doc.min?.value ?? 0
    );
    const maxVal = Number(doc.max?.value ?? avg);
    const minVal = Number(doc.min?.value ?? avg);
    console.log("mapping doc", doc, "to", avg, minVal, maxVal);

    return {
      value: avg,
      barMarginBottom: Math.max(0, maxVal - minVal),
      label: fmtLabel(time, doc.interval ?? interval),
      raw: doc, // keep original doc for tooltip rendering
    };
  });

  return items;
}

// ---- Mock series (60 minutes) ----
const MOCKS: RawDoc[] = Array.from({ length: 60 }).map((_, i) => ({
  type: "temperature",
  interval: "minute",
  timestamp: { $date: new Date(Date.now() + i * 60_000).toISOString() },
  averageValue:
    22 + Math.round(Math.sin(i / 10) * 2) + (Math.random() < 0.25 ? 1 : 0),
}));

export default function TelemetryLineChart({
  docs,
  unit = "°C",
  color = "#e22626",
  areaFill = {
    start: "#ff3e3b",
    end: "#ff00f2",
    startOpacity: 0.2,
    endOpacity: 0.1,
  },
  height = 450,
}: Props) {
  const { width: w1 } = useWindowDimensions();
  const width = w1 - 100;
  const data = useMemo(() => mapDocs(docs), [docs]);
  const offset = 0;
  const pointSpacing = (width - offset) / data.length;
  const chartWidth = Math.max(width, data.length * pointSpacing);
  const spacing = Math.max(1, pointSpacing);
  const initialSpacing = 15;
  return (
    <View style={{ paddingHorizontal: 5 }}>
      {/* <ScrollView
        horizontal
        // allow content to grow to chartWidth but let layout remain flexible
        contentContainerStyle={{ minWidth: chartWidth, flexGrow: 1 }}
        showsHorizontalScrollIndicator={false}
        // enable nested scrolling on Android so parent/child scrolls don't conflict
        nestedScrollEnabled={true}
        // prevent diagonal scrolling and improve gesture handling
        directionalLockEnabled={true}
        // improve scroll responsiveness
        keyboardShouldPersistTaps="handled"
      > */}
      <LineChart
        key={`${data.length}+${width}`}
        height={height}
        directionalLockEnabled={true}
        width={width}
        spacing={spacing}
        onScrollEndDrag={() => {
          /* optional */
        }}
        onScrollBeginDrag={() => {
          /* optional */
        }}
        initialSpacing={offset / 2 + initialSpacing}
        endSpacing={offset / 2}
        data={data}
        color={color}
        thickness={2}
        bounces={true}
        curved
        verticalLinesSpacing={100}
        areaChart
        startFillColor={areaFill.start}
        endFillColor={areaFill.end}
        startOpacity={areaFill.startOpacity ?? 0.1}
        endOpacity={areaFill.endOpacity ?? 0.0}
        yAxisLabelSuffix={` ${unit}`}
        yAxisTextStyle={{
          fontSize: 10,
          color: "#E0E0E0",
          left: -5,
          textOverflow: "unset",
        }}
        xAxisLabelTextStyle={{
          fontSize: Math.min(10, fontSizeNormalization(width)),
          color: "#E0E0E0",
          textAlign: "center",
          transform: [{ rotate: "35deg" }],
          left: initialSpacing / 2,
          top: 10,
        }}
        xAxisLabelsHeight={20}
        showFractionalValues
        yAxisColor={"#E0E0E0"}
        xAxisColor={"#E0E0E0"}
        yAxisThickness={1}
        xAxisThickness={1}
        hideDataPoints={false}
        dataPointsColor={color}
        dataPointsRadius={3}
        dataPointsHeight={6}
        dataPointsWidth={6}
        showStripOnFocus={true}
        stripColor={color}
        stripOpacity={0.3}
        lineGradient={true}
        lineGradientStartColor={areaFill.start}
        lineGradientEndColor={areaFill.end}
        stripWidth={1}
        pointerConfig={{
          pointerStripHeight: height,
          pointerStripColor: color,
          showPointerStrip: false,
          pointerStripWidth: 1,
          pointerColor: color,
          pointerComponent: () => (
            <View
              style={{
                width: 12,
                height: 12,
                borderWidth: 2,
                borderColor: "white",
                backgroundColor: color,
                borderRadius: 6,
                shadowColor: color,
                shadowOffset: { width: 0, height: 0 },
                left: -initialSpacing,
                shadowOpacity: 0.9,
                shadowRadius: 4,
                elevation: 5,
              }}
            />
          ),
          horizontalStripConfig: {
            labelComponent: (value: string) => (
              <View
                style={{
                  height: 30,
                  minWidth: 60,
                  backgroundColor: "rgba(0,0,0,0.8)",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingHorizontal: 8,
                  borderRadius: 6,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 12,
                    textOverflow: "none",
                  }}
                >
                  {value}
                </Text>
              </View>
            ),
          },
          radius: 6,
          pointerLabelWidth: 160,
          pointerLabelHeight: 120,
          activatePointersOnLongPress: false,
          autoAdjustPointerLabelPosition: true,

          pointerLabelComponent: (items: any) => {
            const item = items[0];
            const raw: RawDoc | undefined = item?.raw;
            const ts =
              raw && raw.timestamp
                ? typeof raw.timestamp === "string"
                  ? raw.timestamp
                  : raw.timestamp?.$date ?? String(raw.timestamp)
                : undefined;
            const when = ts
              ? fmtLabel(new Date(ts), raw?.interval ?? "hour")
              : item?.label;
            const avg = (
              raw?.averageValue ??
              raw?.average ??
              item?.value ??
              0
            ).toFixed(2);
            const minV = raw?.min?.value?.toFixed(2) ?? "--";
            const maxV = raw?.max?.value?.toFixed(2) ?? "--";

            return (
              <View
                style={{
                  backgroundColor: "rgba(0,0,0,0.9)",
                  paddingHorizontal: 12,
                  paddingVertical: 10,
                  borderRadius: 6,
                  minWidth: 140,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}
              >
                <Text style={{ color: "#999", fontSize: 12 }}>{when}</Text>
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    fontWeight: "600",
                    marginTop: 4,
                  }}
                >
                  {avg} {unit}
                </Text>
                {raw?.min?.value !== undefined && (
                  <Text style={{ color: "#999", fontSize: 12, marginTop: 6 }}>
                    Range: {minV} - {maxV} {unit}
                  </Text>
                )}
                {Object.keys(raw ?? {}).length > 3 && (
                  <Text style={{ color: "#999", fontSize: 12, marginTop: 6 }}>
                    {/* Show other fields in the raw doc except type, timestamp, interval */}
                    {Object.entries(raw ?? {})
                      .filter(
                        ([k, _]) =>
                          ![
                            "type",
                            "updatedAt",
                            "averageValue",
                            "min",
                            "max",
                            "__v",
                          ].includes(k)
                      )
                      .map(([k, v]) => `${k}: ${v}`)
                      .join(",\n ")}
                  </Text>
                )}
              </View>
            );
          },
        }}
        xAxisLabelTexts={data.map((d) => d.label)}
        focusedDataPointColor={"white"}
        rulesType="solid"
        rulesColor="#E0E0E0"
        rulesThickness={1}
        hideRules={false}
        isAnimated
        delayBeforeUnFocus={500}
        animationDuration={400}
      />
      {/* </ScrollView> */}
    </View>
  );
}

function fontSizeNormalization(width: number) {
  const maxWidth = 1920;
  const minWidth = 300;
  const maxFont = 15;
  const minFont = 8;

  const w = Math.min(Math.max(width, minWidth), maxWidth);
  const ratio = (w - minWidth) / (maxWidth - minWidth);
  return minFont + (maxFont - minFont) * ratio;
}
