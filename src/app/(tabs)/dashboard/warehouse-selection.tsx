import { useState } from "react";

import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const warehouses = [
  {
    id: "1",
    code: "HYD-01",
    name: "Hyderabad Central Warehouse",
    location: "Hyderabad",
    status: "Online",
  },
  {
    id: "2",
    code: "BLR-01",
    name: "Bangalore Distribution Center",
    location: "Bangalore",
    status: "Online",
  },
  {
    id: "3",
    code: "CHE-01",
    name: "Chennai Logistics Hub",
    location: "Chennai",
    status: "Offline",
  },
  {
    id: "4",
    code: "MUM-01",
    name: "Mumbai Export Warehouse",
    location: "Mumbai",
    status: "Online",
  },
];

export default function WarehouseSelectionScreen() {
  const [selectedWarehouse, setSelectedWarehouse] =
    useState<string | null>(null);

  const [search, setSearch] = useState("");

  const filteredWarehouses = warehouses.filter(
    (item) =>
      item.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      item.code
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const renderWarehouse = ({ item }: any) => {
    const selected =
      selectedWarehouse === item.id;

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.card,
          selected && styles.selectedCard,
        ]}
        onPress={() =>
          setSelectedWarehouse(item.id)
        }
      >
        {/* TOP */}
        <View style={styles.cardTop}>
          <View>
            <Text style={styles.warehouseCode}>
              {item.code}
            </Text>

            <Text style={styles.warehouseName}>
              {item.name}
            </Text>
          </View>

          <View
            style={[
              styles.statusBadge,
              item.status === "Online"
                ? styles.onlineBadge
                : styles.offlineBadge,
            ]}
          >
            <Text style={styles.statusText}>
              {item.status}
            </Text>
          </View>
        </View>

        {/* LOCATION */}
        <View style={styles.locationRow}>
          <Ionicons
            name="location"
            size={18}
            color="#005F99"
          />

          <Text style={styles.locationText}>
            {item.location}
          </Text>
        </View>

        {/* SELECTED ICON */}
        {selected && (
          <View style={styles.selectedIcon}>
            <Ionicons
              name="checkmark-circle"
              size={28}
              color="#16A34A"
            />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
        >
          <Ionicons
            name="arrow-back"
            size={28}
            color="#FFFFFF"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Select Warehouse
        </Text>

        <View style={{ width: 28 }} />
      </View>

      {/* SEARCH */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#6B7280"
        />

        <TextInput
          placeholder="Search Warehouse..."
          placeholderTextColor="#9CA3AF"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      {/* TITLE */}
      <Text style={styles.sectionTitle}>
        Available Warehouses
      </Text>

      {/* LIST */}
      <FlatList
        data={filteredWarehouses}
        keyExtractor={(item) => item.id}
        renderItem={renderWarehouse}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 140,
        }}
      />

      {/* CONTINUE BUTTON */}
      <TouchableOpacity
        disabled={!selectedWarehouse}
        style={[
          styles.continueButton,
          !selectedWarehouse &&
            styles.disabledButton,
        ]}
        onPress={() =>
          router.push(
            "/dashboard/shift-login"
          )
        }
      >
        <Text style={styles.continueText}>
          Continue
        </Text>

        <Ionicons
          name="arrow-forward"
          size={22}
          color="#FFFFFF"
        />
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  header: {
    height: 90,

    backgroundColor: "#C8102E",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingHorizontal: 20,

    paddingTop: 20,
  },

  headerTitle: {
    color: "#FFFFFF",

    fontSize: 24,

    fontWeight: "700",
  },

  searchContainer: {
    backgroundColor: "#FFFFFF",

    marginHorizontal: 18,

    marginTop: 22,

    borderRadius: 18,

    paddingHorizontal: 18,

    height: 60,

    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,

    elevation: 2,
  },

  searchInput: {
    flex: 1,

    marginLeft: 12,

    color: "#111827",

    fontSize: 16,
  },

  sectionTitle: {
    fontSize: 24,

    fontWeight: "700",

    color: "#111827",

    marginTop: 24,

    marginBottom: 18,

    marginHorizontal: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",

    marginHorizontal: 18,

    marginBottom: 16,

    borderRadius: 24,

    padding: 20,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,

    elevation: 3,

    borderWidth: 2,
    borderColor: "transparent",
  },

  selectedCard: {
    borderColor: "#005F99",
  },

  cardTop: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",
  },

  warehouseCode: {
    fontSize: 18,

    fontWeight: "700",

    color: "#005F99",
  },

  warehouseName: {
    fontSize: 20,

    fontWeight: "700",

    color: "#111827",

    marginTop: 6,

    width: 240,
  },

  statusBadge: {
    paddingHorizontal: 12,

    paddingVertical: 6,

    borderRadius: 50,
  },

  onlineBadge: {
    backgroundColor: "#DCFCE7",
  },

  offlineBadge: {
    backgroundColor: "#FEE2E2",
  },

  statusText: {
    fontWeight: "700",

    fontSize: 13,
  },

  locationRow: {
    flexDirection: "row",

    alignItems: "center",

    marginTop: 18,
  },

  locationText: {
    marginLeft: 8,

    color: "#6B7280",

    fontSize: 16,
  },

  selectedIcon: {
    position: "absolute",

    right: 16,
    bottom: 16,
  },

  continueButton: {
    position: "absolute",

    bottom: 30,

    left: 20,
    right: 20,

    height: 62,

    borderRadius: 22,

    backgroundColor: "#C8102E",

    flexDirection: "row",

    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#C8102E",
    shadowOpacity: 0.3,
    shadowRadius: 10,

    elevation: 6,
  },

  disabledButton: {
    opacity: 0.5,
  },

  continueText: {
    color: "#FFFFFF",

    fontSize: 20,

    fontWeight: "700",

    marginRight: 10,
  },
});