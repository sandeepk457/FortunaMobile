import ModuleScreen from "@/components/wms/ModuleScreen";

export default function TransferDispatchScreen() {
  return (
    <ModuleScreen
      title="Transfer Dispatch"
      subtitle="Validate source warehouse, LPN, SKU, batch/serial identity and ship quantity before moving stock to transit."
      icon="navigate-circle-outline"
      accent="#C8102E"
      secondaryAccent="#005F99"
      primaryRoute="/transfer/receipt"
      primaryLabel="Ship transfer"
      scannerLabel="Scan transfer LPN and source bin"
      metrics={[
        { label: "Lines", value: "4", icon: "list-outline", tone: "blue" },
        { label: "Picked", value: "11", icon: "checkmark-circle-outline", tone: "green" },
        { label: "Pending", value: "7", icon: "hourglass-outline", tone: "amber" },
        { label: "Blocked", value: "0", icon: "close-circle-outline", tone: "red" },
      ]}
      steps={[
        { label: "Transfer Scope", detail: "Source and destination are active and different.", status: "done" },
        { label: "Source Pick", detail: "Available quantity checked at confirmation.", status: "active" },
        { label: "Dispatch", detail: "Stock becomes in transit after server commit.", status: "next" },
        { label: "Audit Link", detail: "Transfer number links ledger movement.", status: "next" },
      ]}
      tasks={[
        {
          id: "LPN-HYD-118",
          title: "LPN-HYD-118 · SKU-AX-440",
          subtitle: "Batch B26-08 · 10 EA",
          status: "Ready to ship",
          priority: "High",
          icon: "cube-outline",
        },
        {
          id: "LPN-HYD-122",
          title: "LPN-HYD-122 · SKU-PK-118",
          subtitle: "Serial capture required",
          status: "Serial validation pending",
          priority: "Medium",
          icon: "barcode-outline",
        },
      ]}
      controls={[
        { label: "Available stock", value: "Server checked", icon: "server-outline", tone: "green" },
        { label: "Over ship", value: "Blocked", icon: "close-circle-outline", tone: "red" },
        { label: "Partial ship", value: "Allowed", icon: "layers-outline", tone: "blue" },
        { label: "Idempotency", value: "Required", icon: "key-outline", tone: "amber" },
      ]}
    />
  );
}
