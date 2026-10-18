import ModuleScreen from "@/components/wms/ModuleScreen";

export default function TransferScreen() {
  return (
    <ModuleScreen
      title="Transfer Execution"
      subtitle="Source pick to dispatch, in-transit control, destination receipt and destination putaway."
      icon="swap-horizontal-outline"
      accent="#005F99"
      secondaryAccent="#C8102E"
      primaryRoute="/transfer/dispatch"
      primaryLabel="Start transfer dispatch"
      scannerLabel="Scan source LPN, SKU and transfer number"
      metrics={[
        { label: "Transfers", value: "8", icon: "git-compare-outline", tone: "blue" },
        { label: "In transit", value: "3", icon: "navigate-outline", tone: "amber" },
        { label: "Receipts", value: "2", icon: "download-outline", tone: "green" },
        { label: "Exceptions", value: "1", icon: "alert-circle-outline", tone: "red" },
      ]}
      steps={[
        { label: "Source Pick", detail: "Available stock is validated at posting time.", status: "active" },
        { label: "Transfer Dispatch", detail: "Linked ledger movement uses transfer number.", status: "next" },
        { label: "Destination Receipt", detail: "Receipt cannot exceed shipped quantity.", status: "next" },
        { label: "Destination Putaway", detail: "Batch and serial identity are preserved.", status: "next" },
      ]}
      tasks={[
        {
          id: "TRF-9004",
          title: "TRF-9004 · HYD-01 to BLR-02",
          subtitle: "SKU mix: 4 lines · 18 LPNs",
          status: "Source pick ready",
          priority: "High",
          route: "/transfer/dispatch",
          icon: "swap-horizontal-outline",
        },
        {
          id: "TRF-9007",
          title: "TRF-9007 · HYD-01 to MUM-03",
          subtitle: "Partial shipment enabled",
          status: "Awaiting destination receipt",
          priority: "Medium",
          route: "/transfer/receipt",
          icon: "trail-sign-outline",
        },
      ]}
      controls={[
        { label: "Same warehouse", value: "Blocked", icon: "ban-outline", tone: "red" },
        { label: "Partial", value: "Configured", icon: "options-outline", tone: "blue" },
        { label: "Identity", value: "Preserved", icon: "finger-print-outline", tone: "green" },
        { label: "Cancel", value: "Movement locks", icon: "lock-closed-outline", tone: "amber" },
      ]}
      actions={[
        {
          label: "Destination Receipt",
          caption: "Receive shipped stock without exceeding dispatch quantity.",
          icon: "download-outline",
          route: "/transfer/receipt",
          tone: "green",
        },
      ]}
    />
  );
}
