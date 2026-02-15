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

  // Compute how many decimals the Y-axis labels need
  const yDecimals = useMemo(() => {
    const vals = data.map((d) => d.value).filter(isFinite);
    if (vals.length === 0) return 0;
    const range = Math.max(...vals) - Math.min(...vals) || 1;
    // If the full range is < 1, show 1 decimal; if < 0.1, show 2; otherwise 0
    if (range < 0.1) return 2;
    if (range < 1) return 1;
    return 0;
  }, [data]);

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
        disableScroll
        width={width}
        spacing={spacing}
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
        noOfSections={5}
        formatYLabel={(val: string) => Number(val).toFixed(yDecimals)}
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
          pointerLabelWidth: 180,
          pointerLabelHeight: 200,
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
            const median = raw?.median != null ? Number(raw.median).toFixed(2) : null;
            const variance = raw?.variance != null ? Number(raw.variance).toFixed(4) : null;
            const datapoints = raw?.datapoints != null ? String(raw.datapoints) : null;

            const hiddenKeys = new Set([
              "type", "updatedAt", "averageValue", "average",
              "min", "max", "__v", "median", "variance", "datapoints",
              "timestamp",
            ]);
            const extraFields = Object.entries(raw ?? {})
              .filter(([k]) => !hiddenKeys.has(k))
              .map(([k, v]) => {
                const label = k.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
                let display = typeof v === "number" ? v.toFixed(2) : String(v ?? "--");
                if (display.length > 14) display = display.slice(0, 14) + "\u2026";
                return { label, display };
              });

            const statRow = (label: string, value: string) => (
              <View
                key={label}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 2,
                }}
              >
                <Text style={{ color: "#999", fontSize: 10, userSelect: "none" } as any}>
                  {label}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    color: "#ccc",
                    fontSize: 10,
                    fontWeight: "500",
                    marginLeft: 8,
                    flexShrink: 1,
                    userSelect: "none",
                  } as any}
                >
                  {value}
                </Text>
              </View>
            );

            return (
              <View
                pointerEvents="none"
                style={{
                  backgroundColor: "rgba(20,20,20,0.95)",
                  paddingHorizontal: 10,
                  paddingVertical: 8,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: "rgba(255,255,255,0.1)",
                  width: 180,
                  userSelect: "none",
                } as any}
              >
                <Text style={{ color: "#888", fontSize: 10, userSelect: "none" } as any}>
                  {when}
                </Text>
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    fontWeight: "700",
                    marginTop: 2,
                    userSelect: "none",
                  } as any}
                >
                  {avg} {unit}
                </Text>
                {raw?.min?.value !== undefined && (
                  <Text style={{ color: "#aaa", fontSize: 10, marginTop: 3, userSelect: "none" } as any}>
                    {minV} ~ {maxV} {unit}
                  </Text>
                )}
                {(median || variance || datapoints || extraFields.length > 0) && (
                  <View
                    style={{
                      borderTopWidth: 1,
                      borderTopColor: "rgba(255,255,255,0.1)",
                      marginTop: 4,
                      paddingTop: 4,
                    }}
                  >
                    {median && statRow("Median", `${median}`)}
                    {variance && statRow("Variance", variance)}
                    {datapoints && statRow("Samples", datapoints)}
                    {extraFields.map(({ label, display }) =>
                      statRow(label, display)
                    )}
                  </View>
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
