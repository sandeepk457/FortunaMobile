import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
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

export interface ModuleMetric {
  label: string;
  value: string;
  icon: IconName;
  tone?: "red" | "blue" | "green" | "amber";
}

export interface ModuleStep {
  label: string;
  detail: string;
  status: "done" | "active" | "next" | "blocked";
}

export interface ModuleTask {
  id: string;
  title: string;
  subtitle: string;
  status: string;
  priority?: "High" | "Medium" | "Low";
  route?: string;
  icon?: IconName;
}

export interface ModuleControl {
  label: string;
  value: string;
  icon: IconName;
  tone?: "red" | "blue" | "green" | "amber";
}

export interface ModuleAction {
  label: string;
  caption: string;
  icon: IconName;
  route?: string;
  tone?: "red" | "blue" | "green" | "amber";
}

interface ModuleScreenProps {
  title: string;
  subtitle: string;
  eyebrow?: string;
  icon: IconName;
  accent?: string;
  secondaryAccent?: string;
  metrics: ModuleMetric[];
  steps: ModuleStep[];
  tasks: ModuleTask[];
  controls?: ModuleControl[];
  actions?: ModuleAction[];
  primaryRoute?: string;
  primaryLabel?: string;
  scannerLabel?: string;
  overlapMetrics?: boolean;
}

const BRAND_RED = "#C8102E";
const BRAND_BLUE = "#005F99";
const INK = "#172033";
const MUTED = "#697B8D";

const toneColors = {
  red: BRAND_RED,
  blue: BRAND_BLUE,
  green: "#16A34A",
  amber: "#B7791F",
};

function colorForTone(tone: ModuleMetric["tone"] = "blue") {
  return toneColors[tone];
}

export default function ModuleScreen({
  title,
  subtitle,
  eyebrow = "FORTUNA SIMS",
  icon,
  accent = BRAND_RED,
  secondaryAccent = BRAND_BLUE,
  metrics,
  steps,
  tasks,
  controls = [],
  actions = [],
  primaryRoute,
  primaryLabel = "Start execution",
  scannerLabel = "Scan validated task identity",
  overlapMetrics = true,
}: ModuleScreenProps) {
  const router = useRouter();
  const [pulse] = useState(() => new Animated.Value(0));
  const [sweep] = useState(() => new Animated.Value(0));
  const activeStep = useMemo(
    () => steps.find((step) => step.status === "active") ?? steps[0],
    [steps],
  );

  useEffect(() => {
    const animation = Animated.parallel([
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, {
            toValue: 1,
            duration: 1400,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(pulse, {
            toValue: 0,
            duration: 1400,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
        ]),
      ),
      Animated.loop(
        Animated.timing(sweep, {
          toValue: 1,
          duration: 3200,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ),
    ]);

    animation.start();
    return () => animation.stop();
  }, [pulse, sweep]);

  const openRoute = (route?: string) => {
    if (route) {
      router.push(route as never);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
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
                      outputRange: [-160, 380],
                    }),
                  },
                ],
              },
            ]}
          />
          <View style={styles.heroTop}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={23} color="#FFFFFF" />
            </TouchableOpacity>
            <View style={styles.heroIcon}>
              <Ionicons name={icon} size={25} color="#FFFFFF" />
            </View>
          </View>
          <Text style={styles.eyebrow}>{eyebrow}</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
          <View style={styles.heroFooter}>
            <View style={styles.contextPill}>
              <Animated.View
                style={[
                  styles.pulseHalo,
                  {
                    opacity: pulse.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.35, 0.08],
                    }),
                    transform: [
                      {
                        scale: pulse.interpolate({
                          inputRange: [0, 1],
                          outputRange: [1, 1.32],
                        }),
                      },
                    ],
                  },
                ]}
              />
              <View style={styles.pillDot} />
              <Text style={styles.pillText}>HYD-01 · Shift A</Text>
            </View>
            <Text style={styles.activeText}>{activeStep?.label}</Text>
          </View>
        </LinearGradient>

        <View style={[styles.metricGrid, !overlapMetrics && styles.metricGridBelowHero]}>
          {metrics.map((metric, index) => {
            const color = colorForTone(metric.tone);
            return (
              <AnimatedEntrance key={metric.label} delay={80 + index * 55} style={styles.metricWrap}>
                <HoverCard>
                  <View style={styles.metricCard}>
                    <View style={[styles.metricIcon, { backgroundColor: `${color}14` }]}>
                      <Ionicons name={metric.icon} size={18} color={color} />
                    </View>
                    <Text style={styles.metricValue}>{metric.value}</Text>
                    <Text style={styles.metricLabel}>{metric.label}</Text>
                  </View>
                </HoverCard>
              </AnimatedEntrance>
            );
          })}
        </View>

        <AnimatedEntrance delay={190} style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Execution Flow</Text>
              <Text style={styles.sectionSub}>Server validation remains authoritative</Text>
            </View>
            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>LIVE</Text>
            </View>
          </View>
          <HoverCard>
            <View style={styles.flowCard}>
              {steps.map((step, index) => (
                <View key={step.label} style={styles.stepRow}>
                  <View
                    style={[
                      styles.stepNode,
                      step.status === "done" && styles.stepDone,
                      step.status === "active" && { backgroundColor: accent },
                      step.status === "blocked" && styles.stepBlocked,
                    ]}
                  >
                    <Ionicons
                      name={
                        step.status === "done"
                          ? "checkmark"
                          : step.status === "blocked"
                            ? "alert"
                            : "ellipse"
                      }
                      size={step.status === "next" ? 8 : 14}
                      color="#FFFFFF"
                    />
                  </View>
                  <View style={styles.stepCopy}>
                    <Text style={[styles.stepLabel, step.status === "active" && { color: accent }]}>
                      {step.label}
                    </Text>
                    <Text style={styles.stepDetail}>{step.detail}</Text>
                  </View>
                  {index < steps.length - 1 && <View style={styles.stepLine} />}
                </View>
              ))}
            </View>
          </HoverCard>
        </AnimatedEntrance>

        <AnimatedEntrance delay={250} style={styles.section}>
          <Text style={styles.sectionTitle}>Assigned Work</Text>
          {tasks.map((task, index) => (
            <AnimatedEntrance key={task.id} delay={300 + index * 60}>
              <HoverCard>
                <TouchableOpacity
                  activeOpacity={0.84}
                  style={styles.taskCard}
                  onPress={() => openRoute(task.route)}
                >
                  <LinearGradient colors={[accent, secondaryAccent]} style={styles.taskIcon}>
                    <Ionicons name={task.icon ?? "cube-outline"} size={21} color="#FFFFFF" />
                  </LinearGradient>
                  <View style={styles.taskCopy}>
                    <View style={styles.taskTopRow}>
                      <Text style={styles.taskTitle}>{task.title}</Text>
                      {task.priority ? (
                        <View style={styles.priorityPill}>
                          <Text style={styles.priorityText}>{task.priority}</Text>
                        </View>
                      ) : null}
                    </View>
                    <Text style={styles.taskSubtitle}>{task.subtitle}</Text>
                    <Text style={styles.taskStatus}>{task.status}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={19} color="#7D8FA0" />
                </TouchableOpacity>
              </HoverCard>
            </AnimatedEntrance>
          ))}
        </AnimatedEntrance>

        {controls.length > 0 && (
          <AnimatedEntrance delay={420} style={styles.section}>
            <Text style={styles.sectionTitle}>Validation Controls</Text>
            <View style={styles.controlGrid}>
              {controls.map((control) => {
                const color = colorForTone(control.tone);
                return (
                  <View key={control.label} style={styles.controlCard}>
                    <View style={[styles.controlIcon, { backgroundColor: `${color}14` }]}>
                      <Ionicons name={control.icon} size={18} color={color} />
                    </View>
                    <Text style={styles.controlValue}>{control.value}</Text>
                    <Text style={styles.controlLabel}>{control.label}</Text>
                  </View>
                );
              })}
            </View>
          </AnimatedEntrance>
        )}

        <AnimatedEntrance delay={500} style={styles.section}>
          <HoverCard>
            <View style={styles.scanPanel}>
              <View style={styles.viewfinder}>
                <View style={[styles.corner, styles.cornerTopLeft]} />
                <View style={[styles.corner, styles.cornerTopRight]} />
                <View style={[styles.corner, styles.cornerBottomLeft]} />
                <View style={[styles.corner, styles.cornerBottomRight]} />
                <Ionicons name="barcode-outline" size={56} color={secondaryAccent} />
                <Animated.View
                  pointerEvents="none"
                  style={[
                    styles.scanBeam,
                    {
                      backgroundColor: accent,
                      transform: [
                        {
                          translateY: sweep.interpolate({
                            inputRange: [0, 1],
                            outputRange: [-52, 52],
                          }),
                        },
                      ],
                    },
                  ]}
                />
              </View>
              <View style={styles.scanCopy}>
                <Text style={styles.scanTitle}>{scannerLabel}</Text>
                <Text style={styles.scanText}>
                  Repeated scans are debounced; invalid warehouse, quantity or item identity blocks submission.
                </Text>
              </View>
            </View>
          </HoverCard>
        </AnimatedEntrance>

        {actions.length > 0 && (
          <AnimatedEntrance delay={560} style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            {actions.map((action) => {
              const color = colorForTone(action.tone);
              return (
                <HoverCard key={action.label}>
                  <TouchableOpacity
                    activeOpacity={0.84}
                    style={styles.actionCard}
                    onPress={() => openRoute(action.route)}
                  >
                    <View style={[styles.actionIcon, { backgroundColor: `${color}14` }]}>
                      <Ionicons name={action.icon} size={20} color={color} />
                    </View>
                    <View style={styles.actionCopy}>
                      <Text style={styles.actionTitle}>{action.label}</Text>
                      <Text style={styles.actionCaption}>{action.caption}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={19} color="#7D8FA0" />
                  </TouchableOpacity>
                </HoverCard>
              );
            })}
          </AnimatedEntrance>
        )}

        <AnimatedEntrance delay={620} style={styles.section}>
          <TouchableOpacity
            activeOpacity={0.86}
            style={styles.primaryButton}
            onPress={() => openRoute(primaryRoute ?? tasks[0]?.route)}
          >
            <LinearGradient
              colors={[accent, secondaryAccent]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.primaryGradient}
            >
              <Text style={styles.primaryText}>{primaryLabel}</Text>
              <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
            </LinearGradient>
          </TouchableOpacity>
        </AnimatedEntrance>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EEF5FA" },
  content: { paddingBottom: 34 },
  hero: {
    minHeight: 274,
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
    top: -20,
    bottom: -20,
    width: 92,
    backgroundColor: "rgba(255,255,255,0.16)",
    transform: [{ rotate: "18deg" }],
  },
  heroTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.16)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.24)",
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
  eyebrow: { marginTop: 24, color: "rgba(255,255,255,0.76)", fontSize: 11, fontWeight: "900", letterSpacing: 1.7 },
  title: { marginTop: 6, color: "#FFFFFF", fontSize: 31, fontWeight: "900" },
  subtitle: { marginTop: 9, color: "rgba(255,255,255,0.86)", fontSize: 14, lineHeight: 21, maxWidth: 340 },
  heroFooter: { marginTop: 18, flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12 },
  contextPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 99,
    backgroundColor: "rgba(255,255,255,0.16)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.22)",
  },
  pulseHalo: { position: "absolute", left: 10, width: 14, height: 14, borderRadius: 7, backgroundColor: "#FFFFFF" },
  pillDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#FFFFFF" },
  pillText: { color: "#FFFFFF", fontSize: 12, fontWeight: "800" },
  activeText: { flex: 1, color: "rgba(255,255,255,0.82)", fontSize: 12, fontWeight: "800", textAlign: "right" },
  metricGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginTop: -34, paddingHorizontal: 18 },
  metricGridBelowHero: { marginTop: 18 },
  metricWrap: { width: "48%" },
  metricCard: {
    minHeight: 126,
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
  metricIcon: { width: 38, height: 38, borderRadius: 13, alignItems: "center", justifyContent: "center" },
  metricValue: { marginTop: 13, color: INK, fontSize: 29, fontWeight: "900" },
  metricLabel: { marginTop: 4, color: MUTED, fontSize: 12, fontWeight: "700" },
  section: { marginHorizontal: 18, marginTop: 24 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", gap: 12, marginBottom: 12 },
  sectionTitle: { color: INK, fontSize: 19, fontWeight: "900", marginBottom: 12 },
  sectionSub: { color: MUTED, fontSize: 12, fontWeight: "600" },
  liveBadge: {
    height: 31,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    borderRadius: 99,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D8E6F0",
  },
  liveDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: BRAND_BLUE },
  liveText: { color: BRAND_BLUE, fontSize: 10, fontWeight: "900", letterSpacing: 0.8 },
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
  stepRow: { minHeight: 54, flexDirection: "row", alignItems: "flex-start" },
  stepNode: { width: 25, height: 25, borderRadius: 13, backgroundColor: "#C8D5E0", alignItems: "center", justifyContent: "center" },
  stepDone: { backgroundColor: "#16A34A" },
  stepBlocked: { backgroundColor: "#F59E0B" },
  stepCopy: { flex: 1, marginLeft: 12, paddingBottom: 12 },
  stepLabel: { color: "#40566B", fontSize: 13, fontWeight: "900" },
  stepDetail: { marginTop: 3, color: MUTED, fontSize: 11, lineHeight: 16, fontWeight: "600" },
  stepLine: { position: "absolute", left: 12, top: 30, width: 2, height: 24, backgroundColor: "#E3EBF2" },
  taskCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    padding: 14,
    marginBottom: 11,
    borderRadius: 19,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0EAF2",
    shadowColor: BRAND_BLUE,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 3,
  },
  taskIcon: { width: 48, height: 48, borderRadius: 16, alignItems: "center", justifyContent: "center" },
  taskCopy: { flex: 1 },
  taskTopRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  taskTitle: { flex: 1, color: INK, fontSize: 14, fontWeight: "900" },
  priorityPill: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 99, backgroundColor: "#FCE8EC" },
  priorityText: { color: BRAND_RED, fontSize: 10, fontWeight: "900" },
  taskSubtitle: { color: MUTED, fontSize: 12, marginTop: 4, lineHeight: 17 },
  taskStatus: { color: BRAND_BLUE, fontSize: 11, marginTop: 6, fontWeight: "900" },
  controlGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  controlCard: {
    width: "48%",
    minHeight: 112,
    padding: 13,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0EAF2",
  },
  controlIcon: { width: 34, height: 34, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  controlValue: { marginTop: 11, color: INK, fontSize: 15, fontWeight: "900" },
  controlLabel: { marginTop: 4, color: MUTED, fontSize: 11, fontWeight: "700" },
  scanPanel: {
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
  viewfinder: { height: 145, borderRadius: 18, backgroundColor: "#F3F8FC", alignItems: "center", justifyContent: "center", overflow: "hidden" },
  corner: { position: "absolute", width: 24, height: 24, borderColor: BRAND_BLUE },
  cornerTopLeft: { top: 16, left: 16, borderTopWidth: 3, borderLeftWidth: 3, borderTopLeftRadius: 8 },
  cornerTopRight: { top: 16, right: 16, borderTopWidth: 3, borderRightWidth: 3, borderTopRightRadius: 8 },
  cornerBottomLeft: { bottom: 16, left: 16, borderBottomWidth: 3, borderLeftWidth: 3, borderBottomLeftRadius: 8 },
  cornerBottomRight: { bottom: 16, right: 16, borderBottomWidth: 3, borderRightWidth: 3, borderBottomRightRadius: 8 },
  scanBeam: { position: "absolute", left: 28, right: 28, top: "50%", height: 2, shadowColor: BRAND_RED, shadowOpacity: 0.7, shadowRadius: 8 },
  scanCopy: { marginTop: 14 },
  scanTitle: { color: INK, fontSize: 15, fontWeight: "900" },
  scanText: { marginTop: 6, color: MUTED, fontSize: 12, lineHeight: 18, fontWeight: "600" },
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
  },
  actionIcon: { width: 42, height: 42, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  actionCopy: { flex: 1 },
  actionTitle: { color: INK, fontSize: 14, fontWeight: "900" },
  actionCaption: { color: MUTED, fontSize: 12, lineHeight: 17, marginTop: 3 },
  primaryButton: { height: 58, borderRadius: 18, overflow: "hidden", shadowColor: BRAND_RED, shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.2, shadowRadius: 16, elevation: 7 },
  primaryGradient: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10 },
  primaryText: { color: "#FFFFFF", fontSize: 15, fontWeight: "900" },
});
