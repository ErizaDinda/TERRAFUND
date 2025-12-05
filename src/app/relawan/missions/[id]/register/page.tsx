'use client';

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Send, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
// import RelawanNavbar from "@/components/relawan/RelawanNavbar"; // Dihapus karena tidak digunakan di page ini

// Interface disesuaikan dengan response GET /api/projects/:id
interface ProjectDetail {
    id: number;
    title: string;
    organization_name: string;
    location: string;
    // Reward/Token di BE: token_reward
    token_reward: number; 
    end_date: string;
    description: string;
    // Kategori di BE: category_name
    category_name: string; 
    duration_months: number; 
    // Field lain dari BE
    [key: string]: any; 
}

export default function RegisterMissionPage() {
    const params = useParams();
    // Mendapatkan ID proyek dari URL params
    const id = Array.isArray(params.id) ? params.id[0] : params.id;

    const router = useRouter();
    
    // 1. STATE UNTUK DATA PROYEK & FORM
    const [project, setProject] = useState<ProjectDetail | null>(null); // Simpan data API disini
    const [motivation, setMotivation] = useState("");
    
    // State UI
    const [isLoadingData, setIsLoadingData] = useState(true); 
    const [isSubmitting, setIsSubmitting] = useState(false); 
    const [isSuccess, setIsSuccess] = useState(false); 
    const [error, setError] = useState<string | null>(null);

    // State untuk Auth Info
    const [userId, setUserId] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);


    // Helper: Format Tanggal
    const formatDate = (dateString: string) => {
        if (!dateString) return "-";
        return new Date(dateString).toLocaleDateString("id-ID", {
            day: 'numeric', month: 'long', year: 'numeric'
        });
    };
    
    // Helper: Ambil Auth Info
    const getAuthInfo = () => {
        const token = localStorage.getItem("authToken");
        const userStr = localStorage.getItem("currentUser");
        
        if (token && userStr) {
            setToken(token);
            // Pastikan ID adalah string untuk URL endpoint
            setUserId(JSON.parse(userStr).id.toString()); 
            return true;
        }
        return false;
    };


    // 2. FETCH DATA PROYEK DARI API (GET)
    useEffect(() => {
        if (!id) return;
        getAuthInfo(); // Cek dan simpan Auth Info

        const fetchProjectDetail = async () => {
            try {
                setIsLoadingData(true);
                // Endpoint GET /api/projects/:id
                const response = await fetch(`http://localhost:3001/api/projects/${id}`);

                if (!response.ok) {
                    const errData = await response.json();
                    throw new Error(errData.message || "Gagal memuat data proyek.");
                }

                const data = await response.json();
                setProject(data);

            } catch (err: any) {
                console.error("Error fetching project:", err);
                setError(err.message || "Terjadi kesalahan saat mengambil data misi.");
            } finally {
                setIsLoadingData(false);
            }
        };

        fetchProjectDetail();
    }, [id]);

    // 3. HANDLE SUBMIT (POST REGISTRASI)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!motivation.trim()) {
            alert("Motivasi tidak boleh kosong!");
            return;
        }
        
        // Cek kembali otentikasi sebelum submit
        if (!userId || !token || !project) {
            alert("Sesi habis. Mohon login kembali untuk mendaftar.");
            router.push("/login");
            return;
        }

        setIsSubmitting(true);

        try {
            // ENDPOINT POST Registrasi Misi [cite: 4c74bc]
            const ENDPOINT = `http://localhost:3001/api/relawan/${userId}/projects`;
            
            const payload = {
                project_id: project.id, 
                motivation: motivation
            };

            const response = await fetch(ENDPOINT, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Gagal mendaftar misi.");
            }

            // Sukses
            setIsSuccess(true);
            
            // Redirect otomatis
            setTimeout(() => {
                router.push("/relawan/dashboard"); 
            }, 3000);

        } catch (error: any) {
            console.error("Error submitting registration:", error);
            alert(`Gagal mendaftar: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    // --- TAMPILAN LOADING AWAL ---
    if (isLoadingData) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
                <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-3" />
                <p className="text-gray-500">Memuat formulir pendaftaran...</p>
            </div>
        );
    }

    // --- TAMPILAN ERROR JIKA DATA TIDAK DITEMUKAN ---
    if (error || !project) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Data Tidak Ditemukan</h2>
                    <p className="text-gray-600 mb-6">Misi yang ingin Anda daftar tidak tersedia.</p>
                    <Link href="/relawan/misi">
                        <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                            Kembali ke Daftar Misi
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    // --- UI UTAMA ---
    const displayTitle = project.title || project.name || "Misi Tanpa Judul";

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center font-sans px-4 py-12">

            <div className="max-w-xl w-full bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 md:p-10">
                
                {isSuccess ? (
                    /* TAMPILAN SUKSES */
                    <div className="text-center py-10">
                        <CheckCircle size={64} className="text-[#00A651] mx-auto mb-4" />
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Pendaftaran Berhasil!</h1>
                        <p className="text-lg text-gray-600">Anda berhasil mendaftar untuk misi <span className="font-semibold text-indigo-600">{displayTitle}</span>.</p>
                        <p className="text-sm text-gray-500 mt-4">Anda akan diarahkan ke halaman misi yang diikuti...</p>
                        <Link href="/relawan/dashboard" className="mt-6 inline-flex items-center gap-2 text-[#6A6AFB] hover:underline font-semibold">
                            Atau klik di sini jika tidak teralihkan.
                        </Link>
                    </div>
                ) : (
                    /* TAMPILAN FORM */
                    <>
                        {/* Back Button (Dynamic Link) */}
                        <Link
                            href={`/relawan/missions/${id}`} 
                            className="flex items-center gap-2 text-gray-700 mb-6 hover:text-[#6A6AFB] transition font-medium"
                        >
                            <ArrowLeft size={18} />
                            Kembali ke Detail Proyek
                        </Link>

                        <h1 className="text-3xl font-bold text-gray-800 mb-1">
                            Daftar Misi: <span className="text-indigo-600">{displayTitle}</span>
                        </h1>
                        <p className="text-gray-600 mb-8 mt-2">
                            Isi formulir singkat di bawah ini untuk mengonfirmasi pendaftaran Anda pada organisasi <span className="font-semibold">{project.organization_name || "Mitra"}</span>.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Field Teks Motivasi */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Motivasi Bergabung <span className="text-red-500">*</span></label>
                                <textarea
                                    value={motivation}
                                    onChange={(e) => setMotivation(e.target.value)}
                                    className="w-full h-32 border border-gray-300 rounded-xl p-4 text-gray-700 outline-none focus:ring-2 focus:ring-[#6A6AFB] transition bg-gray-50 resize-none"
                                    placeholder="Contoh: Saya ingin berkontribusi dalam konservasi ekosistem pesisir..."
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>
                            
                            {/* Konfirmasi Persyaratan */}
                            <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-100 rounded-xl">
                                <input type="checkbox" id="terms" required className="mt-1 w-4 h-4 text-[#00A651] bg-gray-100 border-gray-300 rounded focus:ring-[#00A651]" disabled={isSubmitting} />
                                <label htmlFor="terms" className="text-xs text-gray-600">
                                    Saya mengonfirmasi bahwa saya siap mengikuti semua instruksi dan jadwal yang ditetapkan oleh penyelenggara.
                                </label>
                            </div>


                            {/* Tombol Kirim */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`mt-6 w-full py-3.5 font-bold rounded-xl shadow-lg transition flex items-center justify-center gap-2 
                                    ${isSubmitting ? 'bg-indigo-400 cursor-not-allowed text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white transform hover:scale-[1.01]'}
                                `}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 size={20} className="animate-spin" /> Sedang Mendaftar...
                                    </>
                                ) : (
                                    <>
                                        Kirim Pendaftaran
                                        <Send size={18} />
                                    </>
                                )}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}