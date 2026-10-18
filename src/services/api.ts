export const API_BASE_URL = "https://fortuna-sims-backend.onrender.com";

export type ApiRequestOptions = RequestInit & {
  token?: string;
};

export async function apiRequest<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const url = path.startsWith("http") ? path : `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;

  const headers = new Headers(options.headers ?? {});

  if (!(options.body instanceof FormData) && !headers.has("Content-Type") && options.body !== undefined) {
    headers.set("Content-Type", "application/json");
  }

  if (options.token) {
    headers.set("Authorization", `Bearer ${options.token}`);
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const responseText = await response.text();
  let payload: T | null = null;

  if (responseText) {
    try {
      payload = JSON.parse(responseText) as T;
    } catch {
      payload = responseText as unknown as T;
    }
  }

  if (!response.ok) {
    throw new Error(
      (payload as { message?: string; error?: string } | null)?.message ||
        (payload as { message?: string; error?: string } | null)?.error ||
        "Request failed",
    );
  }

  return payload as T;
}
