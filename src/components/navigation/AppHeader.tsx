import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  title: string;
}

export default function AppHeader({
  title,
}: Props) {
  return (
    <LinearGradient
      colors={[COLORS.primary, "#A90D27", COLORS.secondary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <TouchableOpacity>
        <Ionicons
          name="menu"
          size={28}
          color="#fff"
        />
      </TouchableOpacity>

      <Text style={styles.title}>
        {title}
      </Text>

      <TouchableOpacity style={styles.notification}>
        <Ionicons
          name="notifications-outline"
          size={24}
          color="#fff"
        />

        <View style={styles.badge} />
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 65,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingHorizontal: 18,

    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: COLORS.secondary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 14,
    elevation: 8,
  },

  title: {
    color: COLORS.textPrimary,
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 1,
  },

  notification: {
    position: "relative",
  },

  badge: {
    width: 10,
    height: 10,
    borderRadius: 50,

    backgroundColor: COLORS.primary,

    position: "absolute",
    top: 0,
    right: 0,
  },
});