import ModuleScreen from "@/components/wms/ModuleScreen";

export default function BatchLotEntryScreen() {
  return (
    <ModuleScreen
      title="Batch / Lot Entry"
      subtitle="Capture supplier lot identity and expiry details for traceable inbound stock."
      icon="barcode-outline"
      primaryRoute="/inbound/serial-number-entry"
      primaryLabel="Continue to serial numbers"
      scannerLabel="Scan the supplier lot label"
      metrics={[
        { label: "Items", value: "4", icon: "cube-outline", tone: "blue" },
        { label: "Lots entered", value: "3", icon: "pricetag-outline", tone: "green" },
        { label: "Pending", value: "1", icon: "hourglass-outline", tone: "amber" },
        { label: "Expired", value: "0", icon: "alert-circle-outline", tone: "red" },
      ]}
      steps={[
        { label: "Select SKU", detail: "Choose the receipt line requiring lot traceability.", status: "done" },
        { label: "Capture lot", detail: "Scan or enter the supplier lot identifier.", status: "active" },
        { label: "Expiry check", detail: "Validate dates against warehouse policy.", status: "next" },
        { label: "Save", detail: "Continue with the recorded lot information.", status: "next" },
      ]}
      tasks={[
        {
          id: "SKU-001",
          title: "SKU-001 · Corrugated Box",
          subtitle: "PO-2026-00125 · batch tracking required",
          status: "Lot details pending",
          priority: "High",
          route: "/inbound/serial-number-entry",
          icon: "cube-outline",
        },
      ]}
      controls={[
        { label: "Duplicate lot", value: "Checked", icon: "copy-outline", tone: "blue" },
        { label: "Expiry date", value: "Required", icon: "calendar-outline", tone: "amber" },
      ]}
    />
  );
}