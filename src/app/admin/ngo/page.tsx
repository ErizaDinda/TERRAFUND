'use client';

import AdminNavbar from "@/components/Admin/AdminNavbar";
import { Building2, CheckCircle, MoreHorizontal, Mail, MapPin, Search } from "lucide-react";

export default function KelolaNgoPage() {
  // ... (Data ngoList tetap sama) ...
  const ngoList = [
    {
      id: 1,
      name: "Blue Ocean Society",
      email: "contact@blueocean.org",
      location: "Bali, Indonesia",
      status: "Pending", 
      joinDate: "Hari ini, 09:00",
    },
    {
      id: 2,
      name: "Green Earth Foundation",
      email: "admin@greenearth.org",
      location: "Kalimantan Timur",
      status: "Verified",
      joinDate: "12 Okt 2024",
    },
    // ... lainnya
  ];

  return (
    <main className="w-full pb-24 bg-gray-50 min-h-screen font-sans">
      <AdminNavbar />

      {/* HEADER GRADASI UNGU */}
      <section className="w-full bg-gradient-to-r from-[#6A6AFB] to-[#8A4FFF] px-6 py-16 pb-28 text-white shadow-xl">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
             <h2 className="text-3xl font-bold">Kelola Mitra NGO</h2>
             <p className="text-indigo-100 mt-2">Verifikasi legalitas dan kelola akun organisasi partner.</p>
          </div>
          
          {/* SEARCH BAR (UPDATED: Background Putih) */}
          <div className="relative w-full md:w-80">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
             <input 
                type="text" 
                placeholder="Cari nama organisasi..." 
                // TAMBAHAN: bg-white dan text-gray-700
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white text-gray-700 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#00A651] shadow-lg transition"
             />
          </div>
        </div>
      </section>

      {/* CONTENT LIST */}
      <section className="max-w-6xl mx-auto px-6 -mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ngoList.map((ngo) => (
            <div key={ngo.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition duration-300 group">
               
               <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-indigo-50 rounded-xl text-[#6A6AFB]">
                     <Building2 size={24} />
                  </div>
                  {ngo.status === "Verified" ? (
                     <span className="bg-green-100 text-[#00A651] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-green-200">
                        <CheckCircle size={12} /> Verified
                     </span>
                  ) : (
                     <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-3 py-1 rounded-full animate-pulse border border-yellow-200">
                        Perlu Verifikasi
                     </span>
                  )}
               </div>

               <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-[#6A6AFB] transition">{ngo.name}</h3>
               
               <div className="space-y-2 text-sm text-gray-500 mt-4">
                  <div className="flex items-center gap-2">
                     <Mail size={14} /> {ngo.email}
                  </div>
                  <div className="flex items-center gap-2">
                     <MapPin size={14} /> {ngo.location}
                  </div>
               </div>

               <div className="mt-6 pt-4 border-t border-gray-100 flex gap-3">
                  {ngo.status === "Pending" ? (
                     <button className="flex-1 bg-[#6A6AFB] hover:bg-[#5a5ae0] text-white py-2.5 rounded-xl text-sm font-semibold transition shadow-md">
                        Verifikasi
                     </button>
                  ) : (
                     <button className="flex-1 border border-gray-200 text-gray-600 hover:bg-gray-50 py-2.5 rounded-xl text-sm font-semibold transition">
                        Lihat Detail
                     </button>
                  )}
                  <button className="p-2.5 border border-gray-200 rounded-xl text-gray-400 hover:text-red-500 hover:border-red-200 transition bg-white">
                     <MoreHorizontal size={18} />
                  </button>
               </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}