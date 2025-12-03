'use client';

import { useParams } from "next/navigation";
import NgoNavbar from "@/components/Ngo/NgoNavbar";
import { 
  Calendar, 
  Coins, 
  Users, 
  MapPin,
  Upload,
  FileText,
  ArrowLeft,
  Save,
  CheckCircle,
  Send,
  AlertCircle,
  Trash2,
  File
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function KelolaProyekPage() {
  const { id } = useParams();

  // State untuk menyimpan daftar file dummy
  const [docs, setDocs] = useState<{ name: string; size: string; type: string }[]>([]);

  // --- FUNGSI SIMULASI UPLOAD LPJ ---
  const handleSimulateUpload = () => {
    // Tambahkan data dummy ke list
    const newDoc = {
      name: `Laporan_Pertanggungjawaban_Tahap_${docs.length + 1}.pdf`,
      size: "2.4 MB",
      type: "application/pdf"
    };
    setDocs(prev => [...prev, newDoc]);
  };

  const handleRemoveDoc = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setDocs(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <main className="w-full pb-24 bg-gray-50 min-h-screen">
      <NgoNavbar />

      {/* HEADER */}
      <section className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-16 pb-24 text-white shadow-lg">
        <div className="max-w-5xl mx-auto">
          
          <Link 
            href="/Ngo/proyek" 
            className="flex items-center gap-2 text-white/80 hover:text-white mb-4"
          >
            <ArrowLeft size={18} /> Kembali ke daftar proyek
          </Link>

          <h2 className="text-3xl md:text-4xl font-bold">Kelola Proyek #{id}</h2>
          <p className="text-green-100 mt-2 text-lg">
            Pantau progres, dana, dan unggah dokumentasi terbaru.
          </p>
        </div>
      </section>

      {/* BODY */}
      <section className="max-w-5xl mx-auto px-6 -mt-20">

        {/* CARD INFO PROYEK */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 mb-8">
          <h3 className="text-xl font-bold mb-4">Informasi Proyek</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Dana */}
            <div className="p-4 bg-gray-50 rounded-xl border">
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                <Coins size={16} /> Dana Terkumpul
              </div>
              <p className="text-xl font-bold text-gray-800">Rp 320.000.000</p>
            </div>

            {/* Tanggal */}
            <div className="p-4 bg-gray-50 rounded-xl border">
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                <Calendar size={16} /> Sisa Waktu
              </div>
              <p className="text-xl font-bold text-gray-800">12 Hari</p>
            </div>

            {/* Relawan */}
            <div className="p-4 bg-gray-50 rounded-xl border">
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                <Users size={16} /> Relawan
              </div>
              <p className="text-xl font-bold text-gray-800">125 / 150</p>
            </div>

            {/* Lokasi */}
            <div className="p-4 bg-gray-50 rounded-xl border">
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                <MapPin size={16} /> Lokasi
              </div>
              <p className="text-xl font-bold text-gray-800">Kalimantan Timur</p>
            </div>
          </div>
        </div>

        {/* --- AREA UPLOAD LPJ (DUMMY DATA) --- */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 mb-10">
          <div className="flex justify-between items-start mb-4">
            <div>
                <h3 className="text-xl font-bold">Laporan Pertanggungjawaban (LPJ)</h3>
                <p className="text-gray-500 text-sm mt-1">Unggah bukti penggunaan dana agar milestone selanjutnya dapat dicairkan.</p>
            </div>
            {/* Info Badge */}
            <span className="bg-orange-100 text-orange-700 text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1 h-fit">
                <AlertCircle size={12}/> Wajib untuk pencairan dana
            </span>
          </div>

          {/* AREA KLIK SIMULASI */}
          <div 
            onClick={handleSimulateUpload}
            className="w-full border-2 border-dashed border-gray-300 rounded-xl py-12 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-indigo-400 transition group mb-6"
          >
            <div className="bg-indigo-50 p-4 rounded-full mb-3 group-hover:scale-110 transition">
                <Upload size={32} className="text-indigo-600" />
            </div>
            <p className="text-gray-700 font-semibold">Klik area ini untuk simulasi upload LPJ</p>
            <p className="text-gray-400 text-xs mt-1">Otomatis menambahkan file PDF dummy</p>
          </div>

          {/* LIST FILES DUMMY */}
          {docs.length > 0 && (
            <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-700">File Terupload ({docs.length})</h4>
                <div className="grid grid-cols-1 gap-3">
                {docs.map((file, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex items-center gap-4 group hover:border-indigo-200 transition">
                        {/* Icon PDF */}
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center text-red-600">
                            <FileText size={20} />
                        </div>
                        
                        <div className="flex-1">
                            <p className="font-semibold text-sm text-gray-800 line-clamp-1">{file.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded border">{file.size}</span>
                                <span className="text-xs text-green-600 flex items-center gap-1"><CheckCircle size={10}/> Ready</span>
                            </div>
                        </div>

                        <button 
                            onClick={(e) => handleRemoveDoc(idx, e)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-white rounded-full transition"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}
                </div>
            </div>
          )}
        </div>

        {/* BUTTON ACTIONS */}
        <div className="flex justify-end gap-3 pb-10">
          <button className="px-6 py-3 border border-gray-300 text-gray-600 rounded-xl font-bold hover:bg-gray-50 transition flex items-center gap-2">
            <Save size={18} />
            Simpan Draft
          </button>
          
          <button 
            disabled={docs.length === 0}
            className={`px-6 py-3 rounded-xl font-bold transition shadow-md flex items-center gap-2
                ${docs.length > 0 
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
          >
            <Send size={18} />
            Kirim Laporan ke Admin
          </button>
        </div>

      </section>
    </main>
  );
}