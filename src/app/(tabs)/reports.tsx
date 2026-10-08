import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import AnimatedEntrance from "@/components/ui/AnimatedEntrance";
import HoverCard from "@/components/ui/HoverCard";

const queues = [
  { label: "Inbound", value: 24, color: "#C8102E", icon: "arrow-down" as const },
  { label: "Putaway", value: 14, color: "#005F99", icon: "cube-outline" as const },
  { label: "Picking", value: 8, color: "#C8102E", icon: "cart-outline" as const },
  { label: "Dispatch", value: 5, color: "#005F99", icon: "car-outline" as const },
];

export default function ReportsScreen() {
  const total = queues.reduce((sum, queue) => sum + queue.value, 0);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={["#C8102E", "#A90D27", "#005F99"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.hero}>
          <View style={styles.heroRow}>
            <View>
              <Text style={styles.eyebrow}>FORTUNA SIMS</Text>
              <Text style={styles.heroTitle}>Reports</Text>
            </View>
            <View style={styles.heroIcon}><Ionicons name="analytics-outline" size={25} color="#FFFFFF" /></View>
          </View>
          <Text style={styles.heroCaption}>A clear view of the work across your warehouse.</Text>
          <View style={styles.totalPill}>
            <Ionicons name="layers-outline" size={16} color="#FFFFFF" />
            <Text style={styles.totalText}>{total} open queue items</Text>
          </View>
        </LinearGradient>

        <AnimatedEntrance delay={80} style={styles.section}>
          <View style={styles.sectionHeading}>
            <View>
              <Text style={styles.sectionTitle}>Workload overview</Text>
              <Text style={styles.sectionSub}>Open work by operation</Text>
            </View>
            <View style={styles.livePill}><View style={styles.liveDot} /><Text style={styles.liveText}>OVERVIEW</Text></View>
          </View>
          <HoverCard>
            <View style={styles.card}>
              <View style={styles.summary}>
                <Text style={styles.total}>{total}</Text>
                <Text style={styles.summaryCaption}>items across active queues</Text>
              </View>
              {queues.map((queue, index) => (
                <AnimatedEntrance key={queue.label} delay={130 + index * 65} style={styles.queueRow}>
                  <View style={[styles.queueIcon, { backgroundColor: `${queue.color}14` }]}>
                    <Ionicons name={queue.icon} size={17} color={queue.color} />
                  </View>
                  <View style={styles.queueDetails}>
                    <View style={styles.queueLabelRow}>
                      <Text style={styles.queueLabel}>{queue.label}</Text>
                      <Text style={styles.queueValue}>{queue.value}</Text>
                    </View>
                    <View style={styles.track}>
                      <View style={[styles.bar, { backgroundColor: queue.color, width: `${(queue.value / queues[0].value) * 100}%` }]} />
                    </View>
                  </View>
                </AnimatedEntrance>
              ))}
            </View>
          </HoverCard>
        </AnimatedEntrance>

        <AnimatedEntrance delay={200} style={styles.section}>
          <Text style={styles.sectionTitle}>Quick insight</Text>
          <HoverCard>
            <View style={styles.insight}>
              <View style={styles.insightIcon}><Ionicons name="trending-up" size={20} color="#005F99" /></View>
              <View style={styles.insightCopy}>
                <Text style={styles.insightTitle}>Largest active queue</Text>
                <Text style={styles.insightCaption}>Inbound currently has the most open work.</Text>
              </View>
              <Text style={styles.insightValue}>24</Text>
            </View>
          </HoverCard>
        </AnimatedEntrance>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EEF5FA" },
  content: { paddingBottom: 30 },
  hero: { paddingTop: 58, paddingHorizontal: 22, paddingBottom: 24, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, shadowColor: "#005F99", shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.22, shadowRadius: 20, elevation: 8 },
  heroRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  eyebrow: { color: "rgba(255,255,255,0.76)", fontSize: 11, fontWeight: "800", letterSpacing: 1.8 },
  heroTitle: { color: "#FFFFFF", fontSize: 30, fontWeight: "900", marginTop: 4 },
  heroIcon: { width: 48, height: 48, borderRadius: 16, backgroundColor: "rgba(255,255,255,0.18)", borderWidth: 1, borderColor: "rgba(255,255,255,0.28)", alignItems: "center", justifyContent: "center" },
  heroCaption: { color: "rgba(255,255,255,0.86)", fontSize: 14, lineHeight: 21, marginTop: 13 },
  totalPill: { alignSelf: "flex-start", flexDirection: "row", alignItems: "center", gap: 7, marginTop: 17, paddingHorizontal: 12, paddingVertical: 8, backgroundColor: "rgba(255,255,255,0.16)", borderRadius: 99, borderWidth: 1, borderColor: "rgba(255,255,255,0.22)" },
  totalText: { color: "#FFFFFF", fontSize: 12, fontWeight: "800" },
  section: { marginHorizontal: 18, marginTop: 23 },
  sectionHeading: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 13 },
  sectionTitle: { color: "#172033", fontSize: 19, fontWeight: "900" },
  sectionSub: { color: "#718297", fontSize: 13, marginTop: 4 },
  livePill: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 10, paddingVertical: 7, borderRadius: 99, backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#D8E6F0" },
  liveDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: "#005F99" },
  liveText: { color: "#005F99", fontSize: 10, fontWeight: "900", letterSpacing: 0.8 },
  card: { backgroundColor: "#FFFFFF", padding: 19, borderRadius: 23, borderWidth: 1, borderColor: "#E0EAF2", shadowColor: "#005F99", shadowOffset: { width: 0, height: 9 }, shadowOpacity: 0.09, shadowRadius: 16, elevation: 4 },
  summary: { flexDirection: "row", alignItems: "baseline", gap: 9, paddingBottom: 15, marginBottom: 15, borderBottomWidth: 1, borderBottomColor: "#EDF2F6" },
  total: { color: "#172033", fontSize: 34, fontWeight: "900" },
  summaryCaption: { color: "#718297", fontSize: 13, fontWeight: "600" },
  queueRow: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 14 },
  queueIcon: { width: 36, height: 36, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  queueDetails: { flex: 1 },
  queueLabelRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 7 },
  queueLabel: { color: "#33445A", fontSize: 13, fontWeight: "700" },
  queueValue: { color: "#172033", fontSize: 13, fontWeight: "900" },
  track: { height: 7, backgroundColor: "#EDF2F6", borderRadius: 6, overflow: "hidden" },
  bar: { height: "100%", borderRadius: 6 },
  insight: { flexDirection: "row", alignItems: "center", gap: 12, marginTop: 12, padding: 14, backgroundColor: "#FFFFFF", borderRadius: 18, borderWidth: 1, borderColor: "#E0EAF2", shadowColor: "#005F99", shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.06, shadowRadius: 10, elevation: 2 },
  insightIcon: { width: 40, height: 40, borderRadius: 14, backgroundColor: "#EAF3F9", alignItems: "center", justifyContent: "center" },
  insightCopy: { flex: 1 },
  insightTitle: { color: "#172033", fontSize: 13, fontWeight: "800" },
  insightCaption: { color: "#718297", fontSize: 11, lineHeight: 16, marginTop: 3 },
  insightValue: { color: "#005F99", fontSize: 18, fontWeight: "900" },
});