'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
    DollarSign, 
    Package, 
    Clock, 
    TrendingUp, 
    Plus, 
    CheckCircle, 
    Search, 
    Filter, 
    Download, 
    ChevronRight,
    Hourglass,
    Loader2,
    X
} from "lucide-react";
import NgoNavbar from "@/components/Ngo/NgoNavbar"; // Pastikan NgoNavbar diimport

// --- Helper Functions ---
const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(amount);
};

const calculatePercentage = (raised: number, target: number) => {
    if (target === 0) return 0;
    return Math.min(100, Math.round((raised / target) * 100));
};

// Logika Badge Warna berdasarkan Status BE (Status Proyek atau Claim Status)
const getStatusBadge = (statusBE: string, canRequest: boolean) => {
    // 1. Status Claim (Jika Siap Klaim)
    if (canRequest) return "bg-green-100 text-green-700 border border-green-200"; 
    
    // 2. Status Proyek/Payout dari DB
    if (statusBE === 'payout_pending' || statusBE === 'submitted') return "bg-yellow-100 text-yellow-700 border border-yellow-200"; 
    if (statusBE === 'payout_approved') return "bg-teal-100 text-teal-700 border border-teal-200";
    if (statusBE === 'payout_rejected') return "bg-red-100 text-red-700 border border-red-200";
    if (statusBE === 'funded' || statusBE === 'published') return "bg-blue-100 text-blue-700 border border-blue-200";
    if (statusBE === 'belum_ada_dana') return "bg-gray-100 text-gray-600 border border-gray-200";
    
    return "bg-gray-100 text-gray-600"; 
};

export default function DonasiPage() {
    const router = useRouter();
    
    // 1. STATE MANAGEMENT
    const [projects, setProjects] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmittingWithdraw, setIsSubmittingWithdraw] = useState(false);
    const [stats, setStats] = useState({
        totalRaised: 0,
        activeProjects: 0,
        pendingClaims: 0
    });

    // 1.1 STATE MODAL KLAIM DANA
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);
    const [currentProject, setCurrentProject] = useState<any | null>(null);
    const [withdrawForm, setWithdrawForm] = useState({
        amount: 0,
        description: ""
    });

    // --- Data User ---
    const [userId, setUserId] = useState<number | null>(null);
    const [token, setToken] = useState<string | null>(null);


    // 2. FETCH DATA
    useEffect(() => {
        const fetchFinancialData = async () => {
            try {
                setIsLoading(true);
                const storedUser = localStorage.getItem("currentUser");
                const authToken = localStorage.getItem("authToken");

                if (!storedUser || !authToken) {
                    router.push("/login");
                    return;
                }

                const userObj = JSON.parse(storedUser);
                const currentUserId = userObj.id;
                setUserId(currentUserId);
                setToken(authToken);

                // Fetch ke Endpoint GET /financial
                const response = await fetch(`http://localhost:3001/api/ngo/${currentUserId}/financial`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`
                    }
                });

                if (!response.ok) {
                    throw new Error("Gagal mengambil data finansial");
                }

                const data = await response.json(); //

                // 3. LOGIKA STATISTIK
                const totalMoney = data.reduce((acc: number, item: any) => {
                    return acc + (Number(item.current_amount) || 0);
                }, 0);

                const pendingCount = 0; // Tetap 0 karena BE tidak menyediakan count ini.

                // 4. MAPPING DATA (Backend -> UI)
                const rawProjects = data.map((item: any) => {
                    if (!item || !item.id) return null; 

                    let displayStatus = item.status; // <-- Ambil status proyek dari BE
                    let canRequest = false;

                    // Gunakan claim_status untuk menentukan kemampuan klaim
                    if (item.claim_status === 'bisa_klaim') { //
                        canRequest = true;
                    } 
                    
                    // Untuk item status proyek yang tidak ada dana:
                    if (item.claim_status === 'belum_ada_dana') { //
                        displayStatus = 'belum_ada_dana'; // Tampilkan claim_status jika belum ada dana
                    }

                    return {
                        id: item.id,
                        name: item.title,
                        target: Number(item.target_amount || 0),
                        raised: Number(item.current_amount || 0),
                        status: displayStatus, // Menggunakan status BE langsung
                        canRequest: canRequest,
                        // Data dummy/placeholder
                        milestone: 1, 
                        totalMilestones: 4,
                        lastUpdate: "Baru saja" 
                    };
                });
                
                const formattedProjects = rawProjects.filter((p: any) => p !== null);

                setProjects(formattedProjects);
                setStats({
                    totalRaised: totalMoney,
                    activeProjects: formattedProjects.length,
                    pendingClaims: pendingCount
                });

            } catch (err) {
                console.error("Error:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFinancialData();
    }, [router]);

    // --- LOGIKA KLAIM DANA ---
    
    // 5. Menampilkan Modal Klaim Dana
    const handleRequestWithdraw = (project: any) => {
        if (!project.canRequest) return;
        setCurrentProject(project);
        setWithdrawForm({
            amount: project.raised, 
            description: `Pencairan dana proyek ${project.name} (ID: ${project.id})`
        });
        setShowWithdrawModal(true);
    };

    // 6. Mengirim Klaim Dana ke Endpoint POST /withdraw
    const handleWithdrawSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!userId || !token || !currentProject) return;

        if (withdrawForm.amount <= 0 || withdrawForm.amount > currentProject.raised) {
            alert("Jumlah dana klaim tidak valid.");
            return;
        }

        setIsSubmittingWithdraw(true);

        try {
            const payload = {
                project_id: currentProject.id,
                amount: withdrawForm.amount,
                description: withdrawForm.description
            };

            const ENDPOINT = `http://localhost:3001/api/ngo/${userId}/withdraw`;

            const response = await fetch(ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Gagal mengajukan permintaan klaim dana.");
            }

            // Sukses
            alert("Permintaan klaim dana berhasil diajukan! Menunggu persetujuan Admin.");
            setShowWithdrawModal(false);
            window.location.reload(); 

        } catch (error: any) {
            console.error("Error submitting withdrawal:", error);
            alert(`Gagal Klaim: ${error.message}`);
        } finally {
            setIsSubmittingWithdraw(false);
        }
    };

    // Data Statistik UI
    const dynamicStatsData = [
        { 
            label: "Dana Terkumpul", 
            value: formatRupiah(stats.totalRaised), 
            icon: <DollarSign size={24} />, 
            color: "bg-green-100 text-green-600", 
            trend: "Total Akumulasi" 
        },
        { 
            label: "Proyek Aktif", 
            value: `${stats.activeProjects} Proyek`, 
            icon: <Package size={24} />, 
            color: "bg-blue-100 text-blue-600", 
            trend: "Sedang Berjalan" 
        },
        { 
            label: "Menunggu Validasi", 
            value: `${stats.pendingClaims} Klaim`, 
            icon: <Clock size={24} />, 
            color: "bg-orange-100 text-orange-600", 
            trend: "Butuh Aksi" 
        },
    ];

    return (
        <main className="w-full bg-gray-50 min-h-screen flex flex-col">
            <NgoNavbar />

            {/* --- HEADER SECTION --- */}
            <section className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-16 pb-28 text-white shadow-lg">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold">Dashboard Keuangan</h2>
                        <p className="mt-2 text-indigo-100 text-lg">
                            Transparansi aliran dana donasi dan pengelolaan Smart Contract.
                        </p>
                    </div>
                    
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 bg-white/10 border border-white/30 backdrop-blur-md text-white px-5 py-3 rounded-full font-semibold hover:bg-white/20 transition">
                            <Download size={20} /> Laporan
                        </button>
                        {/* Link ke halaman buat proyek baru */}
                        <Link href="/Ngo/proyek/buat">
                            <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-bold shadow-lg transition transform hover:scale-105">
                                <Plus size={20} /> Buat Proyek Baru
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* --- CONTENT SECTION --- */}
            <section className="max-w-6xl mx-auto px-6 -mt-20 w-full flex-grow mb-20">
                
                {/* 1. STATS CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {dynamicStatsData.map((stat, idx) => (
                         <div key={idx} className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:-translate-y-1 transition duration-300">
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-xl ${stat.color}`}>
                                    {stat.icon}
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                                    <h3 className="text-2xl font-bold text-gray-800">
                                        {isLoading ? "..." : stat.value}
                                    </h3>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-50 flex items-center text-xs text-gray-500 font-medium">
                                <div className="flex items-center text-green-600 mr-1">
                                    <TrendingUp size={14} className="mr-1" /> 
                                    <span>{stat.trend}</span>
                                </div>
                            </div>
                         </div>
                    ))}
                </div>

                {/* 2. MAIN CARD: DONATION TABLE */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    
                    {/* Toolbar */}
                    <div className="px-8 py-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2">
                            <h3 className="text-xl font-bold text-gray-800">Status Pendanaan</h3>
                            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-bold">Live</span>
                        </div>

                        <div className="flex gap-3 w-full md:w-auto">
                            <div className="relative group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500" size={18} />
                                <input 
                                    type="text" 
                                    placeholder="Cari ID atau Nama Proyek..." 
                                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-indigo-500 transition w-full md:w-64"
                                />
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 text-sm font-medium hover:bg-gray-50">
                                <Filter size={16} /> Filter
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
                            <tr>
                                <th className="px-8 py-4 text-left">Detail Proyek</th>
                                <th className="px-8 py-4 text-left">Finansial</th>
                                <th className="px-8 py-4 text-left">Milestone</th>
                                <th className="px-8 py-4 text-left">Status</th>
                                <th className="px-8 py-4 text-center">Aksi Smart Contract</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="py-12 text-center">
                                         <div className="flex flex-col items-center justify-center">
                                             <Loader2 className="w-8 h-8 animate-spin text-indigo-500 mb-2" />
                                             <span className="text-gray-500">Memuat data finansial...</span>
                                         </div>
                                    </td>
                                </tr>
                            ) : projects.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-12 text-center text-gray-500">
                                        Belum ada proyek yang berjalan.
                                    </td>
                                </tr>
                            ) : (
                                projects.map((p) => {
                                    const percentage = calculatePercentage(p.raised, p.target);
                                    const badgeColor = getStatusBadge(p.status, p.canRequest);
                                    
                                    return (
                                    <tr key={p.id} className="hover:bg-gray-50 transition group">
                                        {/* Kolom 1: Detail */}
                                        <td className="px-8 py-5">
                                            <div className="flex flex-col">
                                                <p className="font-bold text-gray-800 text-base line-clamp-1">{p.name}</p>
                                                <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                                                    <Clock size={10} /> Update: {p.lastUpdate}
                                                </p>
                                            </div>
                                        </td>

                                        {/* Kolom 2: Finansial */}
                                        <td className="px-8 py-5">
                                            <div className="w-48">
                                                <div className="flex justify-between text-xs mb-1">
                                                    <span className="text-gray-500">Terkumpul</span>
                                                    <span className={`font-bold ${percentage >= 100 ? 'text-green-600' : 'text-indigo-600'}`}>{percentage}%</span>
                                                </div>
                                                <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                                                    <div 
                                                        className={`h-2 rounded-full ${percentage >= 100 ? 'bg-green-500' : 'bg-indigo-500'}`}
                                                        style={{ width: `${percentage}%` }}
                                                    ></div>
                                                </div>
                                                <p className="text-sm font-bold text-gray-800">{formatRupiah(p.raised)}</p>
                                                <p className="text-xs text-gray-400">Target: {formatRupiah(p.target)}</p>
                                            </div>
                                        </td>

                                        {/* Kolom 3: Milestone */}
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2">
                                                <div className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg text-sm font-bold">
                                                    Tahap {p.milestone}/{p.totalMilestones}
                                                </div>
                                            </div>
                                        </td>

                                        {/* Kolom 4: Status */}
                                        <td className="px-8 py-5">
                                            {/* Menampilkan status BE LANGSUNG */}
                                            <span className={`px-3 py-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-1.5 ${badgeColor}`}>
                                                {p.canRequest && <CheckCircle size={12} />}
                                                {p.status === 'payout_pending' && <Hourglass size={12} />}
                                                {p.status}
                                            </span>
                                        </td>

                                        {/* Kolom 5: Aksi (KUNCI FLOW) */}
                                        <td className="px-8 py-5 text-center">
                                        {p.canRequest ? (
                                            <button 
                                                onClick={() => handleRequestWithdraw(p)} 
                                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 mx-auto shadow-md transform hover:scale-105 animate-pulse"
                                            >
                                                <CheckCircle size={14} /> Klaim Dana
                                            </button>
                                        ) : (
                                            <button className="text-gray-400 text-xs font-medium border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-100 hover:text-indigo-600 transition flex items-center gap-1 mx-auto">
                                                Detail <ChevronRight size={12} />
                                            </button>
                                        )}
                                        </td>
                                    </tr>
                                    );
                                })
                            )}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Pagination Footer */}
                    <div className="px-8 py-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center text-xs text-gray-500">
                        <span>Menampilkan {projects.length} proyek</span>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 border rounded bg-white disabled:opacity-50" disabled>Prev</button>
                            <button className="px-3 py-1 border rounded bg-white hover:bg-gray-100" disabled>Next</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- FOOTER CTA --- */}
            <section className="w-full bg-[#10B981] py-10 text-center text-white mt-auto">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-2xl font-bold mb-3">Keamanan Smart Contract</h2>
                    <p className="text-white/90 mb-6 text-sm md:text-base">
                        Setiap transaksi pencairan dana tercatat secara on-chain dan tidak dapat diubah, menjamin akuntabilitas penuh kepada donatur.
                    </p>
                    <button className="bg-white text-[#10B981] px-8 py-2.5 rounded-full font-bold shadow-lg hover:bg-green-50 transition text-sm">
                        Lihat di Etherscan
                    </button>
                </div>
            </section>
            
            {/* --- WITHDRAWAL MODAL --- */}
            {showWithdrawModal && currentProject && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
                        <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                            <h3 className="text-xl font-bold text-gray-800">Klaim Dana Proyek</h3>
                            <button onClick={() => setShowWithdrawModal(false)} disabled={isSubmittingWithdraw} className="p-2 rounded-full hover:bg-gray-100">
                                <X size={20} />
                            </button>
                        </div>
                        
                        <form onSubmit={handleWithdrawSubmit} className="mt-4 space-y-4">
                            <p className="text-sm text-gray-600">
                                **{currentProject.name}**: Dana terkumpul **{formatRupiah(currentProject.raised)}**.
                                Maksimal klaim adalah sisa dana yang tersedia.
                            </p>
                            
                            {/* Input Jumlah */}
                            <div>
                                <label className="font-semibold text-gray-700 text-sm">Jumlah Klaim (Rp)</label>
                                <input
                                    type="number"
                                    min="1"
                                    max={currentProject.raised}
                                    value={withdrawForm.amount}
                                    onChange={(e) => setWithdrawForm({...withdrawForm, amount: parseInt(e.target.value) || 0})}
                                    className="w-full mt-1 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                    disabled={isSubmittingWithdraw}
                                />
                                <p className="text-xs text-gray-500 mt-1">Max: {formatRupiah(currentProject.raised)}</p>
                            </div>

                            {/* Input Deskripsi */}
                            <div>
                                <label className="font-semibold text-gray-700 text-sm">Deskripsi / Tujuan Klaim</label>
                                <textarea
                                    rows={3}
                                    value={withdrawForm.description}
                                    onChange={(e) => setWithdrawForm({...withdrawForm, description: e.target.value})}
                                    className="w-full mt-1 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                    disabled={isSubmittingWithdraw}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmittingWithdraw}
                                className={`w-full py-3 rounded-lg font-bold transition flex justify-center items-center gap-2 ${isSubmittingWithdraw ? 'bg-indigo-400 cursor-not-allowed text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
                            >
                                {isSubmittingWithdraw ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} /> Memproses Klaim...
                                    </>
                                ) : (
                                    "Ajukan Pencairan Dana"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
}