import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import type { BarcodeScanningResult } from "expo-camera";
import { useRouter } from "expo-router";
import CameraScanner from "@/components/CameraScanner";

export default function ItemScanScreen() {
  const router = useRouter();

  const [scanValue, setScanValue] =
    useState("");
  const [scannerVisible, setScannerVisible] = useState(false);
  const [recentScans, setRecentScans] = useState([
    { code: "QR-8901234567890", item: "SKU-001", description: "Corrugated Box" },
    { code: "QR-8901234567891", item: "SKU-002", description: "Stretch Film" },
  ]);

  const onScanned = (result: BarcodeScanningResult) => {
    const code = result.data.trim();
    setScanValue(code);
    setRecentScans((current) => [
      { code, item: result.type.toUpperCase(), description: "Scanned item" },
      ...current.filter((scan) => scan.code !== code),
    ].slice(0, 5));
  };

  return (
    <View style={styles.container}>
      <ScrollView>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color="#FFF"
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Item Scan
          </Text>

          <View style={{ width: 24 }} />
        </View>

        {/* Status Card */}
        <View style={styles.statusCard}>

          <Ionicons
            name="scan-circle"
            size={80}
            color="#005F99"
          />

          <Text style={styles.statusTitle}>
            Ready To Scan
          </Text>

          <Text style={styles.statusSubTitle}>
            Supports QR Code, Barcode
            and DataMatrix
          </Text>

        </View>

        {/* Manual Entry */}
        <View style={styles.card}>

          <Text style={styles.sectionTitle}>
            Manual Entry
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter Barcode / QR Code"
            value={scanValue}
            onChangeText={setScanValue}
          />

          <TouchableOpacity
            style={styles.scanButton}
            onPress={() => setScannerVisible(true)}
          >
            <Text style={styles.buttonText}>
              START SCAN
            </Text>
          </TouchableOpacity>

        </View>

        {/* Recent Scans */}
        <View style={styles.card}>

          <Text style={styles.sectionTitle}>
            Recent Scans
          </Text>

          {recentScans.map((scan) => (
            <View key={scan.code} style={styles.scanCard}>
              <Text style={styles.scanCode}>{scan.code}</Text>
              <Text style={styles.scanItem}>{scan.item}</Text>
              <Text style={styles.scanDesc}>{scan.description}</Text>
            </View>
          ))}

        </View>

        {/* Next */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() =>
            router.push(
              "/inbound/quantity-confirmation" as never
            )
          }
        >
          <Text style={styles.buttonText}>
            PROCEED TO QUANTITY
            CONFIRMATION
          </Text>
        </TouchableOpacity>

      </ScrollView>
      <CameraScanner visible={scannerVisible} onClose={() => setScannerVisible(false)} onScanned={onScanned} />
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  header: {
    backgroundColor: "#C8102E",

    paddingTop: 55,
    paddingBottom: 20,

    paddingHorizontal: 20,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",
  },

  headerTitle: {
    color: "#FFF",

    fontSize: 20,

    fontWeight: "700",
  },

  statusCard: {
    margin: 15,

    backgroundColor: "#FFF",

    borderRadius: 20,

    padding: 25,

    alignItems: "center",

    elevation: 3,
  },

  statusTitle: {
    fontSize: 22,

    fontWeight: "700",

    color: "#005F99",

    marginTop: 10,
  },

  statusSubTitle: {
    textAlign: "center",

    color: "#666",

    marginTop: 5,
  },

  card: {
    marginHorizontal: 15,

    marginBottom: 15,

    backgroundColor: "#FFF",

    borderRadius: 18,

    padding: 18,

    elevation: 2,
  },

  sectionTitle: {
    fontSize: 18,

    fontWeight: "700",

    color: "#005F99",

    marginBottom: 15,
  },

  input: {
    borderWidth: 1,

    borderColor: "#DDD",

    borderRadius: 12,

    padding: 14,

    marginBottom: 15,
  },

  scanButton: {
    backgroundColor: "#005F99",

    padding: 15,

    borderRadius: 14,
  },

  nextButton: {
    backgroundColor: "#C8102E",

    marginHorizontal: 15,

    marginBottom: 25,

    padding: 16,

    borderRadius: 14,
  },

  buttonText: {
    color: "#FFF",

    textAlign: "center",

    fontWeight: "700",
  },

  scanCard: {
    backgroundColor: "#F8FAFC",

    padding: 14,

    borderRadius: 12,

    marginBottom: 10,
  },

  scanCode: {
    fontWeight: "700",

    color: "#111",
  },

  scanItem: {
    color: "#005F99",

    marginTop: 4,

    fontWeight: "600",
  },

  scanDesc: {
    color: "#666",

    marginTop: 3,
  },

});
