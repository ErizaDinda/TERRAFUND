'use client';

import React, { useEffect, useState } from "react";
import RelawanNavbar from "@/components/relawan/RelawanNavbar"; 
import Link from "next/link";
import { DollarSign, Check, Hourglass, Trophy, MapPin, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation"; 

const BG_COLORS = ["bg-green-500", "bg-blue-500", "bg-indigo-500", "bg-purple-500", "bg-teal-500"];
const ICONS = ["🌱", "💧", "📚", "🌍", "🤝"];

// Asumsi format data dari BE:
/* { 
    name: "fio", 
    level: 1, 
    xp: 0, 
    total_ttk: "0", 
    missions_done: 0, 
    missions_active: 0, 
    total_hours: "0", 
    missions: [...] 
} 
*/

export default function DashboardRelawanStyleDonatur() {
    const router = useRouter();

    const [stats, setStats] = useState({
        token: 0,
        completedMissions: 0,
        activeMissionsCount: 0,
        level: "Level 1",
        xp: 0
    });
    
    const [missions, setMissions] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [userName, setUserName] = useState("Relawan");

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const storedUser = localStorage.getItem("currentUser");
                const token = localStorage.getItem("authToken");

                if (!storedUser || !token) {
                    setError("User atau Token tidak ditemukan. Silakan login kembali.");
                    setIsLoading(false);
                    return;
                }

                const userObj = JSON.parse(storedUser);
                const userId = userObj.id; 
                
                // Ambil nama dari localStorage (Asumsi currentUser menyimpan nama)
                setUserName(userObj.name || "Relawan"); 

                // --- INTEGRASI ENDPOINT ---
                // Endpoint: GET /api/relawan/:userId/dashboard
                const ENDPOINT = `http://localhost:3001/api/relawan/${userId}/dashboard`;
                
                const response = await fetch(ENDPOINT, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // PENTING: Autentikasi
                    }
                });
                
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || `Gagal mengambil data dashboard (Status: ${response.status})`);
                }

                const result = await response.json(); // Data Relawan Dashboard

                // 2. Mapping Data STATS
                setStats({
                    token: Number(result.total_ttk) || 0, //
                    completedMissions: result.missions_done || 0, //
                    activeMissionsCount: result.missions_active || 0, //
                    level: result.level ? `Level ${result.level}` : "Level 1", //
                    xp: result.xp || 0 //
                });

                // 3. Mapping Data MISI
                const rawMissions = result.missions || []; 
                
                const formattedData = rawMissions.map((item: any, index: number) => ({
                    // Asumsi BE mengirim ID dan Title Proyek yang diikuti relawan
                    id: item.id,
                    title: item.title || "Proyek Tanpa Judul",
                    org: item.organization_name || "Organisasi Umum", 
                    location: item.location || "Indonesia",
                    status: item.status, // Status di user_projects
                    hours: item.hours,   // Jam kontribusi
                    icon: ICONS[index % ICONS.length],
                    color: BG_COLORS[index % BG_COLORS.length],
                }));

                setMissions(formattedData);

            } catch (err: any) {
                console.error("Error fetching dashboard:", err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, [router]);

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center p-8 bg-white rounded-xl shadow-lg border border-red-200">
                    <h3 className="text-xl font-bold text-red-600 mb-2">Error Dashboard</h3>
                    <p className="text-gray-600">{error}</p>
                </div>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <RelawanNavbar />
            <div className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 pb-32 pt-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        Selamat Datang, {userName}!
                    </h1>
                    <p className="text-indigo-100 text-lg">
                        Terima kasih telah berkontribusi tenaga dan waktu untuk bumi yang lebih hijau.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 -mt-20">
                
                {/* STAT CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    {/* Token */}
                    <div className="bg-white rounded-xl p-6 shadow-lg flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                            <DollarSign className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-gray-500 text-xs font-medium uppercase">Token Reward (TTK)</p>
                            <h3 className="text-2xl font-bold text-gray-800">
                                {isLoading ? <Loader2 className="animate-spin w-6 h-6 text-indigo-500" /> : `${stats.token} TTK`}
                            </h3>
                        </div>
                    </div>

                    {/* Misi Selesai */}
                    <div className="bg-white rounded-xl p-6 shadow-lg flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                            <Check className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-gray-500 text-xs font-medium uppercase">Misi Selesai</p>
                            <h3 className="text-2xl font-bold text-gray-800">
                                {isLoading ? <Loader2 className="animate-spin w-6 h-6 text-indigo-500" /> : `${stats.completedMissions} Misi`}
                            </h3>
                        </div>
                    </div>

                    {/* Misi Aktif */}
                    <div className="bg-white rounded-xl p-6 shadow-lg flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                            <Hourglass className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-gray-500 text-xs font-medium uppercase">Misi Aktif</p>
                            <h3 className="text-2xl font-bold text-gray-800">
                                {isLoading ? <Loader2 className="animate-spin w-6 h-6 text-indigo-500" /> : `${stats.activeMissionsCount} Proyek`}
                            </h3>
                        </div>
                    </div>

                    {/* Level */}
                    <div className="bg-white rounded-xl p-6 shadow-lg flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center shrink-0">
                            <Trophy className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div>
                            <p className="text-gray-500 text-xs font-medium uppercase">Level Relawan</p>
                            <h3 className="text-2xl font-bold text-yellow-500">
                                {isLoading ? <Loader2 className="animate-spin w-6 h-6 text-indigo-500" /> : stats.level} <span className="text-sm text-gray-400">({stats.xp} XP)</span>
                            </h3>
                        </div>
                    </div>
                </div>

                {/* TITLE */}
                <div className="mb-6 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-purple-700">Misi yang Kamu Ikuti</h2>
                    <Link href="/relawan/misi" className="text-sm font-medium text-purple-600 hover:text-purple-700">Lihat Semua</Link>
                </div>

                {/* LIST MISI */}
                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="w-10 h-10 animate-spin text-purple-600" />
                        <span className="ml-3 text-gray-500 font-medium">Sedang memuat dashboard...</span>
                    </div>
                ) : missions.length === 0 ? (
                    <div className="text-center py-10 bg-white rounded-xl border border-gray-200">
                        <p className="text-gray-500">Kamu belum mengikuti misi apapun.</p>
                        <Link href="/proyek" className="text-sm text-indigo-600 mt-2 block">Cari Proyek untuk Mulai Kontribusi</Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-20">
                        {missions.map((mission: any) => (
                            <div key={mission.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition border border-gray-100 group relative">
                                
                                {/* Badge Status - Opsional untuk membedakan Active/Completed */}
                                <div className="absolute top-4 right-4 z-10">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${mission.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'}`}>
                                        {mission.status === 'completed' ? 'Selesai' : 'Aktif'}
                                    </span>
                                </div>

                                <div className={`h-40 ${mission.color} bg-opacity-90 relative flex items-center justify-center`}>
                                    <div className="text-6xl drop-shadow-lg transform group-hover:scale-110 transition duration-300">
                                        {mission.icon}
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="font-bold text-gray-800 text-lg mb-1 line-clamp-1">{mission.title}</h3>
                                    <div className="flex items-center text-gray-500 text-sm mb-4">
                                        <span className="font-medium mr-2 line-clamp-1 max-w-[50%]">{mission.org}</span>
                                        • 
                                        <MapPin className="w-3 h-3 ml-2 mr-1 shrink-0" />
                                        <span className="line-clamp-1">{mission.location}</span>
                                    </div>
                                    
                                    {/* Tambahan Info Jam */}
                                    <div className="text-xs text-gray-400 mb-4">
                                            Durasi: {mission.hours} Jam
                                    </div>

                                    <Link href={`/relawan/missions/${mission.id}`} className="block w-full">
                                        <button className="w-full py-2.5 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold text-sm transition shadow-sm">
                                            Lihat Detail
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
}