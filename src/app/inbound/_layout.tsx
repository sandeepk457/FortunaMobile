import { Stack } from "expo-router";

export default function InboundLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />

      <Stack.Screen
        name="inbound-task-view"
      />

      <Stack.Screen
        name="asn-verification"
      />

      <Stack.Screen
        name="po-verification"
      />

      <Stack.Screen
        name="grn-execution"
      />

      <Stack.Screen
        name="item-scan"
      />

      <Stack.Screen
        name="rfid-scan"
      />

      <Stack.Screen
        name="quantity-confirmation"
      />

      <Stack.Screen
        name="qc-inspection"
      />

      <Stack.Screen
        name="batch-lot-entry"
      />

      <Stack.Screen
        name="serial-number-entry"
      />

      <Stack.Screen
        name="damage-rejection-entry"
      />

      <Stack.Screen
        name="attachment-upload"
      />

      <Stack.Screen
        name="putaway-confirmation"
      />

      <Stack.Screen
        name="inbound-completion"
      />
    </Stack>
  );
}