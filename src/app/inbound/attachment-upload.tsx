import ModuleScreen from "@/components/wms/ModuleScreen";

export default function AttachmentUploadScreen() {
  return (
    <ModuleScreen
      title="Attachment Upload"
      subtitle="Add and verify receipt evidence before final inbound posting."
      icon="cloud-upload-outline"
      primaryRoute="/inbound/inbound-completion"
      primaryLabel="Review completion"
      metrics={[
        { label: "Required", value: "3", icon: "document-text-outline", tone: "blue" },
        { label: "Uploaded", value: "2", icon: "cloud-done-outline", tone: "green" },
        { label: "Pending", value: "1", icon: "hourglass-outline", tone: "amber" },
        { label: "Rejected", value: "0", icon: "close-circle-outline", tone: "red" },
      ]}
      steps={[
        { label: "Select evidence", detail: "Choose a photo or receipt document.", status: "done" },
        { label: "Upload", detail: "Attach evidence to the current receipt.", status: "active" },
        { label: "Validate", detail: "Confirm the attachment is readable and linked.", status: "next" },
        { label: "Complete", detail: "Continue to inbound completion.", status: "next" },
      ]}
      tasks={[
        {
          id: "ATT-001",
          title: "Delivery note",
          subtitle: "Receipt GRN-2026-001",
          status: "Uploaded · awaiting validation",
          priority: "High",
          icon: "document-attach-outline",
        },
      ]}
      controls={[
        { label: "Accepted types", value: "Photo / PDF", icon: "albums-outline", tone: "blue" },
        { label: "Receipt link", value: "Required", icon: "link-outline", tone: "amber" },
      ]}
    />
  );
}