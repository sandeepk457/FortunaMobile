import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import AnimatedEntrance from "@/components/ui/AnimatedEntrance";
import HoverCard from "@/components/ui/HoverCard";
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
    <AnimatedEntrance style={styles.wrapper}>
      <HoverCard style={styles.hoverCard}>
        <View style={[styles.card, { borderTopColor: color }]}>
          <View style={[styles.accent, { backgroundColor: color }]} />
          <Text style={styles.value}>
            {value}
          </Text>

          <Text style={styles.title}>
            {title}
          </Text>
        </View>
      </HoverCard>
    </AnimatedEntrance>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 17,
    marginBottom: 14,
    borderTopWidth: 3,
    borderColor: "#E0EAF2",
    borderWidth: 1,
    shadowColor: COLORS.secondary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 14,
    elevation: 4,
  },

  wrapper: {
    width: "48%",
  },

  hoverCard: {
    flex: 1,
  },

  accent: {
    width: 32,
    height: 4,
    borderRadius: 3,
    marginBottom: 12,
  },

  value: {
    color: "#172033",
    fontSize: 28,
    fontWeight: "900",
  },

  title: {
    color: "#64788C",
    marginTop: 6,
    fontSize: 14,
  },
});