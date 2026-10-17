import ModuleScreen from "@/components/wms/ModuleScreen";

export default function InventoryLookupScreen() {
  return (
    <ModuleScreen
      title="Inventory Lookup"
      subtitle="Read-only stock visibility by SKU, barcode, batch, LPN and bin with movement history and authorization-aware filters."
      icon="search-outline"
      accent="#005F99"
      secondaryAccent="#16A34A"
      primaryLabel="Open stock result"
      scannerLabel="Scan SKU, barcode, batch, LPN or bin"
      metrics={[
        { label: "Available", value: "1,284", icon: "checkmark-circle-outline", tone: "green" },
        { label: "Reserved", value: "218", icon: "bookmark-outline", tone: "blue" },
        { label: "Blocked", value: "42", icon: "ban-outline", tone: "red" },
        { label: "Transit", value: "87", icon: "navigate-outline", tone: "amber" },
      ]}
      steps={[
        { label: "Search Identity", detail: "SKU, barcode, batch or bin scan.", status: "active" },
        { label: "Scope Filter", detail: "Warehouse filters respect authorization.", status: "next" },
        { label: "Availability View", detail: "Available equals total minus reserved and blocked.", status: "next" },
        { label: "Movement History", detail: "Stock ledger remains source of truth.", status: "next" },
      ]}
      tasks={[
        {
          id: "INV-SKU-AX-440",
          title: "SKU-AX-440 · Surgical Gloves",
          subtitle: "Available 284 · Reserved 42 · Blocked 6",
          status: "Bins: A-04-02, A-04-04, Q-02-01",
          priority: "High",
          icon: "medical-outline",
        },
        {
          id: "INV-LPN-HYD-118",
          title: "LPN-HYD-118 · Handling Unit",
          subtitle: "HYD-01 · Rack A · Bin A-04-02",
          status: "Last movement: Putaway PUT-2214",
          icon: "cube-outline",
        },
      ]}
      controls={[
        { label: "Read-only", value: "No posting", icon: "eye-outline", tone: "green" },
        { label: "Transit", value: "Not available", icon: "pause-circle-outline", tone: "amber" },
        { label: "Blocked", value: "Not reservable", icon: "ban-outline", tone: "red" },
        { label: "Ledger", value: "Authority", icon: "server-outline", tone: "blue" },
      ]}
    />
  );
}
