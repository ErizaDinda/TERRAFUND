"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DonaturNavbar() {
  const pathname = usePathname();

  const menu = [
    { label: "Dashboard", href: "/donatur" },
    { label: "Donasi Saya", href: "/donatur/donasi-saya" },
    { label: "Profil", href: "/donatur/profil" },
  ];

  return (
    <nav className="w-full bg-white px-6 py-4 flex items-center justify-between">

      <div className="flex items-center gap-2">
        <span className="text-2xl">🌍</span>
        <h1 className="text-xl font-semibold text-green-600">TerraFund</h1>
      </div>

      <div className="flex items-center gap-6 font-medium text-gray-700">
        {menu.map((m) => (
          <Link
            key={m.href}
            href={m.href}
            className={`hover:text-green-600 ${
              pathname === m.href ? "text-green-600" : ""
            }`}
          >
            {m.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
