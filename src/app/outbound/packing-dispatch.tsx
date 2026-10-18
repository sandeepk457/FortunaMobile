import ModuleScreen from "@/components/wms/ModuleScreen";

export default function PackingDispatchScreen() {
  return (
    <ModuleScreen
      title="Packing & Dispatch"
      subtitle="Confirm carton, shipment verification, loading, vehicle handoff and final dispatch posting."
      icon="car-outline"
      accent="#005F99"
      secondaryAccent="#C8102E"
      primaryLabel="Post dispatch"
      scannerLabel="Scan carton label, dock door and dispatch manifest"
      metrics={[
        { label: "Cartons", value: "9", icon: "archive-outline", tone: "blue" },
        { label: "Loaded", value: "6", icon: "bus-outline", tone: "green" },
        { label: "Pending", value: "3", icon: "hourglass-outline", tone: "amber" },
        { label: "Holds", value: "1", icon: "alert-circle-outline", tone: "red" },
      ]}
      steps={[
        { label: "Packing Confirmation", detail: "Carton and label identity verified.", status: "active" },
        { label: "Shipment Verification", detail: "Order/customer/manifest must match.", status: "next" },
        { label: "Loading Confirmation", detail: "Dock and vehicle are captured.", status: "next" },
        { label: "Dispatch Posting", detail: "Transactional issue is posted on server.", status: "next" },
      ]}
      tasks={[
        {
          id: "DSP-2041",
          title: "DSP-2041 · Vehicle TS09-8842",
          subtitle: "Bay 3 · 9 cartons · Metro Retail",
          status: "Shipment verification pending",
          priority: "High",
          icon: "car-sport-outline",
        },
        {
          id: "DSP-2044",
          title: "DSP-2044 · Route South-2",
          subtitle: "5 orders · 18 packages",
          status: "Ready for loading confirmation",
          priority: "Medium",
          icon: "navigate-outline",
        },
      ]}
      controls={[
        { label: "Issue stock", value: "On dispatch", icon: "log-out-outline", tone: "red" },
        { label: "Manifest", value: "Required", icon: "document-attach-outline", tone: "blue" },
        { label: "Duplicate post", value: "Prevented", icon: "key-outline", tone: "green" },
        { label: "Hold", value: "Actionable", icon: "pause-circle-outline", tone: "amber" },
      ]}
    />
  );
}
