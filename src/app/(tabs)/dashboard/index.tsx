
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
export default function DashboardScreen() {

  const [showMenu, setShowMenu] = useState(false);
const router = useRouter();

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>

        {/* MENU ICON */}
       <TouchableOpacity
  style={styles.menuBtn}
  onPress={() => setShowMenu(!showMenu)}
>
  <Ionicons
    name="menu"
    size={28}
    color="#FFFFFF"
  />
</TouchableOpacity>

        {/* TITLE */}
        <Text style={styles.headerTitle}>
          Fortuna SIMS
        </Text>

        {/* NOTIFICATION */}
        <TouchableOpacity>
          <Ionicons
            name="notifications-outline"
            size={24}
            color="#FFFFFF"
          />
        </TouchableOpacity>

      </View>

    {showMenu && (
  <View style={styles.sideMenu}>

    <TouchableOpacity
  style={styles.menuItem}
  onPress={() => {
    setShowMenu(false);

    router.push(
      "/dashboard/warehouse-selection"
    );
  }}
>
  <Text style={styles.menuText}>
    🏭 Change Warehouse
  </Text>
</TouchableOpacity>

    <TouchableOpacity style={styles.menuItem}>
      <Text style={styles.menuText}>
        👷 Shift Login
      </Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.menuItem}>
      <Text style={styles.menuText}>
        📦 My Tasks
      </Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.menuItem}>
      <Text style={styles.menuText}>
        ⚙ Settings
      </Text>
    </TouchableOpacity>

  </View>
)}


      {/* BODY */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 120,
        }}
      >

        {/* WELCOME CARD */}
        <View style={styles.welcomeCard}>

          <Text style={styles.welcomeText}>
            Welcome Sandeep 👋
          </Text>

          <Text style={styles.warehouseText}>
            Warehouse: HYD-01
          </Text>

          <View style={styles.onlineRow}>

            <View style={styles.onlineDot} />

            <Text style={styles.onlineText}>
              Device Online
            </Text>

          </View>

        </View>

        {/* SECTION TITLE */}
        <Text style={styles.sectionTitle}>
          Warehouse KPIs
        </Text>

        {/* KPI GRID */}
        <View style={styles.kpiGrid}>

          {/* INBOUND */}
          <TouchableOpacity
            style={[
              styles.kpiCard,
              styles.inboundCard,
            ]}
          >

            <View style={styles.iconCircle}>
              <Ionicons
                name="arrow-down"
                size={28}
                color="#FFFFFF"
              />
            </View>

            <Text style={styles.kpiValue}>
              24
            </Text>

            <Text style={styles.kpiLabel}>
              Pending Inbound
            </Text>

          </TouchableOpacity>

          {/* OUTBOUND */}
          <TouchableOpacity
            style={[
              styles.kpiCard,
              styles.outboundCard,
            ]}
          >

            <View style={styles.iconCircle}>
              <Ionicons
                name="arrow-up"
                size={28}
                color="#FFFFFF"
              />
            </View>

            <Text style={styles.kpiValue}>
              12
            </Text>

            <Text style={styles.kpiLabel}>
              Pending Outbound
            </Text>

          </TouchableOpacity>

          {/* TRANSFER */}
          <TouchableOpacity
            style={[
              styles.kpiCard,
              styles.transferCard,
            ]}
          >

            <View style={styles.iconCircle}>
              <Ionicons
                name="swap-horizontal"
                size={28}
                color="#FFFFFF"
              />
            </View>

            <Text style={styles.kpiValue}>
              08
            </Text>

            <Text style={styles.kpiLabel}>
              Transfers
            </Text>

          </TouchableOpacity>

          {/* COUNT */}
          <TouchableOpacity
            style={[
              styles.kpiCard,
              styles.countCard,
            ]}
          >

            <View style={styles.iconCircle}>
              <Ionicons
                name="clipboard"
                size={28}
                color="#FFFFFF"
              />
            </View>

            <Text style={styles.kpiValue}>
              16
            </Text>

            <Text style={styles.kpiLabel}>
              Cycle Count
            </Text>

          </TouchableOpacity>

        </View>

        {/* TASK TITLE */}
        <Text style={styles.sectionTitle}>
          My Tasks
        </Text>

        {/* TASK CARD */}
        <TouchableOpacity style={styles.taskCard}>

          <View>
            <Text style={styles.taskTitle}>
              Pending Putaway
            </Text>

            <Text style={styles.taskSub}>
              14 Tasks Pending
            </Text>
          </View>

          <View style={styles.redAction}>
            <Ionicons
              name="arrow-forward"
              size={22}
              color="#FFFFFF"
            />
          </View>

        </TouchableOpacity>

        {/* TASK CARD */}
        <TouchableOpacity style={styles.taskCard}>

          <View>
            <Text style={styles.taskTitle}>
              Picking Queue
            </Text>

            <Text style={styles.taskSub}>
              8 Orders Waiting
            </Text>
          </View>

          <View style={styles.blueAction}>
            <Ionicons
              name="arrow-forward"
              size={22}
              color="#FFFFFF"
            />
          </View>

        </TouchableOpacity>

        {/* TASK CARD */}
        <TouchableOpacity style={styles.taskCard}>

          <View>
            <Text style={styles.taskTitle}>
              Dispatch Queue
            </Text>

            <Text style={styles.taskSub}>
              5 Vehicles Ready
            </Text>
          </View>

          <View style={styles.yellowAction}>
            <Ionicons
              name="arrow-forward"
              size={22}
              color="#FFFFFF"
            />
          </View>

        </TouchableOpacity>

      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },

  /* HEADER */

  header: {
    height: 95,
    backgroundColor: "#C8102E",

    paddingTop: 35,
    paddingHorizontal: 18,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  menuBtn: {
    padding: 4,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
  },

  /* WELCOME CARD */

  welcomeCard: {
    backgroundColor: "#FFFFFF",

    margin: 18,
    borderRadius: 24,

    padding: 22,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,

    elevation: 3,
  },

  welcomeText: {
    fontSize: 22,
    fontWeight: "700",

    color: "#5A3418",
  },

  warehouseText: {
    marginTop: 12,

    fontSize: 18,
    color: "#8B5E3C",
  },

  onlineRow: {
    flexDirection: "row",
    alignItems: "center",

    marginTop: 22,
  },

  onlineDot: {
    width: 14,
    height: 14,

    borderRadius: 20,

    backgroundColor: "#22C55E",
  },

  onlineText: {
    marginLeft: 10,

    color: "#16A34A",

    fontSize: 16,
    fontWeight: "700",
  },

  /* SECTION TITLE */

  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",

    color: "#5A3418",

    marginHorizontal: 18,
    marginTop: 12,
    marginBottom: 18,
  },

  /* KPI GRID */

  kpiGrid: {
    flexDirection: "row",
    flexWrap: "wrap",

    justifyContent: "space-between",

    paddingHorizontal: 18,
  },

  kpiCard: {
    width: "47%",

    borderRadius: 28,

    padding: 20,

    marginBottom: 18,

    minHeight: 200,
  },

  inboundCard: {
    backgroundColor: "#C8102E",
  },

  outboundCard: {
    backgroundColor: "#005F99",
  },

  transferCard: {
    backgroundColor: "#005F99",
  },

  countCard: {
    backgroundColor: "#C8102E",
  },

  iconCircle: {
    width: 60,
    height: 60,

    borderRadius: 40,

    backgroundColor: "rgba(255,255,255,0.2)",

    justifyContent: "center",
    alignItems: "center",
  },

  kpiValue: {
    fontSize: 44,
    fontWeight: "800",

    color: "#FFFFFF",

    marginTop: 34,
  },

  kpiLabel: {
    marginTop: 8,

    fontSize: 18,

    color: "#FFFFFF",

    fontWeight: "600",
  },

  /* TASKS */

  taskCard: {
    backgroundColor: "#FFFFFF",

    marginHorizontal: 18,
    marginBottom: 18,

    borderRadius: 22,

    padding: 22,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,

    elevation: 2,
  },

  taskTitle: {
    fontSize: 22,
    fontWeight: "700",

    color: "#5A3418",
  },

  taskSub: {
    marginTop: 10,

    color: "#8B5E3C",

    fontSize: 16,
  },

  redAction: {
    width: 48,
    height: 48,

    borderRadius: 30,

    backgroundColor: "#C8102E",

    justifyContent: "center",
    alignItems: "center",
  },

  blueAction: {
    width: 48,
    height: 48,

    borderRadius: 30,

    backgroundColor: "#005F99",

    justifyContent: "center",
    alignItems: "center",
  },

  yellowAction: {
    width: 48,
    height: 48,

    borderRadius: 30,

    backgroundColor: "#F59E0B",

    justifyContent: "center",
    alignItems: "center",
  },


  /* SIDE MENU */

  sideMenu: {
  position: "absolute",
  top: 95,
  left: 10,
  width: 240,

  backgroundColor: "#FFFFFF",

  borderRadius: 16,

  padding: 12,

  elevation: 10,

  zIndex: 999,
},

menuItem: {
  paddingVertical: 14,

  borderBottomWidth: 1,

  borderBottomColor: "#EEEEEE",
},

menuText: {
  fontSize: 16,

  fontWeight: "600",

  color: "#333333",
},

});