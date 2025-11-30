'use client';

import { useState } from "react";
import AdminNavbar from "@/components/Admin/AdminNavbar";
import { 
  CheckCircle, 
  XCircle, 
  FileText, 
  Search, 
  Filter, 
  History, 
  Download,
  Calendar
} from "lucide-react";

export default function RiwayatValidasiPage() {
  const [activeTab, setActiveTab] = useState("Semua");

  // Data Dummy (Hanya status Disetujui & Ditolak, karena yang Pending ada di Dashboard)
  const historyData = [
    {
      id: "REQ-8820",
      ngo: "Water For Life",
      project: "Air Bersih Untuk Desa",
      milestone: "Termin 1: Pembelian Pipa",
      amount: "Rp 22.500.000",
      date: "29 Nov 2025",
      status: "Disetujui",
      validator: "Admin (Anda)"
    },
    {
      id: "REQ-8819",
      ngo: "Save The Tiger",
      project: "Konservasi Harimau Sumatera",
      milestone: "Termin 3: Operasional Ranger",
      amount: "Rp 15.000.000",
      date: "28 Nov 2025",
      status: "Ditolak",
      validator: "System (Auto-Reject)"
    },
    {
      id: "REQ-8818",
      ngo: "Green Earth Foundation",
      project: "Reboisasi Hutan Kalimantan",
      milestone: "Termin 1: Bibit Awal",
      amount: "Rp 50.000.000",
      date: "25 Nov 2025",
      status: "Disetujui",
      validator: "Admin Budi"
    },
    {
      id: "REQ-8817",
      ngo: "EduCare Indonesia",
      project: "Perpustakaan Digital",
      milestone: "Termin 2: Instalasi Komputer",
      amount: "Rp 30.000.000",
      date: "20 Nov 2025",
      status: "Disetujui",
      validator: "Admin (Anda)"
    }
  ];

  // Filter Logic
  const filteredData = activeTab === "Semua" 
    ? historyData 
    : historyData.filter(item => item.status === activeTab);

  return (
    <main className="w-full pb-24 bg-gray-50 min-h-screen font-sans">
      <AdminNavbar />

      {/* HEADER GRADASI UNGU */}
      <section className="w-full bg-gradient-to-r from-[#6A6AFB] to-[#8A4FFF] px-6 py-16 pb-28 text-white shadow-xl">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
             <h2 className="text-3xl font-bold flex items-center gap-3">
                <History size={32} className="text-purple-200" />
                Riwayat Validasi
             </h2>
             <p className="text-indigo-100 mt-2 text-lg">
                Arsip keputusan pencairan dana Smart Contract yang telah diproses.
             </p>
          </div>
          
          <button className="flex items-center gap-2 bg-white/10 border border-white/30 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition backdrop-blur-md shadow-lg">
             <Download size={18} /> Unduh Laporan PDF
          </button>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="max-w-6xl mx-auto px-6 -mt-16">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
           
           {/* TOOLBAR (Filter & Search) */}
           <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row items-center justify-between gap-4">
              
              {/* Tab Filter */}
              <div className="flex bg-white border border-gray-200 p-1 rounded-xl shadow-sm">
                 {["Semua", "Disetujui", "Ditolak"].map(tab => (
                   <button 
                     key={tab}
                     onClick={() => setActiveTab(tab)}
                     className={`px-5 py-2 rounded-lg text-sm font-bold transition ${
                       activeTab === tab 
                         ? "bg-[#6A6AFB] text-white shadow-md" 
                         : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                     }`}
                   >
                     {tab}
                   </button>
                 ))}
              </div>
              
              {/* Search Bar */}
              <div className="relative w-full md:w-72">
                 <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                 <input 
                    type="text" 
                    placeholder="Cari ID Request, NGO, atau Proyek..." 
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#00A651] bg-white transition shadow-sm" 
                 />
              </div>
           </div>

           {/* TABLE LIST */}
           <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                 <thead className="bg-gray-50 text-gray-500 border-b border-gray-100 uppercase text-xs tracking-wider font-semibold">
                    <tr>
                       <th className="px-6 py-4">Detail Request</th>
                       <th className="px-6 py-4">Nominal</th>
                       <th className="px-6 py-4">Waktu Proses</th>
                       <th className="px-6 py-4">Validator</th>
                       <th className="px-6 py-4 text-center">Status Akhir</th>
                       <th className="px-6 py-4 text-center">Bukti</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100">
                    {filteredData.map((item, i) => (
                       <tr key={i} className="hover:bg-gray-50 transition group">
                          
                          {/* Detail Request */}
                          <td className="px-6 py-4">
                             <div className="flex flex-col">
                                <span className="text-xs font-mono text-gray-400 mb-1">{item.id}</span>
                                <span className="font-bold text-gray-800">{item.project}</span>
                                <span className="text-xs text-[#6A6AFB] font-semibold mt-0.5">{item.ngo}</span>
                                <span className="text-xs text-gray-500 mt-1 italic">{item.milestone}</span>
                             </div>
                          </td>

                          {/* Nominal */}
                          <td className="px-6 py-4">
                             <span className="font-bold text-[#00A651] text-base">{item.amount}</span>
                          </td>

                          {/* Waktu */}
                          <td className="px-6 py-4">
                             <div className="flex items-center gap-2 text-gray-600">
                                <Calendar size={14} className="text-gray-400" />
                                {item.date}
                             </div>
                          </td>

                          {/* Validator */}
                          <td className="px-6 py-4 text-gray-600 font-medium">
                             {item.validator}
                          </td>

                          {/* Status Badge */}
                          <td className="px-6 py-4 text-center">
                             <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border
                                ${item.status === 'Disetujui' 
                                    ? 'bg-green-50 text-green-700 border-green-200' 
                                    : 'bg-red-50 text-red-700 border-red-200'}
                             `}>
                                {item.status === 'Disetujui' ? <CheckCircle size={12} /> : <XCircle size={12} />}
                                {item.status}
                             </span>
                          </td>

                          {/* Link Bukti */}
                          <td className="px-6 py-4 text-center">
                             <button className="text-gray-400 hover:text-[#6A6AFB] transition p-2 border border-gray-200 rounded-lg hover:bg-white hover:shadow-sm">
                                <FileText size={16} />
                             </button>
                          </td>

                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
           
           {/* Footer Pagination */}
           <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
              <span>Menampilkan 4 dari 156 data arsip</span>
              <div className="flex gap-2">
                 <button className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition shadow-sm font-medium">Sebelumnya</button>
                 <button className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 transition shadow-sm font-medium">Selanjutnya</button>
              </div>
           </div>

        </div>
      </section>
    </main>
  );
}