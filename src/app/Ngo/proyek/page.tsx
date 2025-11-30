'use client';

import NgoNavbar from "@/components/Ngo/NgoNavbar";
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
  BookOpen
} from "lucide-react";

export default function NgoProyekPage() {
  
  // 1. DATA STATISTIK (Disesuaikan dengan Palet Dashboard)
  const stats = [
    { 
      label: "Total Proyek", 
      value: "8 Proyek", 
      icon: <LayoutDashboard size={20} />, 
      color: "bg-blue-100 text-blue-600" // Biru (Misi Aktif)
    },
    { 
      label: "Dana Terkumpul", 
      value: "Rp 735 Jt", 
      icon: <Coins size={20} />, 
      color: "bg-green-100 text-green-600" // Hijau (Token/Dana)
    },
    { 
      label: "Relawan Aktif", 
      value: "415 Org", 
      icon: <Users size={20} />, 
      color: "bg-yellow-100 text-yellow-600" // Kuning (Level/Relawan - Sesuai Dashboard)
    },
  ];

  // 2. DATA PROYEK (Disesuaikan dengan Palet Kategori Misi)
  const projects = [
    {
      id: 1,
      title: "Reboisasi Hutan Kalimantan",
      status: "Aktif",
      category: "Penghijauan", // Kategori Wajib
      desc: "Program penghijauan kembali 50 hektar lahan gundul di kawasan Kalimantan Timur.",
      volunteers: 125,
      target_volunteers: 150,
      raised: 320000000,
      target_fund: 500000000,
      location: "Kalimantan Timur",
      days_left: 12,
      bgHeader: "bg-green-500", // Wajib: Penghijauan
      icon: <Leaf size={48} className="text-white" /> // Icon Lucide
    },
    {
      id: 2,
      title: "Air Bersih untuk Desa",
      status: "Mendesak",
      category: "Proyek Air", // Kategori Wajib
      desc: "Pembangunan sumur bor dan instalasi filter air bersih untuk 3 desa terdampak kekeringan.",
      volunteers: 80,
      target_volunteers: 100,
      raised: 155000000,
      target_fund: 200000000,
      location: "Lombok Barat",
      days_left: 5,
      bgHeader: "bg-blue-500", // Wajib: Proyek Laut/Air
      icon: <Droplets size={48} className="text-white" /> // Icon Lucide
    },
    {
      id: 3,
      title: "Perpustakaan Digital Anak",
      status: "Selesai",
      category: "Edukasi", // Kategori Wajib
      desc: "Pengadaan buku digital, 20 unit komputer, dan akses internet satelit untuk sekolah.",
      volunteers: 210,
      target_volunteers: 210,
      raised: 260000000,
      target_fund: 260000000,
      location: "NTT",
      days_left: 0,
      bgHeader: "bg-indigo-500", // Wajib: Edukasi
      icon: <BookOpen size={48} className="text-white" /> // Icon Lucide
    },
  ];

  // Helper format rupiah
  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
  };

  return (
    <main className="w-full pb-24 bg-gray-50 min-h-screen">
      <NgoNavbar />

      {/* --- HEADER SECTION (Wajib: Gradient Indigo to Purple) --- */}
      <section className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-16 pb-24 text-white shadow-lg">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Manajemen Proyek</h2>
            <p className="text-indigo-100 mt-2 text-lg">
              Kelola kampanye sosial, pantau relawan, dan realisasi dana.
            </p>
          </div>
          
          {/* Tombol Buat Proyek */}
          <button className="flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-full font-bold shadow-lg hover:bg-gray-100 transition transform hover:scale-105">
            <Plus size={20} />
            Buat Proyek Baru
          </button>
        </div>
      </section>

      {/* --- STATS & CONTENT --- */}
      <section className="max-w-6xl mx-auto px-6 -mt-16">
        
        {/* 1. Stats Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex items-center gap-4 hover:-translate-y-1 transition duration-300">
              <div className={`p-3 rounded-xl ${stat.color}`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                <h4 className="text-2xl font-bold text-gray-800">{stat.value}</h4>
              </div>
            </div>
          ))}
        </div>

        {/* 2. Filter & Search Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 w-full md:w-auto">
            <Search size={18} className="text-gray-400" />
            <input 
              type="text" 
              placeholder="Cari nama proyek..." 
              className="outline-none text-sm text-gray-700 w-full md:w-64"
            />
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

        {/* 3. Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p) => {
             const percentFund = Math.min(100, Math.round((p.raised / p.target_fund) * 100));
             
             return (
              <div
                key={p.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full group"
              >
                {/* Card Header (Solid Color Sesuai Kategori) */}
                <div className={`h-40 ${p.bgHeader} relative flex items-center justify-center rounded-t-2xl overflow-hidden`}>
                   
                   {/* Kategori Badge */}
                   <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white border border-white/30">
                      {p.category}
                   </div>
                   
                   {/* Icon */}
                   <div className="transform group-hover:scale-110 transition duration-500 drop-shadow-md">
                      {p.icon}
                   </div>

                   {/* Status Badge */}
                   <div className={`absolute bottom-4 left-4 px-3 py-1 rounded-lg text-xs font-bold bg-white 
                      ${p.status === 'Aktif' ? 'text-green-600' : p.status === 'Mendesak' ? 'text-red-500' : 'text-gray-500'}`}>
                      {p.status}
                   </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-800 line-clamp-1 group-hover:text-indigo-600 transition">{p.title}</h3>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">{p.desc}</p>
                  
                  {/* Stats Grid inside Card */}
                  <div className="grid grid-cols-2 gap-4 mt-6 py-4 border-t border-b border-gray-100">
                     <div>
                        <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
                           <Target size={12} /> Target Dana
                        </div>
                        <p className="font-bold text-gray-700 text-sm">{formatRupiah(p.target_fund)}</p>
                     </div>
                     <div className="text-right">
                        <div className="flex items-center justify-end gap-1 text-gray-400 text-xs mb-1">
                           <Calendar size={12} /> Sisa Waktu
                        </div>
                        <p className={`font-bold text-sm ${p.days_left < 7 ? 'text-red-500' : 'text-gray-700'}`}>
                           {p.days_left > 0 ? `${p.days_left} Hari` : 'Berakhir'}
                        </p>
                     </div>
                  </div>

                  {/* Progress Bar Dana */}
                  <div className="mt-4">
                     <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">Terkumpul: <b className="text-indigo-600">{formatRupiah(p.raised)}</b></span>
                        <span className="font-bold text-gray-700">{percentFund}%</span>
                     </div>
                     <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${percentFund >= 100 ? 'bg-green-500' : 'bg-indigo-600'}`} style={{ width: `${percentFund}%` }}></div>
                     </div>
                  </div>

                  {/* Progress Volunteers (Simple) */}
                  <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                     <Users size={14} className="text-gray-400" />
                     <span>{p.volunteers}/{p.target_volunteers} Relawan bergabung</span>
                  </div>

                  {/* Location */}
                  <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                     <MapPin size={14} className="text-gray-400" />
                     <span>{p.location}</span>
                  </div>

                  {/* Action Button (Outline Green - Sesuai Dashboard) */}
                  <a href={`/ngo/proyek/${p.id}`} className="mt-6 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-green-600 text-green-600 font-semibold hover:bg-green-600 hover:text-white transition group-hover:shadow-lg">
                    Kelola Proyek <ArrowRight size={16} />
                  </a>
                </div>
              </div>
             )
          })}
        </div>
      </section>
    </main>
  );
}