import ModuleScreen from "@/components/wms/ModuleScreen";

export default function PickScanScreen() {
  return (
    <ModuleScreen
      title="Pick Scan"
      subtitle="Scan-first pick confirmation for source bin, item barcode, allocated quantity and short-pick exception handling."
      icon="barcode-outline"
      accent="#C8102E"
      secondaryAccent="#005F99"
      primaryRoute="/outbound/packing-dispatch"
      primaryLabel="Confirm pick and pack"
      scannerLabel="Scan source bin A-04-02 and SKU barcode"
      metrics={[
        { label: "Allocated", value: "18", icon: "cube-outline", tone: "blue" },
        { label: "Scanned", value: "12", icon: "scan-outline", tone: "green" },
        { label: "Remaining", value: "6", icon: "hourglass-outline", tone: "amber" },
        { label: "Exceptions", value: "0", icon: "warning-outline", tone: "red" },
      ]}
      steps={[
        { label: "Source Bin", detail: "Bin must be in operator warehouse scope.", status: "done" },
        { label: "Barcode Pick Scan", detail: "SKU and batch identity must match allocation.", status: "active" },
        { label: "Quantity Confirm", detail: "Pick quantity cannot exceed allocated quantity.", status: "next" },
        { label: "Short Pick Reason", detail: "Required when picked quantity is lower than allocation.", status: "next" },
      ]}
      tasks={[
        {
          id: "SKU-AX-440",
          title: "SKU-AX-440 · Surgical Gloves",
          subtitle: "Batch B26-08 · Bin A-04-02",
          status: "Scan matched · 12 of 18 EA staged",
          priority: "High",
          icon: "medical-outline",
        },
        {
          id: "SKU-PK-118",
          title: "SKU-PK-118 · Carton Inserts",
          subtitle: "Bin A-04-04 · FIFO required",
          status: "Waiting for barcode validation",
          priority: "Medium",
          icon: "cube-outline",
        },
      ]}
      controls={[
        { label: "Over pick", value: "Blocked", icon: "close-circle-outline", tone: "red" },
        { label: "Expired batch", value: "Blocked", icon: "time-outline", tone: "red" },
        { label: "Duplicate scan", value: "Debounced", icon: "repeat-outline", tone: "blue" },
        { label: "Audit", value: "Device logged", icon: "finger-print-outline", tone: "green" },
      ]}
    />
  );
}
