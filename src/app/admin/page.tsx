'use client';

import AdminNavbar from "@/components/Admin/AdminNavbar";
import { ShieldCheck, CheckCircle, XCircle, Coins, FileText, ArrowRight } from "lucide-react";

export default function AdminDashboard() {
  
  // Data Request Validasi
  const requests = [
    {
      id: "REQ-001",
      ngo: "Green Earth Foundation",
      project: "Reboisasi Hutan Kalimantan",
      milestone: "Termin 2: Penanaman 5000 Bibit",
      amount: "Rp 45.000.000",
      status: "Menunggu",
      date: "30 Nov 2025"
    },
    {
      id: "REQ-002",
      ngo: "Water For Life",
      project: "Air Bersih Untuk Desa",
      milestone: "Termin 1: Pembelian Material Pipa",
      amount: "Rp 22.500.000",
      status: "Menunggu",
      date: "29 Nov 2025"
    },
    {
      id: "REQ-003",
      ngo: "EduCare Foundation",
      project: "Perpustakaan Digital",
      milestone: "Termin 1: Pengadaan Komputer",
      amount: "Rp 35.000.000",
      status: "Menunggu",
      date: "28 Nov 2025"
    }
  ];

  return (
    <main className="w-full pb-24 bg-gray-50 min-h-screen font-sans">
      <AdminNavbar />

      {/* HEADER SIMPEL & FOKUS */}
      <section className="w-full bg-gradient-to-r from-[#6A6AFB] to-[#8A4FFF] px-6 py-12 pb-24 text-white shadow-xl">
        <div className="max-w-5xl mx-auto flex justify-between items-end">
            <div>
                <h2 className="text-3xl font-bold">Validasi Pencairan Dana</h2>
                <p className="text-indigo-100 mt-2 text-lg">
                  Tinjau dan setujui laporan NGO untuk meneruskan dana Smart Contract.
                </p>
            </div>
            {/* Indikator Jumlah Antrian */}
            <div className="bg-white/20 backdrop-blur-md border border-white/30 px-4 py-2 rounded-lg text-sm font-semibold">
                {requests.length} Permintaan Pending
            </div>
        </div>
      </section>

      {/* LIST VALIDASI (LANGSUNG TO THE POINT) */}
      <section className="max-w-5xl mx-auto px-6 -mt-12">
        
        <div className="space-y-4">
            {requests.map((req, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-md border border-gray-100 flex flex-col md:flex-row gap-6 items-center hover:shadow-lg transition duration-300">
                    
                    {/* Kolom Kiri: Detail Proyek */}
                    <div className="flex-1 w-full">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-xs font-bold text-[#6A6AFB] bg-[#6A6AFB]/10 px-2 py-1 rounded uppercase tracking-wide">
                                {req.id}
                            </span>
                            <span className="text-xs text-gray-400 font-medium">Diajukan: {req.date}</span>
                        </div>
                        
                        <h4 className="text-lg font-bold text-gray-800">{req.project}</h4>
                        <div className="text-sm text-gray-600 mt-1 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                            <span className="font-semibold text-gray-700">{req.ngo}</span>
                            <span className="hidden sm:inline text-gray-300">•</span>
                            <span>{req.milestone}</span>
                        </div>

                        {/* Nominal & Link Bukti */}
                        <div className="mt-4 flex items-center gap-4 text-sm font-semibold">
                            <span className="flex items-center gap-1.5 text-[#00A651] bg-[#00A651]/10 px-3 py-1.5 rounded-lg border border-[#00A651]/20">
                                <Coins size={16}/> {req.amount}
                            </span>
                            <a href="#" className="flex items-center gap-1.5 text-gray-500 hover:text-[#6A6AFB] transition group">
                                <FileText size={16}/> 
                                <span className="group-hover:underline">Cek Dokumen</span>
                                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                        </div>
                    </div>

                    {/* Kolom Kanan: Tombol Aksi (Besar & Jelas) */}
                    <div className="flex flex-col gap-2 w-full md:w-48 border-l border-gray-100 md:pl-6">
                        <button className="flex items-center justify-center gap-2 bg-[#00A651] hover:bg-[#009448] text-white py-2.5 rounded-xl font-bold text-sm shadow-md transition transform hover:scale-105 active:scale-95">
                            <CheckCircle size={18} /> Cairkan Dana
                        </button>
                        <button className="flex items-center justify-center gap-2 bg-white border border-red-200 text-red-500 hover:bg-red-50 py-2.5 rounded-xl font-bold text-sm transition">
                            <XCircle size={18} /> Tolak
                        </button>
                    </div>
                </div>
            ))}
        </div>

        {/* Jika Kosong */}
        {requests.length === 0 && (
            <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-200">
                <ShieldCheck className="mx-auto text-gray-300 mb-4" size={48} />
                <h3 className="text-lg font-bold text-gray-600">Tidak ada permintaan baru</h3>
                <p className="text-gray-400">Semua laporan sudah divalidasi.</p>
            </div>
        )}

      </section>
    </main>
  );
}