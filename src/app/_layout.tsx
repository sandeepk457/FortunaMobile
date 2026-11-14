import "react-native-gesture-handler";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, usePathname, useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";

import BottomNavigation from "@/components/BottomNavigation";

const PUBLIC_PATHS = ["/", "/auth/login", "/auth/forgot-password"];

export default function RootLayout() {
  const pathname = usePathname();
  const router = useRouter();
  const isPublicPath = PUBLIC_PATHS.includes(pathname);

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
    <View style={styles.container}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="(tabs)"
          options={{
            title: "Fortuna SIMS",
          }}
        />
      </Stack>
      {!isPublicPath && <BottomNavigation />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});