"use client";

// 1. Import Component Navbar
// Pastikan path import ini sesuai dengan lokasi file RelawanNavbar kamu
import RelawanNavbar from "@/components/Relawan/RelawanNavbar"; 

// 2. Import Icons
// (Globe, LogOut, Menu dihapus karena sudah ada di dalam RelawanNavbar)
import { DollarSign, Check, Hourglass, Trophy, MapPin } from "lucide-react";

export default function DashboardRelawanStyleDonatur() {
  const missions = [
    { 
      title: "Penanaman Pohon Mangrove", 
      org: "Green Earth", 
      location: "Surabaya", 
      icon: "🌱", 
      color: "bg-green-500" 
    },
    { 
      title: "Bersih-bersih Pantai Kuta", 
      org: "Ocean Care", 
      location: "Bali", 
      icon: "💧", 
      color: "bg-blue-500" 
    },
    { 
      title: "Edukasi Lingkungan SD", 
      org: "EduCare", 
      location: "Jakarta", 
      icon: "📚", 
      color: "bg-indigo-500" 
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* --- NAVBAR --- */}
      {/* Navbar hardcoded dihapus dan diganti component ini */}
      <RelawanNavbar />

      {/* --- HEADER UNGU --- */}
      <div className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 pb-32 pt-12 px-6">
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Selamat Datang, Relawan!
            </h1>
            <p className="text-indigo-100 text-lg">
                Terima kasih telah berkontribusi tenaga dan waktu untuk bumi yang lebih hijau.
            </p>
        </div>
      </div>

      {/* --- KONTEN UTAMA --- */}
      <div className="max-w-7xl mx-auto px-6 -mt-20">
        
        {/* STAT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          
          <div className="bg-white rounded-xl p-6 shadow-lg flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
                <p className="text-gray-500 text-xs font-medium uppercase">Token Reward</p>
                <h3 className="text-2xl font-bold text-gray-800">1.250 TTK</h3>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                <Check className="w-6 h-6 text-purple-600" />
            </div>
            <div>
                <p className="text-gray-500 text-xs font-medium uppercase">Misi Selesai</p>
                <h3 className="text-2xl font-bold text-gray-800">15 Misi</h3>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                <Hourglass className="w-6 h-6 text-blue-600" />
            </div>
            <div>
                <p className="text-gray-500 text-xs font-medium uppercase">Misi Aktif</p>
                <h3 className="text-2xl font-bold text-gray-800">3 Proyek</h3>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center shrink-0">
                <Trophy className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
                <p className="text-gray-500 text-xs font-medium uppercase">Level Relawan</p>
                <h3 className="text-2xl font-bold text-yellow-500">Gold</h3>
            </div>
          </div>
        </div>

        {/* TITLE */}
        <div className="mb-6">
            <h2 className="text-xl font-bold text-purple-700">Misi yang Kamu Ikuti</h2>
        </div>

        {/* MISI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-20">
            {missions.map((mission, idx) => (
                <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition border border-gray-100 group">
                  
                  <div className={`h-40 ${mission.color} bg-opacity-90 relative flex items-center justify-center`}>
                      <div className="text-6xl drop-shadow-lg transform group-hover:scale-110 transition duration-300">
                          {mission.icon}
                      </div>
                  </div>

                  <div className="p-6">
                      <h3 className="font-bold text-gray-800 text-lg mb-1">{mission.title}</h3>
                      <div className="flex items-center text-gray-500 text-sm mb-6">
                          <span className="font-medium mr-2">{mission.org}</span>
                          • 
                          <MapPin className="w-3 h-3 ml-2 mr-1" />
                          {mission.location}
                      </div>

                      <button className="w-full py-2.5 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold text-sm transition shadow-sm">
                          Lihat Detail Misi
                      </button>
                  </div>
                </div>
            ))}
        </div>

      </div>
    </div>
  );
}