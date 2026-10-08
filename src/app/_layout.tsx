import "react-native-gesture-handler";

import { Drawer } from "expo-router/drawer";

export default function RootLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: false,

        drawerStyle: {
          backgroundColor: "#F8FBFD",
          width: 280,
          borderTopRightRadius: 28,
          borderBottomRightRadius: 28,
        },

        drawerActiveTintColor: "#C8102E",
        drawerInactiveTintColor: "#005F99",
        drawerActiveBackgroundColor: "#FCE8EC",
        overlayColor: "rgba(23,32,51,0.32)",

        drawerLabelStyle: {
          fontSize: 15,
          fontWeight: "700",
        },
        drawerItemStyle: {
          borderRadius: 14,
          marginHorizontal: 10,
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