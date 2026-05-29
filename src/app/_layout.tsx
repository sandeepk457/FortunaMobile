import "react-native-gesture-handler";

import { Drawer } from "expo-router/drawer";

export default function RootLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: false,

        drawerStyle: {
          backgroundColor: "#FFFFFF",
          width: 280,
        },

        drawerActiveTintColor: "#C8102E",
        drawerInactiveTintColor: "#005F99",

        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: "600",
        },
      }}
    >

      <Drawer.Screen
        name="(tabs)"
        options={{
          title: "Fortuna SIMS",
        }}
      />

    </Drawer>
  );
}