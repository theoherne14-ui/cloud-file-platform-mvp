import { FormEvent, useState } from "react";
import { apiPost } from "../../lib/api";

export function LoginForm() {
  const [email, setEmail] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      const result = await apiPost<{ accessToken: string; refreshToken: string; user: any }>("/auth/login", { email });
      localStorage.setItem("auth_token", result.accessToken);
      localStorage.setItem("refresh_token", result.refreshToken);
      alert("Login successful");
    } catch {
      alert("Login failed");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border rounded px-3 py-2 mb-3" placeholder="Email" />
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
    </form>
  );
}
