const API_BASE = "http://localhost:3000";

export async function apiGet<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`);
  if (!res.ok) throw new Error("API request failed");
  return res.json();
}

export async function apiPost<T>(endpoint: string, body: any): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error("API request failed");
  return res.json();
}
