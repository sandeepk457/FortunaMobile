import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  title: string;
}

export default function AppHeader({
  title,
}: Props) {
  return (
    <View style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 65,
    backgroundColor: COLORS.secondary,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingHorizontal: 18,

    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,

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