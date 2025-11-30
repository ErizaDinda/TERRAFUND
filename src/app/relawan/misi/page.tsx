"use client";

import { useState } from "react";
import { 
  Globe, LogOut, MapPin, Clock, CheckCircle2, 
  Hourglass, Search, Filter, Calendar, Coins, 
  ChevronRight, Download, FileText 
} from "lucide-react";

export default function MisiSayaRelawan() {
  const [activeTab, setActiveTab] = useState("Semua");

  // Data Dummy Misi (Diperkaya)
  const missions = [
    {
      id: 1,
      title: "Penanaman Pohon Mangrove",
      org: "Green Earth",
      location: "Surabaya, Jawa Timur",
      status: "Aktif",
      category: "Lingkungan",
      progress: 70,
      reward: 150,
      deadline: "12 Des 2025",
      icon: "🌱",
      color: "bg-green-500", // Kategori Alam
      gradient: "from-green-400 to-emerald-600"
    },
    {
      id: 2,
      title: "Bersih-bersih Pantai Kuta",
      org: "Ocean Care",
      location: "Denpasar, Bali",
      status: "Menunggu",
      category: "Kelautan",
      progress: 0,
      reward: 100,
      deadline: "20 Des 2025",
      icon: "💧",
      color: "bg-blue-500", // Kategori Air
      gradient: "from-blue-400 to-cyan-600"
    },
    {
      id: 3,
      title: "Edukasi Lingkungan SD",
      org: "EduCare Foundation",
      location: "Jakarta Selatan",
      status: "Selesai",
      category: "Edukasi",
      progress: 100,
      reward: 200,
      deadline: "Selesai",
      icon: "📚",
      color: "bg-indigo-500", // Kategori Edukasi
      gradient: "from-indigo-400 to-purple-600"
    },
    {
      id: 4,
      title: "Daur Ulang Sampah Plastik",
      org: "Clean City",
      location: "Bandung, Jawa Barat",
      status: "Aktif",
      category: "Lingkungan",
      progress: 35,
      reward: 120,
      deadline: "15 Jan 2026",
      icon: "♻️",
      color: "bg-green-500",
      gradient: "from-emerald-400 to-teal-600"
    },
  ];

  // Filter Logic Sederhana
  const filteredMissions = activeTab === "Semua" 
    ? missions 
    : missions.filter(m => m.status === activeTab);

  // Status Styles Helper
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Aktif": return "bg-blue-50 text-blue-600 border-blue-100";
      case "Menunggu": return "bg-yellow-50 text-yellow-600 border-yellow-100";
      case "Selesai": return "bg-green-50 text-green-600 border-green-100";
      default: return "bg-gray-50 text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">

      {/* --- NAVBAR --- */}
      <nav className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer">
            <Globe className="w-8 h-8 text-green-500" />
            <span className="text-2xl font-bold text-green-600 tracking-tight">TerraFund</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="/relawan/dashboard" className="text-gray-600 font-medium hover:text-green-600 transition">Dashboard</a>
            <a href="#" className="text-green-600 font-bold border-b-2 border-green-600 pb-1">Misi Saya</a>
            <a href="#" className="text-gray-600 font-medium hover:text-green-600 transition">Riwayat</a>
            <a href="#" className="text-gray-600 font-medium hover:text-green-600 transition">Profil</a>
          </div>

          <button className="hidden md:flex items-center gap-2 bg-red-50 text-red-600 px-5 py-2 rounded-full font-semibold text-sm hover:bg-red-100 transition border border-red-100">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </nav>

      {/* --- HEADER SECTION --- */}
      <div className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 pt-16 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Misi Saya</h1>
          <p className="text-indigo-100 text-lg max-w-2xl">
            Pantau progres kontribusi Anda, selesaikan laporan, dan klaim token reward Anda di sini.
          </p>
        </div>
      </div>

      {/* --- CONTROLS & CONTENT --- */}
      <div className="max-w-7xl mx-auto px-6 -mt-24">
        
        {/* Toolbar Card */}
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
           {/* Tabs */}
           <div className="flex bg-gray-100 p-1 rounded-xl w-full md:w-auto">
              {["Semua", "Aktif", "Menunggu", "Selesai"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${
                    activeTab === tab 
                      ? "bg-white text-indigo-600 shadow-sm" 
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
           </div>

           {/* Search */}
           <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Cari nama misi..." 
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
              />
           </div>
        </div>

        {/* --- MISSION GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMissions.map((mission) => (
            <div 
              key={mission.id} 
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              
              {/* CARD HEADER (Gradient + Icon) */}
              <div className={`h-36 bg-gradient-to-br ${mission.gradient} relative flex items-center justify-center`}>
                 <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white border border-white/30">
                    {mission.category}
                 </div>
                 <div className="text-7xl transform group-hover:scale-110 transition duration-500 drop-shadow-md">
                    {mission.icon}
                 </div>
              </div>

              {/* CARD BODY */}
              <div className="p-6 flex flex-col flex-grow">
                
                {/* Title & Org */}
                <div className="mb-4">
                   <h3 className="font-bold text-lg text-gray-800 line-clamp-1 group-hover:text-indigo-600 transition">{mission.title}</h3>
                   <p className="text-sm text-gray-500">{mission.org}</p>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                   <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin size={16} className="text-gray-400" />
                      <span className="truncate">{mission.location}</span>
                   </div>
                   <div className="flex items-center gap-2 text-sm text-gray-600 justify-end">
                      <Coins size={16} className="text-yellow-500" />
                      <span className="font-semibold text-gray-800">{mission.reward} TTK</span>
                   </div>
                   <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar size={16} className="text-gray-400" />
                      <span>{mission.deadline}</span>
                   </div>
                   <div className="flex justify-end">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(mission.status)}`}>
                         {mission.status}
                      </span>
                   </div>
                </div>

                {/* Progress Bar (Jika Aktif) */}
                {mission.status === "Aktif" && (
                  <div className="mb-6">
                    <div className="flex justify-between text-xs mb-1">
                       <span className="text-gray-500">Progress Laporan</span>
                       <span className="font-bold text-indigo-600">{mission.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                       <div 
                          className="bg-indigo-500 h-2 rounded-full transition-all duration-500" 
                          style={{ width: `${mission.progress}%` }}
                       ></div>
                    </div>
                  </div>
                )}

                {/* Dynamic Action Button */}
                <div className="mt-auto">
                   {mission.status === "Aktif" ? (
                      <button className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
                         <FileText size={16} /> Isi Laporan Kegiatan
                      </button>
                   ) : mission.status === "Selesai" ? (
                      <button className="w-full py-2.5 rounded-xl border border-green-600 text-green-600 hover:bg-green-50 font-semibold text-sm transition flex items-center justify-center gap-2">
                         <Download size={16} /> Unduh Sertifikat
                      </button>
                   ) : (
                      <button className="w-full py-2.5 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 font-semibold text-sm transition flex items-center justify-center gap-2">
                         Lihat Detail <ChevronRight size={16} />
                      </button>
                   )}
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Empty State (Jika filter kosong) */}
        {filteredMissions.length === 0 && (
           <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300 mt-8">
              <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Search className="text-gray-400" size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Tidak ada misi ditemukan</h3>
              <p className="text-gray-500 text-sm">Coba ubah status filter atau kata kunci pencarian Anda.</p>
           </div>
        )}

      </div>
    </div>
  );
}