import { useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import BottomNavigation from "@/components/BottomNavigation";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";


export default function QCInspectionScreen() {
  const router = useRouter();

  const [photo, setPhoto] = useState<string | null>(null);

const [searchSKU, setSearchSKU] = useState("");



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


  const [result, setResult] =
    useState("PASS");

const capturePhoto = async () => {
  const result =
    await ImagePicker.launchCameraAsync({
      mediaTypes:
        ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

  if (!result.canceled) {
    setPhoto(
      result.assets[0].uri
    );
  }
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
            QC Inspection
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

{/* Search Results */}
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
            Received Qty : {selectedItem.qty}
          </Text>
        </View>

        {/* QC Result */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Inspection Result
          </Text>

          <TouchableOpacity
            style={[
              styles.optionCard,
              result === "PASS" &&
                styles.selectedGreen,
            ]}
            onPress={() =>
              setResult("PASS")
            }
          >
            <Text
              style={styles.optionText}
            >
              PASS
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.optionCard,
              result === "FAIL" &&
                styles.selectedRed,
            ]}
            onPress={() =>
              setResult("FAIL")
            }
          >
            <Text
              style={styles.optionText}
            >
              FAIL
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.optionCard,
              result ===
                "CONDITIONAL" &&
                styles.selectedOrange,
            ]}
            onPress={() =>
              setResult(
                "CONDITIONAL"
              )
            }
          >
            <Text
              style={styles.optionText}
            >
              CONDITIONAL PASS
            </Text>
          </TouchableOpacity>
        </View>

        {/* Inspection Qty */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            QC Quantities
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Passed Qty"
            keyboardType="numeric"
          />

          <TextInput
            style={styles.input}
            placeholder="Rejected Qty"
            keyboardType="numeric"
          />

          <TextInput
            style={styles.input}
            placeholder="Remarks"
            multiline
          />
        </View>

        {/* Photo */}
        <TouchableOpacity
  style={styles.photoButton}
  onPress={capturePhoto}
>

            {photo && (
  <Image
    source={{ uri: photo }}
    style={{
      width: "100%",
      height: 220,
      borderRadius: 12,
      marginTop: 12,
      marginBottom: 12,
    }}
  />
)}

          <Ionicons
            name="camera"
            size={22}
            color="#FFF"
          />

          <Text
            style={styles.buttonText}
          >
            TAKE QC PHOTO
          </Text>
        </TouchableOpacity>

        {/* Save */}
       <TouchableOpacity
  style={styles.saveButton}
  onPress={() => {
    console.log("QC Saved");

    alert(
      "QC Inspection Saved Successfully"
    );
  }}
>
  <Text style={styles.buttonText}>
    SAVE QC RESULT
  </Text>
</TouchableOpacity>

        {/* Next */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() =>
            router.push(
              "/inbound/putaway-confirmation"
            )
          }
        >
          <Text
            style={styles.buttonText}
          >
            PROCEED TO PUTAWAY
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

  resultItem: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },

  resultText: {
    color: "#333",
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

  optionCard: {
    padding: 15,

    borderRadius: 12,

    borderWidth: 1,

    borderColor: "#DDD",

    marginBottom: 10,
  },

  selectedGreen: {
    backgroundColor: "#DCFCE7",
    borderColor: "#16A34A",
  },

  selectedRed: {
    backgroundColor: "#FEE2E2",
    borderColor: "#DC2626",
  },

  selectedOrange: {
    backgroundColor: "#FEF3C7",
    borderColor: "#F59E0B",
  },

  optionText: {
    fontWeight: "700",
    textAlign: "center",
  },

  input: {
    borderWidth: 1,

    borderColor: "#DDD",

    borderRadius: 12,

    padding: 14,

    marginBottom: 12,

    backgroundColor: "#FFF",
  },

  photoButton: {
    backgroundColor: "#005F99",

    marginHorizontal: 15,

    padding: 15,

    borderRadius: 14,

    flexDirection: "row",

    justifyContent: "center",

    alignItems: "center",

    gap: 10,

    marginBottom: 10,
  },

  saveButton: {
    backgroundColor: "#16A34A",

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

    marginBottom: 25,
  },

  buttonText: {
  color: "#FFF",

  textAlign: "center",

  fontWeight: "700",

  fontSize: 15,
},

});