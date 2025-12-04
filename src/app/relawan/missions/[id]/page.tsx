'use client';

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, MapPin, Calendar, Clock, Coins, CheckCircle, FileText, XCircle } from "lucide-react";

// Definisikan Tipe Data Misi (di real project, ini diambil dari API)
interface MissionDetail {
    title: string;
    org: string;
    location: string;
    reward: number;
    deadline: string;
    time: string;
    category: string;
    isCompleted: boolean; // Status internal relawan
}

export default function MissionDetailPage({ params }: { params: { id: string } }) {
    // Simulasi data misi dari ID (di dunia nyata: fetch data)
    const mission: MissionDetail = {
        title: "Penanaman Pohon Mangrove",
        org: "Green Earth NGO",
        location: "Surabaya, Jawa Timur",
        reward: 150,
        deadline: "12 Des 2025",
        time: "08:00 - 12:00 WIB",
        category: "Penghijauan",
        isCompleted: false, // Default status
    };
    
    // State untuk konfirmasi status penyelesaian misi
    const [statusMisi, setStatusMisi] = useState<'pending' | 'completed' | 'not_started'>('not_started');

    const handleMarkComplete = () => {
        // Logika untuk mengirim notifikasi ke NGO bahwa misi dianggap selesai
        setStatusMisi('pending');
    };

    return (
        <main className="min-h-screen bg-gray-50 pb-20 font-sans">
            
            {/* NAVBAR (Asumsi Anda menggunakan RelawanNavbar di layout) */}
            <nav className="bg-white border-b px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
                <div className="flex items-center gap-2 font-bold text-xl text-[#00A651]">TerraFund</div>
                <div className="w-8 h-8 bg-gray-200 rounded-full border border-gray-300"></div>
            </nav>

            {/* HEADER BANNER */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-48 w-full relative">
                <div className="absolute top-6 left-6">
                    <Link href="/relawan/" className="text-white/80 hover:text-white flex items-center gap-2 text-sm font-semibold bg-black/10 px-3 py-1.5 rounded-full backdrop-blur-md transition hover:bg-black/20">
                        <ArrowLeft size={16}/> Kembali ke Daftar Misi
                    </Link>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 -mt-24 relative z-10">
                
                {/* MAIN CARD CONTAINER */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    
                    {/* Mission Header */}
                    <div className="p-8 border-b border-gray-100">
                        <div className="flex justify-between items-start">
                            <div>
                                <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide border border-green-200">{mission.category}</span>
                                <h1 className="text-3xl font-bold text-gray-800 mt-3">{mission.title}</h1>
                                <p className="text-gray-500 mt-1">Diselenggarakan oleh: <span className="text-indigo-600 font-semibold">{mission.org}</span></p>
                            </div>
                            <div className="text-right">
                                <div className="bg-yellow-50 border border-yellow-100 px-4 py-2 rounded-xl inline-block shadow-sm">
                                    <p className="text-[10px] text-yellow-600 font-bold uppercase tracking-wider">Reward</p>
                                    <p className="text-2xl font-bold text-yellow-700 flex items-center gap-1">
                                        <Coins size={20} className="fill-yellow-500 text-yellow-600"/> {mission.reward} TTK
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4 md:gap-6 mt-6 text-sm text-gray-600">
                            <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                                <MapPin size={16} className="text-indigo-500"/> {mission.location}
                            </div>
                            <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                                <Calendar size={16} className="text-indigo-500"/> {mission.deadline}
                            </div>
                            <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                                <Clock size={16} className="text-indigo-500"/> {mission.time}
                            </div>
                        </div>
                    </div>

                    {/* Content Body (Description & Instructions) */}
                    <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                        
                        {/* Left: Description & Instructions */}
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
                                        <li>Ambil **foto selfie** Anda saat sedang menanam bibit.</li>
                                        <li>Pastikan **lokasi terlihat jelas** (background pantai/hutan bakau).</li>
                                        <li>Wajah Anda harus terlihat untuk verifikasi identitas.</li>
                                        <li>Upload foto dengan format **JPG atau PNG**.</li>
                                    </ul>
                                </div>
                            </section>
                        </div>

                        {/* Right: Status Aksi (Simplified) */}
                        <div className="md:col-span-1">
                            <div className="bg-white border border-gray-200 rounded-2xl p-6 sticky top-24 shadow-md">
                                <h3 className="font-bold text-gray-800 mb-4 text-center border-b border-gray-100 pb-3">Aksi Relawan</h3>

                                {/* Status Card Based on State */}
                                {statusMisi === 'not_started' && (
                                    <div className="flex flex-col gap-3">
                                        <p className="text-sm text-gray-500 text-center">Tandai misi ini setelah Anda menyelesaikan semua instruksi.</p>
                                        <button 
                                            onClick={handleMarkComplete}
                                            className="w-full py-3 rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white transform hover:scale-[1.01]"
                                        >
                                            <CheckCircle size={18} /> Tandai Selesai
                                        </button>
                                    </div>
                                )}
                                
                                {statusMisi === 'pending' && (
                                    <div className="text-center py-4 px-2">
                                        <div className="w-16 h-16 bg-yellow-50 text-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-yellow-100 shadow-sm">
                                            <Clock size={32} className="animate-pulse"/>
                                        </div>
                                        <h4 className="font-bold text-gray-800">Menunggu Laporan</h4>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Anda sudah menandai selesai. Silakan menunggu validasi Ngo
                                        </p>
                                    
                                    </div>
                                )}
                                
                                {statusMisi === 'completed' && (
                                    <div className="text-center py-4 px-2">
                                        <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-green-100 shadow-sm">
                                            <CheckCircle size={32} />
                                        </div>
                                        <h4 className="font-bold text-gray-800">Misi Selesai</h4>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Laporan Anda sudah diverifikasi oleh NGO.
                                        </p>
                                        <button className="mt-4 w-full py-2.5 rounded-xl border border-green-600 text-green-600 hover:bg-green-50 font-semibold text-sm transition">
                                            Unduh Sertifikat
                                        </button>
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