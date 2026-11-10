import ModuleScreen from "@/components/wms/ModuleScreen";

export default function SerialNumberEntryScreen() {
  return (
    <ModuleScreen
      title="Serial Number Entry"
      subtitle="Capture unique serial identifiers and validate them against received quantities."
      icon="keypad-outline"
      primaryRoute="/inbound/damage-rejection-entry"
      primaryLabel="Review damage and rejection"
      scannerLabel="Scan or enter an item serial number"
      metrics={[
        { label: "Expected", value: "12", icon: "list-outline", tone: "blue" },
        { label: "Captured", value: "9", icon: "barcode-outline", tone: "green" },
        { label: "Remaining", value: "3", icon: "hourglass-outline", tone: "amber" },
        { label: "Duplicates", value: "0", icon: "copy-outline", tone: "red" },
      ]}
      steps={[
        { label: "Select line", detail: "Choose the serialized item from the receipt.", status: "done" },
        { label: "Capture serials", detail: "Scan each unique unit identifier.", status: "active" },
        { label: "Validate", detail: "Reject duplicate or previously used serials.", status: "next" },
        { label: "Save", detail: "Continue after serial count matches quantity.", status: "next" },
      ]}
      tasks={[
        {
          id: "SKU-004",
          title: "SKU-004 · Handheld Scanner",
          subtitle: "12 units expected · 9 serials recorded",
          status: "3 serial numbers remaining",
          priority: "High",
          icon: "barcode-outline",
        },
      ]}
      controls={[
        { label: "Duplicate serial", value: "Blocked", icon: "ban-outline", tone: "red" },
        { label: "Serial count", value: "Quantity checked", icon: "checkmark-circle-outline", tone: "green" },
      ]}
    />
  );
}