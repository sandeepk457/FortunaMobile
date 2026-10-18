import { useState } from "react";

import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import AnimatedEntrance from "@/components/ui/AnimatedEntrance";

export default function ForgotPasswordScreen() {
  const router = useRouter();

  const [username, setUsername] = useState("");

  const handleReset = () => {
    alert(
      "Password reset link has been sent to your registered email."
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }
    >
      <ScrollView
        contentContainerStyle={
          styles.scrollContainer
        }
        showsVerticalScrollIndicator={false}
      >
        {/* BACK BUTTON */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color="#005F99"
          />
        </TouchableOpacity>

        {/* LOGO */}
        <AnimatedEntrance style={styles.logoContainer}>
          <Image
            source={require("../../../assets/images/sims-logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.title}>
            Forgot Password
          </Text>

          <Text style={styles.subtitle}>
            Enter your username to reset
            your password
          </Text>
        </AnimatedEntrance>

        {/* CARD */}
        <AnimatedEntrance delay={100}>
        <LinearGradient
          colors={["#FFFFFF", "#F7FAFD", "#EEF5FA"]}
          style={styles.card}
        >

          <Text style={styles.label}>
            Username
          </Text>

          <View style={styles.inputContainer}>
            <Ionicons
              name="person-outline"
              size={20}
              color="#005F99"
            />

            <TextInput
              placeholder="Enter username"
              placeholderTextColor="#999"
              style={styles.input}
              value={username}
              onChangeText={setUsername}
            />
          </View>

          <TouchableOpacity
            style={styles.resetButton}
            onPress={handleReset}
          >
            <LinearGradient
              colors={["#C8102E", "#B50E29", "#005F99"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.resetGradient}
            >
              <Text style={styles.resetButtonText}>RESET PASSWORD</Text>
              <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginLink}
            onPress={() =>
              router.push("/auth/login")
            }
          >
            <Text style={styles.loginText}>
              Back to Login
            </Text>
          </TouchableOpacity>

        </LinearGradient>
        </AnimatedEntrance>

        {/* FOOTER */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Fortuna Global Supply Chain
            Systems
          </Text>

          <Text style={styles.versionText}>
            Version 1.0.0
          </Text>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#EEF5FA",
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 28,
  },

  backButton: {
    marginBottom: 20,
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },

  logo: {
    width: 220,
    height: 120,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#005F99",
    marginTop: 10,
  },

  subtitle: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 6,
    textAlign: "center",
  },

  card: {
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    shadowColor: "#005F99",
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.14,
    shadowRadius: 22,
    elevation: 8,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#172033",

    marginBottom: 8,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#D4E1EC",

    borderRadius: 17,

    paddingHorizontal: 14,

    height: 56,

    backgroundColor: "#FFFFFF",

    marginBottom: 20,
  },

  input: {
    flex: 1,
    marginLeft: 10,

    color: "#000",

    fontSize: 16,
  },

  resetButton: {
    height: 58,
    borderRadius: 17,
    overflow: "hidden",
    shadowColor: "#C8102E",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 14,
    elevation: 6,
  },

  resetGradient: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  resetButtonText: {
    color: "#FFFFFF",

    fontSize: 16,

    fontWeight: "700",

    letterSpacing: 1,
  },

  loginLink: {
    alignItems: "center",
    marginTop: 20,
  },

  loginText: {
    color: "#005F99",
    fontWeight: "600",
  },

  footer: {
    marginTop: 30,
    alignItems: "center",
  },

  footerText: {
    color: "#64748B",
    fontSize: 13,
  },

  versionText: {
    marginTop: 6,
    color: "#94A3B8",
    fontSize: 12,
  },

});