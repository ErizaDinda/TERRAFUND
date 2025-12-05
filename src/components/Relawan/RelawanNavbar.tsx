"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // 1. Tambah useRouter
import { LogOut } from "lucide-react";

export default function RelawanNavbar() {
  const pathname = usePathname();
  const router = useRouter(); // 2. Inisialisasi router

  // 3. Fungsi Handle Logout
  const handleLogout = async () => {
    try {
      // Masukkan logika penghapusan session/token di sini jika ada (misal: deleteCookie)
      
      // Redirect ke halaman login
      router.push("/login");
    } catch (err) {
      console.error("Logout gagal:", err);
      alert("Terjadi kesalahan saat logout. Coba lagi.");
    }
  };

  const menu = [
    { label: "Cari Misi", href: "/relawan/daftar" },
    { label: "Profil", href: "/relawan/profil" },
  ];

  return (
    <nav className="w-full bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      
      {/* LOGO */}
      <Link href="/relawan/dashboard" className="flex items-center gap-2">
        <span className="text-2xl">🌍</span>
        <h1 className="text-xl font-semibold text-green-600">TerraFund</h1>
      </Link>

      {/* MENU & LOGOUT */}
      <div className="flex items-center gap-6 font-medium text-gray-700">
        
        {/* Links */}
        <div className="hidden md:flex items-center gap-6">
          {menu.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className={`hover:text-green-600 transition ${
                pathname === m.href ? "text-green-600 font-bold" : ""
              }`}
            >
              {m.label}
            </Link>
          ))}
        </div>

        {/* Separator */}
        <div className="h-5 w-px bg-gray-300 hidden md:block"></div>

        {/* Logout Button dengan onClick */}
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