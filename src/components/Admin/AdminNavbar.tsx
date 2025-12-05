"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // 1. Tambah useRouter
import { LogOut } from "lucide-react";

export default function AdminNavbar() {
  const pathname = usePathname();
  const router = useRouter(); // 2. Init Router

  // 3. Tambah fungsi handleLogout
  const handleLogout = () => {
    try {
      router.push("/login");
    } catch (err) {
      console.error("Logout gagal:", err);
    }
  };

  const menu = [
    { label: "Kelola Proyek", href: "/admin/ngo" },
  ];

  return (
    <nav className="w-full bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      {/* LOGO */}
      <div className="flex items-center gap-2 cursor-pointer">
        <span className="text-2xl">🌍</span>
        <div className="flex flex-col">
           <h1 className="text-xl font-bold text-green-600 tracking-tight">TerraFund <span className="text-xs font-normal text-gray-400">| Admin</span></h1>
        </div>
      </div>

      {/* MENU & ACTION */}
      <div className="flex items-center gap-8">
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

        <div className="h-6 w-px bg-gray-200 hidden md:block"></div>

        {/* 4. Tambah onClick */}
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