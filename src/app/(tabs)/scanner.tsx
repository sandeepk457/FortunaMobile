import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
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

export default function ScannerScreen() {
  const router = useRouter();
  const [sweep] = useState(() => new Animated.Value(0));
  const [pulse] = useState(() => new Animated.Value(0));

  useEffect(() => {
    const sweepAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(sweep, { toValue: 1, duration: 2100, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
        Animated.timing(sweep, { toValue: 0, duration: 0, useNativeDriver: true }),
      ]),
    );
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 1500, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 1500, useNativeDriver: true }),
      ]),
    );
    sweepAnimation.start();
    pulseAnimation.start();
    return () => {
      sweepAnimation.stop();
      pulseAnimation.stop();
    };
  }, [pulse, sweep]);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <LinearGradient colors={["#005F99", "#004B7A", "#C8102E"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.header}>
          <Text style={styles.eyebrow}>FORTUNA SIMS</Text>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.title}>Smart Scan</Text>
              <Text style={styles.subtitle}>Choose a workflow to get started.</Text>
            </View>
            <View style={styles.headerIcon}><Ionicons name="scan-outline" size={25} color="#FFFFFF" /></View>
          </View>
        </LinearGradient>

        <AnimatedEntrance delay={100} style={styles.scannerCardWrap}>
          <HoverCard>
            <View style={styles.scannerCard}>
              <View style={styles.scannerTopRow}>
                <View>
                  <Text style={styles.scannerHeading}>Ready to scan</Text>
                  <Text style={styles.scannerCaption}>Select a supported operation below</Text>
                </View>
                <Animated.View style={[styles.readyIndicator, { transform: [{ scale: pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.13] }) }] }]}>
                  <View style={styles.readyDot} />
                </Animated.View>
              </View>
              <View style={styles.viewfinder}>
                <View style={[styles.corner, styles.cornerTopLeft]} />
                <View style={[styles.corner, styles.cornerTopRight]} />
                <View style={[styles.corner, styles.cornerBottomLeft]} />
                <View style={[styles.corner, styles.cornerBottomRight]} />
                <View style={styles.scanTarget}><Ionicons name="barcode-outline" size={65} color="#005F99" /></View>
                <Animated.View pointerEvents="none" style={[styles.scanBeam, { transform: [{ translateY: sweep.interpolate({ inputRange: [0, 1], outputRange: [-74, 74] }) }] }]} />
              </View>
              <View style={styles.tipRow}>
                <Ionicons name="information-circle-outline" size={17} color="#005F99" />
                <Text style={styles.tipText}>Pick a workflow to continue to its scan step.</Text>
              </View>
            </View>
          </HoverCard>
        </AnimatedEntrance>

        <AnimatedEntrance delay={180} style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>Scan workflows</Text>
          <HoverCard>
            <TouchableOpacity activeOpacity={0.82} style={styles.actionCard} onPress={() => router.push("/inbound/scan-item")}>
              <LinearGradient colors={["#C8102E", "#A80D27"]} style={styles.actionIcon}>
                <Ionicons name="cube-outline" size={23} color="#FFFFFF" />
              </LinearGradient>
              <View style={styles.actionCopy}>
                <Text style={styles.actionTitle}>Item barcode</Text>
                <Text style={styles.actionCaption}>Continue an inbound item scan</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#7B8C9C" />
            </TouchableOpacity>
          </HoverCard>
          <HoverCard>
            <TouchableOpacity activeOpacity={0.82} style={styles.actionCard} onPress={() => router.push("/inbound")}>
              <LinearGradient colors={["#005F99", "#004B7A"]} style={styles.actionIcon}>
                <Ionicons name="list-outline" size={23} color="#FFFFFF" />
              </LinearGradient>
              <View style={styles.actionCopy}>
                <Text style={styles.actionTitle}>Inbound operations</Text>
                <Text style={styles.actionCaption}>Browse available receiving and scan flows</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#7B8C9C" />
            </TouchableOpacity>
          </HoverCard>
        </AnimatedEntrance>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EEF5FA" },
  content: { paddingBottom: 30 },
  header: { paddingTop: 58, paddingHorizontal: 22, paddingBottom: 26, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, shadowColor: "#005F99", shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.2, shadowRadius: 18, elevation: 8 },
  eyebrow: { color: "rgba(255,255,255,0.76)", fontSize: 11, fontWeight: "800", letterSpacing: 1.8 },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 5 },
  title: { color: "#FFFFFF", fontSize: 30, fontWeight: "900" },
  subtitle: { color: "rgba(255,255,255,0.84)", fontSize: 13, marginTop: 6 },
  headerIcon: { width: 48, height: 48, borderRadius: 16, backgroundColor: "rgba(255,255,255,0.18)", borderWidth: 1, borderColor: "rgba(255,255,255,0.26)", alignItems: "center", justifyContent: "center" },
  scannerCardWrap: { marginHorizontal: 18, marginTop: 22 },
  scannerCard: { backgroundColor: "#FFFFFF", borderRadius: 24, padding: 18, borderWidth: 1, borderColor: "#E0EAF2", shadowColor: "#005F99", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 18, elevation: 5 },
  scannerTopRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  scannerHeading: { color: "#172033", fontSize: 17, fontWeight: "900" },
  scannerCaption: { color: "#718297", fontSize: 12, marginTop: 4 },
  readyIndicator: { width: 26, height: 26, borderRadius: 13, backgroundColor: "#EAF3F9", alignItems: "center", justifyContent: "center" },
  readyDot: { width: 9, height: 9, borderRadius: 5, backgroundColor: "#005F99" },
  viewfinder: { height: 200, marginTop: 19, borderRadius: 19, backgroundColor: "#F3F8FC", overflow: "hidden", alignItems: "center", justifyContent: "center" },
  scanTarget: { alignItems: "center", justifyContent: "center", width: 116, height: 116, borderRadius: 58, backgroundColor: "rgba(255,255,255,0.78)", borderWidth: 1, borderColor: "#D7E7F1" },
  scanBeam: { position: "absolute", top: "50%", left: 22, right: 22, height: 2, backgroundColor: "#C8102E", shadowColor: "#C8102E", shadowOpacity: 0.7, shadowRadius: 8, elevation: 3 },
  corner: { position: "absolute", width: 25, height: 25, borderColor: "#005F99" },
  cornerTopLeft: { top: 18, left: 18, borderTopWidth: 3, borderLeftWidth: 3, borderTopLeftRadius: 8 },
  cornerTopRight: { top: 18, right: 18, borderTopWidth: 3, borderRightWidth: 3, borderTopRightRadius: 8 },
  cornerBottomLeft: { bottom: 18, left: 18, borderBottomWidth: 3, borderLeftWidth: 3, borderBottomLeftRadius: 8 },
  cornerBottomRight: { bottom: 18, right: 18, borderBottomWidth: 3, borderRightWidth: 3, borderBottomRightRadius: 8 },
  tipRow: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 15 },
  tipText: { flex: 1, color: "#718297", fontSize: 12, lineHeight: 17 },
  actionsSection: { marginHorizontal: 18, marginTop: 25 },
  sectionTitle: { color: "#172033", fontSize: 19, fontWeight: "900", marginBottom: 12 },
  actionCard: { flexDirection: "row", alignItems: "center", gap: 13, padding: 14, marginBottom: 11, backgroundColor: "#FFFFFF", borderRadius: 19, borderWidth: 1, borderColor: "#E0EAF2", shadowColor: "#005F99", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.07, shadowRadius: 12, elevation: 3 },
  actionIcon: { width: 46, height: 46, borderRadius: 15, alignItems: "center", justifyContent: "center" },
  actionCopy: { flex: 1 },
  actionTitle: { color: "#172033", fontSize: 14, fontWeight: "800" },
  actionCaption: { color: "#718297", fontSize: 12, marginTop: 4 },
});