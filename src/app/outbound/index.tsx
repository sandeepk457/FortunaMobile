import ModuleScreen from "@/components/wms/ModuleScreen";

export default function OutboundTasksScreen() {
  return (
    <ModuleScreen
      title="Outbound Execution"
      subtitle="Assigned pick tasks with order, customer, priority, bin scan, packing, loading and dispatch controls."
      icon="arrow-up-circle-outline"
      accent="#005F99"
      secondaryAccent="#C8102E"
      primaryRoute="/outbound/pick-scan"
      primaryLabel="Start pick scan"
      scannerLabel="Scan bin, item barcode and allocated quantity"
      metrics={[
        { label: "Pick tasks", value: "12", icon: "list-outline", tone: "blue" },
        { label: "High priority", value: "4", icon: "flash-outline", tone: "red" },
        { label: "Packed", value: "7", icon: "cube-outline", tone: "green" },
        { label: "Short picks", value: "2", icon: "alert-circle-outline", tone: "amber" },
      ]}
      steps={[
        { label: "Assigned Pick Tasks", detail: "Operator sees only warehouse-scoped work.", status: "active" },
        { label: "Barcode Pick Scan", detail: "Validate source bin, SKU and allocation.", status: "next" },
        { label: "Packing Confirmation", detail: "Confirm carton, label and shipment identity.", status: "next" },
        { label: "Dispatch Posting", detail: "Stock reduces only on authorized dispatch.", status: "next" },
      ]}
      tasks={[
        {
          id: "PICK-1048",
          title: "PICK-1048 · ORD-77821",
          subtitle: "Customer: Metro Retail · Bin A-04-02",
          status: "Allocated 18 EA · barcode required",
          priority: "High",
          route: "/outbound/pick-scan",
          icon: "cart-outline",
        },
        {
          id: "PICK-1051",
          title: "PICK-1051 · ORD-77843",
          subtitle: "Customer: HealthMart · Wave W-118",
          status: "Ready for picker assignment",
          priority: "Medium",
          route: "/outbound/pick-scan",
          icon: "basket-outline",
        },
      ]}
      controls={[
        { label: "Quantity guard", value: "Allocated max", icon: "shield-checkmark-outline", tone: "green" },
        { label: "Blocked stock", value: "Hidden", icon: "ban-outline", tone: "red" },
        { label: "Short pick", value: "Reason needed", icon: "document-text-outline", tone: "amber" },
        { label: "Dispatch", value: "Idempotent", icon: "git-compare-outline", tone: "blue" },
      ]}
      actions={[
        {
          label: "Packing / Dispatch",
          caption: "Verify package labels, loading bay and dispatch readiness.",
          icon: "archive-outline",
          route: "/outbound/packing-dispatch",
          tone: "blue",
        },
      ]}
    />
  );
}
