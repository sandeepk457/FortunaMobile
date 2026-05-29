import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import BottomNavigation from "@/components/BottomNavigation";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function ASNVerificationScreen() {
  const router = useRouter();

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
            ASN Verification
          </Text>

          <View style={{ width: 24 }} />
        </View>

        {/* ASN Card */}
        <View style={styles.card}>

          <View style={styles.iconCircle}>
            <Ionicons
              name="document-text"
              size={40}
              color="#FFF"
            />
          </View>

          <Text style={styles.title}>
            ASN Details
          </Text>

          <View style={styles.infoBox}>
            <Text style={styles.label}>
              ASN Number
            </Text>

            <Text style={styles.value}>
              ASN-2026-000125
            </Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.label}>
              Vendor
            </Text>

            <Text style={styles.value}>
              ABC Suppliers Pvt Ltd
            </Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.label}>
              PO Number
            </Text>

            <Text style={styles.value}>
              PO-2026-00125
            </Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.label}>
              Expected Delivery
            </Text>

            <Text style={styles.value}>
              29-May-2026
            </Text>
          </View>

          <View style={styles.statusRow}>
            <View style={styles.statusDot} />

            <Text style={styles.statusText}>
              Pending Verification
            </Text>
          </View>

          <TouchableOpacity
            style={styles.verifyButton}
          >
            <Text style={styles.buttonText}>
              VERIFY ASN
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.nextButton}
            onPress={() =>
              router.push(
                "/inbound/po-verification"
              )
            }
          >
            <Text style={styles.buttonText}>
              PROCEED TO PO VERIFICATION
            </Text>
          </TouchableOpacity>

        </View>

      </ScrollView>
      <BottomNavigation />
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

  card: {
    margin: 20,

    backgroundColor: "#FFF",

    borderRadius: 20,

    padding: 20,

    elevation: 4,
  },

  iconCircle: {
    width: 80,
    height: 80,

    borderRadius: 40,

    backgroundColor: "#005F99",

    justifyContent: "center",

    alignItems: "center",

    alignSelf: "center",

    marginBottom: 15,
  },

  title: {
    fontSize: 22,

    fontWeight: "700",

    color: "#005F99",

    textAlign: "center",

    marginBottom: 20,
  },

  infoBox: {
    backgroundColor: "#F8FAFC",

    borderRadius: 12,

    padding: 14,

    marginBottom: 12,
  },

  label: {
    color: "#433a3a",

    fontSize: 12,
  },

  value: {
    fontSize: 16,

    fontWeight: "600",

    color: "#111",

    marginTop: 4,
  },

  statusRow: {
    flexDirection: "row",

    justifyContent: "center",

    alignItems: "center",

    marginVertical: 20,
  },

  statusDot: {
    width: 12,

    height: 12,

    borderRadius: 6,

    backgroundColor: "#F59E0B",

    marginRight: 8,
  },

  statusText: {
    color: "#333",

    fontWeight: "700",
  },

  verifyButton: {
    backgroundColor: "#005F99",

    padding: 16,

    borderRadius: 14,

    marginBottom: 12,
  },

  nextButton: {
    backgroundColor: "#C8102E",

    padding: 16,

    borderRadius: 14,
  },

  buttonText: {
    color: "#FFF",

    textAlign: "center",

    fontWeight: "700",
  },

});