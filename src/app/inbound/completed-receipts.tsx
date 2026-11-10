import ModuleScreen from "@/components/wms/ModuleScreen";

export default function CompletedReceiptsScreen() {
  return (
    <ModuleScreen
      title="Completed Receipts"
      subtitle="Review posted inbound receipts and their accepted, rejected and putaway totals."
      icon="receipt-outline"
      primaryRoute="/inbound"
      primaryLabel="Back to inbound tasks"
      metrics={[
        { label: "Today", value: "8", icon: "calendar-outline", tone: "blue" },
        { label: "Accepted", value: "1,240", icon: "checkmark-circle-outline", tone: "green" },
        { label: "Rejected", value: "16", icon: "close-circle-outline", tone: "red" },
        { label: "Pending", value: "0", icon: "hourglass-outline", tone: "amber" },
      ]}
      steps={[
        { label: "Receipt posted", detail: "GRN posting is complete and immutable.", status: "done" },
        { label: "Stock ledger", detail: "Accepted quantities are recorded in inventory.", status: "done" },
        { label: "Putaway", detail: "Warehouse locations are assigned.", status: "done" },
        { label: "Audit", detail: "Receipt evidence and actions are retained.", status: "done" },
      ]}
      tasks={[
        {
          id: "GRN-2026-001",
          title: "GRN-2026-001 · ABC Suppliers",
          subtitle: "PO-2026-00125 · posted today",
          status: "Accepted 90 · Rejected 5 · Putaway 82",
          priority: "Medium",
          icon: "checkmark-done-outline",
        },
      ]}
      controls={[
        { label: "Edit posted receipt", value: "Blocked", icon: "lock-closed-outline", tone: "red" },
        { label: "Correction", value: "Reversal only", icon: "return-down-back-outline", tone: "amber" },
      ]}
    />
  );
}