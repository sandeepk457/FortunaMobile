
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import AnimatedEntrance from "@/components/ui/AnimatedEntrance";
import HoverCard from "@/components/ui/HoverCard";

export default function AlertsDashboardScreen() {
  const router = useRouter();

  const alerts = [
    {
      id: 1,
      type: "Critical",
      title: "Low Stock Alert",
      description:
        "15 SKUs reached reorder level",
      color: "#DC2626",
      icon: "warning",
    },

    {
      id: 2,
      type: "Critical",
      title: "Pending Putaway",
      description:
        "24 receipts pending > 24 hrs",
      color: "#DC2626",
      icon: "cube",
    },

    {
      id: 3,
      type: "Warning",
      title: "Cycle Count Due",
      description:
        "8 bins pending verification",
      color: "#F59E0B",
      icon: "clipboard",
    },

    {
      id: 4,
      type: "Warning",
      title: "Transfer Delay",
      description:
        "5 transfers awaiting approval",
      color: "#F59E0B",
      icon: "swap-horizontal",
    },

    {
      id: 5,
      type: "Info",
      title: "New Shipment",
      description:
        "Inbound truck arrived at gate",
      color: "#005F99",
      icon: "car",
    },

    {
      id: 6,
      type: "Info",
      title: "Shift Handover",
      description:
        "Morning shift completed",
      color: "#005F99",
      icon: "people",
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingBottom: 40,
      }}
    >
      {/* HEADER */}
      <LinearGradient
        colors={["#C8102E", "#A90D27", "#005F99"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <TouchableOpacity
          onPress={() => router.back()}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color="#FFF"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Alerts Dashboard
        </Text>

        <View style={{ width: 24 }} />
      </LinearGradient>

      {/* SUMMARY */}
      <AnimatedEntrance delay={80} style={styles.summaryWrap}>
        <HoverCard>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>
              Active Alerts
            </Text>

            <Text style={styles.summaryCount}>
              6
            </Text>

            <Text style={styles.summaryText}>
              Warehouse Notifications
            </Text>
          </View>
        </HoverCard>
      </AnimatedEntrance>

      {/* ALERTS */}
      {alerts.map((alert, index) => (
        <AnimatedEntrance key={alert.id} delay={140 + index * 65} style={styles.alertWrap}>
          <HoverCard>
            <TouchableOpacity activeOpacity={0.82} style={styles.alertCard}>
              <View
                style={[
                  styles.iconContainer,
                  {
                    backgroundColor:
                      alert.color,
                  },
                ]}
              >
                <Ionicons
                  name={alert.icon as any}
                  size={24}
                  color="#FFF"
                />
              </View>

              <View style={styles.alertInfo}>
                <Text style={styles.alertTitle}>
                  {alert.title}
                </Text>

                <Text style={styles.alertDesc}>
                  {alert.description}
                </Text>

                <Text
                  style={[
                    styles.alertType,
                    {
                      color: alert.color,
                    },
                  ]}
                >
                  {alert.type}
                </Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={20}
                color="#999"
              />
            </TouchableOpacity>
          </HoverCard>
        </AnimatedEntrance>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF5FA",
  },

  header: {
    paddingTop: 55,
    paddingBottom: 20,
    paddingHorizontal: 20,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
    shadowColor: "#005F99",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 17,
    elevation: 8,
  },

  headerTitle: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "700",
  },

  summaryWrap: {
    margin: 18,
    borderRadius: 21,
    shadowColor: "#005F99",
    shadowOffset: { width: 0, height: 9 },
    shadowOpacity: 0.09,
    shadowRadius: 15,
    elevation: 4,
  },

  summaryCard: {
    backgroundColor: "#FFF",
    borderRadius: 21,
    padding: 25,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0EAF2",
  },

  summaryTitle: {
    fontSize: 16,
    color: "#64788C",
  },

  summaryCount: {
    fontSize: 42,
    fontWeight: "700",
    color: "#C8102E",
    marginVertical: 8,
  },

  summaryText: {
    color: "#718297",
  },

  alertWrap: {
    marginHorizontal: 18,
    marginBottom: 11,
  },

  alertCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 19,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0EAF2",
    shadowColor: "#005F99",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 3,
  },

  iconContainer: {
    width: 50,
    height: 50,

    borderRadius: 25,

    justifyContent: "center",
    alignItems: "center",
  },

  alertInfo: {
    flex: 1,
    marginLeft: 15,
  },

  alertTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#172033",
  },

  alertDesc: {
    color: "#64788C",
    marginTop: 4,
  },

  alertType: {
    marginTop: 6,
    fontWeight: "700",
  },
});