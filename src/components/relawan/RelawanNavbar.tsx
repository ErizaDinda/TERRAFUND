"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe } from "lucide-react"; // Menambahkan icon Globe

export default function RelawanNavbar() {
  const pathname = usePathname();

  const menu = [
    { label: "Dashboard", href: "/relawan" },
    { label: "Misi Relawan", href: "/relawan/misi" },
    { label: "Status Verifikasi", href: "/relawan/verifikasi" },
    { label: "Wallet", href: "/relawan/wallet" },
    { label: "Profil", href: "/relawan/profil" },
  ];

  return (
    <nav className="w-full bg-white px-6 py-4 flex items-center justify-between">

      <div className="flex items-center gap-2">
        {/* Menggunakan icon Globe dan warna hijau agar konsisten dengan branding */}
        <Globe className="w-6 h-6 text-green-600" /> 
        <h1 className="text-xl font-semibold text-green-600">TerraFund</h1>
      </div>

      <div className="flex items-center gap-6 font-medium text-gray-700">
        {menu.map((m) => (
          <Link
            key={m.href}
            href={m.href}
            className={`hover:text-green-600 transition ${
              pathname === m.href ? "text-green-600" : ""
            }`}
          >
            {m.label}
          </Link>
        ))}
        {/* Tombol Logout bisa ditambahkan di sini, atau di layout utama */}
      </div>
    </nav>
  );
}