import ModuleScreen from "@/components/wms/ModuleScreen";

export default function BlindCountScreen() {
  return (
    <ModuleScreen
      title="Blind Count Entry"
      subtitle="Capture physical quantity by bin, SKU, batch and blocked/expired state while keeping system quantity hidden."
      icon="eye-off-outline"
      accent="#005F99"
      secondaryAccent="#C8102E"
      primaryLabel="Submit count"
      scannerLabel="Scan bin A-04 and count visible stock"
      metrics={[
        { label: "Counted", value: "14", icon: "checkmark-circle-outline", tone: "green" },
        { label: "Remaining", value: "28", icon: "hourglass-outline", tone: "amber" },
        { label: "Recount", value: "3", icon: "refresh-circle-outline", tone: "red" },
        { label: "Offline OK", value: "Queue", icon: "cloud-offline-outline", tone: "blue" },
      ]}
      steps={[
        { label: "Bin Scan", detail: "Only active warehouse scope can be counted.", status: "active" },
        { label: "Quantity Entry", detail: "Counter enters physical quantity only.", status: "next" },
        { label: "Variance Flag", detail: "Variance displays after submit when allowed.", status: "next" },
        { label: "Approval Queue", detail: "Adjustment awaits authorized approval.", status: "next" },
      ]}
      tasks={[
        {
          id: "BIN-A-04",
          title: "BIN-A-04 · SKU-AX-440",
          subtitle: "Batch B26-08 · expiry capture enabled",
          status: "Count entry pending",
          priority: "High",
          icon: "cube-outline",
        },
        {
          id: "BIN-A-06",
          title: "BIN-A-06 · Mixed SKU audit",
          subtitle: "Blocked stock counted separately",
          status: "Scan bin to continue",
          priority: "Medium",
          icon: "albums-outline",
        },
      ]}
      controls={[
        { label: "Plan scope", value: "Locked", icon: "lock-closed-outline", tone: "blue" },
        { label: "Variance", value: "After submit", icon: "pulse-outline", tone: "amber" },
        { label: "Approval", value: "Required", icon: "person-circle-outline", tone: "green" },
        { label: "Edit", value: "Blocked", icon: "ban-outline", tone: "red" },
      ]}
    />
  );
}
