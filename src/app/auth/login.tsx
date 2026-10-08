import { useEffect, useState } from "react";
import {
  Animated,
  Easing,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

const BRAND_RED = "#C8102E";
const BRAND_BLUE = "#005F99";
const INK = "#172033";

export default function LoginScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState<"email" | "password" | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [floatAnim] = useState(() => new Animated.Value(0));
  const [pulseAnim] = useState(() => new Animated.Value(0));
  const [cardAnim] = useState(() => new Animated.Value(0));
  const [orbitAnim] = useState(() => new Animated.Value(0));
  const [shineAnim] = useState(() => new Animated.Value(0));

  useEffect(() => {
    const animation = Animated.parallel([
      Animated.timing(cardAnim, {
        toValue: 1,
        duration: 760,
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(floatAnim, {
            toValue: 1,
            duration: 3200,
            useNativeDriver: true,
          }),
          Animated.timing(floatAnim, {
            toValue: 0,
            duration: 3200,
            useNativeDriver: true,
          }),
        ]),
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 0,
            duration: 1800,
            useNativeDriver: true,
          }),
        ]),
      ),
      Animated.loop(
        Animated.timing(orbitAnim, {
          toValue: 1,
          duration: 18000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ),
      Animated.loop(
        Animated.timing(shineAnim, {
          toValue: 1,
          duration: 2600,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ),
    ]);

    animation.start();
    return () => animation.stop();
  }, [cardAnim, floatAnim, orbitAnim, pulseAnim, shineAnim]);

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
        "https://fortuna-sims-backend.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        },
      );

      console.log("STATUS:", response.status);
      if (!response.ok) {
        throw new Error("Server Error");
      }

      const data = await response.json();

      console.log("LOGIN DATA:", data);

      if (data.success) {
        console.log("Logged User", data.user);

        await AsyncStorage.setItem("loggedUser", JSON.stringify(data.user));

        await AsyncStorage.setItem("isLoggedIn", "true");

        router.replace("/dashboard");
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.log(err);

      setError("Unable to connect server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.scene}>
          <View style={styles.backgroundGrid}>
            {Array.from({ length: 10 }).map((_, index) => (
              <View key={`grid-${index}`} style={styles.gridLine} />
            ))}
          </View>
          <Animated.View
            style={[
              styles.redOrb,
              {
                opacity: pulseAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.18, 0.34],
                }),
                transform: [
                  {
                    scale: pulseAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.94, 1.08],
                    }),
                  },
                ],
              },
            ]}
          />
          <Animated.View
            style={[
              styles.blueOrb,
              {
                opacity: pulseAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.18, 0.28],
                }),
                transform: [
                  {
                    translateY: floatAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -18],
                    }),
                  },
                ],
              },
            ]}
          />

          <View style={styles.hero}>
            <Animated.View
              pointerEvents="none"
              style={[
                styles.orbitRing,
                {
                  transform: [
                    {
                      rotateZ: orbitAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ["0deg", "360deg"],
                      }),
                    },
                  ],
                },
              ]}
            >
              <View style={styles.orbitAccent} />
            </Animated.View>
            <Animated.View
              style={[
                styles.logoPodium,
                {
                  transform: [
                    { perspective: 900 },
                    {
                      rotateX: floatAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ["8deg", "-4deg"],
                      }),
                    },
                    {
                      rotateY: floatAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ["-9deg", "8deg"],
                      }),
                    },
                    {
                      translateY: floatAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -12],
                      }),
                    },
                  ],
                },
              ]}
            >
              <LinearGradient
                colors={["#FFFFFF", "#F3F8FC", "#E7F0F7"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.logoFace}
              >
                <Image
                  source={require("../../../assets/images/sims-logo.png")}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </LinearGradient>
              <View style={styles.logoShadow} />
            </Animated.View>

            <View style={styles.brandPill}>
              <Ionicons name="cube-outline" size={15} color={BRAND_BLUE} />
              <Text style={styles.brandPillText}>Secure inventory access</Text>
            </View>
            <Text style={styles.title}>
              <Text style={styles.brandTitleBlue}>FORTUNA </Text>
              <Text style={styles.brandTitleRed}>SIMS</Text>
            </Text>
            <Text style={styles.subtitle}>
              Supply & Inventory Management System
            </Text>
          </View>

          <Animated.View
            style={[
              styles.cardWrap,
              {
                opacity: cardAnim,
                transform: [
                  { perspective: 1000 },
                  {
                    rotateX: cardAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["5deg", "0deg"],
                    }),
                  },
                  {
                    translateY: cardAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [34, 0],
                    }),
                  },
                  {
                    scale: cardAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.96, 1],
                    }),
                  },
                ],
              },
            ]}
          >
            <LinearGradient
              colors={["#FFFFFF", "#F7FAFD", "#EEF5FA"]}
              style={styles.card}
            >
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.cardTitle}>Sign in</Text>
                </View>
                <View style={styles.secureBadge}>
                  <Ionicons
                    name="shield-checkmark"
                    size={19}
                    color={BRAND_RED}
                  />
                </View>
              </View>

              <Text style={styles.label}>Email Address</Text>
              <View
                style={[
                  styles.inputContainer,
                  focusedField === "email" && styles.inputFocused,
                ]}
              >
                <Ionicons name="mail-outline" size={20} color={BRAND_BLUE} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter email"
                  placeholderTextColor="#8796A8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                />
              </View>

              <Text style={styles.label}>Password</Text>
              <View
                style={[
                  styles.inputContainer,
                  focusedField === "password" && styles.inputFocused,
                ]}
              >
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={BRAND_BLUE}
                />
                <TextInput
                  placeholder="Enter password"
                  placeholderTextColor="#8796A8"
                  secureTextEntry={!showPassword}
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.iconButton}
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={22}
                    color="#56677A"
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.cardMetaRow}>
                <View style={styles.statusChip}>
                  <View style={styles.statusDot} />
                  <Text style={styles.statusText}>Live sync ready</Text>
                </View>
                <TouchableOpacity
                  style={styles.forgotContainer}
                  onPress={() => router.push("/auth/forgot-password")}
                >
                  <Text style={styles.forgotText}>Forgot password?</Text>
                </TouchableOpacity>
              </View>

              {error ? (
                <View style={styles.errorBox}>
                  <Ionicons
                    name="alert-circle-outline"
                    size={18}
                    color={BRAND_RED}
                  />
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              ) : null}

              <TouchableOpacity
                activeOpacity={0.86}
                disabled={loading}
                style={[
                  styles.loginButton,
                  loading && styles.loginButtonDisabled,
                ]}
                onPress={handleLogin}
              >
                <LinearGradient
                  colors={[BRAND_RED, "#B50E29", BRAND_BLUE]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.loginGradient}
                >
                  <Animated.View
                    pointerEvents="none"
                    style={[
                      styles.buttonShine,
                      {
                        transform: [
                          {
                            translateX: shineAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: [-150, 320],
                            }),
                          },
                        ],
                      },
                    ]}
                  >
                    <LinearGradient
                      colors={[
                        "rgba(255,255,255,0)",
                        "rgba(255,255,255,0.34)",
                        "rgba(255,255,255,0)",
                      ]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.buttonShineGradient}
                    />
                  </Animated.View>
                  <Text style={styles.loginButtonText}>
                    {loading ? "PLEASE WAIT..." : "SIGN IN"}
                  </Text>
                  <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>
          </Animated.View>

          {width >= 600 && (
            <>
              <Animated.View
                pointerEvents="none"
                style={[
                  styles.floatingPanel,
                  styles.panelLeft,
                  {
                    transform: [
                      { perspective: 800 },
                      { rotateY: "-22deg" },
                      {
                        translateY: floatAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, -16],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <Ionicons name="barcode-outline" size={22} color={BRAND_BLUE} />
                <View>
                  <Text style={styles.panelValue}>RFID</Text>
                  <Text style={styles.panelLabel}>Scan flow</Text>
                </View>
              </Animated.View>
              <Animated.View
                pointerEvents="none"
                style={[
                  styles.floatingPanel,
                  styles.panelRight,
                  {
                    transform: [
                      { perspective: 800 },
                      { rotateY: "22deg" },
                      {
                        translateY: floatAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [-10, 8],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <Ionicons
                  name="analytics-outline"
                  size={22}
                  color={BRAND_RED}
                />
                <View>
                  <Text style={styles.panelValue}>99.8%</Text>
                  <Text style={styles.panelLabel}>Accuracy</Text>
                </View>
              </Animated.View>
            </>
          )}

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Fortuna Global Supply Chain Systems
            </Text>
            <Text style={styles.versionText}>Version 1.0.0</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EEF5FA" },
  scrollContainer: { flexGrow: 1, paddingHorizontal: 20, paddingVertical: 28 },
  scene: {
    flex: 1,
    justifyContent: "center",
    minHeight: 760,
    overflow: "hidden",
  },
  backgroundGrid: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    opacity: 0.35,
    transform: [{ rotate: "-12deg" }, { scale: 1.25 }],
  },
  gridLine: { height: 1, marginBottom: 38, backgroundColor: "#C9DAE8" },
  redOrb: {
    position: "absolute",
    top: 58,
    right: -66,
    width: 210,
    height: 210,
    borderRadius: 105,
    backgroundColor: BRAND_RED,
  },
  blueOrb: {
    position: "absolute",
    bottom: 98,
    left: -78,
    width: 230,
    height: 230,
    borderRadius: 115,
    backgroundColor: BRAND_BLUE,
  },
  hero: { alignItems: "center", marginBottom: 22, position: "relative" },
  orbitRing: {
    position: "absolute",
    top: -8,
    width: 236,
    height: 142,
    borderRadius: 120,
    borderWidth: 1,
    borderColor: "rgba(0,95,153,0.24)",
    alignItems: "flex-end",
    padding: 14,
  },
  orbitAccent: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: BRAND_RED,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  logoPodium: { alignItems: "center", marginBottom: 16 },
  logoFace: {
    width: 206,
    height: 126,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#FFFFFF",
    shadowColor: BRAND_BLUE,
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.22,
    shadowRadius: 22,
    elevation: 12,
  },
  logo: { width: 172, height: 88 },
  logoShadow: {
    width: 144,
    height: 16,
    marginTop: -5,
    borderRadius: 999,
    backgroundColor: "#9FB6C9",
    opacity: 0.23,
    transform: [{ scaleX: 1.25 }],
  },
  brandPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D8E6F0",
    marginBottom: 12,
  },
  brandPillText: {
    color: BRAND_BLUE,
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  title: {
    fontSize: 31,
    fontWeight: "900",
    color: BRAND_BLUE,
    textAlign: "center",
  },
  brandTitleBlue: { color: BRAND_BLUE },
  brandTitleRed: { color: BRAND_RED },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: "#596D82",
    marginTop: 6,
    textAlign: "center",
  },
  cardWrap: { zIndex: 2, width: "100%", maxWidth: 480, alignSelf: "center" },
  card: {
    borderRadius: 30,
    padding: 22,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    shadowColor: "#0B2740",
    shadowOffset: { width: 0, height: 22 },
    shadowOpacity: 0.16,
    shadowRadius: 28,
    elevation: 14,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  cardEyebrow: { fontSize: 13, fontWeight: "800" },
  cardTitle: {
    color: BRAND_RED,
    fontSize: 27,
    fontWeight: "900",
    marginTop: 2,
  },
  secureBadge: {
    width: 42,
    height: 42,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FCE8EC",
    borderWidth: 1,
    borderColor: "#F4C7D0",
  },
  label: {
    fontSize: 14,
    fontWeight: "800",
    color: BRAND_BLUE,
    marginBottom: 8,
    marginTop: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D4E1EC",
    borderRadius: 18,
    paddingHorizontal: 14,
    height: 58,
    backgroundColor: "#FFFFFF",
    marginBottom: 12,
  },
  inputFocused: {
    borderColor: BRAND_BLUE,
    shadowColor: BRAND_BLUE,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 3,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: INK,
    fontSize: 16,
    borderWidth: 0,
    backgroundColor: "transparent",
    paddingVertical: 0,
  },
  iconButton: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
  },
  cardMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  statusChip: { flexDirection: "row", alignItems: "center", gap: 7 },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: BRAND_BLUE,
  },
  statusText: { color: "#677B8E", fontSize: 12, fontWeight: "700" },
  forgotContainer: { paddingVertical: 5, paddingLeft: 10 },
  forgotText: { color: BRAND_RED, fontWeight: "800" },
  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 12,
    borderRadius: 14,
    backgroundColor: "#FCE8EC",
    borderWidth: 1,
    borderColor: "#F4C7D0",
    marginBottom: 14,
  },
  errorText: { flex: 1, color: BRAND_RED, fontWeight: "700" },
  loginButton: {
    height: 58,
    borderRadius: 18,
    overflow: "hidden",
    shadowColor: BRAND_RED,
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.24,
    shadowRadius: 18,
    elevation: 8,
  },
  loginButtonDisabled: { opacity: 0.76 },
  loginGradient: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    overflow: "hidden",
  },
  buttonShine: { position: "absolute", top: 0, bottom: 0, width: 82 },
  buttonShineGradient: { flex: 1 },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 0.6,
  },
  floatingPanel: {
    position: "absolute",
    zIndex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 13,
    paddingVertical: 11,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.88)",
    borderWidth: 1,
    borderColor: "#FFFFFF",
    shadowColor: "#0B2740",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.16,
    shadowRadius: 18,
    elevation: 7,
  },
  panelLeft: { top: 246, left: 2 },
  panelRight: { top: 204, right: 0 },
  panelValue: { color: INK, fontSize: 14, fontWeight: "900" },
  panelLabel: { color: "#697A8B", fontSize: 11, fontWeight: "700" },
  footer: { marginTop: 28, alignItems: "center" },
  footerText: {
    color: "#596D82",
    fontSize: 13,
    fontWeight: "700",
    textAlign: "center",
  },
  versionText: {
    marginTop: 6,
    color: "#8495A6",
    fontSize: 12,
    fontWeight: "700",
  },
});
