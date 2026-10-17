import "react-native-gesture-handler";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { usePathname, useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { useEffect } from "react";

const PUBLIC_PATHS = ["/", "/auth/login", "/auth/forgot-password"];

export default function RootLayout() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    let active = true;

    async function enforceSession() {
      const hasSession = Boolean(await AsyncStorage.getItem("fortuna_session"));

      if (!active) {
        return;
      }

      if (!hasSession && !PUBLIC_PATHS.includes(pathname)) {
        router.replace("/auth/login");
      }
    }

    enforceSession();

    return () => {
      active = false;
    };
  }, [pathname, router]);

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