import ModuleScreen from "@/components/wms/ModuleScreen";

export default function RFIDScanScreen() {
  return (
    <ModuleScreen
      title="RFID Scan"
      subtitle="Read tagged units and reconcile EPC identities with the expected receipt."
      icon="radio-outline"
      accent="#005F99"
      secondaryAccent="#16A34A"
      primaryRoute="/inbound/quantity-confirmation"
      primaryLabel="Confirm scanned quantities"
      scannerLabel="Hold the RFID reader over tagged items"
      metrics={[
        { label: "Expected", value: "95", icon: "list-outline", tone: "blue" },
        { label: "Read", value: "82", icon: "radio-outline", tone: "green" },
        { label: "Remaining", value: "13", icon: "hourglass-outline", tone: "amber" },
        { label: "Unknown", value: "0", icon: "help-circle-outline", tone: "red" },
      ]}
      steps={[
        { label: "Connect reader", detail: "Verify the assigned RFID reader is available.", status: "done" },
        { label: "Read tags", detail: "Capture EPCs for the receipt items.", status: "active" },
        { label: "Reconcile", detail: "Compare captured tags with expected inventory.", status: "next" },
        { label: "Confirm", detail: "Proceed after unresolved tags are handled.", status: "next" },
      ]}
      tasks={[
        {
          id: "EPC-001",
          title: "Receipt PO-2026-00125",
          subtitle: "Warehouse HYD-01 · 13 units left to read",
          status: "RFID reconciliation in progress",
          priority: "High",
          route: "/inbound/quantity-confirmation",
          icon: "radio-outline",
        },
      ]}
      controls={[
        { label: "Unknown tags", value: "Blocked", icon: "ban-outline", tone: "red" },
        { label: "Duplicate reads", value: "Filtered", icon: "filter-outline", tone: "blue" },
      ]}
    />
  );
}