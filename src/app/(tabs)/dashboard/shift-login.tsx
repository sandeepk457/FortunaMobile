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

export default function ShiftLoginScreen() {
  const router = useRouter();

  const [selectedShift, setSelectedShift] =
    useState("General");

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
          Shift Login
        </Text>

        <View style={{ width: 24 }} />
      </View>

      {/* CARD */}
      <View style={styles.card}>

        <Ionicons
          name="person-circle"
          size={90}
          color="#005F99"
        />

        <Text style={styles.title}>
          Start Your Shift
        </Text>

        <Text style={styles.subtitle}>
          Select your working shift
        </Text>

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
            HYD-01
          </Text>
        </View>

        {/* SHIFT OPTIONS */}

        <Text style={styles.sectionTitle}>
          Select Shift
        </Text>

        <TouchableOpacity
          style={[
            styles.shiftCard,
            selectedShift === "Morning" &&
              styles.selectedShift,
          ]}
          onPress={() =>
            setSelectedShift("Morning")
          }
        >
          <Text style={styles.shiftText}>
            🌅 Morning Shift
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.shiftCard,
            selectedShift === "General" &&
              styles.selectedShift,
          ]}
          onPress={() =>
            setSelectedShift("General")
          }
        >
          <Text style={styles.shiftText}>
            ☀️ General Shift
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.shiftCard,
            selectedShift === "Night" &&
              styles.selectedShift,
          ]}
          onPress={() =>
            setSelectedShift("Night")
          }
        >
          <Text style={styles.shiftText}>
            🌙 Night Shift
          </Text>
        </TouchableOpacity>

        {/* BUTTON */}

        <TouchableOpacity
          style={styles.startButton}
          onPress={() =>
            router.replace("/dashboard")
          }
        >
          <Text style={styles.buttonText}>
            START SHIFT
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

  sectionTitle: {
    alignSelf: "flex-start",

    marginTop: 10,

    marginBottom: 10,

    fontWeight: "700",

    color: "#005F99",
  },

  shiftCard: {
    width: "100%",

    borderWidth: 1,

    borderColor: "#D9E2EC",

    borderRadius: 12,

    padding: 15,

    marginBottom: 10,
  },

  selectedShift: {
    borderColor: "#C8102E",

    backgroundColor: "#FFF1F3",
  },

  shiftText: {
    fontSize: 16,

    fontWeight: "600",
  },

  startButton: {
    backgroundColor: "#C8102E",

    width: "100%",

    padding: 16,

    borderRadius: 14,

    marginTop: 20,
  },

  buttonText: {
    color: "#FFF",

    textAlign: "center",

    fontWeight: "700",

    fontSize: 16,
  },

});