import ModuleScreen from "@/components/wms/ModuleScreen";

export default function NotificationsScreen() {
  return (
    <ModuleScreen
      title="Notifications"
      subtitle="Task alerts, priority changes, sync failures, stock exceptions and warehouse operational notices."
      icon="notifications-outline"
      accent="#C8102E"
      secondaryAccent="#005F99"
      primaryRoute="/sync"
      primaryLabel="Review sync queue"
      scannerLabel="Scan a task reference from alert details"
      metrics={[
        { label: "Unread", value: "9", icon: "mail-unread-outline", tone: "red" },
        { label: "Priority", value: "3", icon: "flash-outline", tone: "amber" },
        { label: "Sync", value: "2", icon: "cloud-offline-outline", tone: "blue" },
        { label: "Resolved", value: "18", icon: "checkmark-done-outline", tone: "green" },
      ]}
      steps={[
        { label: "Alert Received", detail: "Operator sees role-scoped notifications.", status: "active" },
        { label: "Task Context", detail: "Alert links to relevant task or module.", status: "next" },
        { label: "Action Taken", detail: "Retry, resolve or continue workflow.", status: "next" },
        { label: "Audit Trail", detail: "Critical alerts preserve user/device action.", status: "next" },
      ]}
      tasks={[
        {
          id: "ALT-551",
          title: "QC hold created",
          subtitle: "GRN-2026-001 · SKU-AX-440 failed inspection",
          status: "Route to rejection handling",
          priority: "High",
          route: "/inbound/damage-rejection-entry",
          icon: "alert-circle-outline",
        },
        {
          id: "ALT-552",
          title: "Offline sync failed",
          subtitle: "PUT-2214 capacity conflict with server state",
          status: "Resolve conflict in sync queue",
          priority: "Medium",
          route: "/sync",
          icon: "cloud-offline-outline",
        },
      ]}
      controls={[
        { label: "Scope", value: "RBAC", icon: "shield-checkmark-outline", tone: "blue" },
        { label: "Critical", value: "Sticky", icon: "pin-outline", tone: "red" },
        { label: "Sync alert", value: "Actionable", icon: "refresh-outline", tone: "amber" },
        { label: "Read state", value: "Tracked", icon: "checkmark-done-outline", tone: "green" },
      ]}
    />
  );
}
