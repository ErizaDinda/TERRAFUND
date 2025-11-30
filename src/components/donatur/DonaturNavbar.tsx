"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react"; // Pastikan install lucide-react

export default function DonaturNavbar() {
  const pathname = usePathname();

  const menu = [
    { label: "Dashboard", href: "/donatur" },
    { label: "Donasi Saya", href: "/donatur/donasi-saya" },
    { label: "Riwayat Transaksi", href: "/donatur/riwayat-transaksi" },
    { label: "Profil", href: "/donatur/profil" },
  ];

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
        <button className="flex items-center gap-2 bg-red-50 text-red-600 border border-red-100 px-4 py-2 rounded-lg font-semibold text-xs hover:bg-red-100 transition">
          <LogOut className="w-3.5 h-3.5" />
          Logout
        </button>
      </div>
    </nav>
  );
}