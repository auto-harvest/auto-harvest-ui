// ...existing code...
import React, { useMemo } from "react";
import { View, Text, useWindowDimensions } from "react-native";
import { BarChart, LineChart } from "react-native-gifted-charts";

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
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
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
  height = 540,
  unit = "°C",
  color = "#55B2F8",
  areaFill = {
    start: "#55B2F8",
    end: "#55B2F8",
    startOpacity: 0.22,
    endOpacity: 0.02,
  },
}: Props) {
  const { width } = useWindowDimensions();
  const data = useMemo(() => mapDocs(docs), [docs]);

  const spacing = 35;
  const initialSpacing = 10;
  const endSpacing = 400;

  const contentWidth = Math.max(
    width,
    initialSpacing + data.length * spacing + endSpacing
  );
  return (
    <View>
      <BarChart
        height={height}
        width={contentWidth}
        spacing={spacing}
        initialSpacing={initialSpacing}
        endSpacing={endSpacing}
        showScrollIndicator
        scrollToEnd
        overScrollMode="always"
        bounces={true}
        barMarginBottom={20}
        data={data}
        color={color}
        noOfSections={30}
        
        yAxisLabelSuffix={unit}
        yAxisTextStyle={{ fontSize: 10, color: "#fff" }}
        xAxisLabelTextStyle={{ fontSize: 10, color: "#fff" }}
        xAxisLabelsHeight={24}
        showFractionalValues={false}
        yAxisColor={"#fff"}
        xAxisColor={"#fff"}
        isThreeD
        showGradient
        gradientColor={"#fc84ff"}
        frontColor={"transparent"}
        sideColor={"#ff00d0"}
        topColor={"#ff66f4"}
        barStyle={{
          borderWidth: 4,
          borderColor: "#fc84ff",
          shadowColor: "#fc84ff",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 1,
          shadowRadius: 8,
          elevation: 10,
        }}
        autoCenterTooltip
        hideRules
        barWidth={15}
        isAnimated
        renderTooltip={(item /* lineDataItem */, _index: number) => {
          const raw: RawDoc | undefined = (item as any)?.raw;
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
          const minV = raw?.min?.value ?? "--";
          const maxV = raw?.max?.value ?? "--";
          const datapoints = raw?.datapoints as number;
          return (
            <View
              style={{
                position: "absolute",

                backgroundColor: "rgba(0,0,0,0.85)",
                paddingHorizontal: 10,
                paddingVertical: 8,
                borderRadius: 8,
                minWidth: 120,
              }}
            >
              <Text style={{ color: "white", fontSize: 12 }}>{when}</Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 13,
                  fontWeight: "700",
                  marginTop: 4,
                }}
              >
                {avg} {unit}
              </Text>
              <Text style={{ color: "#ddd", fontSize: 12, marginTop: 6 }}>
                min: {minV} {unit}
              </Text>
              <Text style={{ color: "#ddd", fontSize: 12 }}>
                max: {maxV} {unit}
              </Text>
              <Text style={{ color: "#ddd", fontSize: 12 }}>
                data points: {datapoints ?? "--"}
              </Text>
            </View>
          );
        }}
        indicatorColor="white"
      />
    </View>
  );
}
// ...existing code...
