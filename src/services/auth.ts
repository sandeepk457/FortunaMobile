
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiRequest } from "./api";

export interface AuthUser {
  id?: string | number;
  name?: string;
  full_name?: string;
  email?: string;
  role?: string;
  warehouse?: string;
  [key: string]: unknown;
}

export interface AuthSession {
  // Empty only when the existing backend does not issue a token.
  token: string;
  user: AuthUser;
}

const SESSION_KEY = "fortuna_session";
const LOGGED_USER_KEY = "loggedUser";
const IS_LOGGED_IN_KEY = "isLoggedIn";

type LoginResponse = {
  success?: boolean;
  message?: string;
  token?: string;
  accessToken?: string;
  data?: {
    token?: string;
    user?: AuthUser;
  };
  user?: AuthUser;
};

export async function getStoredSession(): Promise<AuthSession | null> {
  const stored = await AsyncStorage.getItem(SESSION_KEY);

  if (!stored) {
    return null;
  }

  try {
    const session = JSON.parse(stored) as AuthSession;

    return session && session.user ? session : null;
  } catch {
    return null;
  }
}

export async function loginWithCredentials(
  email: string,
  password: string
): Promise<AuthSession> {
  const payload = await apiRequest<LoginResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (payload.success !== true) {
    throw new Error(
      payload.message || "Login failed. Please check your credentials."
    );
  }

  const token =
    payload.token ??
    payload.accessToken ??
    payload.data?.token ??
    "";

  const user = payload.user ?? payload.data?.user;

  if (!user) {
    throw new Error(
      "Login response did not include user details. Please contact support."
    );
  }

  const normalizedUser: AuthUser = {
    ...user,
    name: user.name ?? user.full_name ?? "Operator",
    email: user.email ?? email,
  };

  const session: AuthSession = {
    token,
    user: normalizedUser,
  };

  await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(session));
  await AsyncStorage.setItem(LOGGED_USER_KEY, JSON.stringify(normalizedUser));
  await AsyncStorage.setItem(IS_LOGGED_IN_KEY, "true");

  return session;
}

export async function logout(): Promise<void> {
  await AsyncStorage.removeItem(SESSION_KEY);
  await AsyncStorage.removeItem(LOGGED_USER_KEY);
  await AsyncStorage.setItem(IS_LOGGED_IN_KEY, "false");
}
