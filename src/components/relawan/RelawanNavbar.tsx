"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function RelawanNavbar() {
  const pathname = usePathname();

  const menu = [
    { label: "Dashboard", href: "/relawan" },
    { label: "Kegiatan Saya", href: "/relawan/kegiatan-saya" },
    { label: "Riwayat", href: "/relawan/riwayat" },
    { label: "Profil", href: "/relawan/profil" },
  ];

  return (
    <nav className="w-full bg-white px-6 py-4 flex items-center justify-between">

      {/* LOGO */}
      <div className="flex items-center gap-2">
        <span className="text-2xl">🤝</span>
        <h1 className="text-xl font-semibold text-purple-600">TerraRelawan</h1>
      </div>

      {/* MENU */}
      <div className="flex items-center gap-6 font-medium text-gray-700">
        {menu.map((m) => (
          <Link
            key={m.href}
            href={m.href}
            className={`hover:text-purple-600 transition ${
              pathname === m.href ? "text-purple-600" : ""
            }`}
          >
            {m.label}
          </Link>
        ))}
      </div>

    </nav>
  );
}
