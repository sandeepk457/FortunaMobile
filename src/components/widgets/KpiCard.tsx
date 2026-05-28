import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import { COLORS } from "@/theme/colors";

interface Props {
  title: string;
  value: string;
  color: string;
}

export default function KpiCard({
  title,
  value,
  color,
}: Props) {
  return (
    <View
      style={[
        styles.card,
        {
          borderTopColor: color,
        },
      ]}
    >
      <Text style={styles.value}>
        {value}
      </Text>

      <Text style={styles.title}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",

    backgroundColor: COLORS.card,

    borderRadius: 18,

    padding: 18,

    marginBottom: 14,

    borderTopWidth: 5,

    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,

    elevation: 4,
  },

  value: {
    color: COLORS.textPrimary,
    fontSize: 28,
    fontWeight: "bold",
  },

  title: {
    color: COLORS.textSecondary,
    marginTop: 8,
    fontSize: 14,
  },
});