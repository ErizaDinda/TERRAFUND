'use client';

import { useEffect, useState } from "react";
import { ArrowLeft, MapPin, Calendar, Coins, Loader2, Send } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Gunakan useRouter dari next/navigation

// --- MOCK COMPONENTS UNTUK PREVIEW DIHAPUS (Menggunakan komponen asli) ---

// Interface diperluas dan disesuaikan dengan response GET /api/projects/:id
interface MissionDetail {
    id: number;
    title: string;
    organization_name: string;
    location: string;
    reward: number; // Reward dari BE
    end_date: string;
    description: string;
    category_name: string; // Menggunakan category_name dari BE
    duration_months: number; // Durasi dalam bulan
    token_reward: number; // Token reward (TTK)
}

export default function MissionRegisterPage() {
    // NOTE: Dalam aplikasi Next.js asli, kita menggunakan useParams() untuk mendapatkan ID
    // Karena kode ini disimulasikan, kita pertahankan id = "1" atau ambil dari URL jika memungkinkan.
    // Jika Anda menggunakan App Router, Anda bisa tambahkan: const params = useParams(); const id = params.id;
    const id = "1"; // Ganti dengan ID Proyek yang benar dari URL Anda
    const router = useRouter();

    const [mission, setMission] = useState<MissionDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    
    // State untuk Form Registration
    const [motivation, setMotivation] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    
    // State untuk Auth Info
    const [userId, setUserId] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);


    function formatDate(dateString: string) {
        if (!dateString) return "-";
        return new Date(dateString).toLocaleDateString("id-ID", {
            day: 'numeric', month: 'long', year: 'numeric'
        });
    }

    // 1. Fetch Data Detail Misi (GET /api/projects/:id)
    useEffect(() => {
        const authCheck = () => {
             const token = localStorage.getItem("authToken");
             const userStr = localStorage.getItem("currentUser");
             
             if (!token || !userStr) {
                 setError("Sesi habis. Mohon login ulang.");
                 setLoading(false);
                 return false;
             }
             
             setToken(token);
             setUserId(JSON.parse(userStr).id);
             return true;
        };

        const fetchMissionDetail = async () => {
            if (!authCheck()) return;

            try {
                // Endpoint: GET /api/projects/:id
                const ENDPOINT = `http://localhost:3001/api/projects/${id}`;
                
                const res = await fetch(ENDPOINT);
                
                if (!res.ok) {
                    const errData = await res.json();
                    throw new Error(errData.message || "Gagal memuat detail misi.");
                }

                const data = await res.json();
                
                setMission({
                    id: data.id,
                    title: data.title,
                    organization_name: data.organization_name || "Organisasi Mitra",
                    location: data.location,
                    reward: data.token_reward || 0, // Menggunakan token_reward dari BE
                    end_date: data.end_date,
                    description: data.description,
                    category_name: data.category_name || "Lingkungan",
                    duration_months: data.duration_months || 0,
                    token_reward: data.token_reward || 0
                });

            } catch (err: any) {
                console.error("Fetch Error:", err);
                setError(err.message || "Gagal memuat detail misi.");
            } finally {
                setLoading(false);
            }
        };

        fetchMissionDetail();
    }, [id]);

    // 2. Handle Registrasi Misi (POST /api/relawan/:userId/projects)
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        if (!motivation.trim()) {
            setError("Mohon isi motivasi kamu mengikuti misi ini.");
            return;
        }

        if (!userId || !token || !mission) {
             setError("Sesi tidak valid atau misi tidak ditemukan.");
             return;
        }

        setSubmitting(true);

        try {
            const payload = {
                project_id: mission.id, // Gunakan ID misi yang difetch
                motivation: motivation
            };

            // ENDPOINT POST Registrasi Misi
            const ENDPOINT = `http://localhost:3001/api/relawan/${userId}/projects`; 
            
            const res = await fetch(ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // Kirim Token Auth
                },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || "Gagal mendaftar misi.");
            }

            // Sukses
            setSuccessMessage("Berhasil mendaftar! Mengalihkan ke Dashboard Misi...");
            
            setTimeout(() => {
                router.push("/relawan/dashboard");
            }, 2000);

        } catch (err: any) {
            setError(err.message || "Terjadi kesalahan saat pendaftaran.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <Loader2 className="w-10 h-10 animate-spin text-green-600" />
            </div>
        );
    }

    if (!mission) {
        return (
            <div className="flex flex-col items-center justify-center h-screen text-center px-4">
                <p className="text-red-600 font-semibold mb-4">{error || "Misi tidak ditemukan."}</p>
                <Link href="/relawan/misi" className="text-indigo-600 hover:underline">Kembali ke Daftar Misi</Link>
            </div>
        );
    }

    // Pastikan mission ada sebelum rendering
    const p = mission as MissionDetail; 

    return (
        <main className="min-h-screen bg-gray-50 font-sans pb-20">
            {/* Navbar Simple */}
            <nav className="bg-white border-b px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
                <div className="flex items-center gap-2 font-bold text-xl text-[#00A651]">TerraFund</div>
                <div className="text-sm text-gray-500">Pendaftaran Relawan</div>
            </nav>

            {/* Header Background */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-700 h-56 w-full relative">
                <div className="absolute top-6 left-6">
                    <Link href="/relawan/misi" className="text-white/90 hover:text-white flex items-center gap-2 text-sm font-semibold bg-black/20 px-4 py-2 rounded-full backdrop-blur-md transition hover:bg-black/30">
                        <ArrowLeft size={16}/> Batal & Kembali
                    </Link>
                </div>
            </div>

            {/* Main Content Container */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-32 relative z-10">
                <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* LEFT COLUMN: Mission Details */}
                    <div className="flex-1">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                            <div className="p-8">
                                <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide border border-green-200">
                                    {p.category_name}
                                </span>
                                <h1 className="text-3xl font-bold text-gray-800 mt-4 leading-tight">
                                    {p.title}
                                </h1>
                                <p className="text-gray-500 mt-2 text-sm">
                                    Oleh <span className="text-green-700 font-semibold">{p.organization_name}</span>
                                </p>

                                <div className="grid grid-cols-2 gap-4 mt-6">
                                    <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
                                        <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                                            <MapPin size={18} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Lokasi</p>
                                            <p className="text-sm font-semibold text-gray-700 truncate">{p.location}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
                                        <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                                            <Calendar size={18} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Batas Waktu</p>
                                            <p className="text-sm font-semibold text-gray-700">{formatDate(p.end_date)}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <h3 className="font-bold text-lg text-gray-800 mb-3 flex items-center gap-2">
                                        Deskripsi
                                    </h3>
                                    <div className="prose prose-sm text-gray-600 leading-relaxed">
                                        {p.description}
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-yellow-50 px-8 py-4 border-t border-yellow-100 flex justify-between items-center">
                                <div className="text-yellow-800 text-sm font-medium">Reward Poin & Jam Kontribusi</div>
                                <div className="flex items-center gap-4 text-yellow-700 font-bold text-xl">
                                    <div className="flex items-center gap-1.5">
                                        <Coins size={20} className="fill-yellow-500 text-yellow-600"/>
                                        {p.token_reward} TTK
                                    </div>
                                    <div className="text-sm font-medium text-gray-600">
                                        {p.duration_months} Bulan
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Registration Form */}
                    <div className="w-full lg:w-[380px] shrink-0">
                        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xl sticky top-24">
                            <h2 className="text-xl font-bold text-gray-800 mb-1">Daftar Misi</h2>
                            <p className="text-sm text-gray-500 mb-6">Lengkapi formulir untuk bergabung.</p>

                            {error && (
                                <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 flex items-start gap-2">
                                    <div className="mt-0.5 min-w-[4px] h-4 bg-red-500 rounded-full"></div>
                                    {error}
                                </div>
                            )}

                            {successMessage && (
                                <div className="mb-4 p-4 bg-green-50 text-green-700 text-sm rounded-lg border border-green-200 text-center font-medium">
                                    {successMessage}
                                </div>
                            )}

                            <form onSubmit={handleRegister} className="space-y-5">
                                <div>
                                    <label htmlFor="motivation" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Motivasi Bergabung
                                    </label>
                                    <textarea
                                        id="motivation"
                                        rows={5}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition resize-none text-sm text-gray-800 placeholder:text-gray-400"
                                        placeholder="Ceritakan secara singkat mengapa kamu ingin mengikuti misi relawan ini..."
                                        value={motivation}
                                        onChange={(e) => setMotivation(e.target.value)}
                                        required
                                        disabled={submitting || !!successMessage}
                                        maxLength={500}
                                    />
                                    <p className="text-xs text-gray-400 mt-2 text-right">{motivation.length}/500 karakter</p>
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitting || !!successMessage}
                                    className="w-full py-3.5 rounded-xl bg-[#00A651] hover:bg-[#008f45] text-white font-bold text-sm shadow-md shadow-green-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {submitting ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin" /> Sedang Mendaftar...
                                        </>
                                    ) : (
                                        <>
                                            <Send size={18} /> Kirim Pendaftaran
                                        </>
                                    )}
                                </button>
                            </form>
                            
                            <div className="mt-6 pt-6 border-t border-dashed border-gray-200 text-center">
                                <p className="text-xs text-gray-400">
                                    Dengan mendaftar, kamu menyetujui syarat & ketentuan TerraFund untuk kegiatan kerelawanan.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}