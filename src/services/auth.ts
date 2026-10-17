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
  token: string;
  user: AuthUser;
}

const SESSION_KEY = "fortuna_session";
const LOGGED_USER_KEY = "loggedUser";
const IS_LOGGED_IN_KEY = "isLoggedIn";

export async function getStoredSession(): Promise<AuthSession | null> {
  const stored = await AsyncStorage.getItem(SESSION_KEY);

  if (!stored) {
    return null;
  }

  try {
    const session = JSON.parse(stored) as AuthSession;
    return session && session.token && session.user ? session : null;
  } catch {
    return null;
  }
}

export async function loginWithCredentials(email: string, password: string): Promise<AuthSession> {
  const payload = await apiRequest<{
    success?: boolean;
    message?: string;
    token?: string;
    accessToken?: string;
    data?: {
      token?: string;
      user?: AuthUser;
    };
    user?: AuthUser;
  }>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (payload.success === false) {
    throw new Error(payload.message || "Login failed. Please check your credentials.");
  }

  const token = payload.token ?? payload.accessToken ?? payload.data?.token ?? "";
  const fallbackUser: AuthUser = {
    name: payload.user?.name ?? payload.data?.user?.name ?? "Operator",
    email,
  };
  const user = payload.user ?? payload.data?.user ?? fallbackUser;

  if (!token) {
    throw new Error(payload.message || "Login failed. Please check your credentials.");
  }

  const session: AuthSession = { token, user };
  await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(session));
  await AsyncStorage.setItem(LOGGED_USER_KEY, JSON.stringify(user));
  await AsyncStorage.setItem(IS_LOGGED_IN_KEY, "true");

  return session;
}

export async function logout(): Promise<void> {
  await AsyncStorage.removeItem(SESSION_KEY);
  await AsyncStorage.removeItem(LOGGED_USER_KEY);
  await AsyncStorage.setItem(IS_LOGGED_IN_KEY, "false");
}
