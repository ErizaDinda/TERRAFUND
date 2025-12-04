'use client';
import { useParams } from "next/navigation";
import NgoNavbar from "@/components/Ngo/NgoNavbar";
import Link from "next/link";
import {
  Calendar,
  Coins,
  Users,
  MapPin,
  ArrowLeft,
  Save,
  CheckCircle,
  Send,
  FileText,
  Trash2,
  Clock 
} from "lucide-react";
import { useState } from "react";

export default function KelolaProyekPage() {
  const { id } = useParams();

  // DATA DUMMY FILES
  const dummyFiles = [
    { name: "Laporan_Keuangan_Tahap_1.pdf", size: 2450000 }
  ];

  // Inisialisasi state dengan data dummy
  const [docs, setDocs] = useState(dummyFiles);
  const [isSent, setIsSent] = useState(false); 

  // Helper function to format file size
  // FIX: Tambahkan tipe data ': number'
  const formatFileSize = (bytes: number) => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  // FIX: Tambahkan tipe data ': number' dan ': React.MouseEvent'
  const handleRemoveDoc = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    if (isSent) return; 
    setDocs(prev => prev.filter((_, i) => i !== index));
  };

  const handleSendReport = () => {
    if (docs.length > 0 && !isSent) {
        console.log("Mengirim laporan ke admin...", docs);
        setIsSent(true);
    }
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
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 mb-10">
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

        {/* --- List Files Section (Header & Upload Removed) --- */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 mb-10">
            {/* LIST FILES (Dummy Data Loaded by Default) */}
            {docs.length > 0 && (
                <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-gray-700">File Terupload ({docs.length})</h4>
                    <div className="grid grid-cols-1 gap-3">
                    {docs.map((file, idx) => (
                        <div key={idx} className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex items-center gap-4 group hover:border-indigo-200 transition">
                            {/* Icon File */}
                            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
                                <FileText size={20} />
                            </div>
                            
                            <div className="flex-1">
                                <p className="font-semibold text-sm text-gray-800 line-clamp-1">{file.name}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded border">{formatFileSize(file.size)}</span>
                                    <span className="text-xs text-green-600 flex items-center gap-1"><CheckCircle size={10}/> Ready</span>
                                </div>
                            </div>

                            {/* Tombol Hapus */}
                            <button
                                onClick={(e) => handleRemoveDoc(idx, e)}
                                disabled={isSent}
                                className={`p-2 rounded-full transition ${isSent ? 'text-gray-300 cursor-not-allowed' : 'text-gray-400 hover:text-red-500 hover:bg-white'}`}
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
            <button
                disabled={isSent}
                className={`px-6 py-3 border rounded-xl font-bold transition flex items-center gap-2 ${isSent ? 'border-gray-200 text-gray-400 cursor-not-allowed' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}
            >
                <Save size={18} />
                Simpan Draft
            </button>
            
            <button 
                onClick={handleSendReport}
                disabled={docs.length === 0 || isSent}
                className={`px-6 py-3 rounded-xl font-bold transition shadow-md flex items-center gap-2
                    ${isSent
                        ? 'bg-yellow-500 text-white cursor-not-allowed'
                        : docs.length > 0 
                            ? 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg' 
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
            >
                {isSent 
                    ? (
                        <>
                            <Clock size={18} />
                            Menunggu Validasi Admin
                        </>
                    ) 
                    : (
                        <>
                            <Send size={18} />
                            Kirim Laporan ke Admin
                        </>
                    )
                }
            </button>
        </div>

      </section>
    </main>
  );
}