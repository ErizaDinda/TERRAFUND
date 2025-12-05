"use client";

import { useState, useEffect } from "react";
import {
  MapPin, Search, Calendar, Coins, ChevronRight, Filter, Loader2, AlertCircle
} from "lucide-react";
import { useRouter } from "next/navigation";
import RelawanNavbar from "@/components/relawan/RelawanNavbar";

// Helper visualisasi agar tampilan tetap menarik walau data dari API polos
const GRADIENTS = [
  "from-green-400 to-emerald-600",
  "from-blue-400 to-cyan-600",
  "from-indigo-400 to-purple-600",
  "from-orange-400 to-red-600",
  "from-pink-400 to-rose-600",
  "from-teal-400 to-green-600"
];

const ICONS = ["🌱", "💧", "📚", "♻️", "🌍", "🤝"];

export default function DaftarMisiRelawan() {
  const router = useRouter();
  
  // 1. STATE MANAGEMENT
  const [missions, setMissions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State untuk Filter & Search
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  // 2. FETCH DATA DARI API
  useEffect(() => {
    const fetchMissions = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:3001/api/projects");

        if (!response.ok) {
          throw new Error("Gagal mengambil daftar misi");
        }

        const data = await response.json();

        // Mapping Data Backend ke Format UI Frontend
        const formattedData = data.map((item: any, index: number) => ({
          id: item.id || item._id,
          title: item.title || item.name || "Misi Tanpa Judul",
          org: item.organization || item.owner || "Organisasi Mitra",
          location: item.location || "Indonesia",
          // Jika kategori kosong, default ke 'Lingkungan'
          category: item.category || "Lingkungan", 
          reward: item.reward || 100,
          deadline: item.deadline 
            ? new Date(item.deadline).toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' }) 
            : "Segera",
          // Visualisasi dinamis (Looping array icon & gradient)
          icon: ICONS[index % ICONS.length],
          gradient: GRADIENTS[index % GRADIENTS.length],
        }));

        setMissions(formattedData);
      } catch (err: any) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMissions();
  }, []);

  // 3. LOGIKA FILTER & SEARCH
  const filtered = missions.filter((m) => {
    // Filter Kategori
    const matchCategory = activeCategory === "Semua" || m.category === activeCategory;
    // Filter Search (Case Insensitive)
    const matchSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchCategory && matchSearch;
  });

  // Kategori statis untuk tombol filter (Bisa juga diambil unik dari data API jika mau dinamis)
  const categories = ["Semua", "Lingkungan", "Kelautan", "Edukasi", "Sosial"];

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
          <div className="flex bg-gray-100 p-1 rounded-xl w-full md:w-auto overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-white text-indigo-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}>
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input (Sekarang Berfungsi) */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Cari nama misi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
            />
          </div>
        </div>

        {/* HANDLING LOADING & ERROR */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-indigo-600 mb-2" />
            <p className="text-gray-500">Sedang memuat daftar misi...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2">
            <AlertCircle size={20} />
            <p>{error}</p>
          </div>
        ) : (
          /* GRID MISI */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((mission) => (
              <div key={mission.id} className="bg-white rounded-2xl shadow-sm border hover:shadow-xl transition duration-300 overflow-hidden flex flex-col group">

                <div className={`h-36 bg-gradient-to-br ${mission.gradient} flex items-center justify-center`}>
                  <div className="text-7xl transform group-hover:scale-110 transition duration-500 select-none">
                    {mission.icon}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">

                  <h3 className="font-bold text-lg text-gray-800 group-hover:text-indigo-600 transition line-clamp-1" title={mission.title}>
                    {mission.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-1">{mission.org}</p>

                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                    <div className="flex items-center gap-2 text-gray-600 line-clamp-1">
                      <MapPin size={16} className="shrink-0" /> <span className="truncate">{mission.location}</span>
                    </div>
                    <div className="flex items-center gap-2 justify-end text-gray-700 font-semibold">
                      <Coins size={16} className="text-yellow-500" /> {mission.reward} TTK
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 col-span-2">
                      <Calendar size={16} className="shrink-0" /> {mission.deadline}
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    // Navigasi ke halaman detail/register sesuai ID dari API
                    onClick={() => router.push(`/relawan/missions/${mission.id}/register`)}
                    className="mt-auto w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-white text-sm font-semibold transition flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                  >
                    Daftar Misi <ChevronRight size={16} />
                  </button>

                </div>
              </div>
            ))}
          </div>
        )}

        {/* KOSONG STATE */}
        {!isLoading && !error && filtered.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300 mt-8">
            <Filter size={28} className="mx-auto text-gray-400 mb-3" />
            <h3 className="font-semibold text-gray-800">Tidak ada misi ditemukan</h3>
            <p className="text-sm text-gray-500">
              {searchQuery ? `Tidak ada hasil untuk "${searchQuery}"` : "Coba ubah filter kategori."}
            </p>
          </div>
        )}

      </div>
    </div>
  );
}