import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AnimatedEntrance from "@/components/ui/AnimatedEntrance";
import HoverCard from "@/components/ui/HoverCard";

const settings = [
  { title: "Warehouse", description: "Choose your active location", icon: "business-outline" as const, route: "/dashboard/warehouse-selection" as const, color: "#005F99" },
  { title: "Shift login", description: "Select or update your shift", icon: "time-outline" as const, route: "/dashboard/shift-login" as const, color: "#C8102E" },
  { title: "Device binding", description: "Manage this registered device", icon: "phone-portrait-outline" as const, route: "/dashboard/device-binding" as const, color: "#005F99" },
];

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <LinearGradient colors={["#005F99", "#004B7A", "#C8102E"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.header}>
          <Text style={styles.eyebrow}>FORTUNA SIMS</Text>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.title}>Settings</Text>
              <Text style={styles.subtitle}>Manage your operations setup.</Text>
            </View>
            <View style={styles.headerIcon}><Ionicons name="options-outline" size={24} color="#FFFFFF" /></View>
          </View>
        </LinearGradient>

        <AnimatedEntrance delay={90} style={styles.profileWrap}>
          <HoverCard>
            <LinearGradient colors={["#FFFFFF", "#F4F9FC"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.profileCard}>
              <View style={styles.avatar}><Ionicons name="person" size={25} color="#FFFFFF" /></View>
              <View style={styles.profileCopy}>
                <Text style={styles.profileTitle}>Operations profile</Text>
                <Text style={styles.profileSubtitle}>Warehouse access and device preferences</Text>
              </View>
              <View style={styles.profileStatus}><View style={styles.statusDot} /></View>
            </LinearGradient>
          </HoverCard>
        </AnimatedEntrance>

        <AnimatedEntrance delay={160} style={styles.section}>
          <Text style={styles.sectionTitle}>Operations setup</Text>
          {settings.map((item, index) => (
            <AnimatedEntrance key={item.title} delay={220 + index * 75}>
              <HoverCard>
                <TouchableOpacity activeOpacity={0.82} style={styles.settingCard} onPress={() => router.push(item.route)}>
                  <View style={[styles.settingIcon, { backgroundColor: `${item.color}14` }]}>
                    <Ionicons name={item.icon} size={21} color={item.color} />
                  </View>
                  <View style={styles.settingCopy}>
                    <Text style={styles.settingTitle}>{item.title}</Text>
                    <Text style={styles.settingDescription}>{item.description}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={19} color="#8192A2" />
                </TouchableOpacity>
              </HoverCard>
            </AnimatedEntrance>
          ))}
        </AnimatedEntrance>

        <AnimatedEntrance delay={420} style={styles.section}>
          <HoverCard>
            <View style={styles.infoCard}>
              <View style={styles.infoIcon}><Ionicons name="shield-checkmark-outline" size={21} color="#005F99" /></View>
              <View style={styles.infoCopy}>
                <Text style={styles.infoTitle}>Secure access</Text>
                <Text style={styles.infoText}>Your warehouse tools and account controls are available here.</Text>
              </View>
            </View>
          </HoverCard>
          <HoverCard>
            <TouchableOpacity activeOpacity={0.82} style={styles.signOut} onPress={() => router.replace("/auth/login")}>
              <Ionicons name="log-out-outline" size={20} color="#C8102E" />
              <Text style={styles.signOutText}>Sign out</Text>
              <Ionicons name="chevron-forward" size={18} color="#C8102E" />
            </TouchableOpacity>
          </HoverCard>
          <Text style={styles.version}>Fortuna SIMS · Version 1.0.0</Text>
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
  profileWrap: { marginHorizontal: 18, marginTop: 20 },
  profileCard: { flexDirection: "row", alignItems: "center", gap: 13, padding: 15, borderRadius: 21, borderWidth: 1, borderColor: "#DDE9F1", shadowColor: "#005F99", shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.09, shadowRadius: 14, elevation: 4 },
  avatar: { width: 48, height: 48, borderRadius: 17, backgroundColor: "#005F99", alignItems: "center", justifyContent: "center" },
  profileCopy: { flex: 1 },
  profileTitle: { color: "#172033", fontSize: 14, fontWeight: "900" },
  profileSubtitle: { color: "#718297", fontSize: 11, lineHeight: 16, marginTop: 4 },
  profileStatus: { width: 25, height: 25, borderRadius: 13, backgroundColor: "#EAF3F9", alignItems: "center", justifyContent: "center" },
  statusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#005F99" },
  section: { marginHorizontal: 18, marginTop: 24 },
  sectionTitle: { color: "#172033", fontSize: 19, fontWeight: "900", marginBottom: 12 },
  settingCard: { flexDirection: "row", alignItems: "center", gap: 12, padding: 14, marginBottom: 10, backgroundColor: "#FFFFFF", borderRadius: 18, borderWidth: 1, borderColor: "#E0EAF2", shadowColor: "#005F99", shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.06, shadowRadius: 10, elevation: 2 },
  settingIcon: { width: 42, height: 42, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  settingCopy: { flex: 1 },
  settingTitle: { color: "#172033", fontSize: 14, fontWeight: "800" },
  settingDescription: { color: "#718297", fontSize: 12, marginTop: 4 },
  infoCard: { flexDirection: "row", alignItems: "center", gap: 12, padding: 15, backgroundColor: "#EAF3F9", borderRadius: 18, borderWidth: 1, borderColor: "#D5E7F2" },
  infoIcon: { width: 40, height: 40, borderRadius: 14, backgroundColor: "#FFFFFF", alignItems: "center", justifyContent: "center" },
  infoCopy: { flex: 1 },
  infoTitle: { color: "#172033", fontSize: 13, fontWeight: "900" },
  infoText: { color: "#5D7185", fontSize: 11, lineHeight: 16, marginTop: 4 },
  signOut: { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 12, padding: 15, backgroundColor: "#FFFFFF", borderRadius: 17, borderWidth: 1, borderColor: "#F1D5DB" },
  signOutText: { flex: 1, color: "#C8102E", fontWeight: "800", fontSize: 14 },
  version: { color: "#8595A5", fontSize: 11, fontWeight: "600", textAlign: "center", marginTop: 18 },
});