'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import NgoNavbar from "@/components/Ngo/NgoNavbar";
import { useRouter } from "next/navigation";
import { 
  Users, 
  MapPin, 
  Coins, 
  LayoutDashboard, 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  Target,
  ArrowRight,
  Leaf,
  Droplets,
  BookOpen,
  Loader2,
  Heart
} from "lucide-react";

// Helper visualisasi agar tampilan bervariasi
const BG_HEADERS = ["bg-green-500", "bg-blue-500", "bg-indigo-500", "bg-purple-500", "bg-orange-500"];
const ICONS = [
  <Leaf key="1" size={48} className="text-white" />, 
  <Droplets key="2" size={48} className="text-white" />, 
  <BookOpen key="3" size={48} className="text-white" />,
  <Heart key="4" size={48} className="text-white" />
];

export default function NgoProyekPage() {
  const router = useRouter();

  // 1. STATE MANAGEMENT
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalFunds: 0,
    activeVolunteers: 0
  });

  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ngoName, setNgoName] = useState("NGO Partner");

  // 2. FETCH DATA DARI API
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);

        // A. Ambil Credential dari LocalStorage
        const storedUser = localStorage.getItem("currentUser");
        const token = localStorage.getItem("authToken");

        if (!storedUser || !token) {
            console.error("User belum login");
            return;
        }

        const userObj = JSON.parse(storedUser);
        setNgoName(userObj.name || "NGO Partner");
        const userId = userObj.id; 

        // B. Fetch ke Endpoint Dinamis
        const response = await fetch(`http://localhost:3001/api/ngo/${userId}/dashboard`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
           throw new Error("Gagal mengambil data dashboard NGO");
        }

        const data = await response.json();

        // C. Mapping Data Projects dari 'recent_projects'
        // Struktur JSON: id, title, target_amount, current_amount, status, created_at
        const rawProjects = data.recent_projects || [];

        const formattedData = rawProjects.map((item: any, index: number) => {
          return {
            id: item.id,
            title: item.title || "Proyek Tanpa Judul",
            status: item.status || "submitted", // Default submitted jika kosong
            category: "Sosial", // Fallback category
            desc: item.description || "Deskripsi proyek belum ditambahkan.",
            
            // Mapping Dana (Sesuai field backend)
            raised: Number(item.current_amount || 0),
            target_fund: Number(item.target_amount || 0),
            
            // Tanggal
            createdAt: item.created_at, 
            
            // Data Dummy (tidak ada di JSON dashboard)
            volunteers: 0,
            target_volunteers: 100,
            location: "Indonesia",
            
            // Visualisasi dinamis
            bgHeader: BG_HEADERS[index % BG_HEADERS.length],
            icon: ICONS[index % ICONS.length]
          };
        });

        // D. Hitung Ulang Total Dana di Frontend (Agar Sinkron dengan Kartu)
        // Karena di JSON summary dana_terkumpul: "0", kita hitung manual biar akurat
        const calculatedTotalFunds = formattedData.reduce((acc: number, curr: any) => {
          return acc + curr.raised;
        }, 0);
        
        // E. Update State Statistik
        setStats({
            totalProjects: data.summary?.total_proyek || formattedData.length,
            totalFunds: calculatedTotalFunds, // Pakai hasil hitungan kita
            activeVolunteers: data.summary?.relawan_aktif || 0
        });

        setProjects(formattedData);

      } catch (error) {
        console.error("Error fetching dashboard:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [router]);

  // Format Rupiah
  const formatRupiah = (num: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);

  // Format Tanggal
  const formatDate = (dateString: string) => {
    if(!dateString) return "-";
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric', month: 'short', year: 'numeric'
    });
  }

  // DATA STATISTIK UI
  const statsUI = [
    { 
        label: "Total Proyek", 
        value: `${stats.totalProjects} Proyek`, 
        icon: <LayoutDashboard size={20} />, 
        color: "bg-blue-100 text-blue-600" 
    },
    { 
        label: "Dana Terkumpul", 
        value: formatRupiah(stats.totalFunds), 
        icon: <Coins size={20} />, 
        color: "bg-green-100 text-green-600" 
    },
    { 
        label: "Relawan Aktif", 
        value: `${stats.activeVolunteers} Org`, 
        icon: <Users size={20} />, 
        color: "bg-yellow-100 text-yellow-600" 
    },
  ];

  return (
    <main className="w-full pb-24 bg-gray-50 min-h-screen">
      <NgoNavbar />

      {/* HEADER */}
      <section className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-16 pb-24 text-white shadow-lg">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Halo, {ngoName}!</h2>
            <p className="text-indigo-100 mt-2 text-lg">
              Kelola kampanye sosial, pantau relawan, dan realisasi dana.
            </p>
          </div>
          
          <Link
            href="/Ngo/proyek/buat"
            className="flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-full font-bold shadow-lg hover:bg-gray-100 transition transform hover:scale-105"
          >
            <Plus size={20} />
            Buat Proyek Baru
          </Link>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-6xl mx-auto px-6 -mt-16">

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {statsUI.map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex items-center gap-4 hover:-translate-y-1 transition duration-300">
              <div className={`p-3 rounded-xl ${stat.color}`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                <h4 className="text-2xl font-bold text-gray-800">{isLoading ? "..." : stat.value}</h4>
              </div>
            </div>
          ))}
        </div>

        {/* SEARCH + FILTER */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 w-full md:w-auto">
            <Search size={18} className="text-gray-400" />
            <input type="text" placeholder="Cari nama proyek..." className="outline-none text-sm text-gray-700 w-full md:w-64" />
          </div>

          <div className="flex gap-2 w-full md:w-auto overflow-x-auto">
             {['Semua', 'Aktif', 'Mendesak', 'Selesai'].map((filter) => (
               <button key={filter} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${filter === 'Semua' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>
                 {filter}
               </button>
             ))}
             <button className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
                <Filter size={18} />
             </button>
          </div>
        </div>

        {/* PROJECT GRID */}
        {isLoading ? (
           <div className="flex flex-col justify-center items-center py-20">
              <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
              <p className="text-gray-500">Memuat data proyek...</p>
           </div>
        ) : projects.length === 0 ? (
           <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
              <p className="text-gray-500">Belum ada proyek yang dibuat.</p>
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((p) => {
              // Hitung Persentase Dana
              const percentFund = p.target_fund > 0 
                ? Math.min(100, Math.round((p.raised / p.target_fund) * 100)) 
                : 0;

              // Tentukan warna status badge
              let statusColor = "bg-gray-100 text-gray-500";
              if (p.status === 'active') statusColor = "bg-green-100 text-green-600";
              if (p.status === 'submitted') statusColor = "bg-yellow-100 text-yellow-600";

              return (
                <div key={p.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full group">
                  
                  {/* HEADER CARD */}
                  <div className={`h-40 ${p.bgHeader} relative flex items-center justify-center rounded-t-2xl overflow-hidden`}>
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white border border-white/30">
                      {p.category}
                    </div>
                    <div className="transform group-hover:scale-110 transition duration-500 drop-shadow-md">
                      {p.icon}
                    </div>
                    <div className={`absolute bottom-4 left-4 px-3 py-1 rounded-lg text-xs font-bold capitalize ${statusColor}`}>
                      {p.status}
                    </div>
                  </div>

                  {/* BODY CARD */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-gray-800 line-clamp-1 group-hover:text-indigo-600 transition" title={p.title}>{p.title}</h3>
                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">{p.desc}</p>

                    <div className="grid grid-cols-2 gap-4 mt-6 py-4 border-t border-b border-gray-100">
                      <div>
                        <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
                          <Target size={12} /> Target Dana
                        </div>
                        <p className="font-bold text-gray-700 text-sm">{formatRupiah(p.target_fund)}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center justify-end gap-1 text-gray-400 text-xs mb-1">
                          <Calendar size={12} /> Tanggal Dibuat
                        </div>
                        <p className="font-bold text-gray-700 text-sm">
                          {formatDate(p.createdAt)}
                        </p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">Terkumpul: <b className="text-indigo-600">{formatRupiah(p.raised)}</b></span>
                        <span className="font-bold text-gray-700">{percentFund}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${percentFund >= 100 ? 'bg-green-500' : 'bg-indigo-600'}`} style={{ width: `${percentFund}%` }}></div>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                      <Users size={14} className="text-gray-400" />
                      {/* Placeholder karena dashboard tidak kirim data volunteers */}
                      <span>{p.volunteers} Relawan bergabung</span>
                    </div>

                    <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                      <MapPin size={14} className="text-gray-400" />
                      <span>{p.location}</span>
                    </div>

                    {/* Link ke Detail Management Proyek */}
                    <Link href={`/Ngo/proyek/${p.id}`} className="mt-6 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-green-600 text-green-600 font-semibold hover:bg-green-600 hover:text-white transition group-hover:shadow-lg">
                      Kelola Proyek <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}