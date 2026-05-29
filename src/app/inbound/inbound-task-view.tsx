import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function InboundTaskView() {
  const router = useRouter();

 return (
  <View style={styles.container}>

    <ScrollView>
      
      {/* Header */}
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
          Inbound Tasks
        </Text>

        <View style={{ width: 24 }} />
      </View>

      {/* Summary */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryCount}>
          24
        </Text>

        <Text style={styles.summaryText}>
          Assigned Inbound Tasks
        </Text>
      </View>

      {/* Task Card */}
      <TouchableOpacity
        style={styles.taskCard}
        onPress={() =>
          router.push(
            "/inbound/asn-verification"
          )
        }
      >
        <View>
          <Text style={styles.taskNo}>
            TASK-0001
          </Text>

          <Text style={styles.poNo}>
            PO-2026-00125
          </Text>

          <Text style={styles.vendor}>
            ABC Suppliers Pvt Ltd
          </Text>

          <Text style={styles.status}>
            Pending ASN Verification
          </Text>
        </View>

        <Ionicons
          name="chevron-forward"
          size={24}
          color="#666"
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.taskCard}
      >
        <View>
          <Text style={styles.taskNo}>
            TASK-0002
          </Text>

          <Text style={styles.poNo}>
            PO-2026-00126
          </Text>

          <Text style={styles.vendor}>
            Reliance Retail
          </Text>

          <Text style={styles.status}>
            Pending GRN
          </Text>
        </View>

        <Ionicons
          name="chevron-forward"
          size={24}
          color="#666"
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.taskCard}
      >
        <View>
          <Text style={styles.taskNo}>
            TASK-0003
          </Text>

          <Text style={styles.poNo}>
            PO-2026-00127
          </Text>

          <Text style={styles.vendor}>
            ITC Foods
          </Text>

          <Text style={styles.status}>
            Pending QC
          </Text>
        </View>

        <Ionicons
          name="chevron-forward"
          size={24}
          color="#666"
        />
      </TouchableOpacity>

        </ScrollView>

    <View style={styles.bottomNav}>

      <TouchableOpacity
        onPress={() =>
          router.push("/dashboard")
        }
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
        onPress={() =>
          router.push("/dashboard/my-tasks")
        }
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
        onPress={() =>
          router.push("/scanner")
        }
      >
        <Ionicons
          name="scan-circle"
          size={42}
          color="#005F99"
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          router.push("/reports")
        }
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
        onPress={() =>
          router.push("/settings")
        }
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
    margin: 15,

    backgroundColor: "#FFF",

    borderRadius: 20,

    padding: 25,

    alignItems: "center",

    elevation: 3,
  },

  summaryCount: {
    fontSize: 38,

    fontWeight: "700",

    color: "#C8102E",
  },

  summaryText: {
    color: "#666",

    marginTop: 5,
  },

  taskCard: {
    backgroundColor: "#FFF",

    marginHorizontal: 15,

    marginBottom: 12,

    padding: 18,

    borderRadius: 18,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    elevation: 2,
  },

  taskNo: {
    fontSize: 16,

    fontWeight: "700",

    color: "#111",
  },

  poNo: {
    marginTop: 4,

    color: "#005F99",

    fontWeight: "600",
  },

  vendor: {
    marginTop: 4,

    color: "#666",
  },

  status: {
    marginTop: 6,

    color: "#C8102E",

    fontWeight: "700",
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