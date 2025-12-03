"use client";

import { useState } from "react";
import {
  MapPin, Search, Calendar, Coins, ChevronRight, Filter
} from "lucide-react";
import { useRouter } from "next/navigation";
import RelawanNavbar from "@/components/relawan/RelawanNavbar";

export default function DaftarMisiRelawan() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const router = useRouter();

  const missions = [
    {
      id: 1,
      title: "Penanaman Pohon Mangrove",
      org: "Green Earth",
      location: "Surabaya, Jawa Timur",
      category: "Lingkungan",
      reward: 150,
      deadline: "12 Des 2025",
      icon: "🌱",
      gradient: "from-green-400 to-emerald-600",
    },
    {
      id: 2,
      title: "Bersih-bersih Pantai Kuta",
      org: "Ocean Care",
      location: "Denpasar, Bali",
      category: "Kelautan",
      reward: 100,
      deadline: "20 Des 2025",
      icon: "💧",
      gradient: "from-blue-400 to-cyan-600",
    },
    {
      id: 3,
      title: "Edukasi Lingkungan SD",
      org: "EduCare Foundation",
      location: "Jakarta Selatan",
      category: "Edukasi",
      reward: 200,
      deadline: "10 Jan 2026",
      icon: "📚",
      gradient: "from-indigo-400 to-purple-600",
    },
    {
      id: 4,
      title: "Daur Ulang Sampah Plastik",
      org: "Clean City",
      location: "Bandung, Jawa Barat",
      category: "Lingkungan",
      reward: 120,
      deadline: "15 Jan 2026",
      icon: "♻️",
      gradient: "from-emerald-400 to-teal-600",
    },
  ];

  const filtered = activeCategory === "Semua"
    ? missions
    : missions.filter(m => m.category === activeCategory);

  const categories = ["Semua", "Lingkungan", "Kelautan", "Edukasi"];

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      
      {/* NAVBAR */}
      <RelawanNavbar />

      {/* HEADER */}
      <div className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 pt-16 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white">Daftar Misi</h2>
          <p className="text-indigo-100 text-lg max-w-2xl mt-2">
            Pilih misi yang ingin Anda bantu dan mulai berkontribusi untuk lingkungan!
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 -mt-24">

        {/* Toolbar */}
        <div className="bg-white rounded-2xl p-4 shadow-lg border mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Category Filter */}
          <div className="flex bg-gray-100 p-1 rounded-xl w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-white text-indigo-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}>
                {cat}
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

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((mission) => (
            <div key={mission.id} className="bg-white rounded-2xl shadow-sm border hover:shadow-xl transition duration-300 overflow-hidden flex flex-col group">

              <div className={`h-36 bg-gradient-to-br ${mission.gradient} flex items-center justify-center`}>
                <div className="text-7xl transform group-hover:scale-110 transition duration-500">
                  {mission.icon}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">

                <h3 className="font-bold text-lg text-gray-800 group-hover:text-indigo-600 transition line-clamp-1">
                  {mission.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4">{mission.org}</p>

                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin size={16} /> {mission.location}
                  </div>
                  <div className="flex items-center gap-2 justify-end text-gray-700 font-semibold">
                    <Coins size={16} /> {mission.reward} TTK
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar size={16} /> {mission.deadline}
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={() => router.push(`/relawan/missions/${mission.id}/register`)}
                  className="mt-auto w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-white text-sm font-semibold transition flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                >
                  Daftar Misi <ChevronRight size={16} />
                </button>

              </div>
            </div>
          ))}
        </div>

        {/* Kosong */}
        {filtered.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300 mt-8">
            <Filter size={28} className="mx-auto text-gray-400 mb-3" />
            <h3 className="font-semibold text-gray-800">Tidak ada misi ditemukan</h3>
            <p className="text-sm text-gray-500">Coba ubah filter kategori.</p>
          </div>
        )}

      </div>
    </div>
  );
}
