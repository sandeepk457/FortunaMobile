import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
export default function InboundDashboardScreen() {
  const router = useRouter();

  return (
  <View style={styles.container}>

    <ScrollView
      contentContainerStyle={{
        paddingBottom: 20,
      }}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
        >
          <Text style={styles.headerIcon}>
            ←
          </Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Inbound Operations
        </Text>

        <TouchableOpacity>
          <Text style={styles.headerIcon}>
            ↻
          </Text>
        </TouchableOpacity>
      </View>

      {/* KPI ROW 1 */}
<View style={styles.kpiContainer}>
  <TouchableOpacity
    style={[
      styles.kpiCard,
      styles.pendingGrnCard,
    ]}
    onPress={() =>
      router.push(
        "/inbound/inbound-task-view"
      )
    }
  >
    <View style={styles.iconCircle}>
      <Text style={styles.iconText}>📥</Text>
    </View>

    <Text style={styles.kpiValue}>
      24
    </Text>

    <Text style={styles.kpiLabel}>
      Pending Inwards
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={[
      styles.kpiCard,
      styles.pendingQcCard,
    ]}
  >
    <View style={styles.iconCircle}>
      <Text style={styles.iconText}>🧪</Text>
    </View>

    <Text style={styles.kpiValue}>
      8
    </Text>

    <Text style={styles.kpiLabel}>
      Pending QC
    </Text>
  </TouchableOpacity>
</View>

{/* KPI ROW 2 */}
<View style={styles.kpiContainer}>
  <TouchableOpacity
    style={[
      styles.kpiCard,
      styles.putawayCard,
    ]}
  >
    <View style={styles.iconCircle}>
      <Text style={styles.iconText}>📦</Text>
    </View>

    <Text style={styles.kpiValue}>
      16
    </Text>

    <Text style={styles.kpiLabel}>
      Pending Putaway
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={[
      styles.kpiCard,
      styles.receiptCard,
    ]}
  >
    <View style={styles.iconCircle}>
      <Text style={styles.iconText}>🚚</Text>
    </View>

    <Text style={styles.kpiValue}>
      5
    </Text>

    <Text style={styles.kpiLabel}>
      Today's GRN's
    </Text>
  </TouchableOpacity>
</View>

      {/* RECENT TASKS */}
      <Text style={styles.sectionTitle}>
        Recent Goods Inward
      </Text>

      <TouchableOpacity
        style={styles.taskCard}
      >
        <View>
          <Text style={styles.grnNo}>
            GRN-2026-001
          </Text>

          <Text style={styles.vendor}>
            ABC Suppliers Pvt Ltd
          </Text>

          <Text style={styles.status}>
            Pending Receiving
          </Text>
        </View>

        <Text style={styles.arrow}>
          ›
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.taskCard}
      >
        <View>
          <Text style={styles.grnNo}>
            GRN-2026-002
          </Text>

          <Text style={styles.vendor}>
            Reliance Retail
          </Text>

          <Text style={styles.status}>
            Pending QC
          </Text>
        </View>

        <Text style={styles.arrow}>
          ›
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.taskCard}
      >
        <View>
          <Text style={styles.grnNo}>
            GRN-2026-003
          </Text>

          <Text style={styles.vendor}>
            ITC Foods
          </Text>

          <Text style={styles.status}>
            Putaway Pending
          </Text>
        </View>

        <Text style={styles.arrow}>
          ›
        </Text>
      </TouchableOpacity>

      {/* QUICK ACTIONS */}
      <Text style={styles.sectionTitle}>
        Quick Actions
      </Text>

      <View style={styles.quickActions}>
        <TouchableOpacity
          style={styles.actionCard}
        >
          <Text
            style={styles.actionEmoji}
          >
            📡
          </Text>

          <Text style={styles.actionText}>
            Scan GRN
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
        >
          <Text
            style={styles.actionEmoji}
          >
            📦
          </Text>

          <Text style={styles.actionText}>
            Putaway
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>

    <View style={styles.bottomNav}>

  <TouchableOpacity
    onPress={() => router.push("/dashboard")}
  >
    <Ionicons
      name="home"
      size={22}
      color="#C8102E"
    />
    <Text style={styles.navText}>
      Home
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    onPress={() => router.push("/tasks")}
  >
    <Ionicons
      name="clipboard"
      size={22}
      color="#005F99"
    />
    <Text style={styles.navText}>
      Tasks
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    onPress={() => router.push("/scanner")}
  >
    <Ionicons
      name="scan-circle"
      size={42}
      color="#005F99"
    />
  </TouchableOpacity>

  <TouchableOpacity
    onPress={() => router.push("/reports")}
  >
    <Ionicons
      name="bar-chart"
      size={22}
      color="#005F99"
    />
    <Text style={styles.navText}>
      Reports
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    onPress={() => router.push("/settings")}
  >
    <Ionicons
      name="settings"
      size={22}
      color="#005F99"
    />
    <Text style={styles.navText}>
      Settings
    </Text>
  </TouchableOpacity>

</View>

  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FA",
  },

  header: {
    backgroundColor: "#C8102E",
    paddingTop: 55,
    paddingBottom: 20,
    paddingHorizontal: 20,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerTitle: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "700",
  },

  headerIcon: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "700",
  },

  kpiContainer: {
    flexDirection: "row",
    justifyContent: "space-between",

    marginHorizontal: 15,
    marginTop: 15,
  },

  kpiCard: {
    width: "48%",

    backgroundColor: "#FFF",

    borderRadius: 16,

    padding: 20,

    alignItems: "center",

    elevation: 3,
  },

  kpiValue: {
    fontSize: 28,

    fontWeight: "700",

    color: "#C8102E",
  },

  kpiLabel: {
    marginTop: 5,

    color: "#666",

    textAlign: "center",
  },

  sectionTitle: {
    fontSize: 18,

    fontWeight: "700",

    color: "#005F99",

    marginTop: 25,

    marginBottom: 10,

    marginHorizontal: 15,
  },

  taskCard: {
    backgroundColor: "#FFF",

    marginHorizontal: 15,

    marginBottom: 12,

    padding: 18,

    borderRadius: 16,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    elevation: 2,
  },

  grnNo: {
    fontSize: 16,

    fontWeight: "700",

    color: "#222",
  },

  vendor: {
    marginTop: 4,

    color: "#666",
  },

  status: {
    marginTop: 6,

    color: "#C8102E",

    fontWeight: "600",
  },

  arrow: {
    fontSize: 28,

    color: "#888",
  },

  quickActions: {
    flexDirection: "row",

    justifyContent: "space-around",

    marginTop: 10,
  },

  actionCard: {
    backgroundColor: "#FFF",

    width: 150,
    height: 100,

    borderRadius: 16,

    justifyContent: "center",

    alignItems: "center",

    elevation: 2,
  },

  actionEmoji: {
    fontSize: 30,
  },

  actionText: {
    marginTop: 10,

    fontWeight: "600",

    color: "#333",
  },

pendingGrnCard: {
  backgroundColor: "#005F99",
},

pendingQcCard: {
  backgroundColor: "#C8102E",
},

putawayCard: {
  backgroundColor: "#C8102E",
},

receiptCard: {
  backgroundColor: "#005F99",
},

iconCircle: {
  width: 55,
  height: 55,

  borderRadius: 28,

  backgroundColor: "rgba(255,255,255,0.20)",

  justifyContent: "center",
  alignItems: "center",
},

iconText: {
  fontSize: 24,
},

kpiValue: {
  fontSize: 40,

  fontWeight: "700",

  color: "#FFFFFF",
},

kpiLabel: {
  color: "#FFFFFF",

  fontSize: 15,

  fontWeight: "600",
},

bottomNav: {
  height: 70,

  backgroundColor: "#FFF",

  flexDirection: "row",

  justifyContent: "space-around",

  alignItems: "center",

  borderTopWidth: 1,

  borderTopColor: "#EEE",
},

navText: {
  fontSize: 11,

  color: "#005F99",

  textAlign: "center",

  marginTop: 2,
},


});