import ModuleScreen from "@/components/wms/ModuleScreen";

export default function QuantityConfirmationScreen() {
  return (
    <ModuleScreen
      title="Quantity Confirmation"
      subtitle="Confirm scanned SKU quantities before GRN execution, with balance, over-receipt and duplicate scan controls."
      icon="calculator-outline"
      accent="#005F99"
      secondaryAccent="#C8102E"
      overlapMetrics={false}
      primaryRoute="/inbound/grn-execution"
      primaryLabel="Proceed to GRN execution"
      scannerLabel="Scan item barcode again to confirm quantity identity"
      metrics={[
        { label: "Ordered", value: "100", icon: "document-text-outline", tone: "blue" },
        { label: "Received", value: "95", icon: "download-outline", tone: "green" },
        { label: "Balance", value: "5", icon: "hourglass-outline", tone: "amber" },
        { label: "Rejected", value: "0", icon: "close-circle-outline", tone: "red" },
      ]}
      steps={[
        { label: "Scan Item", detail: "Barcode matched PO line and SKU identity.", status: "done" },
        { label: "Quantity Confirm", detail: "Received quantity is validated against PO balance.", status: "active" },
        { label: "GRN Execution", detail: "Server posts transactional GRN details.", status: "next" },
        { label: "QC / Traceability", detail: "QC, batch and serial controls apply when configured.", status: "next" },
      ]}
      tasks={[
        {
          id: "SKU-002",
          title: "SKU-002 · Stretch Film",
          subtitle: "PO-2026-00125 · expected 50 EA",
          status: "Scanned QR-8901234567891",
          priority: "High",
          route: "/inbound/grn-execution",
          icon: "barcode-outline",
        },
        {
          id: "SKU-003",
          title: "SKU-003 · Packing Tape",
          subtitle: "Balance 200 EA · scan pending",
          status: "Waiting for item confirmation",
          priority: "Medium",
          route: "/inbound/scan-item",
          icon: "cube-outline",
        },
      ]}
      controls={[
        { label: "Over receipt", value: "Blocked", icon: "ban-outline", tone: "red" },
        { label: "Duplicate", value: "Debounced", icon: "repeat-outline", tone: "blue" },
        { label: "PO balance", value: "Server checked", icon: "server-outline", tone: "green" },
        { label: "Draft", value: "Allowed", icon: "save-outline", tone: "amber" },
      ]}
    />
  );
}
