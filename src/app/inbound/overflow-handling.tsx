import ModuleScreen from "@/components/wms/ModuleScreen";

export default function OverflowHandlingScreen() {
  return (
    <ModuleScreen
      title="Overflow Handling"
      subtitle="Request permitted overflow or choose an alternate eligible bin when suggested capacity is exceeded."
      icon="warning-outline"
      accent="#C8102E"
      secondaryAccent="#B7791F"
      overlapMetrics={false}
      primaryRoute="/inbound/putaway-confirmation"
      primaryLabel="Apply overflow decision"
      scannerLabel="Scan alternate rack and bin before approval"
      metrics={[
        { label: "Bin capacity", value: "96%", icon: "speedometer-outline", tone: "amber" },
        { label: "Pending qty", value: "18", icon: "cube-outline", tone: "blue" },
        { label: "Alternates", value: "3", icon: "git-branch-outline", tone: "green" },
        { label: "Blocked", value: "1", icon: "ban-outline", tone: "red" },
      ]}
      steps={[
        { label: "Capacity Check", detail: "Projected occupancy exceeds normal capacity.", status: "blocked" },
        { label: "Alternate Bin", detail: "Operator can scan configured eligible bin.", status: "active" },
        { label: "Overflow Reason", detail: "Reason and permission are mandatory.", status: "next" },
        { label: "Confirm Movement", detail: "Server creates auditable putaway movement.", status: "next" },
      ]}
      tasks={[
        {
          id: "BIN-A-04-02",
          title: "Suggested Bin A-04-02",
          subtitle: "Capacity conflict for LPN-HYD-118",
          status: "Overflow approval required",
          priority: "High",
          icon: "warning-outline",
        },
        {
          id: "BIN-A-05-01",
          title: "Alternate Bin A-05-01",
          subtitle: "Same zone · active · 64% occupancy",
          status: "Eligible alternate",
          priority: "Medium",
          icon: "checkmark-circle-outline",
        },
      ]}
      controls={[
        { label: "Blocked bins", value: "Excluded", icon: "ban-outline", tone: "red" },
        { label: "Reason", value: "Mandatory", icon: "document-text-outline", tone: "amber" },
        { label: "Permission", value: "Checked", icon: "shield-outline", tone: "blue" },
        { label: "Quantity", value: "Pending max", icon: "checkmark-done-outline", tone: "green" },
      ]}
    />
  );
}
