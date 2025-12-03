"use client";

import { useState } from "react";
import AdminNavbar from "@/components/Admin/AdminNavbar";
import { 
  CheckCircle, 
  XCircle, 
  MoreHorizontal, 
  Search, 
  HandCoins, 
  FileText, 
  Building2,
  AlertCircle 
} from "lucide-react";

export default function KelolaProyekPage() {
  
  // STATE TAB (LOGIKA FLOW)
  const [activeTab, setActiveTab] = useState<'proposals' | 'withdrawals'>('proposals');

  // DATA 1: PROYEK BARU (Flow Awal - Minta Approval Tayang)
  const proposals = [
    {
      id: 1,
      name: "Reforest Bali 2024",
      ngo: "Yayasan Hijau",
      target: 500000000,
      status: "Pending",
      date: "2 jam lalu"
    },
    {
      id: 2,
      name: "Sekolah Alam Papua",
      ngo: "Papua Cerdas",
      target: 150000000,
      status: "Pending",
      date: "1 hari lalu"
    }
  ];

  // DATA 2: REQUEST PENCAIRAN (Flow Akhir - Minta Duit Cair)
  const withdrawals = [
    {
      id: 101,
      name: "Air Bersih Sumbawa",
      ngo: "Dompet Sosial",
      amount: 45000000,
      milestone: "Tahap 2: Pemasangan Pipa",
      status: "Menunggu Validasi",
      date: "Baru saja"
    }
  ];

  return (
    <main className="w-full pb-24 bg-gray-50 min-h-screen font-sans">
      <AdminNavbar />

      {/* HEADER (UI ASLI KAMU) */}
      <section className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-16 pb-28 text-white shadow-lg">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-3xl font-bold">Kelola Proyek</h2>
            <p className="text-indigo-100 mt-2">
              Validasi proposal proyek baru dan setujui pencairan dana NGO.
            </p>
          </div>

          {/* SEARCH BAR */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Cari nama proyek..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white text-gray-700 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#00A651] shadow-lg transition"
            />
          </div>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <section className="max-w-6xl mx-auto px-6 -mt-20">
        
        {/* TABS NAVIGATION (LOGIKA FLOW BARU) */}
        <div className="bg-white rounded-xl p-2 shadow-sm border border-gray-100 mb-6 flex gap-2">
            <button 
                onClick={() => setActiveTab('proposals')}
                className={`flex-1 py-3 text-sm font-bold rounded-lg transition flex items-center justify-center gap-2 ${activeTab === 'proposals' ? 'bg-indigo-50 text-[#6A6AFB] border border-indigo-100' : 'text-gray-500 hover:bg-gray-50'}`}
            >
                Approval Proyek Baru
                <span className="bg-[#6A6AFB] text-white text-xs py-0.5 px-2 rounded-full">{proposals.length}</span>
            </button>
            <button 
                onClick={() => setActiveTab('withdrawals')}
                className={`flex-1 py-3 text-sm font-bold rounded-lg transition flex items-center justify-center gap-2 ${activeTab === 'withdrawals' ? 'bg-orange-50 text-orange-600 border border-orange-100' : 'text-gray-500 hover:bg-gray-50'}`}
            >
                Validasi Pencairan (LPJ)
                <span className="bg-orange-500 text-white text-xs py-0.5 px-2 rounded-full">{withdrawals.length}</span>
            </button>
        </div>

        {/* GRID CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* KONDISI 1: TAB APPROVAL PROYEK BARU */}
          {activeTab === 'proposals' && proposals.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition duration-300 group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-indigo-50 rounded-xl text-[#6A6AFB]">
                  <Building2 size={24} />
                </div>
                {/* BADGE PENDING */}
                <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-yellow-200 animate-pulse">
                   Pending
                </span>
              </div>

              <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-[#6A6AFB] transition">
                {p.name}
              </h3>
              <p className="text-xs text-gray-400 mb-3">Oleh: {p.ngo} • {p.date}</p>

              {/* LOGIKA: TARGET DANA (Karena belum mulai) */}
              <p className="text-sm text-gray-600">
                Target Dana:
                <span className="font-bold text-gray-800 ml-1">
                  Rp {p.target.toLocaleString()}
                </span>
              </p>

              {/* BUTTONS: TERIMA / TOLAK */}
              <div className="mt-6 pt-4 border-t border-gray-100 flex gap-3">
                <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl text-sm font-semibold transition shadow-md">
                  Terima
                </button>
                <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-xl text-sm font-semibold transition shadow-md">
                  Tolak
                </button>
                <button className="p-2.5 border border-gray-200 rounded-xl text-gray-400 hover:text-indigo-600 transition bg-white">
                  <MoreHorizontal size={18} />
                </button>
              </div>
            </div>
          ))}

          {/* KONDISI 2: TAB REQUEST PENCAIRAN */}
          {activeTab === 'withdrawals' && withdrawals.map((w) => (
            <div
              key={w.id}
              className="bg-white rounded-2xl shadow-sm border border-orange-100 p-6 hover:shadow-lg transition duration-300 group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-orange-50 rounded-xl text-orange-600">
                  <HandCoins size={24} />
                </div>
                {/* BADGE MENUNGGU VALIDASI */}
                <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-orange-200">
                   <AlertCircle size={12}/> Butuh Validasi
                </span>
              </div>

              <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-orange-600 transition">
                {w.name}
              </h3>
              <p className="text-xs text-gray-400 mb-3">Oleh: {w.ngo}</p>

              {/* LOGIKA: REQUEST DANA & MILESTONE */}
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 mb-2">
                 <p className="text-xs text-gray-500">Request Pencairan:</p>
                 <p className="font-bold text-green-600 text-lg">Rp {w.amount.toLocaleString()}</p>
                 <p className="text-[10px] text-gray-400 mt-1">Untuk: {w.milestone}</p>
              </div>

              {/* BUTTONS: BUKA LPJ / CAIRKAN */}
              <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-2">
                <button className="w-full text-indigo-600 text-xs font-bold flex items-center justify-center gap-1 hover:underline py-1">
                    <FileText size={14}/> Lihat Dokumen LPJ
                </button>
                <div className="flex gap-2">
                    <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl text-sm font-semibold transition shadow-md flex items-center justify-center gap-2">
                        <CheckCircle size={16}/> Cairkan
                    </button>
                    <button className="px-4 border border-red-200 text-red-600 hover:bg-red-50 rounded-xl text-sm font-semibold transition">
                        Tolak
                    </button>
                </div>
              </div>
            </div>
          ))}

          {/* EMPTY STATE */}
          {activeTab === 'withdrawals' && withdrawals.length === 0 && (
             <div className="col-span-full py-12 text-center text-gray-400 bg-white rounded-2xl border-dashed border-2 border-gray-200">
                <p>Tidak ada permintaan pencairan dana saat ini.</p>
             </div>
          )}

        </div>
      </section>
    </main>
  );
}