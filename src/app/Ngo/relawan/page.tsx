'use client';

import NgoNavbar from "@/components/Ngo/NgoNavbar";
import { 
  Users, 
  Clock, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Search, 
  Filter, 
  Download,
  UserPlus,
  Award,
  MoreHorizontal
} from "lucide-react";

export default function RelawanPage() {
  
  // 1. DATA STATISTIK (Sesuai Palet Warna)
  const stats = [
    { 
      label: "Total Relawan", 
      value: "340 Orang", 
      icon: <Users size={22} />, 
      color: "bg-blue-100 text-blue-600" 
    },
    { 
      label: "Total Jam Kontribusi", 
      value: "12.450 Jam", 
      icon: <Clock size={22} />, 
      color: "bg-purple-100 text-purple-600" 
    },
    { 
      label: "Relawan Baru (Bulan ini)", 
      value: "+18 Orang", 
      icon: <UserPlus size={22} />, 
      color: "bg-green-100 text-green-600" 
    },
  ];

  // 2. DATA RELAWAN (Diperkaya)
  const volunteers = [
    {
      id: 1,
      name: "Ayu Pramesti",
      role: "Koordinator Lapangan",
      project: "Reboisasi Hutan Kalimantan",
      hours: 128,
      location: "Jakarta",
      phone: "0812-9000-2211",
      email: "ayu.pramesti@example.com",
      status: "Aktif",
      avatar: "https://ui-avatars.com/api/?name=Ayu+Pramesti&background=10B981&color=fff", // Green Base
    },
    {
      id: 2,
      name: "Bima Saputra",
      role: "Teknisi Air Bersih",
      project: "Air Bersih Untuk Desa",
      hours: 92,
      location: "NTT",
      phone: "0813-3321-9912",
      email: "bima.saputra@example.com",
      status: "Aktif",
      avatar: "https://ui-avatars.com/api/?name=Bima+Saputra&background=3B82F6&color=fff", // Blue Base
    },
    {
      id: 3,
      name: "Clara Lestari",
      role: "Fasilitator Edukasi",
      project: "Perpustakaan Digital Anak",
      hours: 144,
      location: "Jawa Tengah",
      phone: "0895-7782-2219",
      email: "clara.lestari@example.com",
      status: "Cuti",
      avatar: "https://ui-avatars.com/api/?name=Clara+Lestari&background=6366F1&color=fff", // Indigo Base
    },
    {
      id: 4,
      name: "Dedi Kurniawan",
      role: "Logistik & Transport",
      project: "Reboisasi Hutan Kalimantan",
      hours: 45,
      location: "Balikpapan",
      phone: "0811-2233-4455",
      email: "dedi.k@example.com",
      status: "Baru",
      avatar: "https://ui-avatars.com/api/?name=Dedi+Kurniawan&background=F59E0B&color=fff", // Amber Base
    }
  ];

  return (
    <main className="w-full pb-32 bg-gray-50 min-h-screen">
      <NgoNavbar />

      {/* --- HEADER SECTION --- */}
      <section className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-16 pb-24 text-white shadow-lg">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Data Relawan</h2>
            <p className="text-indigo-100 mt-2 text-lg">
              Pantau profil, kinerja, dan kontribusi pahlawan lingkungan Anda.
            </p>
          </div>
          
          {/* Action Button: Download Data */}
          <button className="flex items-center gap-2 bg-white/10 border border-white/30 backdrop-blur-md text-white px-6 py-2.5 rounded-full font-semibold hover:bg-white/20 transition">
            <Download size={18} />
            Unduh Laporan CSV
          </button>
        </div>
      </section>

      {/* --- CONTENT SECTION --- */}
      <section className="max-w-6xl mx-auto px-6 -mt-16">
        
        {/* 1. STATS SUMMARY */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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

        {/* 2. TOOLBAR (Search & Filter) */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
           <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative w-full md:w-80">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                 <input 
                    type="text" 
                    placeholder="Cari nama, email, atau lokasi..." 
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-indigo-500 transition"
                 />
              </div>
           </div>
           
           <div className="flex gap-3 w-full md:w-auto">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 text-sm font-medium hover:bg-gray-50 transition">
                 <Filter size={16} /> Filter Status
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition">
                 <UserPlus size={16} /> Undang Relawan
              </button>
           </div>
        </div>

        {/* 3. VOLUNTEER CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {volunteers.map((v) => (
            <div
              key={v.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col group"
            >
              {/* Card Header & Avatar */}
              <div className="relative h-24 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-100">
                 <div className="absolute top-4 right-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide 
                       ${v.status === 'Aktif' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                       {v.status}
                    </span>
                 </div>
              </div>
              
              <div className="px-6 relative flex flex-col items-center -mt-12 text-center pb-6 border-b border-gray-50">
                 <img
                    src={v.avatar}
                    className="w-24 h-24 rounded-full border-4 border-white shadow-md mb-3"
                    alt={v.name}
                 />
                 <h3 className="text-lg font-bold text-gray-800">{v.name}</h3>
                 <p className="text-sm text-indigo-600 font-medium">{v.role}</p>
                 
                 {/* Quick Contact Icons */}
                 <div className="flex gap-3 mt-4">
                    <button className="p-2 rounded-full bg-gray-50 text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 transition" title="Email">
                       <Mail size={16} />
                    </button>
                    <button className="p-2 rounded-full bg-gray-50 text-gray-500 hover:bg-green-50 hover:text-green-600 transition" title="WhatsApp">
                       <Phone size={16} />
                    </button>
                    <button className="p-2 rounded-full bg-gray-50 text-gray-500 hover:bg-gray-200 transition" title="More">
                       <MoreHorizontal size={16} />
                    </button>
                 </div>
              </div>

              {/* Details List */}
              <div className="p-6 space-y-4 text-sm text-gray-600 flex-grow">
                 <div className="flex items-start gap-3">
                    <Briefcase size={16} className="text-gray-400 mt-0.5" />
                    <div>
                       <span className="block text-xs text-gray-400">Proyek Saat Ini</span>
                       <span className="font-medium text-gray-800">{v.project}</span>
                    </div>
                 </div>
                 
                 <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-gray-400 mt-0.5" />
                    <div>
                       <span className="block text-xs text-gray-400">Domisili</span>
                       <span className="font-medium text-gray-800">{v.location}</span>
                    </div>
                 </div>

                 <div className="flex items-center gap-3 bg-indigo-50 p-3 rounded-lg border border-indigo-100">
                    <Award size={18} className="text-indigo-600" />
                    <div>
                       <span className="block text-xs text-indigo-500 font-semibold uppercase">Total Kontribusi</span>
                       <span className="font-bold text-gray-800">{v.hours} Jam</span>
                    </div>
                 </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0 mt-auto">
                 <a
                    href={`/ngo/relawan/${v.id}`}
                    className="block w-full py-2.5 rounded-xl border border-green-600 text-green-600 font-semibold text-center hover:bg-green-600 hover:text-white transition"
                 >
                    Lihat Profil Lengkap
                 </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}