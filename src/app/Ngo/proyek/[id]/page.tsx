'use client';
import { useParams } from "next/navigation";
import NgoNavbar from "@/components/Ngo/NgoNavbar";
import Link from "next/link";
import { useEffect, useState } from "react"; 
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
    Clock,
    Loader2
} from "lucide-react";

// UPDATE: Interface disesuaikan dengan response JSON terbaru
interface ProjectDetail {
    id: number;
    title: string;
    target_amount: number;
    current_amount: number;
    location: string;
    end_date: string;
    days_remaining: number; 
    donor_count: number;
    status: string;
    organization_name: string;
    progress_percentage: number;
}

export default function KelolaProyekPage() {
    const { id } = useParams(); 
    
    // State Data Integrasi
    const [projectData, setProjectData] = useState<ProjectDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // DATA DUMMY & STATUS LAPORAN
    const dummyFiles = [
        { name: "Laporan_Keuangan_Tahap_1.pdf", size: 2450000 }
    ];
    const [docs, setDocs] = useState(dummyFiles);
    const [isSent, setIsSent] = useState(false); 

    // --- HELPER FUNCTIONS ---
    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    };
    
    const formatRupiah = (num: number) => 
        new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);

    const handleRemoveDoc = (index: number, e: React.MouseEvent) => {
        e.preventDefault();
        if (isSent) return; 
        setDocs(prev => prev.filter((_, i) => i !== index));
    };

    // --- INTEGRASI POST (KIRIM LAPORAN) ---
    const handleSendReport = async () => {
        if (docs.length === 0 || isSent) return;

        console.log(`Mengirim laporan untuk Proyek ID ${id} dan mengubah status ke 'payout_pending'...`);
        
        try {
            const token = localStorage.getItem("authToken");

            // Endpoint: PATCH /api/projects/:id/status
            const ENDPOINT = `http://localhost:3001/api/projects/${id}/status`; 

            const response = await fetch(ENDPOINT, {
                method: 'PATCH', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify({ status: 'payout_pending' }) 
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Gagal mengirim laporan. Coba lagi.");
            }

            // Jika sukses:
            setIsSent(true); 
            console.log("Laporan berhasil dikirim, status proyek diperbarui menjadi payout_pending.");
            alert("Laporan berhasil dikirim. Menunggu validasi Admin.");
            
        } catch (err: any) {
            console.error("Error saat mengirim laporan:", err);
            alert(`Gagal mengirim laporan: ${err.message}`);
        }
    };
    
    // 1. FETCH DETAIL PROYEK
    const fetchProjectDetail = async () => {
        if (!id) return; 

        try {
            const token = localStorage.getItem("authToken");
            const ENDPOINT = `http://localhost:3001/api/projects/${id}`;

            const response = await fetch(ENDPOINT, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                }
            });

            if (!response.ok) {
                throw new Error("Gagal mengambil detail proyek.");
            }

            const data: ProjectDetail = await response.json(); 
            setProjectData(data);

            // Set isSent jika proyek sudah dalam proses penarikan dana
            if (data.status === 'payout_pending' || data.status === 'payout_approved') {
                setIsSent(true);
            }

        } catch (err: any) {
            console.error("Error fetching project detail:", err);
            setError(err.message || "Terjadi kesalahan saat memuat data.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProjectDetail();
    }, [id]);

    // UI Loading dan Error
    if (isLoading) {
        return (
            <main className="w-full min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="animate-spin text-indigo-600 w-10 h-10" />
                <p className="ml-3 text-gray-600">Memuat data proyek ID: {id}...</p>
            </main>
        );
    }

    if (error) {
        return (
             <main className="w-full min-h-screen bg-gray-50">
                <NgoNavbar />
                <div className="max-w-5xl mx-auto p-6 mt-10 text-center bg-white border border-red-200 rounded-xl">
                    <h3 className="text-xl font-bold text-red-600">Error!</h3>
                    <p className="text-gray-600 mt-2">{error}</p>
                </div>
            </main>
        );
    }
    
    const p = projectData as ProjectDetail; 

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

                    <h2 className="text-3xl md:text-4xl font-bold">{p.title}</h2>
                    <p className="text-green-100 mt-2 text-lg">
                        Pantau progres, dana, dan unggah dokumentasi terbaru.
                    </p>
                </div>
            </section>

            {/* BODY */}
            <section className="max-w-5xl mx-auto px-6 -mt-20">

                {/* CARD INFO PROYEK (Data Diambil dari BE) */}
                <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 mb-10">
                    <h3 className="text-xl font-bold mb-4">Informasi Proyek</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Dana */}
                        <div className="p-4 bg-gray-50 rounded-xl border">
                            <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                                <Coins size={16} /> Dana Terkumpul ({p.progress_percentage}%)
                            </div>
                            <p className="text-xl font-bold text-gray-800">
                                {formatRupiah(p.current_amount)} / {formatRupiah(p.target_amount)}
                            </p>
                        </div>
                        {/* Tanggal */}
                        <div className="p-4 bg-gray-50 rounded-xl border">
                            <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                                <Calendar size={16} /> Sisa Waktu
                            </div>
                            <p className="text-xl font-bold text-gray-800">
                                {p.days_remaining} Hari
                            </p>
                        </div>
                        {/* Donatur */}
                        <div className="p-4 bg-gray-50 rounded-xl border">
                            <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                                <Users size={16} /> Total Donatur
                            </div>
                            <p className="text-xl font-bold text-gray-800">{p.donor_count} Orang</p>
                        </div>
                        {/* Lokasi */}
                        <div className="p-4 bg-gray-50 rounded-xl border">
                            <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                                <MapPin size={16} /> Lokasi
                            </div>
                            <p className="text-xl font-bold text-gray-800">{p.location}</p>
                        </div>
                    </div>
                </div>

                {/* --- List Files Section (Laporan Progres) --- */}
                <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 mb-10">
                    <h3 className="text-xl font-bold mb-4">Laporan Dokumentasi</h3>
                    
                    {/* **BLOK UNGGAH FILE DIHAPUS SESUAI PERMINTAAN** */}

                    {/* LIST FILES (Dummy Data Loaded by Default) */}
                    {docs.length > 0 && (
                        <div className="space-y-3">
                            <h4 className="text-sm font-semibold text-gray-700">File Terupload ({docs.length})</h4>
                            <div className="grid grid-cols-1 gap-3">
                            {docs.map((file, idx) => (
                                <div key={idx} className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex items-center gap-4 group hover:border-indigo-200 transition">
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