'use client';

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, MapPin, Calendar, Clock, Upload, CheckCircle, Coins, Trash2 } from "lucide-react";

export default function MissionDetailPage() {
  // State untuk menyimpan URL gambar (String URL dummy)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [status, setStatus] = useState<'active' | 'pending'>('active');

  // --- URL GAMBAR DUMMY (FOTO YANG JELAS & STABIL) ---
  // Foto relawan menanam pohon (Unsplash Source yang lebih stabil)
  const dummyImageUrl = "https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=1000&auto=format&fit=crop";

  // --- FUNGSI SIMULASI UPLOAD ---
  const handleSimulateUpload = () => {
    // Saat diklik, langsung isi state dengan URL gambar dummy
    setUploadedImage(dummyImageUrl);
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation(); // Mencegah trigger klik parent
    setUploadedImage(null);
  };

  const handleSubmit = () => {
    setStatus('pending');
    // alert("Bukti berhasil dikirim! Silakan tunggu validasi dari NGO.");
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-20 font-sans">
      
      {/* NAVBAR */}
      <nav className="bg-white border-b px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
         <div className="flex items-center gap-2 font-bold text-xl text-indigo-600">TerraFund</div>
         <div className="w-8 h-8 bg-gray-200 rounded-full border border-gray-300"></div>
      </nav>

      {/* HEADER BANNER */}
      <div className="bg-indigo-600 h-48 w-full relative">
         <div className="absolute top-6 left-6">
            <Link href="/relawan" className="text-white/80 hover:text-white flex items-center gap-2 text-sm font-semibold bg-black/10 px-3 py-1.5 rounded-full backdrop-blur-md transition hover:bg-black/20">
                <ArrowLeft size={16}/> Kembali ke Dashboard
            </Link>
         </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-24 relative z-10">
         
         {/* MAIN CARD */}
         <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            
            {/* Mission Header */}
            <div className="p-8 border-b border-gray-100">
                <div className="flex justify-between items-start">
                    <div>
                        <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">Penghijauan</span>
                        <h1 className="text-3xl font-bold text-gray-800 mt-3">Penanaman Pohon Mangrove</h1>
                        <p className="text-gray-500 mt-1">Diselenggarakan oleh: <span className="text-indigo-600 font-semibold">Green Earth NGO</span></p>
                    </div>
                    <div className="text-right">
                        <div className="bg-yellow-50 border border-yellow-100 px-4 py-2 rounded-xl inline-block shadow-sm">
                            <p className="text-[10px] text-yellow-600 font-bold uppercase tracking-wider">Reward</p>
                            <p className="text-2xl font-bold text-yellow-700 flex items-center gap-1">
                                <Coins size={20} className="fill-yellow-500 text-yellow-600"/> 150 TTK
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-4 md:gap-6 mt-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                        <MapPin size={16} className="text-indigo-500"/> Surabaya, Jawa Timur
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                        <Calendar size={16} className="text-indigo-500"/> 12 Des 2025
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                        <Clock size={16} className="text-indigo-500"/> 08:00 - 12:00 WIB
                    </div>
                </div>
            </div>

            {/* Content Body */}
            <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Left: Description */}
                <div className="md:col-span-2 space-y-8">
                    <section>
                        <h3 className="font-bold text-lg text-gray-800 mb-3 border-l-4 border-indigo-500 pl-3">Deskripsi Misi</h3>
                        <p className="text-gray-600 leading-relaxed text-justify">
                            Kami mengajak Anda untuk berkontribusi dalam pelestarian ekosistem pesisir dengan menanam 50 bibit mangrove. 
                            Kegiatan ini bertujuan untuk mencegah abrasi dan menyediakan habitat bagi biota laut. Anda akan bekerja sama dengan relawan lain dan komunitas lokal.
                        </p>
                    </section>

                    <section>
                        <h3 className="font-bold text-lg text-gray-800 mb-3 border-l-4 border-indigo-500 pl-3">Instruksi Bukti</h3>
                        <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                            <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                                <li>Ambil <b>foto selfie</b> Anda saat sedang menanam bibit.</li>
                                <li>Pastikan <b>lokasi terlihat jelas</b> (background pantai/hutan bakau).</li>
                                <li>Wajah Anda harus terlihat untuk verifikasi identitas.</li>
                                <li>Upload foto dengan format <b>JPG atau PNG</b>.</li>
                            </ul>
                        </div>
                    </section>
                </div>

                {/* Right: Upload Action (AREA UTAMA) */}
                <div className="md:col-span-1">
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 sticky top-24 shadow-sm">
                        <h3 className="font-bold text-gray-800 mb-4 text-center">Status Misi</h3>

                        {/* STATUS: ACTIVE (Belum Dikirim) */}
                        {status === 'active' && (
                            <div className="flex flex-col gap-4">
                                {/* --- AREA UPLOAD (KLIK UNTUK SIMULASI) --- */}
                                <div 
                                    onClick={handleSimulateUpload} 
                                    className={`relative w-full aspect-[4/3] rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden group
                                        ${uploadedImage ? 'border-green-500 bg-gray-50' : 'border-gray-300 hover:border-indigo-500 hover:bg-indigo-50'}`}
                                >
                                    {uploadedImage ? (
                                        // TAMPILAN JIKA ADA GAMBAR DUMMY
                                        <>
                                            {/* Gunakan img tag biasa dengan referrerPolicy agar tidak diblokir */}
                                            <img 
                                                src={uploadedImage} 
                                                alt="Bukti Upload" 
                                                className="w-full h-full object-cover" 
                                                referrerPolicy="no-referrer"
                                            />
                                            {/* Overlay Gradient */}
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <p className="text-white text-xs font-semibold bg-black/50 px-3 py-1 rounded-full">Klik untuk ganti</p>
                                            </div>
                                            {/* Tombol Hapus Kecil */}
                                            <button 
                                                onClick={handleRemoveImage}
                                                className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full text-red-500 hover:text-red-700 shadow-sm z-10"
                                            >
                                                <Trash2 size={16}/>
                                            </button>
                                            {/* Indikator Sukses */}
                                            <div className="absolute bottom-2 left-2 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                                                <CheckCircle size={10}/> Terupload
                                            </div>
                                        </>
                                    ) : (
                                        // TAMPILAN BELUM UPLOAD (KOSONG)
                                        <div className="flex flex-col items-center p-6 text-center animate-in fade-in zoom-in">
                                            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition">
                                                <Upload size={24}/>
                                            </div>
                                            <p className="text-sm font-bold text-gray-700">Upload Bukti Foto</p>
                                            <p className="text-xs text-gray-400 mt-1">Klik di sini untuk simulasi upload otomatis</p>
                                        </div>
                                    )}
                                </div>

                                {/* TOMBOL KIRIM */}
                                <button 
                                    onClick={handleSubmit}
                                    disabled={!uploadedImage} // Disable jika belum ada gambar dummy
                                    className={`w-full py-3 rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2
                                        ${uploadedImage 
                                            ? 'bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-lg transform hover:-translate-y-0.5' 
                                            : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'}`}
                                >
                                    Kirim Bukti Misi
                                </button>
                            </div>
                        )}

                        {/* STATUS: PENDING (Sudah Dikirim) */}
                        {status === 'pending' && (
                            <div className="text-center py-8 px-2 animate-in slide-in-from-bottom-4">
                                <div className="w-20 h-20 bg-yellow-50 text-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-yellow-100 shadow-sm">
                                    <Clock size={40} className="animate-pulse"/>
                                </div>
                                <h4 className="font-bold text-lg text-gray-800">Menunggu Validasi</h4>
                                <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                                    Bukti Anda sedang diperiksa oleh <b>Green Earth NGO</b>.
                                </p>
                                <div className="mt-4 bg-gray-50 p-3 rounded-lg border border-gray-100">
                                    <p className="text-xs text-gray-400">Estimasi waktu: <span className="font-semibold text-gray-600">1-24 Jam</span></p>
                                </div>
                            </div>
                        )}

                    </div>
                </div>

            </div>
         </div>

      </div>
    </main>
  );
}