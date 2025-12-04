"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function DonaturNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  const menu = [
    { label: "Dashboard", href: "/donatur" },
    { label: "Donasi Saya", href: "/donatur/donasi-saya" },
    { label: "Profil", href: "/donatur/profil" },
  ];

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("authToken");
      
      // Optional: panggil endpoint logout di backend
      if (token) {
        await fetch("http://localhost:3001/api/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      }

      // Hapus token & data user dari localStorage
      localStorage.removeItem("authToken");
      localStorage.removeItem("currentUser");
      localStorage.removeItem("userId"); // jika disimpan terpisah

      // Redirect ke halaman login
      router.push("/login");
    } catch (err) {
      console.error("Logout gagal:", err);
      alert("Terjadi kesalahan saat logout. Coba lagi.");
    }
  };

  return (
    <nav className="w-full bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      {/* LOGO */}
      <Link href="/donatur" className="flex items-center gap-2">
        <span className="text-2xl">🌍</span>
        <h1 className="text-xl font-bold text-green-600 tracking-tight">TerraFund</h1>
      </Link>

      {/* MENU & ACTION */}
      <div className="flex items-center gap-8">
        {/* Links */}
        <div className="hidden md:flex items-center gap-6 font-medium text-gray-500">
          {menu.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className={`transition hover:text-green-600 ${
                pathname === m.href ? "text-green-600 font-bold" : ""
              }`}
            >
              {m.label}
            </Link>
          ))}
        </div>

        {/* Separator */}
        <div className="h-6 w-px bg-gray-200 hidden md:block"></div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-50 text-red-600 border border-red-100 px-4 py-2 rounded-lg font-semibold text-xs hover:bg-red-100 transition"
        >
          <LogOut className="w-3.5 h-3.5" />
          Logout
        </button>
      </div>
    </nav>
  );
}
