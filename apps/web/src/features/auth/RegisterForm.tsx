import { FormEvent, useState } from "react";
import { apiPost } from "../../lib/api";

export function RegisterForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      await apiPost("/auth/register", { email, name });
      alert("Registration successful");
    } catch {
      alert("Registration failed");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <input value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded px-3 py-2 mb-3" placeholder="Name" />
      <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border rounded px-3 py-2 mb-3" placeholder="Email" />
      <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">Register</button>
    </form>
  );
}
