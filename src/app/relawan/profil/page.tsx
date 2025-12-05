'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RelawanNavbar from "@/components/relawan/RelawanNavbar";
import Link from "next/link";
import {
    Globe,
    LogOut,
    Mail,
    Phone,
    MapPin,
    Trophy,
    CheckCircle,
    Coins,
    User,
    Loader2,
} from "lucide-react";

// Interface disesuaikan dengan response GET /api/relawan/:userId/profile
interface UserProfile {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    birth_date: string | null;
    address: string | null;
    city: string | null;
    province: string | null;
    level: number;
    xp: number;
    missions_done: number;
    total_hours: string; // String dari BE
    total_ttk: string;  // String dari BE
    photo: string;
}

// Helper untuk format display
const formatDisplay = (value: string | null) => value || '-';

export default function ProfilRelawan() {
    const router = useRouter();
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 1. FETCH DATA PROFILE
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const storedUser = localStorage.getItem("currentUser");
                const token = localStorage.getItem("authToken");

                if (!storedUser || !token) {
                    router.push("/login");
                    return;
                }

                const userObj = JSON.parse(storedUser);
                const userId = userObj.id;

                // Endpoint: GET /api/relawan/:userId/profile
                const ENDPOINT = `http://localhost:3001/api/relawan/${userId}/profile`;

                const response = await fetch(ENDPOINT, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Gagal mengambil data profil.");
                }

                const data: UserProfile = await response.json(); // Data Profil
                
                // Tambahkan field photo dummy karena BE tidak menyediakannya
                data.photo = `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=6D28D9&color=fff&size=200&rounded=true`;

                setUserProfile(data);

            } catch (err: any) {
                console.error("Error fetching profile:", err);
                setError(err.message || "Terjadi kesalahan saat memuat profil.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, [router]);

    // UI Loading dan Error
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
                <p className="ml-3 text-gray-600">Memuat data profil...</p>
            </div>
        );
    }

    if (error || !userProfile) {
        return (
            <div className="min-h-screen bg-gray-50">
                <RelawanNavbar />
                <div className="max-w-4xl mx-auto p-6 mt-10 text-center bg-white border border-red-200 rounded-xl">
                    <h3 className="text-xl font-bold text-red-600">Error!</h3>
                    <p className="text-gray-600 mt-2">{error || "Data profil tidak dapat dimuat."}</p>
                </div>
            </div>
        );
    }
    
    const user = userProfile;

    return (
        <div className="min-h-screen bg-gray-50 font-sans">

            {/* NAVBAR */}
            <RelawanNavbar />

            {/* HEADER UNGU */}
            <div className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 pb-32 pt-12 px-6">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold text-white">
                        Profil Relawan
                    </h1>
                    <p className="text-indigo-100 text-lg mt-1">
                        Kelola informasi pribadi dan detail akun kamu.
                    </p>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="max-w-6xl mx-auto px-6 -mt-20 pb-20">

                {/* CARD PROFIL */}
                <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row gap-10 items-center md:items-start border border-gray-100">

                    {/* FOTO */}
                    <img
                        src={user.photo}
                        alt="Foto Profil"
                        className="w-40 h-40 rounded-full shadow-md border-4 border-white object-cover"
                    />

                    {/* INFO */}
                    <div className="flex-1">
                        <h2 className="text-3xl font-bold text-gray-800">{user.name}</h2>

                        <div className="mt-4 space-y-2 text-gray-600">
                            <p className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-gray-500" />
                                {user.email}
                            </p>
                            <p className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-gray-500" />
                                {formatDisplay(user.phone)}
                            </p>
                            <p className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-gray-500" />
                                {formatDisplay(user.city)}
                            </p>
                        </div>
                        
                        <div className="mt-6 flex flex-col md:flex-row gap-4">
                            {/* Level Card */}
                            <div className="flex items-center gap-3 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                                <Trophy className="w-6 h-6 text-yellow-600 shrink-0" />
                                <div>
                                    <p className="text-xs text-gray-500">Level</p>
                                    <span className="font-bold text-lg text-gray-800">Level {user.level}</span>
                                    <span className="text-xs text-gray-500 ml-2">({user.xp} XP)</span>
                                </div>
                            </div>
                            
                            {/* Mission Completed Card */}
                            <div className="flex items-center gap-3 bg-green-50 p-3 rounded-lg border border-green-200">
                                <CheckCircle className="w-6 h-6 text-green-600 shrink-0" />
                                <div>
                                    <p className="text-xs text-gray-500">Misi Selesai</p>
                                    <span className="font-bold text-lg text-gray-800">{user.missions_done} Misi</span>
                                    <span className="text-xs text-gray-500 ml-2">({user.total_hours} Jam)</span>
                                </div>
                            </div>
                            
                            {/* Token TTK Card */}
                            <div className="flex items-center gap-3 bg-indigo-50 p-3 rounded-lg border border-indigo-200">
                                <Coins className="w-6 h-6 text-indigo-600 shrink-0" />
                                <div>
                                    <p className="text-xs text-gray-500">Total TTK</p>
                                    <span className="font-bold text-lg text-gray-800">{user.total_ttk} TTK</span>
                                </div>
                            </div>
                        </div>


                        <button className="mt-6 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow transition">
                            Edit Profil
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}