import ModuleScreen from "@/components/wms/ModuleScreen";

export default function CycleCountScreen() {
  return (
    <ModuleScreen
      title="Cycle Count"
      subtitle="Blind count workflow for released count plans, variance detection, recount routing and approval-ready submission."
      icon="clipboard-outline"
      accent="#C8102E"
      secondaryAccent="#005F99"
      primaryRoute="/cyclecount/blind-count"
      primaryLabel="Start blind count"
      scannerLabel="Scan bin or SKU without exposing system quantity"
      metrics={[
        { label: "Plans", value: "6", icon: "clipboard-outline", tone: "red" },
        { label: "Bins", value: "42", icon: "grid-outline", tone: "blue" },
        { label: "Variance", value: "5", icon: "pulse-outline", tone: "amber" },
        { label: "Approved", value: "12", icon: "checkmark-done-outline", tone: "green" },
      ]}
      steps={[
        { label: "Released Plan", detail: "Plan scope cannot change after release.", status: "done" },
        { label: "Blind Count", detail: "System quantity is hidden from counter.", status: "active" },
        { label: "Variance Review", detail: "Tolerance breach requires recount or approval.", status: "next" },
        { label: "Adjustment Posting", detail: "Ledger adjustment posts only after approval.", status: "next" },
      ]}
      tasks={[
        {
          id: "CC-3102",
          title: "CC-3102 · Zone A bins",
          subtitle: "18 bins · pharmaceuticals shelf",
          status: "Blind count ready",
          priority: "High",
          route: "/cyclecount/blind-count",
          icon: "grid-outline",
        },
        {
          id: "CC-3105",
          title: "CC-3105 · Batch audit",
          subtitle: "Batch controlled SKUs",
          status: "Variance recount required",
          priority: "Medium",
          route: "/cyclecount/blind-count",
          icon: "analytics-outline",
        },
      ]}
      controls={[
        { label: "System qty", value: "Hidden", icon: "eye-off-outline", tone: "red" },
        { label: "Tolerance", value: "+/- 2%", icon: "speedometer-outline", tone: "amber" },
        { label: "Submit", value: "Immutable", icon: "lock-closed-outline", tone: "blue" },
        { label: "Audit", value: "Required", icon: "finger-print-outline", tone: "green" },
      ]}
    />
  );
}
