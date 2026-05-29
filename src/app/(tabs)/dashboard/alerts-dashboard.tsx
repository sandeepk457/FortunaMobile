
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

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
      <View style={styles.header}>
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
      </View>

      {/* SUMMARY */}
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

      {/* ALERTS */}
      {alerts.map((alert) => (
        <TouchableOpacity
          key={alert.id}
          style={styles.alertCard}
        >
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
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  header: {
    backgroundColor: "#C8102E",
    paddingTop: 55,
    paddingBottom: 20,
    paddingHorizontal: 20,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerTitle: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "700",
  },

  summaryCard: {
    backgroundColor: "#FFF",
    margin: 20,
    borderRadius: 18,
    padding: 25,
    alignItems: "center",
    elevation: 3,
  },

  summaryTitle: {
    fontSize: 16,
    color: "#666",
  },

  summaryCount: {
    fontSize: 42,
    fontWeight: "700",
    color: "#C8102E",
    marginVertical: 8,
  },

  summaryText: {
    color: "#999",
  },

  alertCard: {
    backgroundColor: "#FFF",
    marginHorizontal: 20,
    marginBottom: 15,

    borderRadius: 16,
    padding: 16,

    flexDirection: "row",
    alignItems: "center",

    elevation: 2,
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
    color: "#222",
  },

  alertDesc: {
    color: "#666",
    marginTop: 4,
  },

  alertType: {
    marginTop: 6,
    fontWeight: "700",
  },
});