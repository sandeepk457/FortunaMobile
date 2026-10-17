import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { type ReactNode, useEffect, useState } from "react";
import {
  Animated,
  Easing,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import AnimatedEntrance from "@/components/ui/AnimatedEntrance";
import HoverCard from "@/components/ui/HoverCard";

type IconName = keyof typeof Ionicons.glyphMap;

export interface MetricItem {
  label: string;
  value: string;
  icon: IconName;
}

export interface StageItem {
  label: string;
  status: "done" | "active" | "next" | "blocked";
}

export interface ActionItem {
  label: string;
  icon: IconName;
  route?: string;
  tone?: "primary" | "blue" | "success" | "warning";
  onPress?: () => void;
}

interface ExecutionScaffoldProps {
  title: string;
  subtitle: string;
  eyebrow?: string;
  icon: IconName;
  accent?: string;
  secondaryAccent?: string;
  metrics?: MetricItem[];
  stages?: StageItem[];
  actions?: ActionItem[];
  alerts?: string[];
  children?: ReactNode;
}

const BRAND_RED = "#C8102E";
const BRAND_BLUE = "#005F99";
const INK = "#172033";
const MUTED = "#687B8E";

export default function ExecutionScaffold({
  title,
  subtitle,
  eyebrow = "FORTUNA SIMS",
  icon,
  accent = BRAND_RED,
  secondaryAccent = BRAND_BLUE,
  metrics = [],
  stages = [],
  actions = [],
  alerts = [],
  children,
}: ExecutionScaffoldProps) {
  const router = useRouter();
  const [pulse] = useState(() => new Animated.Value(0));
  const [sweep] = useState(() => new Animated.Value(0));

  useEffect(() => {
    const animation = Animated.parallel([
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, {
            toValue: 1,
            duration: 1500,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(pulse, {
            toValue: 0,
            duration: 1500,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
        ]),
      ),
      Animated.loop(
        Animated.timing(sweep, {
          toValue: 1,
          duration: 3600,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ),
    ]);

    animation.start();
    return () => animation.stop();
  }, [pulse, sweep]);

  const openAction = (action: ActionItem) => {
    if (action.onPress) {
      action.onPress();
      return;
    }

    if (action.route) {
      router.push(action.route as never);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <LinearGradient
          colors={[accent, secondaryAccent]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <Animated.View
            pointerEvents="none"
            style={[
              styles.heroSweep,
              {
                transform: [
                  {
                    translateX: sweep.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-180, 360],
                    }),
                  },
                ],
              },
            ]}
          />
          <View style={styles.heroTop}>
            <TouchableOpacity style={styles.navButton} onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={23} color="#FFFFFF" />
            </TouchableOpacity>
            <View style={styles.heroIcon}>
              <Ionicons name={icon} size={24} color="#FFFFFF" />
            </View>
          </View>
          <Text style={styles.eyebrow}>{eyebrow}</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
          <View style={styles.statusPill}>
            <Animated.View
              style={[
                styles.statusHalo,
                {
                  transform: [
                    {
                      scale: pulse.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 1.22],
                      }),
                    },
                  ],
                  opacity: pulse.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.46, 0.14],
                  }),
                },
              ]}
            />
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Warehouse HYD-01</Text>
          </View>
        </LinearGradient>

        {metrics.length > 0 && (
          <View style={styles.metricGrid}>
            {metrics.map((metric, index) => (
              <AnimatedEntrance
                key={metric.label}
                delay={90 + index * 55}
                style={styles.metricWrap}
              >
                <HoverCard>
                  <View style={styles.metricCard}>
                    <View style={[styles.metricIcon, { backgroundColor: `${accent}14` }]}>
                      <Ionicons name={metric.icon} size={19} color={accent} />
                    </View>
                    <Text style={styles.metricValue}>{metric.value}</Text>
                    <Text style={styles.metricLabel}>{metric.label}</Text>
                  </View>
                </HoverCard>
              </AnimatedEntrance>
            ))}
          </View>
        )}

        {stages.length > 0 && (
          <AnimatedEntrance delay={170} style={styles.section}>
            <Text style={styles.sectionTitle}>Execution flow</Text>
            <HoverCard>
              <View style={styles.flowCard}>
                {stages.map((stage, index) => (
                  <View key={stage.label} style={styles.stageRow}>
                    <View
                      style={[
                        styles.stageNode,
                        stage.status === "done" && styles.stageDone,
                        stage.status === "active" && { backgroundColor: accent },
                        stage.status === "blocked" && styles.stageBlocked,
                      ]}
                    >
                      <Ionicons
                        name={
                          stage.status === "done"
                            ? "checkmark"
                            : stage.status === "blocked"
                              ? "alert"
                              : "ellipse"
                        }
                        size={stage.status === "active" ? 8 : 14}
                        color="#FFFFFF"
                      />
                    </View>
                    <Text
                      style={[
                        styles.stageLabel,
                        stage.status === "active" && { color: accent, fontWeight: "900" },
                      ]}
                    >
                      {stage.label}
                    </Text>
                    {index < stages.length - 1 && <View style={styles.stageLine} />}
                  </View>
                ))}
              </View>
            </HoverCard>
          </AnimatedEntrance>
        )}

        {children ? (
          <AnimatedEntrance delay={230} style={styles.section}>
            {children}
          </AnimatedEntrance>
        ) : null}

        {alerts.length > 0 && (
          <AnimatedEntrance delay={280} style={styles.section}>
            <Text style={styles.sectionTitle}>Controls</Text>
            {alerts.map((alert) => (
              <View key={alert} style={styles.alertCard}>
                <Ionicons name="shield-checkmark-outline" size={18} color={BRAND_BLUE} />
                <Text style={styles.alertText}>{alert}</Text>
              </View>
            ))}
          </AnimatedEntrance>
        )}

        {actions.length > 0 && (
          <AnimatedEntrance delay={330} style={styles.section}>
            <Text style={styles.sectionTitle}>Actions</Text>
            {actions.map((action) => (
              <HoverCard key={action.label}>
                <TouchableOpacity
                  activeOpacity={0.84}
                  style={styles.actionCard}
                  onPress={() => openAction(action)}
                >
                  <View
                    style={[
                      styles.actionIcon,
                      {
                        backgroundColor:
                          action.tone === "success"
                            ? "#EAF8EF"
                            : action.tone === "warning"
                              ? "#FFF7E6"
                              : action.tone === "blue"
                                ? "#EAF3F9"
                                : "#FCE8EC",
                      },
                    ]}
                  >
                    <Ionicons
                      name={action.icon}
                      size={20}
                      color={
                        action.tone === "success"
                          ? "#16A34A"
                          : action.tone === "warning"
                            ? "#B7791F"
                            : action.tone === "blue"
                              ? BRAND_BLUE
                              : BRAND_RED
                      }
                    />
                  </View>
                  <Text style={styles.actionLabel}>{action.label}</Text>
                  <Ionicons name="chevron-forward" size={19} color="#8293A4" />
                </TouchableOpacity>
              </HoverCard>
            ))}
          </AnimatedEntrance>
        )}
      </ScrollView>
    </View>
  );
}

export function DataCard({
  title,
  rows,
  accent = BRAND_BLUE,
}: {
  title: string;
  rows: Array<{ label: string; value: string; tone?: string }>;
  accent?: string;
}) {
  return (
    <HoverCard>
      <View style={styles.dataCard}>
        <Text style={[styles.dataTitle, { color: accent }]}>{title}</Text>
        {rows.map((row) => (
          <View key={row.label} style={styles.dataRow}>
            <Text style={styles.dataLabel}>{row.label}</Text>
            <Text style={[styles.dataValue, row.tone ? { color: row.tone } : null]}>
              {row.value}
            </Text>
          </View>
        ))}
      </View>
    </HoverCard>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EEF5FA" },
  content: { paddingBottom: 36 },
  hero: {
    minHeight: 270,
    paddingTop: 52,
    paddingHorizontal: 22,
    paddingBottom: 24,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
    shadowColor: BRAND_BLUE,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 18,
    elevation: 8,
  },
  heroSweep: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 92,
    backgroundColor: "rgba(255,255,255,0.16)",
    transform: [{ rotate: "18deg" }],
  },
  heroTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  navButton: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.16)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.22)",
    alignItems: "center",
    justifyContent: "center",
  },
  heroIcon: {
    width: 52,
    height: 52,
    borderRadius: 17,
    backgroundColor: "rgba(255,255,255,0.18)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  eyebrow: {
    marginTop: 24,
    color: "rgba(255,255,255,0.76)",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.6,
  },
  title: { marginTop: 6, color: "#FFFFFF", fontSize: 31, fontWeight: "900" },
  subtitle: {
    marginTop: 9,
    color: "rgba(255,255,255,0.84)",
    fontSize: 14,
    lineHeight: 21,
    maxWidth: 330,
  },
  statusPill: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 18,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 99,
    backgroundColor: "rgba(255,255,255,0.16)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.22)",
  },
  statusHalo: {
    position: "absolute",
    left: 10,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#FFFFFF",
  },
  statusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#FFFFFF" },
  statusText: { color: "#FFFFFF", fontSize: 12, fontWeight: "800" },
  metricGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: -34,
    paddingHorizontal: 18,
  },
  metricWrap: { width: "48%" },
  metricCard: {
    minHeight: 128,
    padding: 15,
    borderRadius: 21,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DDE9F1",
    shadowColor: BRAND_BLUE,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.09,
    shadowRadius: 14,
    elevation: 4,
  },
  metricIcon: {
    width: 38,
    height: 38,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  metricValue: { marginTop: 14, color: INK, fontSize: 29, fontWeight: "900" },
  metricLabel: { marginTop: 4, color: MUTED, fontSize: 12, fontWeight: "700" },
  section: { marginHorizontal: 18, marginTop: 24 },
  sectionTitle: { color: INK, fontSize: 19, fontWeight: "900", marginBottom: 12 },
  flowCard: {
    padding: 16,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0EAF2",
    shadowColor: BRAND_BLUE,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 3,
  },
  stageRow: { flexDirection: "row", alignItems: "center", minHeight: 38 },
  stageNode: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#C9D5E0",
    alignItems: "center",
    justifyContent: "center",
  },
  stageDone: { backgroundColor: "#16A34A" },
  stageBlocked: { backgroundColor: "#F59E0B" },
  stageLabel: { flex: 1, marginLeft: 12, color: "#465A6E", fontSize: 13, fontWeight: "700" },
  stageLine: { position: "absolute", left: 11, top: 29, width: 2, height: 22, backgroundColor: "#E3EBF2" },
  alertCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 13,
    marginBottom: 9,
    borderRadius: 17,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0EAF2",
  },
  alertText: { flex: 1, color: "#4B6074", fontSize: 12, lineHeight: 17, fontWeight: "700" },
  actionCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    marginBottom: 10,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0EAF2",
    shadowColor: BRAND_BLUE,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  actionIcon: { width: 42, height: 42, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  actionLabel: { flex: 1, color: INK, fontSize: 14, fontWeight: "800" },
  dataCard: {
    padding: 16,
    borderRadius: 21,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0EAF2",
    shadowColor: BRAND_BLUE,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 3,
  },
  dataTitle: { fontSize: 17, fontWeight: "900", marginBottom: 12 },
  dataRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#EEF3F7",
  },
  dataLabel: { color: MUTED, fontSize: 12, fontWeight: "700" },
  dataValue: { flex: 1, color: INK, fontSize: 13, fontWeight: "900", textAlign: "right" },
});
