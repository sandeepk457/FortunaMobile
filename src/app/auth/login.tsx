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
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] =
    useState(false);

  const handleLogin = async () => {

  try {

    setError("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!password.trim()) {
      setError("Password is required");
      return;
    }

    setLoading(true);

    const response = await fetch(
      "http://192.168.0.102:5000/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    if (data.success) {

      console.log(
        "Logged User",
        data.user
      );

      router.replace(
        "/dashboard"
      );

    } else {

      setError(
        data.message
      );

    }

  } catch (err) {

    console.log(err);

    setError(
      "Unable to connect server"
    );

  } finally {

    setLoading(false);

  }

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
        {/* LOGO */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../../../assets/images/sims-logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.title}>
            Fortuna SIMS
          </Text>

          <Text style={styles.subtitle}>
            Supply & Inventory Management
            System
          </Text>
        </View>

        {/* LOGIN CARD */}
        <View style={styles.card}>

          {/* USERNAME */}
          <Text style={styles.label}>
            Email Address
          </Text>

          <View style={styles.inputContainer}>
            <Ionicons
  name="mail-outline"
  size={20}
  color="#005F99"
/>

            <TextInput
  style={styles.input}
  placeholder="Enter email"
  placeholderTextColor="#999"
  keyboardType="email-address"
  autoCapitalize="none"
  value={email}
  onChangeText={setEmail}
/>
          </View>

          {/* PASSWORD */}
          <Text style={styles.label}>
            Password
          </Text>

          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#005F99"
            />

            <TextInput
              placeholder="Enter password"
              placeholderTextColor="#999"
              secureTextEntry={!showPassword}
              style={styles.input}
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity
              onPress={() =>
                setShowPassword(
                  !showPassword
                )
              }
            >
              <Ionicons
                name={
                  showPassword
                    ? "eye-off-outline"
                    : "eye-outline"
                }
                size={22}
                color="#666"
              />
            </TouchableOpacity>
          </View>

          {/* FORGOT PASSWORD */}
          <TouchableOpacity
            style={styles.forgotContainer}
            onPress={() =>
              router.push(
                "/auth/forgot-password"
              )
            }
          >
            <Text style={styles.forgotText}>
              Forgot Password?
            </Text>
          </TouchableOpacity>

          {error ? (
  <Text style={styles.errorText}>
    {error}
  </Text>
) : null}

          {/* LOGIN BUTTON */}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
          >
            <Text
  style={styles.loginButtonText}
>
  {loading
    ? "PLEASE WAIT..."
    : "SIGN IN"}
</Text>
          </TouchableOpacity>

        </View>

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
    backgroundColor: "#F4F7FB",
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
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
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,

    elevation: 5,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    marginTop: 10,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#D6E0EA",

    borderRadius: 14,

    paddingHorizontal: 14,
    height: 56,

    backgroundColor: "#FFF",

    marginBottom: 12,
  },

  input: {
  flex: 1,
  marginLeft: 10,
  color: "#000",
  fontSize: 16,
  borderWidth: 0,
  backgroundColor: "transparent",
  paddingVertical: 0,
} as any,

  forgotContainer: {
    alignItems: "flex-end",
    marginBottom: 20,
  },

  forgotText: {
    color: "#C8102E",
    fontWeight: "600",
  },

  errorText: {
    color: "#C8102E",
    marginBottom: 12,
    textAlign: "center",
  },

  loginButton: {
    backgroundColor: "#C8102E",

    height: 56,

    borderRadius: 14,

    justifyContent: "center",
    alignItems: "center",
  },

  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 1,
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