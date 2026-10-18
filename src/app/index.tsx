import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";

export default function Index() {
  const [isReady, setReady] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadSession() {
      const stored = await AsyncStorage.getItem("fortuna_session");

      if (!active) {
        return;
      }

      setLoggedIn(Boolean(stored));
      setReady(true);
    }

    loadSession();

    return () => {
      active = false;
    };
  }, []);

  if (!isReady) {
    return null;
  }

  return <Redirect href={isLoggedIn ? "/dashboard" : "/auth/login"} />;
}