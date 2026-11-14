import { CameraView, useCameraPermissions, type BarcodeScanningResult } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

interface CameraScannerProps {
  visible: boolean;
  onClose: () => void;
  onScanned: (result: BarcodeScanningResult) => void;
}

const BARCODE_TYPES = [
  "aztec", "ean13", "ean8", "qr", "pdf417", "upc_e", "datamatrix",
  "code39", "code93", "itf14", "codabar", "code128", "upc_a",
] as const;

export default function CameraScanner({ visible, onClose, onScanned }: CameraScannerProps) {
  const [permission, requestPermission] = useCameraPermissions();
  const [torchEnabled, setTorchEnabled] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const handledScan = useRef(false);

  useEffect(() => {
    if (!visible) {
      handledScan.current = false;
      setCameraError("");
      setTorchEnabled(false);
      return;
    }
    if (permission && !permission.granted && permission.canAskAgain) {
      void requestPermission();
    }
  }, [visible, permission, requestPermission]);

  const handleBarcodeScanned = (result: BarcodeScanningResult) => {
    if (handledScan.current) return;
    handledScan.current = true;
    onScanned(result);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        {permission?.granted ? (
          <CameraView
            style={StyleSheet.absoluteFill}
            facing="back"
            enableTorch={torchEnabled}
            barcodeScannerSettings={{ barcodeTypes: [...BARCODE_TYPES] }}
            onBarcodeScanned={handledScan.current ? undefined : handleBarcodeScanned}
            onMountError={(event) => setCameraError(event.message || "The camera could not start.")}
          />
        ) : null}

        <View style={styles.topBar}>
          <Pressable accessibilityRole="button" onPress={onClose} style={styles.controlButton}>
            <Text style={styles.controlText}>Close</Text>
          </Pressable>
          <Text style={styles.title}>Scan a code</Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => setTorchEnabled((enabled) => !enabled)}
            style={styles.controlButton}
            disabled={!permission?.granted}
          >
            <Text style={styles.controlText}>{torchEnabled ? "Torch on" : "Torch"}</Text>
          </Pressable>
        </View>

        {!permission?.granted && (
          <View style={styles.messageCard}>
            <Text style={styles.messageTitle}>Camera access is needed to scan</Text>
            <Text style={styles.message}>
              {permission?.canAskAgain === false
                ? "Allow camera access in your device settings, then try again."
                : "Grant camera access to scan QR codes, barcodes, and DataMatrix labels."}
            </Text>
            {permission?.canAskAgain !== false && (
              <Pressable accessibilityRole="button" onPress={() => void requestPermission()} style={styles.primaryButton}>
                <Text style={styles.primaryText}>Allow camera</Text>
              </Pressable>
            )}
          </View>
        )}

        {permission?.granted && (
          <View pointerEvents="none" style={styles.viewfinder}>
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
          </View>
        )}
        <View style={styles.footer}>
          <Text style={styles.hint}>{cameraError || "Position the code inside the frame"}</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#07111D", justifyContent: "center" },
  topBar: { position: "absolute", zIndex: 2, top: 52, left: 18, right: 18, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  title: { color: "#FFFFFF", fontSize: 18, fontWeight: "800" },
  controlButton: { minWidth: 68, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 12, backgroundColor: "rgba(12,25,40,0.8)", alignItems: "center" },
  controlText: { color: "#FFFFFF", fontSize: 13, fontWeight: "700" },
  viewfinder: { alignSelf: "center", width: "78%", height: 230 },
  corner: { position: "absolute", width: 36, height: 36, borderColor: "#FFFFFF" },
  topLeft: { top: 0, left: 0, borderTopWidth: 4, borderLeftWidth: 4, borderTopLeftRadius: 12 },
  topRight: { top: 0, right: 0, borderTopWidth: 4, borderRightWidth: 4, borderTopRightRadius: 12 },
  bottomLeft: { bottom: 0, left: 0, borderBottomWidth: 4, borderLeftWidth: 4, borderBottomLeftRadius: 12 },
  bottomRight: { bottom: 0, right: 0, borderBottomWidth: 4, borderRightWidth: 4, borderBottomRightRadius: 12 },
  footer: { position: "absolute", bottom: 42, alignSelf: "center", paddingHorizontal: 20 },
  hint: { color: "#FFFFFF", textAlign: "center", fontSize: 14, fontWeight: "600" },
  messageCard: { margin: 24, padding: 22, borderRadius: 20, backgroundColor: "#FFFFFF", alignItems: "center" },
  messageTitle: { color: "#172033", fontSize: 18, fontWeight: "800", textAlign: "center" },
  message: { color: "#64788C", marginTop: 10, lineHeight: 21, textAlign: "center" },
  primaryButton: { marginTop: 18, backgroundColor: "#005F99", borderRadius: 12, paddingHorizontal: 20, paddingVertical: 13 },
  primaryText: { color: "#FFFFFF", fontWeight: "800" },
});
