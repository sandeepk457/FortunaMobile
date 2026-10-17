import ModuleScreen from "@/components/wms/ModuleScreen";

export default function OfflineSyncScreen() {
  return (
    <ModuleScreen
      title="Offline Sync Queue"
      subtitle="Visible pending operations, bounded retry, conflict resolution and idempotent transactional sync."
      icon="cloud-upload-outline"
      accent="#005F99"
      secondaryAccent="#C8102E"
      primaryLabel="Retry selected queue"
      scannerLabel="Scan transaction or task reference to inspect queue state"
      metrics={[
        { label: "Pending", value: "5", icon: "cloud-offline-outline", tone: "amber" },
        { label: "Failed", value: "2", icon: "alert-circle-outline", tone: "red" },
        { label: "Synced", value: "38", icon: "checkmark-done-outline", tone: "green" },
        { label: "Last sync", value: "2m", icon: "time-outline", tone: "blue" },
      ]}
      steps={[
        { label: "Queue Operation", detail: "Only approved offline writes enter the queue.", status: "done" },
        { label: "Retry", detail: "Bounded exponential backoff is used.", status: "active" },
        { label: "Conflict", detail: "Server version/idempotency decides outcome.", status: "blocked" },
        { label: "Archive", detail: "Successful sync updates local state.", status: "next" },
      ]}
      tasks={[
        {
          id: "Q-PUT-2214",
          title: "PUT-2214 · Putaway confirm",
          subtitle: "Capacity conflict detected for Bin A-04-02",
          status: "Needs operator resolution",
          priority: "High",
          route: "/inbound/putaway-confirmation",
          icon: "git-compare-outline",
        },
        {
          id: "Q-CC-3102",
          title: "CC-3102 · Blind count submit",
          subtitle: "Queued offline with idempotency key",
          status: "Retry scheduled",
          priority: "Medium",
          route: "/cyclecount/blind-count",
          icon: "clipboard-outline",
        },
      ]}
      controls={[
        { label: "Idempotency", value: "Mandatory", icon: "key-outline", tone: "green" },
        { label: "Server wins", value: "Authority", icon: "server-outline", tone: "blue" },
        { label: "Secrets", value: "Not queued", icon: "lock-closed-outline", tone: "red" },
        { label: "Retry", value: "Bounded", icon: "refresh-outline", tone: "amber" },
      ]}
    />
  );
}
