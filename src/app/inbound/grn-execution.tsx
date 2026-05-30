import { useMemo, useState } from "react";
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

export default function GRNExecutionScreen() {
  const router = useRouter();

  const [searchSKU, setSearchSKU] =
  useState("");

const skuItems = [
  {
    id: 1,
    sku: "SKU-001",
    name: "Corrugated Box",
    orderedQty: 100,
    receivedQty: "95",
    acceptedQty: "90",
    rejectedQty: "5",
  },
  {
    id: 2,
    sku: "SKU-002",
    name: "Stretch Film",
    orderedQty: 50,
    receivedQty: "50",
    acceptedQty: "50",
    rejectedQty: "0",
  },
  {
    id: 3,
    sku: "SKU-003",
    name: "Packing Tape",
    orderedQty: 200,
    receivedQty: "",
    acceptedQty: "",
    rejectedQty: "",
  },
];

const filteredItems = useMemo(() => {
  return skuItems.filter(
    (item) =>
      item.sku
        .toLowerCase()
        .includes(
          searchSKU.toLowerCase()
        ) ||
      item.name
        .toLowerCase()
        .includes(
          searchSKU.toLowerCase()
        )
  );
}, [searchSKU]);


  const [receivedQty1, setReceivedQty1] =
    useState("95");

  const [acceptedQty1, setAcceptedQty1] =
    useState("90");

  const [rejectedQty1, setRejectedQty1] =
    useState("5");

  const [receivedQty2, setReceivedQty2] =
    useState("50");

  const [acceptedQty2, setAcceptedQty2] =
    useState("50");

  const [rejectedQty2, setRejectedQty2] =
    useState("0");

const orderedQty1 = 100;



  const rejectedAuto1 =
  Math.max(
    Number(receivedQty1 || 0) -
    Number(acceptedQty1 || 0),
    0
  );



const excessQty1 = Math.max(
  Number(receivedQty1 || 0) - orderedQty1,
  0
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
            GRN Execution
          </Text>

          <View style={{ width: 24 }} />
        </View>

        {/* PO Details */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Receipt Information
          </Text>

          <Text style={styles.infoText}>
            PO Number : PO-2026-00125
          </Text>

          <Text style={styles.infoText}>
            Vendor : ABC Suppliers Pvt Ltd
          </Text>

          <Text style={styles.infoText}>
            Warehouse : HYD Main Warehouse
          </Text>
        </View>

        <View style={styles.searchCard}>
  <View style={styles.searchBox}>
    <Ionicons
      name="search"
      size={20}
      color="#666"
    />

    <TextInput
      placeholder="Search SKU or Item..."
      value={searchSKU}
      onChangeText={setSearchSKU}
      style={styles.searchInput}
    />
  </View>
</View>

        
    {filteredItems.map((item) => (
  <View
    key={item.id}
    style={styles.card}
  >
    <Text style={styles.itemTitle}>
      {item.sku}
    </Text>

    <Text style={styles.itemName}>
      {item.name}
    </Text>

    <Text style={styles.qtyLabel}>
      Ordered Qty : {item.orderedQty}
    </Text>

   <TextInput
  style={styles.input}
  placeholder="Received Qty"
  value={receivedQty1}
  onChangeText={setReceivedQty1}
  keyboardType="numeric"
/>

        <View style={styles.qtySummaryCard}>

  <Text style={styles.summaryText}>
    Ordered Qty : {orderedQty1}
  </Text>

  <Text style={styles.summaryText}>
    Received Qty : {receivedQty1}
  </Text>

  <Text style={styles.summaryText}>
    Accepted Qty : {acceptedQty1}
  </Text>

  <Text style={styles.summaryText}>
    Excess Qty : {excessQty1}
  </Text>

</View>

   <TextInput
  style={styles.input}
  placeholder="Accepted Qty"
  value={acceptedQty1}
  onChangeText={setAcceptedQty1}
  keyboardType="numeric"
/>

    <TextInput
  style={styles.input}
  value={String(rejectedAuto1)}
  editable={false}
/>
  </View>
))}
        

        {/* Summary */}
        <View style={styles.qtySummaryCard}>

  <Text style={styles.summaryText}>
    Ordered Qty : {orderedQty1}
  </Text>

  <Text style={styles.summaryText}>
    Received Qty : {receivedQty1}
  </Text>

  <Text style={styles.summaryText}>
    Accepted Qty : {acceptedQty1}
  </Text>

  <Text style={styles.summaryText}>
    Rejected Qty : {rejectedAuto1}
  </Text>

  <Text style={styles.summaryText}>
    Excess Qty : {excessQty1}
  </Text>

</View>

        {/* Buttons */}
        <TouchableOpacity
          style={styles.saveButton}
        >
          <Text style={styles.buttonText}>
            SAVE DRAFT
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.nextButton}
          onPress={() =>
            router.push(
              "/inbound/scan-item"
            )
          }
        >
          <Text style={styles.buttonText}>
            SCAN ITEM (OPTIONAL)
          </Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
  style={styles.scanButton}
  onPress={() =>
    router.push("/inbound/scan-item")
  }
>
  <Text style={styles.buttonText}>
    SCAN ITEM (OPTIONAL)
  </Text>
</TouchableOpacity> */}

<TouchableOpacity
  style={styles.nextButton}
  onPress={() =>
    router.push(
      "/inbound/qc-inspection"
    )
  }
>
  <Text style={styles.buttonText}>
    PROCEED TO QC INSPECTION
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

    elevation: 3,
  },

  sectionTitle: {
    fontSize: 18,

    fontWeight: "700",

    color: "#005F99",

    marginBottom: 12,
  },

  infoText: {
    fontSize: 15,

    color: "#333",

    marginBottom: 6,
  },

  itemTitle: {
    fontSize: 17,

    fontWeight: "700",

    color: "#005F99",

    marginBottom: 10,
  },

  qtyLabel: {
    marginBottom: 10,

    color: "#666",
  },

  input: {
    borderWidth: 1,

    borderColor: "#DDD",

    borderRadius: 10,

    padding: 12,

    marginBottom: 10,

    backgroundColor: "#FFF",
  },

  summaryCard: {
    margin: 15,

    backgroundColor: "#E8F4FD",

    borderRadius: 18,

    padding: 18,
  },

  summaryTitle: {
    fontSize: 18,

    fontWeight: "700",

    color: "#005F99",

    marginBottom: 10,
  },

  summaryText: {
    fontSize: 15,

    marginBottom: 5,
  },

  saveButton: {
    backgroundColor: "#005F99",

    marginHorizontal: 15,

    padding: 16,

    borderRadius: 14,

    marginBottom: 10,
  },

  nextButton: {
    backgroundColor: "#C8102E",

    marginHorizontal: 15,

    padding: 16,

    borderRadius: 14,

    marginBottom: 20,
  },

  scanButton: {
    backgroundColor: "#C8102E",

    marginHorizontal: 15,

    padding: 16,

    borderRadius: 14,

    marginBottom: 20,
  },

  buttonText: {
    color: "#FFF",

    textAlign: "center",

    fontWeight: "700",
  },

  searchCard: {
  marginHorizontal: 15,
  marginTop: 10,
},

searchBox: {
  flexDirection: "row",

  alignItems: "center",

  backgroundColor: "#FFF",

  borderRadius: 14,

  paddingHorizontal: 12,

  elevation: 2,
},

searchInput: {
  flex: 1,

  padding: 12,

  marginLeft: 8,
},

itemName: {
  color: "#666",

  marginBottom: 10,
},

qtySummaryCard: {
  backgroundColor: "#F8FAFC",

  padding: 12,

  borderRadius: 12,

  marginTop: 10,

  borderWidth: 1,

  borderColor: "#E5E7EB",
},

summaryText: {
  fontSize: 14,

  color: "#374151",

  marginBottom: 4,

  fontWeight: "600",
},

qtySummaryCard: {
  backgroundColor: "#F1F5F9",

  padding: 12,

  borderRadius: 12,

  marginBottom: 10,

  borderWidth: 1,

  borderColor: "#E2E8F0",
},


});