import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          height: 75,
          borderTopWidth: 0,
          backgroundColor: "#FFFFFF",
          elevation: 10,
        },

        tabBarActiveTintColor: "#C8102E",
        tabBarInactiveTintColor: "#005F99",

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginBottom: 6,
        },
      }}
    >

      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Home",

          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="home"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="tasks"
        options={{
          title: "Tasks",

          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="clipboard"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="scanner"
        options={{
          title: "Scan",

          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="scan-circle"
              size={58}
              color={
                focused
                  ? "#C8102E"
                  : "#005F99"
              }
            />
          ),

          tabBarLabelStyle: {
            display: "none",
          },
        }}
      />

      <Tabs.Screen
        name="reports"
        options={{
          title: "Reports",

          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="stats-chart"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",

          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="settings"
              size={size}
              color={color}
            />
          ),
        }}
      />

    </Tabs>
  );
}