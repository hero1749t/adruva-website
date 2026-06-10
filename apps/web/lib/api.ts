const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_URL}/api/v1${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    let errorMessage = 'API error';
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
