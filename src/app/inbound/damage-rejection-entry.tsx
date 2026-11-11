import ModuleScreen from "@/components/wms/ModuleScreen";

export default function DamageRejectionEntryScreen() {
  return (
    <ModuleScreen
      title="Damage / Rejection Entry"
      subtitle="Record damaged quantities, rejection reasons and supporting evidence for receipt lines."
      icon="alert-circle-outline"
      accent="#B7791F"
      primaryRoute="/inbound/attachment-upload"
      primaryLabel="Add supporting evidence"
      metrics={[
        { label: "Received", value: "95", icon: "download-outline", tone: "blue" },
        { label: "Accepted", value: "90", icon: "checkmark-circle-outline", tone: "green" },
        { label: "Rejected", value: "5", icon: "close-circle-outline", tone: "red" },
        { label: "Unresolved", value: "0", icon: "alert-circle-outline", tone: "amber" },
      ]}
      steps={[
        { label: "Inspect item", detail: "Verify condition against the receipt line.", status: "done" },
        { label: "Record quantity", detail: "Enter the damaged or rejected amount.", status: "active" },
        { label: "Select reason", detail: "Choose a reason for each rejected unit.", status: "next" },
        { label: "Attach evidence", detail: "Add photos or documents when required.", status: "next" },
      ]}
      tasks={[
        {
          id: "SKU-001",
          title: "SKU-001 · Corrugated Box",
          subtitle: "5 units damaged during delivery",
          status: "Reason and evidence required",
          priority: "High",
          route: "/inbound/attachment-upload",
          icon: "warning-outline",
        },
      ]}
      controls={[
        { label: "Accepted stock", value: "Separated", icon: "git-compare-outline", tone: "green" },
        { label: "Reason code", value: "Required", icon: "list-outline", tone: "amber" },
      ]}
    />
  );
}