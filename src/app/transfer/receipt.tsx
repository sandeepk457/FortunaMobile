import ModuleScreen from "@/components/wms/ModuleScreen";

export default function TransferReceiptScreen() {
  return (
    <ModuleScreen
      title="Destination Receipt"
      subtitle="Receive in-transit transfer stock, preserve traceability and route accepted quantity to destination putaway."
      icon="download-outline"
      accent="#005F99"
      secondaryAccent="#16A34A"
      primaryLabel="Receive and putaway"
      scannerLabel="Scan transfer, LPN and destination dock"
      metrics={[
        { label: "Shipped", value: "18", icon: "navigate-outline", tone: "blue" },
        { label: "Received", value: "12", icon: "download-outline", tone: "green" },
        { label: "Balance", value: "6", icon: "hourglass-outline", tone: "amber" },
        { label: "Variance", value: "0", icon: "alert-outline", tone: "red" },
      ]}
      steps={[
        { label: "In Transit", detail: "Transfer remains open until receipt posts.", status: "done" },
        { label: "Destination Receipt", detail: "Receipt cannot exceed shipped quantity.", status: "active" },
        { label: "Identity Check", detail: "Batch and serial identity remain linked.", status: "next" },
        { label: "Putaway", detail: "Destination bin movement completes lifecycle.", status: "next" },
      ]}
      tasks={[
        {
          id: "RCV-TRF-9007",
          title: "TRF-9007 · Receive at MUM-03",
          subtitle: "Dock D-2 · 6 LPNs expected",
          status: "Awaiting dock scan",
          priority: "High",
          icon: "download-outline",
        },
        {
          id: "RCV-TRF-9002",
          title: "TRF-9002 · Receive at BLR-02",
          subtitle: "Partial receipt allowed",
          status: "3 LPNs already received",
          priority: "Medium",
          icon: "file-tray-stacked-outline",
        },
      ]}
      controls={[
        { label: "Over receive", value: "Blocked", icon: "close-circle-outline", tone: "red" },
        { label: "Transit stock", value: "Not available", icon: "pause-circle-outline", tone: "amber" },
        { label: "Destination", value: "Scope checked", icon: "business-outline", tone: "blue" },
        { label: "Ledger", value: "Linked", icon: "git-network-outline", tone: "green" },
      ]}
    />
  );
}
