import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import BottomNavigation from "@/components/BottomNavigation";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function PutawayConfirmationScreen() {
  const router = useRouter();

  const [searchBin, setSearchBin] =
    useState("");

  const [selectedZone, setSelectedZone] =
    useState("Bulk Storage");

  const [selectedRack, setSelectedRack] =
    useState("Rack-A01");

  const [selectedBin, setSelectedBin] =
    useState("BIN-A01-01");

  const bins = [
    "BIN-A01-01",
    "BIN-A01-02",
    "BIN-A01-03",
    "BIN-B01-01",
    "BIN-B01-02",
    "BIN-C01-01",
  ];

  const filteredBins = bins.filter(
    (bin) =>
      bin
        .toLowerCase()
        .includes(
          searchBin.toLowerCase()
        )
  );

  const [searchSKU, setSearchSKU] =
  useState("");

const items = [
  {
    sku: "SKU-001",
    name: "Corrugated Box",
    qty: 95,
  },
  {
    sku: "SKU-002",
    name: "Stretch Film",
    qty: 50,
  },
  {
    sku: "SKU-003",
    name: "Packing Tape",
    qty: 200,
  },
  {
    sku: "SKU-004",
    name: "Plastic Crate",
    qty: 75,
  },
  {
    sku: "SKU-005",
    name: "Wooden Pallet",
    qty: 40,
  },
];

const [selectedItem, setSelectedItem] =
  useState(items[0]);

const filteredItems = items.filter(
  (item) =>
    item.sku
      .toLowerCase()
      .includes(searchSKU.toLowerCase()) ||
    item.name
      .toLowerCase()
      .includes(searchSKU.toLowerCase())
);

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
            Putaway Confirmation
          </Text>

          <View style={{ width: 24 }} />
        </View>


{/* Search SKU */}
<View style={styles.card}>

  <Text style={styles.sectionTitle}>
    Search SKU
  </Text>

  <TextInput
    style={styles.input}
    placeholder="Search SKU or Item..."
    value={searchSKU}
    onChangeText={setSearchSKU}
  />

</View>

{/* SKU Results */}
{searchSKU.length > 0 && (
  <View style={styles.card}>
    {filteredItems.map((item) => (
      <TouchableOpacity
        key={item.sku}
        style={styles.resultItem}
        onPress={() => {
          setSelectedItem(item);
          setSearchSKU("");
        }}
      >
        <Text style={styles.resultText}>
          {item.sku} - {item.name}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
)}



      
        {/* Item Details */}
<View style={styles.card}>

  <Text style={styles.sectionTitle}>
    Item Details
  </Text>

  <Text style={styles.infoText}>
    SKU : {selectedItem.sku}
  </Text>

  <Text style={styles.infoText}>
    Item : {selectedItem.name}
  </Text>

  <Text style={styles.infoText}>
    Qty : {selectedItem.qty}
  </Text>

</View>

        {/* Zone */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Warehouse Zone
          </Text>

          <TouchableOpacity
            style={styles.selectionCard}
            onPress={() =>
              setSelectedZone(
                "Bulk Storage"
              )
            }
          >
            <Text>
              {selectedZone}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Rack */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Rack Selection
          </Text>

          <TouchableOpacity
            style={styles.selectionCard}
            onPress={() =>
              setSelectedRack(
                "Rack-A01"
              )
            }
          >
            <Text>
              {selectedRack}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Search Bin */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Search Bin
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Search Bin..."
            value={searchBin}
            onChangeText={setSearchBin}
          />
        </View>

        {/* Bin Results */}
        {searchBin.length > 0 && (
          <View style={styles.card}>
            {filteredBins.map((bin) => (
              <TouchableOpacity
                key={bin}
                style={
                  styles.resultItem
                }
                onPress={() => {
                  setSelectedBin(
                    bin
                  );
                  setSearchBin("");
                }}
              >
                <Text
                  style={
                    styles.resultText
                  }
                >
                  {bin}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Selected Location */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Selected Location
          </Text>

          <Text style={styles.infoText}>
            Zone : {selectedZone}
          </Text>

          <Text style={styles.infoText}>
            Rack : {selectedRack}
          </Text>

          <Text style={styles.infoText}>
            Bin : {selectedBin}
          </Text>
        </View>

        {/* Confirm */}
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() =>
            alert(
              "Putaway Confirmed"
            )
          }
        >
          <Text
            style={styles.buttonText}
          >
            CONFIRM PUTAWAY
          </Text>
        </TouchableOpacity>

        {/* Complete */}
        <TouchableOpacity
          style={styles.completeButton}
          onPress={() =>
            router.push(
              "/inbound"
            )
          }
        >
          <Text
            style={styles.buttonText}
          >
            COMPLETE INBOUND
          </Text>
        </TouchableOpacity>

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
    margin: 15,

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

  infoText: {
    marginBottom: 8,

    color: "#333",
  },

  selectionCard: {
    borderWidth: 1,

    borderColor: "#DDD",

    borderRadius: 12,

    padding: 14,
  },

  input: {
    borderWidth: 1,

    borderColor: "#DDD",

    borderRadius: 12,

    padding: 14,
  },

  resultItem: {
    paddingVertical: 12,

    borderBottomWidth: 1,

    borderBottomColor: "#EEE",
  },

  resultText: {
    color: "#111",

    fontWeight: "600",
  },

  confirmButton: {
    backgroundColor: "#005F99",

    marginHorizontal: 15,

    padding: 16,

    borderRadius: 14,

    marginBottom: 10,
  },

  completeButton: {
    backgroundColor: "#16A34A",

    marginHorizontal: 15,

    padding: 16,

    borderRadius: 14,

    marginBottom: 25,
  },

  buttonText: {
    color: "#FFF",

    textAlign: "center",

    fontWeight: "700",

    fontSize: 15,
  },

});