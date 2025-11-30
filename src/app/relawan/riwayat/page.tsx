"use client";

import { Globe, LogOut, Clock, CheckCircle, XCircle, MapPin } from "lucide-react";

export default function RiwayatRelawan() {
  const history = [
    {
      title: "Penanaman Pohon Mangrove",
      org: "Green Earth",
      location: "Surabaya",
      icon: "🌱",
      color: "bg-green-500",
      status: "Selesai",
      date: "12 Jan 2025",
    },
    {
      title: "Bersih-bersih Pantai Kuta",
      org: "Ocean Care",
      location: "Bali",
      icon: "💧",
      color: "bg-blue-500",
      status: "Ditolak",
      date: "20 Dec 2024",
    },
    {
      title: "Edukasi Lingkungan SD",
      org: "EduCare",
      location: "Jakarta",
      icon: "📚",
      color: "bg-indigo-500",
      status: "Menunggu Verifikasi",
      date: "3 Feb 2025",
    },
  ];

  const statusStyle: any = {
    "Selesai": "text-green-600 bg-green-100",
    "Menunggu Verifikasi": "text-yellow-600 bg-yellow-100",
    "Ditolak": "text-red-600 bg-red-100",
  };

  const statusIcon: any = {
    "Selesai": <CheckCircle className="w-4 h-4" />,
    "Menunggu Verifikasi": <Clock className="w-4 h-4" />,
    "Ditolak": <XCircle className="w-4 h-4" />,
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* --- NAVBAR --- */}
      <nav className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center">

          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer">
            <Globe className="w-8 h-8 text-green-500" />
            <span className="text-2xl font-bold text-green-600 tracking-tight">TerraFund</span>
          </div>

          <div className="hidden md:flex items-center space-x-8 ml-auto">
            <a href="/relawan/dashboard" className="text-gray-600 font-medium hover:text-green-600">Dashboard</a>
            <a href="/relawan/misi-saya" className="text-gray-600 font-medium hover:text-green-600">Misi Saya</a>
            <a href="/relawan/riwayat" className="text-purple-600 font-bold">Riwayat</a>
            <a href="/relawan/profil" className="text-gray-600 font-medium hover:text-green-600">Profil</a>
          </div>

          <button className="hidden md:flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full font-semibold text-sm hover:bg-red-200 transition ml-6">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </nav>

      {/* HEADER UNGU */}
      <div className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 pb-32 pt-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Riwayat Aktivitas Relawan
          </h1>
          <p className="text-indigo-100 text-lg">
            Lihat kembali perjalanan kontribusi kamu
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 -mt-20 pb-20">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {history.map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition border border-gray-100">

              <div className={`h-40 ${item.color} bg-opacity-90 flex items-center justify-center`}>
                <div className="text-6xl">{item.icon}</div>
              </div>

              <div className="p-6">
                <h3 className="font-bold text-gray-800 text-lg mb-1">{item.title}</h3>

                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <span className="font-medium mr-2">{item.org}</span>
                  •
                  <MapPin className="w-3 h-3 ml-2 mr-1" />
                  {item.location}
                </div>

                {/* Status */}
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3 ${statusStyle[item.status]}`}>
                  {statusIcon[item.status]}
                  {item.status}
                </div>

                <p className="text-gray-400 text-sm mb-4">
                  Tanggal: {item.date}
                </p>

                <button className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition shadow-sm">
                  Lihat Detail
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
