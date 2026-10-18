import ModuleScreen from "@/components/wms/ModuleScreen";

export default function InboundCompletionScreen() {
  return (
    <ModuleScreen
      title="Inbound Completion"
      subtitle="Final accepted, rejected and putaway summary with immutable posting reference and next operational action."
      icon="checkmark-done-circle-outline"
      accent="#16A34A"
      secondaryAccent="#005F99"
      primaryRoute="/inbound/completed-receipts"
      primaryLabel="View completed receipts"
      scannerLabel="Scan GRN or LPN to verify posted completion"
      metrics={[
        { label: "Accepted", value: "140", icon: "checkmark-circle-outline", tone: "green" },
        { label: "Rejected", value: "5", icon: "close-circle-outline", tone: "red" },
        { label: "Putaway", value: "132", icon: "cube-outline", tone: "blue" },
        { label: "Pending", value: "8", icon: "hourglass-outline", tone: "amber" },
      ]}
      steps={[
        { label: "GRN Posted", detail: "Server created stock ledger and audit record.", status: "done" },
        { label: "QC Settled", detail: "QC-required items pass before available stock.", status: "done" },
        { label: "Putaway", detail: "Remaining accepted quantity is routed to location.", status: "active" },
        { label: "Completion", detail: "Receipt becomes non-editable after posting.", status: "next" },
      ]}
      tasks={[
        {
          id: "GRN-2026-001",
          title: "GRN-2026-001 · ABC Suppliers",
          subtitle: "Posting ref: LEDGER-INB-7712",
          status: "Accepted 90 · Rejected 5 · Putaway 82",
          priority: "High",
          route: "/inbound/completed-receipts",
          icon: "receipt-outline",
        },
        {
          id: "GRN-2026-002",
          title: "GRN-2026-002 · Reliance Retail",
          subtitle: "QC passed · LPN labels generated",
          status: "Ready for final putaway",
          priority: "Medium",
          route: "/inbound/putaway-confirmation",
          icon: "cube-outline",
        },
      ]}
      controls={[
        { label: "Posted edit", value: "Blocked", icon: "lock-closed-outline", tone: "red" },
        { label: "Ledger", value: "Created", icon: "server-outline", tone: "green" },
        { label: "Audit", value: "Captured", icon: "finger-print-outline", tone: "blue" },
        { label: "Correction", value: "Reversal only", icon: "return-down-back-outline", tone: "amber" },
      ]}
    />
  );
}
