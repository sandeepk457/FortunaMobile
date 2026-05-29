import { useState } from "react";

import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function DeviceBindingScreen() {
  const router = useRouter();

  const [isBound, setIsBound] = useState(false);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingBottom: 40,
      }}
    >
      {/* HEADER */}
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
          Device Binding
        </Text>

        <View style={{ width: 24 }} />
      </View>

      {/* CARD */}
      <View style={styles.card}>

        <Ionicons
          name="phone-portrait-outline"
          size={90}
          color="#005F99"
        />

        <Text style={styles.title}>
          Device Registration
        </Text>

        <Text style={styles.subtitle}>
          Register this device for
          warehouse operations
        </Text>

        {/* DEVICE ID */}
        <View style={styles.infoBox}>
          <Text style={styles.label}>
            Device ID
          </Text>

          <Text style={styles.value}>
            DEV-HYD-0001
          </Text>
        </View>

        {/* DEVICE NAME */}
        <View style={styles.infoBox}>
          <Text style={styles.label}>
            Device Name
          </Text>

          <Text style={styles.value}>
            Samsung Galaxy A55
          </Text>
        </View>

        {/* EMPLOYEE */}
        <View style={styles.infoBox}>
          <Text style={styles.label}>
            Employee
          </Text>

          <Text style={styles.value}>
            EMP001 - Sandeep
          </Text>
        </View>

        {/* WAREHOUSE */}
        <View style={styles.infoBox}>
          <Text style={styles.label}>
            Warehouse
          </Text>

          <Text style={styles.value}>
            HYD-01 Warehouse
          </Text>
        </View>

        {/* STATUS */}
        <View style={styles.statusContainer}>
          <View
            style={[
              styles.statusDot,
              {
                backgroundColor: isBound
                  ? "#16A34A"
                  : "#F59E0B",
              },
            ]}
          />

          <Text style={styles.statusText}>
            {isBound
              ? "Device Bound"
              : "Not Bound"}
          </Text>
        </View>

        {/* BUTTON */}
        <TouchableOpacity
          style={styles.bindButton}
          onPress={() =>
            setIsBound(true)
          }
        >
          <Text style={styles.buttonText}>
            {isBound
              ? "DEVICE REGISTERED"
              : "BIND DEVICE"}
          </Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
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

    alignItems: "center",

    justifyContent: "space-between",
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

    alignItems: "center",

    elevation: 4,
  },

  title: {
    fontSize: 22,

    fontWeight: "700",

    color: "#005F99",

    marginTop: 10,
  },

  subtitle: {
    color: "#666",

    marginBottom: 20,

    textAlign: "center",
  },

  infoBox: {
    width: "100%",

    backgroundColor: "#F8FAFC",

    borderRadius: 12,

    padding: 14,

    marginBottom: 12,
  },

  label: {
    color: "#666",

    fontSize: 12,
  },

  value: {
    color: "#111",

    fontSize: 16,

    fontWeight: "600",

    marginTop: 4,
  },

  statusContainer: {
    flexDirection: "row",

    alignItems: "center",

    marginTop: 10,
    marginBottom: 20,
  },

  statusDot: {
    width: 12,
    height: 12,

    borderRadius: 12,

    marginRight: 8,
  },

  statusText: {
    fontWeight: "700",

    color: "#333",
  },

  bindButton: {
    backgroundColor: "#C8102E",

    width: "100%",

    padding: 16,

    borderRadius: 14,
  },

  buttonText: {
    color: "#FFF",

    textAlign: "center",

    fontWeight: "700",

    fontSize: 16,
  },

});