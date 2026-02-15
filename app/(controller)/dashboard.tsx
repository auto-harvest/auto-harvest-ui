import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Card,
  Title,
  Paragraph,
  Switch,
  Text,
  Button,
  ActivityIndicator,
} from "react-native-paper";
import { useThemeColor } from "../../hooks/useThemeColor";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import { useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/store/overrides";
import { emitSocketEvent } from "@/store/actions/socketActions";
import { useIsGuest } from "@/hooks/useIsGuest";

export default function HydroponicsDashboard() {
  const router = useRouter();
  const sensorData = useAppSelector((state) => state.sensorInfo.data);
  const pumpValue = useAppSelector((state) => !!state.sensorInfo.data["water-pump"]?.value);
  const airPumpValue = useAppSelector((state) => !!state.sensorInfo.data["air-pump"]?.value);
  const fanValue = useAppSelector((state) => !!state.sensorInfo.data["fan"]?.value);

  // Local overrides during the optimistic window after a user toggle
  const [overrides, setOverrides] = useState<Record<string, boolean>>({});
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const isPumpOn = "pump" in overrides ? overrides["pump"] : pumpValue;
  const isAirPumpOn = "air-pump" in overrides ? overrides["air-pump"] : airPumpValue;
  const isFanOn = "fan" in overrides ? overrides["fan"] : fanValue;

  const { theme } = useThemeColor();
  const dispatch = useAppDispatch();
  const isGuest = useIsGuest();
  const handle = (code: "pump" | "air-pump" | "fan") => (value: any) => {
    {
      if (isGuest) return;
      setOverrides((prev) => ({ ...prev, [code]: value }));
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setOverrides({}), 4000);
      dispatch(emitSocketEvent(code, `${code}-${value ? "on" : "off"}`));
    }
  };

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
    code: string;
  }

  const handleMetricPress = (code: string): void => {
    router.push(`/metric/${code.toLowerCase()}`);
    if (Platform.OS === "web") {
    } else {
     // router.push("/availabilityErrorAndroid");
    }
  };
  // --- replace your VpdCard() with this (adds RH bands, single card) ---
  function VpdCard() {
    const vpd = sensorData["vpd"]?.value;
    if (vpd == null || !isFinite(vpd)) {
      return renderMetricCard({
        title: "VPD",
        value: "—",
        desc: "Need air temperature and RH to compute VPD.",
        code: "vpd",
      });
    }

    type Stage = "Seedling" | "Leafy" | "Fruiting";
    type Level = "low" | "ok" | "high";
    const TARGETS: Record<Stage, [number, number]> = {
      Seedling: [0.4, 0.8],
      Leafy: [0.6, 1.0],
      Fruiting: [0.8, 1.2],
    };

    const icon = (lvl: Level) =>
      lvl === "ok" ? "✅" : lvl === "low" ? "💧" : "🔥";

    const rows = (Object.keys(TARGETS) as Stage[]).map((stage) => {
      const [lo, hi] = TARGETS[stage];
      const level: Level = vpd < lo ? "low" : vpd > hi ? "high" : "ok";
      const label =
        level === "ok" ? "Good" : level === "low" ? "Too humid" : "Too dry";
      return `${icon(level)} ${stage}: ${label} (target ${lo}–${hi} kPa)`;
    });

    // RH bands for current temp (leaf ≈ air − 1°C if no leaf temp sensor)
    const Tair = sensorData["temperature"]?.value;
    const RH = sensorData["humidity"]?.value;
    const leaf =
      sensorData["leaf-temperature"]?.value ?? (Tair != null ? Tair - 1 : NaN);
    const bands =
      Tair != null && RH != null && isFinite(Tair)
        ? (() => {
            const [sL, sH] = rhBandForVpd(Tair, leaf, 0.4, 0.8);
            const [lL, lH] = rhBandForVpd(Tair, leaf, 0.6, 1.0);
            const [fL, fH] = rhBandForVpd(Tair, leaf, 0.8, 1.2);
            return (
              `\nRH bands @ ${Tair.toFixed(1)}°C: Seedling ${sL.toFixed(
                1
              )}–${sH.toFixed(1)}%, ` +
              `Leafy ${lL.toFixed(1)}–${lH.toFixed(1)}%, Fruiting ${fL.toFixed(
                1
              )}–${fH.toFixed(1)}%`
            );
          })()
        : "";

    return renderMetricCard({
      title: "VPD",
      value: `${vpd.toFixed(2)} kPa`,
      desc: rows.join("\n") + bands,
      code: "vpd",
    });
  }
  // --- new card: Dew Point + Infection Risk ---
  function DewPointCard() {
    const Tair = sensorData["temperature"]?.value;
    const RH = sensorData["humidity"]?.value;

    if (Tair == null || RH == null || !isFinite(Tair) || !isFinite(RH)) {
      return renderMetricCard({
        title: "Dew Point",
        value: "—",
        desc: "Need air temperature and RH.",
        code: "dew point",
      });
    }

    const { Td, spread, level, hint } = infectionRiskFromSpread(Tair, RH);

    return renderMetricCard({
      title: "Dew Point",
      value: `${Td.toFixed(1)}°C`,
      desc: `Δ ${spread.toFixed(
        1
      )}°C from air • Infection risk: ${level}\n${hint}`,
      code: "dew point",
    });
  }

  // --- new card: Absolute Humidity ---
  function AbsoluteHumidityCard() {
    const Tair = sensorData["temperature"]?.value;
    const RH = sensorData["humidity"]?.value;
    if (Tair == null || RH == null || !isFinite(Tair) || !isFinite(RH)) {
      return renderMetricCard({
        title: "Absolute Humidity",
        value: "—",
        desc: "Need air temperature and RH.",
        code: "absolute humidity",
      });
    }
    const AH = absoluteHumidity_gm3(Tair, RH);
    return renderMetricCard({
      title: "Absolute Humidity",
      value: `${AH.toFixed(1)} g/m³`,
      desc: `from ${Tair.toFixed(1)}°C & ${RH.toFixed(0)}% RH`,
      code: "absolute humidity",
    });
  }
  function FlowCard() {
    // Try common keys; adjust to your actual sensor key if different
    const flowLmin =
      sensorData["liters-per-minute"]?.value ??
      sensorData["flow"]?.value ??
      sensorData["water-flow"]?.value;

    if (flowLmin == null || !isFinite(flowLmin)) {
      return renderMetricCard({
        title: "Flow Rate",
        value: "—",
        desc: "No flow data available",
        code: "flow rate",
      });
    }

    const lph = flowLmin * 60;
    return renderMetricCard({
      title: "Flow Rate",
      value: `${flowLmin.toFixed(2)} L/min`,
      desc: `≈ ${lph.toFixed(0)} L/h`,
      code: "flow rate",
    });
  }
  const renderMetricCard = ({ title, value, desc, code }: MetricCardProps) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.cardTitle}>{title}</Title>
        <Paragraph style={styles.cardValue}>{value}</Paragraph>
        <Paragraph style={styles.cardDesc}>{desc}</Paragraph>

        {![
          "water level",
          "flow rate",
          "vpd",
          "absolute humidity",
          "dew point",
        ].includes(title.toLocaleLowerCase()) && (
          <Button
            onPress={() => handleMetricPress(code)}
            textColor={theme.secondary}
          >
            Show Graph
          </Button>
        )}
      </Card.Content>
    </Card>
  );
  if (sensorData.initial) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.background,
        }}
      >
        <ActivityIndicator
          animating={true}
          size="large"
          color={theme.primary}
        />
      </SafeAreaView>
    );
  } else
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
              value: `${(sensorData["temperature"]?.value || 0).toFixed(2)}°C`,
              desc: "Optimal range: 18-28°C",
              code: "temperature",
            })}
            {DewPointCard()}
            {renderMetricCard({
              title: "Relative Humidity",
              value: `${(sensorData["humidity"]?.value || 0).toFixed(2)}%`,
              desc: "Optimal range: 45-75%",
              code: "humidity",
            })}
            {AbsoluteHumidityCard()}
            {VpdCard()}

            {(() => {
              const tw = sensorData["water-temperature"]?.value || 0;
              return renderMetricCard({
                title: "Water Temperature",
                value: `${tw.toFixed(2)}°C`,
                desc: `Optimal range: 18–25°C — ${waterTempStatus(tw)}`,
                code: "water-temperature",
              });
            })()}
            {renderMetricCard({
              title: "pH Level",
              value: `${(sensorData["ph"]?.value || 0).toFixed(2)}`,
              desc: "Optimal range: 5-6",
              code: "ph",
            })}
            {(() => {
              const tds500 = sensorData["tds"]?.value ?? 0; // ppm (500 scale) from your sensor
              const ec = tds500 / 500; // mS/cm
              const cf = ec * 10;
              const tds700 = Math.round(ec * 700);
              return renderMetricCard({
                title: "EC",
                value: `${ec.toFixed(2)} mS/cm`,
                desc: `CF ${cf.toFixed(2)} | TDS ~${Math.round(
                  tds500
                )} ppm (500) / ~${tds700} ppm (700)`,
                code: "tds",
              });
            })()}
            {renderMetricCard({
              title: "Water Level",
              value: `${
                sensorData["water-level"]?.value === 0
                  ? "Adequate"
                  : sensorData["water-level"]?.value === -1
                  ? "Low"
                  : sensorData["water-level"]?.value === 1
                  ? "Full"
                  : "Unknown"
              }`,
              desc: "Water Level could be Adequate, Low, Full",
              code: "water level",
            })}
            {FlowCard()}
          </View>

          {/* //? Controls */}
          {isGuest && (
            <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
              <Text style={{ color: theme.secondary, fontStyle: "italic" }}>
                Demo mode — controls are view-only
              </Text>
            </View>
          )}
          <View style={styles.controlsContainer}>
            <Card style={styles.controlCard}>
              <Card.Content>
                <Title style={{ color: theme.text }}>Pump Control</Title>
                <View style={styles.switchContainer}>
                  <Text style={styles.switchText}>Off</Text>
                  <Switch
                    value={isPumpOn}
                    onValueChange={() => handle("pump")(!isPumpOn)}
                    color={theme.primary}
                    disabled={isGuest}
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
                    onValueChange={() => handle("air-pump")(!isAirPumpOn)}
                    color={theme.primary}
                    disabled={isGuest}
                  />
                  <Text style={styles.switchText}>On</Text>
                </View>
              </Card.Content>
            </Card>
            {/* <Card style={styles.controlCard}>
              <Card.Content>
                <Title style={{ color: theme.text }}>Fan Control</Title>
                <View style={styles.switchContainer}>
                  <Text style={styles.switchText}>Off</Text>
                  <Switch
                    value={isFanOn}
                    onValueChange={() => handle("fan")(!isFanOn)}
                    color={theme.primary}
                  />
                  <Text style={styles.switchText}>On</Text>
                </View>
              </Card.Content>
            </Card> */}
          </View>
        </ScrollView>
        <Navbar activeNav="dashboard" />
      </SafeAreaView>
    );
}
// --- helpers (put near the top of the file, once) ---
const es = (Tc: number) => 0.6108 * Math.exp((17.27 * Tc) / (Tc + 237.3)); // kPa

// RH band needed to hit a VPD range at current temps
const rhBandForVpd = (Tair: number, leaf: number, lo: number, hi: number) => {
  const clamp = (x: number) => Math.min(100, Math.max(0, x));
  const Ea = es(Tair),
    El = es(leaf);
  const RHlow = clamp((100 * (El - hi)) / Ea); // lower RH = higher VPD
  const RHhigh = clamp((100 * (El - lo)) / Ea); // upper RH = lower VPD
  return [RHlow, RHhigh] as const;
};

// Absolute humidity (g/m³)
const absoluteHumidity_gm3 = (T: number, RH: number) =>
  (2167 * (RH / 100) * es(T)) / (T + 273.15);

// Root health risk text from water temperature
const waterTempStatus = (Tw: number) =>
  Tw < 18
    ? "Too cold (uptake slows)"
    : Tw <= 21
    ? "Ideal"
    : Tw <= 23
    ? "Okay (watch roots)"
    : Tw <= 25
    ? "High risk (pythium)"
    : "Very high risk";
// --- add helpers (near your other helpers) ---
const dewPointC = (T: number, RH: number) => {
  const a = 17.27,
    b = 237.7;
  const alpha = (a * T) / (b + T) + Math.log(Math.max(1e-6, RH / 100));
  return (b * alpha) / (a - alpha);
};

const infectionRiskFromSpread = (Tair: number, RH: number) => {
  const Td = dewPointC(Tair, RH);
  const spread = Tair - Td; // °C above dew point
  let level: "Low" | "Moderate" | "High" | "Very High";
  let hint: string;

  if (RH >= 90 || spread <= 1.5) {
    level = "Very High";
    hint = "Condensation likely; mildew/botrytis risk";
  } else if (RH >= 80 || spread <= 3) {
    level = "High";
    hint = "Leaves may stay wet; improve airflow/defog";
  } else if (RH >= 70 || spread <= 5) {
    level = "Moderate";
    hint = "Watch nighttime humidity";
  } else {
    level = "Low";
    hint = "Good separation from dew point";
  }
  return { Td, spread, level, hint };
};
