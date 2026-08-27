import { getSession } from "next-auth/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const session = await getSession();
  const accessToken =
    session?.accessToken ?? (session?.user as any)?.accessToken;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options?.headers,
  };

  if (accessToken) {
    (headers as any)["Authorization"] = `Bearer ${accessToken}`;
  }

  const res = await fetch(`${API_URL}/api/v1${endpoint}`, {
    headers,
    ...options,
  });

  if (!res.ok) {
    let errorMessage = "API error";
    try {
      const error = await res.json();
      errorMessage = error.message || errorMessage;
    } catch {
      // ignore
    }
    throw new Error(errorMessage);
  }

  return res.json();
}
