import { Stack } from "expo-router";

export default function DashboardLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />

      <Stack.Screen
        name="warehouse-selection"
      />

      <Stack.Screen
        name="shift-login"
      />

      <Stack.Screen
        name="device-binding"
      />

      <Stack.Screen
        name="alerts-dashboard"
      />
    </Stack>
  );
}