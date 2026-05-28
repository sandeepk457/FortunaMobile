
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function DashboardScreen() {
  const COLORS = {
    primary: "#C8102E",
    secondary: "#005F99",

    background: "#0B111B",
    card: "#121A26",

    textPrimary: "#FFFFFF",
    textSecondary: "#A9B4C2",

    border: "#243041",

    inbound: "#005F99",
    outbound: "#C8102E",
    transfer: "#0891B2",
    counting: "#CA8A04",
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: COLORS.background,
        },
      ]}
    >
      {/* Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: COLORS.secondary,
            borderBottomColor: COLORS.border,
          },
        ]}
      >
        <TouchableOpacity>
          <Ionicons
            name="menu"
            size={28}
            color="#fff"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Fortuna WMS
        </Text>

        <TouchableOpacity>
          <Ionicons
            name="notifications-outline"
            size={24}
            color="#fff"
          />
        </TouchableOpacity>
      </View>

      {/* Body */}
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Card */}
        <View
          style={[
            styles.welcomeCard,
            {
              backgroundColor: COLORS.card,
              borderColor: COLORS.border,
            },
          ]}
        >
          <Text style={styles.welcomeTitle}>
            Welcome Sandeep 👋
          </Text>

          <Text
            style={[
              styles.subText,
              {
                color: COLORS.textSecondary,
              },
            ]}
          >
            Warehouse: HYD-01
          </Text>

          <View style={styles.onlineRow}>
            <View style={styles.onlineDot} />

            <Text style={styles.onlineText}>
              Device Online
            </Text>
          </View>
        </View>

        {/* KPI Section */}
        <Text style={styles.sectionTitle}>
          Warehouse KPIs
        </Text>

        <View style={styles.kpiGrid}>
          {/* KPI CARD */}
          <View
            style={[
              styles.kpiCard,
              {
                backgroundColor: COLORS.card,
                borderTopColor: COLORS.inbound,
              },
            ]}
          >
            <Text style={styles.kpiValue}>
              24
            </Text>

            <Text
              style={[
                styles.kpiLabel,
                {
                  color: COLORS.textSecondary,
                },
              ]}
            >
              Pending Inbound
            </Text>
          </View>

          <View
            style={[
              styles.kpiCard,
              {
                backgroundColor: COLORS.card,
                borderTopColor: COLORS.outbound,
              },
            ]}
          >
            <Text style={styles.kpiValue}>
              12
            </Text>

            <Text
              style={[
                styles.kpiLabel,
                {
                  color: COLORS.textSecondary,
                },
              ]}
            >
              Pending Outbound
            </Text>
          </View>

          <View
            style={[
              styles.kpiCard,
              {
                backgroundColor: COLORS.card,
                borderTopColor: COLORS.transfer,
              },
            ]}
          >
            <Text style={styles.kpiValue}>
              08
            </Text>

            <Text
              style={[
                styles.kpiLabel,
                {
                  color: COLORS.textSecondary,
                },
              ]}
            >
              Transfers
            </Text>
          </View>

          <View
            style={[
              styles.kpiCard,
              {
                backgroundColor: COLORS.card,
                borderTopColor: COLORS.counting,
              },
            ]}
          >
            <Text style={styles.kpiValue}>
              16
            </Text>

            <Text
              style={[
                styles.kpiLabel,
                {
                  color: COLORS.textSecondary,
                },
              ]}
            >
              Cycle Count
            </Text>
          </View>
        </View>

        {/* Tasks */}
        <Text style={styles.sectionTitle}>
          My Tasks
        </Text>

        {/* Task Card */}
        <TouchableOpacity
          style={[
            styles.taskCard,
            {
              backgroundColor: COLORS.card,
              borderColor: COLORS.border,
            },
          ]}
        >
          <View>
            <Text style={styles.taskTitle}>
              Pending Putaway
            </Text>

            <Text
              style={[
                styles.taskSub,
                {
                  color: COLORS.textSecondary,
                },
              ]}
            >
              14 Tasks Pending
            </Text>
          </View>

          <Ionicons
            name="arrow-forward-circle"
            size={34}
            color={COLORS.primary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.taskCard,
            {
              backgroundColor: COLORS.card,
              borderColor: COLORS.border,
            },
          ]}
        >
          <View>
            <Text style={styles.taskTitle}>
              Picking Queue
            </Text>

            <Text
              style={[
                styles.taskSub,
                {
                  color: COLORS.textSecondary,
                },
              ]}
            >
              8 Orders Waiting
            </Text>
          </View>

          <Ionicons
            name="arrow-forward-circle"
            size={34}
            color={COLORS.secondary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.taskCard,
            {
              backgroundColor: COLORS.card,
              borderColor: COLORS.border,
            },
          ]}
        >
          <View>
            <Text style={styles.taskTitle}>
              Dispatch Queue
            </Text>

            <Text
              style={[
                styles.taskSub,
                {
                  color: COLORS.textSecondary,
                },
              ]}
            >
              5 Vehicles Ready
            </Text>
          </View>

          <Ionicons
            name="arrow-forward-circle"
            size={34}
            color="#F59E0B"
          />
        </TouchableOpacity>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Floating Scanner Button */}
      <TouchableOpacity
        style={[
          styles.scanButton,
          {
            backgroundColor: COLORS.primary,
          },
        ]}
      >
        <Ionicons
          name="scan"
          size={34}
          color="#fff"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    height: 65,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingHorizontal: 18,

    borderBottomWidth: 1,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 1,
  },

  content: {
    padding: 16,
  },

  welcomeCard: {
    borderRadius: 22,

    padding: 20,

    marginBottom: 24,

    borderWidth: 1,
  },

  welcomeTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
  },

  subText: {
    marginTop: 8,
    fontSize: 15,
  },

  onlineRow: {
    flexDirection: "row",
    alignItems: "center",

    marginTop: 16,
  },

  onlineDot: {
    width: 10,
    height: 10,

    borderRadius: 20,

    backgroundColor: "#22C55E",

    marginRight: 8,
  },

  onlineText: {
    color: "#22C55E",
    fontWeight: "600",
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",

    marginBottom: 16,
  },

  kpiGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",

    marginBottom: 20,
  },

  kpiCard: {
    width: "48%",

    borderRadius: 18,

    padding: 18,

    marginBottom: 14,

    borderTopWidth: 5,
  },

  kpiValue: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },

  kpiLabel: {
    marginTop: 8,
    fontSize: 14,
  },

  taskCard: {
    borderRadius: 18,

    padding: 18,

    marginBottom: 14,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    borderWidth: 1,
  },

  taskTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  taskSub: {
    marginTop: 6,
  },

  scanButton: {
    width: 72,
    height: 72,

    borderRadius: 100,

    position: "absolute",

    bottom: 30,
    right: 25,

    alignItems: "center",
    justifyContent: "center",

    elevation: 10,
  },
});