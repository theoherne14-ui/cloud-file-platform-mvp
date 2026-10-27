import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="bg-slate-900 px-6 py-4 text-white flex gap-4">
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/dashboard">Dashboard</Link>
    </nav>
  );
}
