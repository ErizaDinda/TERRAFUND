"use client";

import { usePathname } from "next/navigation";
import { Globe, LogOut, Bell, ShieldCheck } from "lucide-react";

export default function AdminNavbar() {
  const pathname = usePathname();

  const menu = [
    { label: "Overview", href: "/admin/dashboard" },
    { label: "Validasi Dana", href: "/admin/validasi" },
    { label: "Kelola NGO", href: "/admin/ngo" },
    { label: "Audit Log", href: "/admin/audit" },
  ];

  return (
    <nav className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* LOGO & ADMIN BADGE */}
        <div className="flex items-center gap-3 cursor-pointer">
          <Globe className="w-8 h-8 text-[#00A651]" /> {/* Hijau TerraFund */}
          <div className="flex flex-col">
             <span className="text-xl font-bold text-gray-800 tracking-tight leading-none">TerraFund</span>
             <span className="text-[10px] font-bold text-[#6A6AFB] uppercase tracking-widest flex items-center gap-1">
              
             </span>
          </div>
        </div>

        {/* MENU */}
        <div className="flex items-center gap-6"> 
          {/* Links */}
          <div className="hidden md:flex items-center space-x-8">
             {menu.map((m) => (
                <a 
                   key={m.href} 
                   href={m.href} 
                   className={`text-sm font-medium transition ${
                      pathname === m.href ? "text-[#00A651] font-bold" : "text-gray-500 hover:text-gray-800"
                   }`}
                >
                   {m.label}
                </a>
             ))}
          </div>

          <div className="h-6 w-px bg-gray-200 hidden md:block"></div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
             <button className="p-2 text-gray-400 hover:text-[#6A6AFB] transition relative">
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
             </button>
             
             <button className="flex items-center gap-2 bg-red-50 text-red-600 border border-red-100 px-4 py-2 rounded-lg font-semibold text-xs hover:bg-red-100 transition">
               <LogOut className="w-3.5 h-3.5" />
               Logout
             </button>
          </div>
        </div>
      </div>
    </nav>
  );
}