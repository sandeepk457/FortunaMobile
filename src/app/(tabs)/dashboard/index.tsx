import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect, useRouter } from "expo-router";
import HoverCard from "@/components/ui/HoverCard";



export default function DashboardScreen() {
  const [userName, setUserName] = useState("");
  const loadUser = useCallback(async () => {
    try {
      const storedUser = await AsyncStorage.getItem("loggedUser");

      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUserName(user.name || user.full_name || "");
      }
    } catch (err) {
      console.log("User Load Error", err);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadUser();
    }, [loadUser])
  );

const [showMenu, setShowMenu] = useState(false);
const router = useRouter();
const [warehouseOpen, setWarehouseOpen] = useState(false);

const [operationsOpen, setOperationsOpen] = useState(false);
const [pageAnim] = useState(() => new Animated.Value(0));

useEffect(() => {
  const animation = Animated.timing(pageAnim, {
    toValue: 1,
    duration: 650,
    useNativeDriver: true,
  });
  animation.start();
  return () => animation.stop();
}, [pageAnim]);

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <LinearGradient
        colors={["#C8102E", "#B50E29"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >

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
         <TouchableOpacity
    onPress={() =>
      router.push(
        "/dashboard/alerts-dashboard"
      )
    }
  >
    <Ionicons
      name="notifications-outline"
      size={24}
      color="#FFFFFF"
    />
  </TouchableOpacity>

      </LinearGradient>

    {showMenu && (
  <>
    <TouchableOpacity
      style={styles.overlay}
      activeOpacity={1}
      onPress={() => setShowMenu(false)}
    />

    <View style={styles.sideMenu}>

      <TouchableOpacity
        style={styles.closeBtn}
        onPress={() => setShowMenu(false)}
      >
        <Ionicons
          name="close"
          size={28}
          color="#C8102E"
        />
      </TouchableOpacity>

      <View style={styles.menuHeader}>
        <Image
          source={require("../../../../assets/images/sims-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* <Text style={styles.logoTitle}>
          Fortuna SIMS
        </Text>

        <Text style={styles.logoSub}>
          Supply & Inventory Management
        </Text> */}
      </View>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => setWarehouseOpen(!warehouseOpen)}
      >
        <Text style={styles.menuText}>
          🏭 Warehouse
        </Text>

        <Ionicons
          name={
            warehouseOpen
              ? "chevron-up"
              : "chevron-down"
          }
          size={18}
          color="#C8102E"
        />
      </TouchableOpacity>

      {warehouseOpen && (
        <View style={styles.subMenuContainer}>

          <TouchableOpacity
            style={styles.subMenu}
            onPress={() => {
              setShowMenu(false);
              router.push("/dashboard/warehouse-selection");
            }}
          >
            <Text style={styles.subMenuText}>
              Change Warehouse
            </Text>
          </TouchableOpacity>

            
          

          <TouchableOpacity
  style={styles.subMenu}
  onPress={() => {
    setShowMenu(false);

    router.push(
      "/dashboard/shift-login"
    );
  }}
>
  <Text style={styles.subMenuText}>
    Shift Login
  </Text>
</TouchableOpacity>

          <TouchableOpacity
  style={styles.subMenu}
  onPress={() => {
    setShowMenu(false);

    router.push(
      "/dashboard/device-binding"
    );
  }}
>
  <Text style={styles.subMenuText}>
    Device Binding
  </Text>
</TouchableOpacity>

        </View>
      )}

      <TouchableOpacity
  style={styles.menuItem}
  onPress={() => setOperationsOpen(!operationsOpen)}
>
  <Text style={styles.menuText}>
    📦 Operations
  </Text>

  <Ionicons
    name={
      operationsOpen
        ? "chevron-up"
        : "chevron-down"
    }
    size={18}
    color="#C8102E"
  />
</TouchableOpacity>

{operationsOpen && (
  <View style={styles.subMenuContainer}>

    <TouchableOpacity
      style={styles.subMenu}
      onPress={() => {
        setShowMenu(false);
        router.push("/inbound");
      }}
    >
      <Text style={styles.subMenuText}>
        📥 Inbound
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.subMenu}
      onPress={() => {
        setShowMenu(false);
        router.push("/outbound");
      }}
    >
      <Text style={styles.subMenuText}>
        📤 Outbound
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.subMenu}
      onPress={() => {
        setShowMenu(false);
        router.push("/transfer");
      }}
    >
      <Text style={styles.subMenuText}>
        🔄 Transfers
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.subMenu}
      onPress={() => {
        setShowMenu(false);
        router.push("/cyclecount");
      }}
    >
      <Text style={styles.subMenuText}>
        📋 Cycle Count
      </Text>
    </TouchableOpacity>

  </View>
)}


      <TouchableOpacity
  style={styles.menuItem}
  onPress={() => {
    setShowMenu(false);

    router.push("/dashboard/my-tasks");
  }}
>
  <Text style={styles.menuText}>
    📋 My Tasks
  </Text>
</TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuText}>⚙ Settings</Text>
      </TouchableOpacity>

      <View style={styles.logoutContainer}>
   <TouchableOpacity
  style={styles.logoutButton}
  onPress={() => {
    setShowMenu(false);
    router.replace("/auth/login");
  }}
>
  <Text style={styles.logoutText}>
    Sign Out
  </Text>
</TouchableOpacity>
      </View>

    </View>
  </>
)}



      {/* BODY */}
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 120,
        }}
        style={{
          opacity: pageAnim,
          transform: [{
            translateY: pageAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [18, 0],
            }),
          }],
        }}
      >

        {/* WELCOME CARD */}
        <HoverCard style={styles.welcomeCardWrap}>
          <LinearGradient
            colors={["#C8102E", "#005F99"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.welcomeCard}
          >

          <Text style={styles.welcomeText}>
            Welcome {userName} 👋
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
          </LinearGradient>
        </HoverCard>

        {/* SECTION TITLE */}
        <Text style={styles.sectionTitle}>
          Warehouse KPIs
        </Text>

        {/* KPI GRID */}
        <View style={styles.kpiGrid}>

          {/* INBOUND */}
          <HoverCard style={styles.kpiHover}>
            <TouchableOpacity
              style={[
                styles.kpiCard,
                styles.inboundCard,
              ]}
              onPress={() => router.push("/inbound")}
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
          </HoverCard>

          {/* OUTBOUND */}
          <HoverCard style={styles.kpiHover}>
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
          </HoverCard>

          {/* TRANSFER */}
          <HoverCard style={styles.kpiHover}>
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
          </HoverCard>

          {/* COUNT */}
          <HoverCard style={styles.kpiHover}>
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
          </HoverCard>

        </View>

        {/* TASK TITLE */}
        <Text style={styles.sectionTitle}>
          My Tasks
        </Text>

        {/* TASK CARD */}
        <HoverCard style={styles.taskHover}>
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
        </HoverCard>

        {/* TASK CARD */}
        <HoverCard style={styles.taskHover}>
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
        </HoverCard>

        {/* TASK CARD */}
        <HoverCard style={styles.taskHover}>
          <TouchableOpacity style={styles.taskCard}>

          <View>
            <Text style={styles.taskTitle}>
              Dispatch Queue
            </Text>

            <Text style={styles.taskSub}>
              5 Vehicles Ready
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
        </HoverCard>

      </Animated.ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#EEF5FA",
  },

  /* HEADER */

  header: {
    height: 95,

    paddingTop: 35,
    paddingHorizontal: 18,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: "#005F99",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 8,
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
    borderRadius: 24,
    padding: 22,
    overflow: "hidden",
    shadowColor: "#005F99",
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 8,
  },

  welcomeCardWrap: {
    margin: 18,
  },

  welcomeText: {
    fontSize: 22,
    fontWeight: "700",

    color: "#FFFFFF",
  },

  warehouseText: {
    marginTop: 12,

    fontSize: 18,
    color: "rgba(255,255,255,0.82)",
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

    backgroundColor: "#FFFFFF",
  },

  onlineText: {
    marginLeft: 10,

    color: "#FFFFFF",

    fontSize: 16,
    fontWeight: "700",
  },

  /* SECTION TITLE */

  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",

    color: "#172033",

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
    flex: 1,
    borderRadius: 28,

    padding: 20,

    minHeight: 200,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.32)",
    shadowColor: "#005F99",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 18,
    elevation: 7,
  },

  kpiHover: {
    width: "47%",
    marginBottom: 18,
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

    borderRadius: 22,

    padding: 22,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    borderWidth: 1,
    borderColor: "#D8E6F0",
    shadowColor: "#005F99",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 3,
  },

  taskHover: {
    marginHorizontal: 18,
    marginBottom: 18,
  },

  taskTitle: {
    fontSize: 22,
    fontWeight: "700",

    color: "#172033",
  },

  taskSub: {
    marginTop: 10,

    color: "#64788C",

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

  /* SIDE MENU */

menuText: {
  fontSize: 16,

  fontWeight: "600",

  color: "#333333",
},

logoutContainer: {
  position: "absolute",
  bottom: 30,
  left: 20,
  right: 20,
},

logoutButton: {
  flexDirection: "row",
  alignItems: "center",
  borderTopWidth: 1,
  borderColor: "#EEEEEE",
  paddingTop: 15,
},

logoutText: {
  marginLeft: 10,
  color: "#C8102E",
  fontWeight: "700",
  fontSize: 16,
},

overlay: {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.35)",
  zIndex: 998,
},

closeBtn: {
  position: "absolute",
  right: 15,
  top: 15,
  zIndex: 1000,
},

menuHeader: {
  alignItems: "center",

  paddingTop: 10,
  paddingBottom: 25,

  marginBottom: 20,

  borderBottomWidth: 1,
  borderBottomColor: "#E5E7EB",
},

logo: {
  width: 240,
  height: 130,
},

logoTitle: {
  fontSize: 20,
  fontWeight: "800",
  color: "#005F99",
},

logoSub: {
  fontSize: 12,
  color: "#64748B",
},

sideMenu: {
  position: "absolute",
  top: 0,
  left: 0,
  width: "80%",
  height: "100%",
  backgroundColor: "#F8FAFC",
  paddingTop: 50,
  paddingHorizontal: 15,
  zIndex: 999,
},

menuItem: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",

  backgroundColor: "#FFFFFF",

  borderWidth: 1,
  borderColor: "#D9E2EC",

  borderRadius: 12,

  paddingVertical: 14,
  paddingHorizontal: 15,

  marginBottom: 10,
},

subMenuContainer: {
  marginLeft: 10,
  marginBottom: 10,
},

subMenu: {
  backgroundColor: "#FFFFFF",
  borderLeftWidth: 3,
  borderLeftColor: "#C8102E",
  paddingVertical: 12,
  paddingHorizontal: 12,
  marginBottom: 6,
},

subMenuText: {
  color: "#444",
  fontWeight: "500",
},


});