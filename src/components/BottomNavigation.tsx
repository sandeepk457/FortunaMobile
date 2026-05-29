import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function BottomNavigation() {
  const router = useRouter();

  return (
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

      <TouchableOpacity>
        <Ionicons
          name="scan-circle"
          size={42}
          color="#005F99"
        />
      </TouchableOpacity>

      <TouchableOpacity>
        <Ionicons
          name="bar-chart"
          size={22}
          color="#005F99"
        />
        <Text style={styles.navText}>
          Reports
        </Text>
      </TouchableOpacity>

      <TouchableOpacity>
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
  );
}

const styles = StyleSheet.create({
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