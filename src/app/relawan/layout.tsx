// app/relawan/layout.tsx
"use client";

import { 
  Home, Target, UploadCloud, CheckSquare, Coins, UserCircle, LogOut, Globe 
} from "lucide-react";

export default function RelawanLayout({ children }: { children: React.ReactNode }) {
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";
  const activePage = pathname.split("/")[2]; // ambil 'dashboard', 'wallet', dll

  const menuItems = [
    { icon: Home, label: 'Dashboard', id: 'dashboard', href: '/relawan/dashboard' },
    { icon: Target, label: 'Misi Relawan', id: 'misi', href: '/relawan/misi' },
    { icon: UploadCloud, label: 'Upload Bukti', id: 'upload-bukti', href: '/relawan/upload-bukti' },
    { icon: CheckSquare, label: 'Status Verifikasi', id: 'verifikasi', href: '/relawan/verifikasi' },
    { icon: Coins, label: 'Wallet (TTK)', id: 'wallet', href: '/relawan/wallet' },
    { icon: UserCircle, label: 'Profil', id: 'profil', href: '/relawan/profil' },
    { icon: LogOut, label: 'Logout', id: 'logout', href: '/' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-60 bg-slate-700 text-white flex flex-col">
        <div className="p-5 flex items-center space-x-2">
          <div className="w-7 h-7 bg-green-500 rounded-full flex items-center justify-center">
            <Globe className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold">TerraFund</span>
        </div>

        <nav className="flex-1 px-3 mt-2">
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`flex items-center w-full space-x-3 px-4 py-2.5 rounded ${
                  isActive 
                    ? "bg-slate-600 text-white"
                    : "text-gray-300 hover:bg-slate-600 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>
      </div>

      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}