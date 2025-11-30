'use client';

import NgoNavbar from "@/components/Ngo/NgoNavbar";
import { 
  DollarSign, 
  Package, 
  Clock, 
  TrendingUp, 
  Plus, 
  CheckCircle, 
  Search, 
  Filter, 
  Download, 
  AlertCircle,
  ChevronRight
} from "lucide-react";

// Data Dummy Proyek
const ngoProjects = [
  {
    id: 1,
    name: "Reboisasi Hutan Kalimantan",
    target: 50000000,
    raised: 45000000,
    status: "Milestone 1 Selesai",
    milestone: 1,
    totalMilestones: 4,
    canRequest: true,
    lastUpdate: "2 jam lalu",
  },
  {
    id: 2,
    name: "Air Bersih Untuk Desa",
    target: 20000000,
    raised: 22000000,
    status: "Pendanaan Selesai",
    milestone: 4,
    totalMilestones: 4,
    canRequest: false,
    lastUpdate: "1 hari lalu",
  },
  {
    id: 3,
    name: "Perpustakaan Digital Anak",
    target: 30000000,
    raised: 5000000,
    status: "Pendanaan Berlangsung",
    milestone: 0,
    totalMilestones: 3,
    canRequest: false,
    lastUpdate: "Baru saja",
  },
  {
    id: 4,
    name: "Bank Sampah Komunitas",
    target: 15000000,
    raised: 12000000,
    status: "Verifikasi Admin",
    milestone: 2,
    totalMilestones: 3,
    canRequest: false,
    lastUpdate: "5 jam lalu",
  },
];

// Statistik Utama
const statsData = [
    { label: "Dana Terkumpul", value: "Rp 72.000.000", icon: <DollarSign size={24} />, color: "bg-green-100 text-green-600", trend: "+12%" },
    { label: "Proyek Aktif", value: "4 Proyek", icon: <Package size={24} />, color: "bg-blue-100 text-blue-600", trend: "Stabil" },
    { label: "Menunggu Validasi", value: "1 Klaim", icon: <Clock size={24} />, color: "bg-yellow-100 text-yellow-600", trend: "Butuh Aksi" },
];

const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(amount);
};

const calculatePercentage = (raised: number, target: number) => {
    return Math.min(100, Math.round((raised / target) * 100));
};

export default function DonasiPage() {
  return (
    <main className="w-full bg-gray-50 min-h-screen flex flex-col">
      <NgoNavbar />

      {/* --- HEADER SECTION (Wajib: Gradient Indigo to Purple) --- */}
      <section className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-16 pb-28 text-white shadow-lg">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Dashboard Keuangan</h2>
            <p className="mt-2 text-indigo-100 text-lg">
               Transparansi aliran dana donasi dan pengelolaan Smart Contract.
            </p>
          </div>
          
          {/* Tombol Aksi Utama */}
          <div className="flex gap-3">
             <button className="flex items-center gap-2 bg-white/10 border border-white/30 backdrop-blur-md text-white px-5 py-3 rounded-full font-semibold hover:bg-white/20 transition">
                <Download size={20} /> Laporan
             </button>
             <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-bold shadow-lg transition transform hover:scale-105">
                <Plus size={20} />
                Buat Proyek Baru
             </button>
          </div>
        </div>
      </section>

      {/* --- CONTENT SECTION --- */}
      <section className="max-w-6xl mx-auto px-6 -mt-20 w-full flex-grow mb-20">
        
        {/* 1. STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {statsData.map((stat, idx) => (
             <div key={idx} className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:-translate-y-1 transition duration-300">
                <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${stat.color}`}>
                        {stat.icon}
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                        <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                    </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-50 flex items-center text-xs text-gray-500 font-medium">
                    <TrendingUp size={14} className="mr-1 text-green-500" /> 
                    <span className="text-green-600 mr-1">{stat.trend}</span> dari bulan lalu
                </div>
             </div>
          ))}
        </div>

        {/* 2. MAIN CARD: DONATION TABLE */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          
          {/* Toolbar */}
          <div className="px-8 py-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-gray-800">Status Pendanaan</h3>
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-bold">Live</span>
            </div>

            <div className="flex gap-3 w-full md:w-auto">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500" size={18} />
                    <input 
                        type="text" 
                        placeholder="Cari ID atau Nama Proyek..." 
                        className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-indigo-500 transition w-full md:w-64"
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 text-sm font-medium hover:bg-gray-50">
                    <Filter size={16} /> Filter
                </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
                <tr>
                    <th className="px-8 py-4 text-left">Detail Proyek</th>
                    <th className="px-8 py-4 text-left">Finansial</th>
                    <th className="px-8 py-4 text-left">Milestone</th>
                    <th className="px-8 py-4 text-left">Status</th>
                    <th className="px-8 py-4 text-center">Aksi Smart Contract</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                {ngoProjects.map((p) => {
                    const percentage = calculatePercentage(p.raised, p.target);
                    
                    return (
                    <tr key={p.id} className="hover:bg-gray-50 transition group">
                        {/* Kolom 1: Detail */}
                        <td className="px-8 py-5">
                            <div className="flex flex-col">
                                <p className="font-bold text-gray-800 text-base">{p.name}</p>
                                <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                                    <Clock size={10} /> Update: {p.lastUpdate}
                                </p>
                            </div>
                        </td>

                        {/* Kolom 2: Finansial */}
                        <td className="px-8 py-5">
                            <div className="w-48">
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-gray-500">Terkumpul</span>
                                    <span className="font-bold text-green-600">{percentage}%</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                                    <div 
                                        className="h-2 rounded-full bg-green-500"
                                        style={{ width: `${percentage}%` }}
                                    ></div>
                                </div>
                                <p className="text-sm font-bold text-gray-800">{formatRupiah(p.raised)}</p>
                                <p className="text-xs text-gray-400">Target: {formatRupiah(p.target)}</p>
                            </div>
                        </td>

                        {/* Kolom 3: Milestone */}
                        <td className="px-8 py-5">
                            <div className="flex items-center gap-2">
                                <div className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg text-sm font-bold">
                                    Tahap {p.milestone}/{p.totalMilestones}
                                </div>
                            </div>
                        </td>

                        {/* Kolom 4: Status */}
                        <td className="px-8 py-5">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1
                                ${p.canRequest 
                                    ? 'bg-yellow-100 text-yellow-700' 
                                    : p.raised >= p.target 
                                        ? 'bg-green-100 text-green-700' 
                                        : 'bg-blue-50 text-blue-600'}
                            `}>
                                {p.canRequest && <AlertCircle size={12} />}
                                {p.status}
                            </span>
                        </td>

                        {/* Kolom 5: Aksi */}
                        <td className="px-8 py-5 text-center">
                        {p.canRequest ? (
                            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 mx-auto shadow-md transform hover:scale-105">
                               <CheckCircle size={14} /> Klaim Dana
                            </button>
                        ) : (
                            <button className="text-gray-400 text-xs font-medium border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-100 hover:text-indigo-600 transition flex items-center gap-1 mx-auto">
                               Detail <ChevronRight size={12} />
                            </button>
                        )}
                        </td>
                    </tr>
                    );
                })}
                </tbody>
            </table>
          </div>
          
          {/* Pagination Footer */}
          <div className="px-8 py-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center text-xs text-gray-500">
             <span>Menampilkan 4 dari 12 proyek</span>
             <div className="flex gap-2">
                <button className="px-3 py-1 border rounded bg-white disabled:opacity-50">Prev</button>
                <button className="px-3 py-1 border rounded bg-white hover:bg-gray-100">Next</button>
             </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER CTA (Hijau TerraFund) --- */}
      <section className="w-full bg-[#10B981] py-10 text-center text-white mt-auto">
         <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-3">Keamanan Smart Contract</h2>
            <p className="text-white/90 mb-6 text-sm md:text-base">
                Setiap transaksi pencairan dana tercatat secara on-chain dan tidak dapat diubah, menjamin akuntabilitas penuh kepada donatur.
            </p>
            <button className="bg-white text-[#10B981] px-8 py-2.5 rounded-full font-bold shadow-lg hover:bg-green-50 transition text-sm">
                Lihat di Etherscan
            </button>
         </div>
      </section>

    </main>
  );
}