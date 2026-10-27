import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { LoginForm } from "./features/auth/LoginForm";
import { RegisterForm } from "./features/auth/RegisterForm";
import { DashboardPage } from "./features/dashboard/DashboardPage";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<div className="p-6">Welcome</div>} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </div>
  );
}
