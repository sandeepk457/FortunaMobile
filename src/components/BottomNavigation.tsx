import { Ionicons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const tabs = [
  { label: "Home", href: "/dashboard", icon: "home-outline" },
  { label: "Tasks", href: "/tasks", icon: "clipboard-outline" },
  { label: "Scan", href: "/scanner", icon: "scan-circle-outline" },
  { label: "Reports", href: "/reports", icon: "stats-chart-outline" },
  { label: "Settings", href: "/settings", icon: "settings-outline" },
] as const;

export default function BottomNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.bottomNav, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      {tabs.map((tab) => {
        const isActive =
          pathname === tab.href ||
          pathname.startsWith(`${tab.href}/`) ||
          (tab.href === "/tasks" && pathname.startsWith("/dashboard/my-tasks"));
        const color = isActive ? "#C8102E" : "#005F99";

        return (
          <Pressable
            key={tab.href}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            onPress={() => router.replace(tab.href)}
            style={({ pressed }) => [styles.tab, pressed && styles.pressed]}
          >
            <Ionicons
              name={tab.icon}
              size={tab.label === "Scan" ? 30 : 22}
              color={color}
            />
            <Text style={[styles.navText, { color }]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    minHeight: 70,
    backgroundColor: "#F8FBFD",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#D8E6F0",
    paddingTop: 6,
  },
  tab: {
    minWidth: 54,
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  navText: {
    fontSize: 11,
    fontWeight: "700",
  },
  pressed: {
    opacity: 0.7,
  },
});
