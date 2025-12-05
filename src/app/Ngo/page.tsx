'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link"; // Wajib di-import untuk navigasi Next.js
import { 
    ClipboardList, 
    Users, 
    Coins, 
    FolderKanban, 
    ArrowRight, 
    TrendingUp,
    Leaf,
    Droplets,
    BookOpen,
    Heart,
    Loader2
} from "lucide-react";

import NgoNavbar from "@/components/Ngo/NgoNavbar"; // Asumsi path Navbar Anda

// --- Helper Visualisasi (Kategori/Ikon Dummy) ---
const BG_HEADERS = ["bg-green-500", "bg-blue-500", "bg-indigo-500", "bg-purple-500", "bg-orange-500"];
const ICONS = [
    <Leaf key="1" size={40} className="text-white" />, 
    <Droplets key="2" size={40} className="text-white" />, 
    <BookOpen key="3" size={40} className="text-white" />,
    <Heart key="4" size={40} className="text-white" />
];

// Format Rupiah Helper
const formatRupiah = (num: number) => 
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);


// Helper untuk menentukan display status proyek (sesuai BE)
const getStatusDisplay = (status: string) => {
    let statusText = status;
    let statusColor = "bg-gray-100 text-gray-600";
    
    if (status === 'published') {
        statusColor = "bg-green-100 text-green-700";
        statusText = "Aktif (Published)";
    } else if (status === 'funded') {
        statusColor = "bg-blue-100 text-blue-700";
        statusText = "Terkumpul 100%";
    } else if (status === 'payout_pending') {
        statusColor = "bg-indigo-100 text-indigo-700";
        statusText = "Klaim Diproses";
    } else if (status === 'payout_approved') {
        statusColor = "bg-teal-100 text-teal-700";
        statusText = "Dana Cair";
    } else if (status === 'payout_rejected') {
        statusColor = "bg-red-100 text-red-700";
        statusText = "Klaim Ditolak";
    } else if (status === 'submitted') {
        statusColor = "bg-yellow-100 text-yellow-700";
        statusText = "Menunggu Review"; 
    } 
    return { statusText, statusColor };
}


export default function NgoDashboard() {
    
    // 1. STATE MANAGEMENT
    const [statsData, setStatsData] = useState({
        danaTerkumpul: 0,
        totalProyek: 0,
        relawanAktif: 0,
        laporanProyek: 0 // Placeholder
    });

    const [projects, setProjects] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [ngoName, setNgoName] = useState("Tim NGO");

    // 2. FETCH DATA
    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                setIsLoading(true);
                
                const storedUser = localStorage.getItem("currentUser");
                const token = localStorage.getItem("authToken");

                if (!storedUser || !token) {
                    console.error("User belum login atau token hilang");
                    // Opsi: Redirect ke halaman login
                    return; 
                }

                const userObj = JSON.parse(storedUser);
                const userId = userObj.id;
                setNgoName(userObj.name || "Tim NGO");

                // Fetch ke Endpoint GET /api/ngo/:userId/dashboard
                const response = await fetch(`http://localhost:3001/api/ngo/${userId}/dashboard`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // Wajib Kirim Token
                    }
                });

                if (!response.ok) {
                    throw new Error("Gagal mengambil data dashboard");
                }

                const data = await response.json();
                const recentProjects = data.recent_projects || [];

                // A. Mapping Recent Projects
                const formattedProjects = recentProjects.map((item: any, index: number) => {
                    // Pastikan item valid
                    if (!item) return null; 
                    
                    const { statusText, statusColor } = getStatusDisplay(item.status);

                    return {
                        id: item.id,
                        title: item.title,
                        category: item.category_name || "Kategori Lain", // Asumsi BE mengirim category_name
                        desc: `Target Dana: ${formatRupiah(Number(item.target_amount || 0))}`,
                        status: item.status,
                        statusText: statusText, // Status yang sudah diformat
                        statusColor: statusColor, // Warna badge
                        raised: Number(item.current_amount || 0),
                        
                        // Visualisasi
                        bgHeader: BG_HEADERS[index % BG_HEADERS.length],
                        icon: ICONS[index % ICONS.length],
                        link: `/Ngo/proyek/${item.id}`
                    };
                }).filter((p: any) => p !== null); // Filter entry null

                // B. Set Stats Data (Menggunakan data summary BE yang akurat)
                setStatsData({
                    danaTerkumpul: Number(data.summary?.dana_terkumpul) || 0,
                    totalProyek: Number(data.summary?.total_proyek) || formattedProjects.length,
                    relawanAktif: Number(data.summary?.relawan_aktif) || 0,
                    laporanProyek: 0 
                });

                setProjects(formattedProjects);

            } catch (error) {
                console.error("Error fetching dashboard:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    // 3. STATS CONFIGURATION
    const statsUI = [
        {
            title: "Dana Terkumpul",
            value: isLoading ? "..." : formatRupiah(statsData.danaTerkumpul),
            icon: <Coins size={24} />,
            bgIcon: "bg-green-100",
            textIcon: "text-green-600",
            trend: "Total Akumulasi"
        },
        {
            title: "Laporan Proyek",
            value: isLoading ? "..." : `${statsData.laporanProyek} Laporan`,
            icon: <ClipboardList size={24} />,
            bgIcon: "bg-purple-100",
            textIcon: "text-purple-600",
            trend: "Menunggu verifikasi"
        },
        {
            title: "Total Proyek",
            value: isLoading ? "..." : `${statsData.totalProyek} Proyek`,
            icon: <FolderKanban size={24} />,
            bgIcon: "bg-blue-100",
            textIcon: "text-blue-600",
            trend: "Proyek tercatat"
        },
        {
            title: "Relawan Terdaftar",
            value: isLoading ? "..." : `${statsData.relawanAktif} Orang`,
            icon: <Users size={24} />,
            bgIcon: "bg-yellow-100",
            textIcon: "text-yellow-600",
            trend: "Aktif berkontribusi"
        },
    ];

    const recentActivities = [
        { user: "Sistem", action: "memperbarui data dashboard", project: "General", time: "Baru saja" },
        { user: "Admin", action: "memverifikasi proyek", project: "Reboisasi Hutan", time: "1 jam lalu" },
    ];

    return (
        <main className="w-full pb-24 bg-gray-50 min-h-screen">
            <NgoNavbar />

            {/* --- HEADER SECTION --- */}
            <section className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-16 text-white shadow-lg">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold">Halo, {ngoName}!</h2>
                        <p className="text-white/90 mt-2 text-lg">
                            Kelola dampak sosial Anda secara transparan dan akuntabel.
                        </p>
                    </div>
                    {/* Quick Action Button */}
                    <Link href="/Ngo/proyek/buat">
                        <button className="bg-white text-indigo-600 px-6 py-3 rounded-full font-bold shadow-md hover:bg-gray-50 transition transform hover:scale-105">
                            + Buat Proyek Baru
                        </button>
                    </Link>
                </div>
            </section>

            {/* --- STATISTICS CARDS --- */}
            <section className="max-w-6xl mx-auto px-6 -mt-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {statsUI.map((item, i) => (
                        <div
                            key={i}
                            className="bg-white shadow-sm border border-gray-100 rounded-xl p-6 hover:shadow-md transition duration-300"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-xl ${item.bgIcon} ${item.textIcon}`}>
                                    {item.icon}
                                </div>
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm font-medium">{item.title}</p>
                                <h3 className="text-2xl font-bold text-gray-800 mt-1">{item.value}</h3>
                                <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                                    <TrendingUp size={12} /> {item.trend}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- MAIN CONTENT GRID --- */}
            <section className="max-w-6xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* LEFT COLUMN: PROJECTS LIST (Span 2) */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold text-gray-800">Proyek Terbaru</h3>
                        <Link href="/Ngo/proyek" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                            Lihat Semua <ArrowRight size={16} />
                        </Link>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center py-10">
                            <Loader2 className="animate-spin text-indigo-600 w-8 h-8"/>
                        </div>
                    ) : projects.length === 0 ? (
                        <div className="text-center py-10 bg-white rounded-xl border border-gray-200 text-gray-500">
                            Belum ada proyek terbaru.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {projects.map((p) => (
                                <div
                                    key={p.id}
                                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition group"
                                >
                                    {/* Card Header dengan Warna Kategori */}
                                    <div className={`h-32 ${p.bgHeader} flex items-center justify-center relative`}>
                                        <div className="transform group-hover:scale-110 transition duration-300 drop-shadow-md">
                                            {p.icon}
                                        </div>
                                        <span className="absolute top-3 right-3 bg-white/20 backdrop-blur-md text-white text-xs px-2 py-1 rounded-md font-medium border border-white/30">
                                            {p.category}
                                        </span>
                                        <span className={`absolute bottom-3 left-3 text-[10px] px-2 py-0.5 rounded font-bold uppercase ${p.statusColor}`}>
                                            {p.statusText} {/* Menggunakan status yang sudah diformat */}
                                        </span>
                                    </div>

                                    <div className="p-5">
                                        <h4 className="text-lg font-bold text-gray-800 line-clamp-1">{p.title}</h4>
                                        <p className="text-sm text-gray-500 mt-2 line-clamp-2">{p.desc}</p>

                                        <Link
                                            href={p.link}
                                            className="mt-5 block w-full py-2.5 rounded-lg border border-green-600 text-green-600 font-semibold text-center hover:bg-green-600 hover:text-white transition"
                                        >
                                            Kelola Proyek
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* RIGHT COLUMN: RECENT ACTIVITY (Span 1) */}
                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-800">Aktivitas Terbaru</h3>
                    
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="space-y-6">
                            {recentActivities.map((act, idx) => (
                                <div key={idx} className="flex gap-3 relative pb-6 last:pb-0 last:border-0 border-l border-gray-100 ml-2">
                                    <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-white ring-1 ring-gray-100"></div>
                                    <div className="pl-4">
                                        <p className="text-sm text-gray-800">
                                            <span className="font-bold">{act.user}</span> {act.action} <span className="text-indigo-600 font-medium">{act.project}</span>
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">{act.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <button className="w-full mt-6 text-sm text-gray-500 font-medium hover:text-indigo-600 transition">
                            Lihat semua aktivitas
                        </button>
                    </div>
                    
                    {/* Mini Card: Quick Verification */}
                    <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
                        <h4 className="font-bold text-indigo-900 mb-2">Butuh Verifikasi</h4>
                        <p className="text-sm text-indigo-700 mb-4">Pastikan proyek Anda selalu terupdate.</p>
                        <button className="text-xs bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition">
                            Periksa Sekarang
                        </button>
                    </div>
                </div>

            </section>
        </main>
    );
}