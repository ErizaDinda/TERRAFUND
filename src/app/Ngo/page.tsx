'use client';

import NgoNavbar from "@/components/Ngo/NgoNavbar";
import { 
  ClipboardList, 
  Users, 
  Coins, 
  FolderKanban, 
  ArrowRight, 
  TrendingUp,
  Leaf,
  Droplets,
  BookOpen
} from "lucide-react";

export default function NgoDashboard() {
  
  // 1. STATS DATA (Menggunakan Palet Warna Wajib)
  const stats = [
    {
      title: "Dana Terkumpul",
      value: "Rp 820.000.000",
      icon: <Coins size={24} />,
      // Mengikuti Palet "Token Reward" (Hijau)
      bgIcon: "bg-green-100",
      textIcon: "text-green-600",
      trend: "+12% bulan ini"
    },
    {
      title: "Laporan Proyek",
      value: "27 Laporan",
      icon: <ClipboardList size={24} />,
      // Mengikuti Palet "Misi Selesai" (Ungu)
      bgIcon: "bg-purple-100",
      textIcon: "text-purple-600",
      trend: "Semua terverifikasi"
    },
    {
      title: "Total Proyek",
      value: "12 Proyek",
      icon: <FolderKanban size={24} />,
      // Mengikuti Palet "Misi Aktif" (Biru)
      bgIcon: "bg-blue-100",
      textIcon: "text-blue-600",
      trend: "3 Proyek Aktif"
    },
    {
      title: "Relawan Terdaftar",
      value: "340 Orang",
      icon: <Users size={24} />,
      // Mengikuti Palet "Level Relawan" (Kuning)
      bgIcon: "bg-yellow-100",
      textIcon: "text-yellow-600",
      trend: "+45 relawan baru"
    },
  ];

  // 2. PROJECT DATA (Menggunakan Palet Kategori Misi)
  const projects = [
    {
      id: 1,
      title: "Reboisasi Hutan Kalimantan",
      category: "Penghijauan",
      desc: "Program penghijauan kembali untuk kawasan Kalimantan.",
      icon: <Leaf size={40} className="text-white" />,
      bgHeader: "bg-green-500", // Wajib: Penghijauan
      link: "/ngo/proyek/1",
    },
    {
      id: 2,
      title: "Air Bersih untuk Desa",
      category: "Proyek Laut/Air",
      desc: "Penyediaan fasilitas air bersih untuk 3 desa.",
      icon: <Droplets size={40} className="text-white" />,
      bgHeader: "bg-blue-500", // Wajib: Proyek Laut/Air
      link: "/ngo/proyek/2",
    },
    {
      id: 3,
      title: "Perpustakaan Digital Anak",
      category: "Edukasi",
      desc: "Pengadaan buku dan komputer untuk anak-anak.",
      icon: <BookOpen size={40} className="text-white" />,
      bgHeader: "bg-indigo-500", // Wajib: Edukasi
      link: "/ngo/proyek/3",
    },
  ];

  // 3. RECENT ACTIVITY (Fitur Tambahan untuk Profesionalitas)
  const recentActivities = [
    { user: "Budi Santoso", action: "mendaftar sebagai relawan", project: "Reboisasi Hutan", time: "2 jam lalu" },
    { user: "Siti Aminah", action: "menyelesaikan misi", project: "Air Bersih", time: "5 jam lalu" },
    { user: "Donatur Anonim", action: "mendonasikan Rp 5.000.000", project: "Perpustakaan Digital", time: "1 hari lalu" },
  ];

  return (
    <main className="w-full pb-24 bg-gray-50 min-h-screen">
      <NgoNavbar />

      {/* --- HEADER SECTION (Wajib: Gradient Indigo to Purple) --- */}
      <section className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-16 text-white shadow-lg">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Halo, Tim NGO!</h2>
            <p className="text-white/90 mt-2 text-lg">
              Kelola dampak sosial Anda secara transparan dan akuntabel.
            </p>
          </div>
          {/* Quick Action Button */}
          <button className="bg-white text-indigo-600 px-6 py-3 rounded-full font-bold shadow-md hover:bg-gray-50 transition transform hover:scale-105">
            + Buat Laporan Baru
          </button>
        </div>
      </section>

      {/* --- STATISTICS CARDS --- */}
      <section className="max-w-6xl mx-auto px-6 -mt-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((item, i) => (
            <div
              key={i}
              className="bg-white shadow-sm border border-gray-100 rounded-xl p-6 hover:shadow-md transition duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${item.bgIcon} ${item.textIcon}`}>
                  {item.icon}
                </div>
                <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-full">
                  Update
                </span>
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">{item.title}</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">{item.value}</h3>
                <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                  <TrendingUp size={12} /> {item.trend}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- MAIN CONTENT GRID --- */}
      <section className="max-w-6xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: PROJECTS LIST (Span 2) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-800">Proyek Unggulan</h3>
            <a href="#" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
              Lihat Semua <ArrowRight size={16} />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition group"
              >
                {/* Card Header dengan Warna Kategori Wajib */}
                <div className={`h-32 ${p.bgHeader} flex items-center justify-center relative`}>
                  <div className="transform group-hover:scale-110 transition duration-300 drop-shadow-md">
                    {p.icon}
                  </div>
                  <span className="absolute top-3 right-3 bg-white/20 backdrop-blur-md text-white text-xs px-2 py-1 rounded-md font-medium border border-white/30">
                    {p.category}
                  </span>
                </div>

                <div className="p-5">
                  <h4 className="text-lg font-bold text-gray-800 line-clamp-1">{p.title}</h4>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">{p.desc}</p>

                  <a
                    href={p.link}
                    className="mt-5 block w-full py-2.5 rounded-lg border border-green-600 text-green-600 font-semibold text-center hover:bg-green-600 hover:text-white transition"
                  >
                    Kelola Proyek
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: RECENT ACTIVITY (Span 1) */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-800">Aktivitas Terbaru</h3>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="space-y-6">
              {recentActivities.map((act, idx) => (
                <div key={idx} className="flex gap-3 relative pb-6 last:pb-0 last:border-0 border-l border-gray-100 ml-2">
                  <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-white ring-1 ring-gray-100"></div>
                  <div className="pl-4">
                    <p className="text-sm text-gray-800">
                      <span className="font-bold">{act.user}</span> {act.action} pada <span className="text-indigo-600 font-medium">{act.project}</span>
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{act.time}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-6 text-sm text-gray-500 font-medium hover:text-indigo-600 transition">
              Lihat semua aktivitas
            </button>
          </div>

          {/* Mini Card: Quick Verification */}
          <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
             <h4 className="font-bold text-indigo-900 mb-2">Butuh Verifikasi</h4>
             <p className="text-sm text-indigo-700 mb-4">Ada 5 laporan relawan yang menunggu persetujuan Anda.</p>
             <button className="text-xs bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition">
                Periksa Sekarang
             </button>
          </div>
        </div>

      </section>
    </main>
  );
}