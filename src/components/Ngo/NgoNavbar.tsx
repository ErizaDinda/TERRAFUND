"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NgoNavbar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/ngo/dashboard" },
    { name: "Proyek", href: "/ngo/proyek" },
    { name: "Relawan", href: "/ngo/relawan" },
    { name: "Donasi", href: "/ngo/donasi" },
  ];

  return (
    <nav className="w-full px-6 py-4 bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-5 h-5 bg-gradient-to-r from-green-500 to-green-600 rounded-full"></div>
          <span className="font-semibold text-gray-800">TerraFund NGO</span>
        </Link>

        {/* MENU */}
        <div className="flex gap-7 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${
                pathname === item.href
                  ? "text-green-600 font-semibold"
                  : "text-gray-600 hover:text-gray-800"
              } transition`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* LOGOUT */}
        <button className="bg-red-500 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-red-600 transition">
          Logout
        </button>
      </div>
    </nav>
  );
}
