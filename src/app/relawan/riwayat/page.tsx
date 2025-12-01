"use client";

import { useState } from "react";
import RelawanNavbar from "@/components/relawan/RelawanNavbar";
import { 
  Globe, 
  LogOut, 
  Clock, 
  CheckCircle, 
  XCircle, 
  MapPin, 
  Search, 
  Filter, 
  Calendar,
  Award
} from "lucide-react";

export default function RiwayatRelawan() {
  const [filter, setFilter] = useState("Semua");

  const history = [
    {
      id: 1,
      title: "Penanaman Pohon Mangrove",
      org: "Green Earth",
      location: "Surabaya, Jawa Timur",
      icon: "🌱",
      color: "bg-green-100 text-green-600",
      status: "Selesai",
      date: "12 Jan 2025",
      hours: 5,
      role: "Penanam Bibit"
    },
    {
      id: 2,
      title: "Bersih-bersih Pantai Kuta",
      org: "Ocean Care",
      location: "Denpasar, Bali",
      icon: "💧",
      color: "bg-blue-100 text-blue-600",
      status: "Ditolak",
      date: "20 Dec 2024",
      hours: 0,
      role: "Pembersih Area"
    },
    {
      id: 3,
      title: "Edukasi Lingkungan SD",
      org: "EduCare",
      location: "Jakarta Selatan",
      icon: "📚",
      color: "bg-indigo-100 text-indigo-600",
      status: "Menunggu Verifikasi",
      date: "03 Feb 2025",
      hours: 4,
      role: "Fasilitator"
    },
    {
      id: 4,
      title: "Daur Ulang Sampah Plastik",
      org: "Clean City",
      location: "Bandung, Jawa Barat",
      icon: "♻️",
      color: "bg-green-100 text-green-600",
      status: "Selesai",
      date: "15 Jan 2025",
      hours: 6,
      role: "Koordinator Lapangan"
    }
  ];

  const statusStyle: any = {
    "Selesai": "text-green-700 bg-green-50 border-green-200",
    "Menunggu Verifikasi": "text-yellow-700 bg-yellow-50 border-yellow-200",
    "Ditolak": "text-red-700 bg-red-50 border-red-200",
  };

  const statusIcon: any = {
    "Selesai": <CheckCircle className="w-3.5 h-3.5" />,
    "Menunggu Verifikasi": <Clock className="w-3.5 h-3.5" />,
    "Ditolak": <XCircle className="w-3.5 h-3.5" />,
  };

  // Filter Logic
  const filteredHistory = filter === "Semua" 
    ? history 
    : history.filter(item => item.status === filter);

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">

      {/* NAVBAR */}
      <RelawanNavbar />

      {/* HEADER SECTION (Gradient Ungu) */}
      <div className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 pb-32 pt-16 px-6 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-end">
          <div>
             <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Riwayat Aktivitas</h1>
             <p className="text-indigo-100 text-lg">
               Jejak langkah kontribusi nyata Anda untuk bumi.
             </p>
          </div>
          
          {/* Summary Stats Kecil di Header */}
          <div className="hidden md:flex gap-4">
             <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-lg text-white">
                <p className="text-xs text-indigo-200">Total Misi</p>
                <p className="text-xl font-bold">{history.filter(h => h.status === 'Selesai').length}</p>
             </div>
             <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-lg text-white">
                <p className="text-xs text-indigo-200">Total Jam</p>
                <p className="text-xl font-bold">15 Jam</p>
             </div>
          </div>
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div className="max-w-6xl mx-auto px-6 -mt-20">
        
        {/* Toolbar (Search & Filter) */}
        <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
           {/* Tabs Filter */}
           <div className="flex bg-gray-50 p-1 rounded-lg w-full md:w-auto overflow-x-auto">
              {["Semua", "Selesai", "Menunggu Verifikasi", "Ditolak"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-4 py-2 rounded-md text-sm font-semibold whitespace-nowrap transition-all ${
                    filter === tab 
                      ? "bg-white text-indigo-600 shadow-sm" 
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
           </div>

           {/* Search Input */}
           <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Cari nama kegiatan..." 
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50 transition"
              />
           </div>
        </div>

        {/* History Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHistory.map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition group">
              
              {/* Card Header */}
              <div className="flex justify-between items-start mb-4">
                 <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${item.color}`}>
                    {item.icon}
                 </div>
                 <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${statusStyle[item.status]}`}>
                    {statusIcon[item.status]}
                    {item.status}
                 </span>
              </div>

              {/* Title & Info */}
              <h3 className="font-bold text-lg text-gray-800 mb-1 group-hover:text-indigo-600 transition">{item.title}</h3>
              <p className="text-sm text-gray-500 mb-4 font-medium">{item.org}</p>

              {/* Details List */}
              <div className="space-y-2 text-sm text-gray-600 border-t border-gray-50 pt-4">
                 <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-gray-400" />
                    <span className="truncate">{item.location}</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-gray-400" />
                    <span>{item.date}</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <Award size={16} className="text-gray-400" />
                    <span>Peran: {item.role}</span>
                 </div>
              </div>

              {/* Footer Button (Detail) */}
              <button className="w-full mt-6 py-2.5 rounded-lg border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 hover:text-indigo-600 transition">
                 Lihat Sertifikat / Detail
              </button>

            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredHistory.length === 0 && (
           <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
              <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Filter className="text-gray-400" size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Tidak ada riwayat ditemukan</h3>
              <p className="text-gray-500 text-sm">Coba ubah filter status aktivitas Anda.</p>
           </div>
        )}

      </div>
    </div>
  );
}