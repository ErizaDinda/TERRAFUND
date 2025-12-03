"use client";

import React, { useState, useEffect, useCallback } from 'react';

import Navbar from "@/components/Navbar"; // ← SATU-SATUNYA PERUBAHAN

import { 
  MapPin, Calendar, Target, Users, Clock, Share2, Leaf, ShieldCheck 
} from "lucide-react";

// --- INTERFACE SESUAI RESPONS BACKEND ---
interface ProjectDetail {
    id: number;
    title: string;
    description: string;
    location: string;
    duration_months: number;
    target_amount: number;
    current_amount: number;
    donor_count: number;
    banner_image: string;
    organization_name: string;
    category_name: string;
    days_remaining: number;
    progress_percentage: number;
}

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = React.use(params); // FIX WAJIB UNTUK NEXT.JS 15

    const PROJECT_DETAIL_ENDPOINT = `http://localhost:3001/api/projects/${id}`;
    
    const [project, setProject] = useState<ProjectDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const formatRupiah = (val: number) => 
        new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(val);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);

        if (!id || id === 'undefined') {
            setError("ID proyek tidak ditemukan di URL.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(PROJECT_DETAIL_ENDPOINT);
            if (!response.ok) {
                if (response.status === 404) throw new Error(`Proyek dengan ID ${id} tidak ditemukan.`);
                throw new Error(`Kode Status: ${response.status}.`);
            }
            
            const result = await response.json();
            if (result && result.id) {
                setProject(result);
            } else {
                throw new Error("Struktur data detail proyek tidak sesuai.");
            }

        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    }, [id, PROJECT_DETAIL_ENDPOINT]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);
    
    const p = project || {
        title: "Memuat Proyek...",
        description: "Data sedang dimuat...",
        location: "...",
        duration_months: 0,
        target_amount: 100000,
        current_amount: 0,
        donor_count: 0,
        banner_image: "",
        organization_name: "...",
        category_name: "...",
        days_remaining: 0,
        progress_percentage: 0,
    } as ProjectDetail;

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 font-sans pb-20">
                <Navbar />
                <div className="max-w-6xl mx-auto p-6 mt-10 text-red-700 bg-red-100 border border-red-300 rounded-lg">
                    <p className='font-semibold'>Terjadi Kesalahan saat Memuat Proyek {id}:</p>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    const isLoading = loading || !project;

    return (
        <div className="min-h-screen bg-gray-50 font-sans pb-20">
            <Navbar />

            <main className="px-6 py-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* LEFT COLUMN */}
                <div className="lg:col-span-2 space-y-8">
                    
                    {/* Banner */}
                    <div className={`bg-gradient-to-br from-[#6A6AFB] to-[#8A4FFF] rounded-2xl w-full h-80 flex flex-col justify-center items-center text-white shadow-lg relative overflow-hidden ${isLoading ? 'animate-pulse' : ''}`}>
                        
                        {p.banner_image ? (
                            <img 
                                src={p.banner_image}
                                alt={p.title}
                                className="w-full h-full object-cover absolute top-0 left-0"
                            />
                        ) : (
                            <Leaf size={80} className="drop-shadow-lg relative z-10" />
                        )}

                        <span className="mt-4 font-bold text-lg relative z-10 bg-white/20 px-4 py-1 rounded-full border border-white/30 backdrop-blur-md">
                            Kategori: {p.category_name}
                        </span>
                    </div>

                    {/* Judul */}
                    <div>
                        <h1 className={`text-3xl md:text-4xl font-bold text-gray-900 leading-tight ${isLoading ? 'h-10 bg-gray-200 rounded w-3/4' : ''}`}>
                            {!isLoading && p.title}
                        </h1>

                        <div className="flex items-center gap-2 mt-3 text-gray-600">
                            <ShieldCheck size={20} className="text-[#00A651]" /> 
                            <span className="font-medium">Diselenggarakan oleh</span>
                            <span className={`font-bold text-[#6A6AFB] bg-blue-50 px-2 py-1 rounded`}>
                                {p.organization_name}
                            </span>
                        </div>
                    </div>

                    {/* Deskripsi */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="font-bold text-xl text-gray-800 mb-4 border-l-4 border-[#00A651] pl-3">
                            Tentang Proyek
                        </h2>
                        <div className="text-gray-600 space-y-4 leading-relaxed">
                            {!isLoading && (
                                <div dangerouslySetInnerHTML={{ __html: p.description.replace(/\n/g, '<p>') }}></div>
                            )}
                        </div>
                    </div>

                    {/* Detail */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="font-bold text-xl text-gray-800 mb-6 border-l-4 border-[#6A6AFB] pl-3">
                            Informasi Detail
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-orange-100 p-3 rounded-xl text-orange-600">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Lokasi Penanaman</p>
                                    <p className="text-gray-800 font-bold">{p.location}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                                    <Calendar size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Estimasi Durasi</p>
                                    <p className="text-gray-800 font-bold">{p.duration_months} Bulan</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-purple-100 p-3 rounded-xl text-purple-600">
                                    <Target size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Target Dampak</p>
                                    <p className="text-gray-800 font-bold">
                                        {p.description.includes('100.000') ? '100.000 Pohon Tertanam' : 'Detail Target'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 sticky top-24">

                        <h3 className="font-bold text-lg text-gray-800 mb-1">Target Donasi</h3>

                        <div className="mt-4 mb-6">
                            <p className="text-[#00A651] text-3xl font-extrabold">
                                {formatRupiah(p.current_amount)}
                            </p>
                            <p className="text-gray-400 text-sm mt-1">
                                dari target <span className="font-medium text-gray-600">{formatRupiah(p.target_amount)}</span>
                            </p>

                            <div className="w-full bg-gray-100 h-3 rounded-full mt-3 overflow-hidden">
                                <div 
                                    className="bg-[#00A651] h-full rounded-full shadow-sm"
                                    style={{ width: `${p.progress_percentage}%` }}
                                ></div>
                            </div>
                            <p className="text-right text-xs text-[#00A651] font-bold mt-1">
                                {p.progress_percentage}% Tercapai
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="text-center p-3 bg-gray-50 rounded-xl">
                                <Users className="w-5 h-5 mx-auto text-indigo-500 mb-1" />
                                <p className="text-gray-800 font-bold">{p.donor_count}</p>
                                <p className="text-xs text-gray-500">Donatur</p>
                            </div>
                            <div className="text-center p-3 bg-gray-50 rounded-xl">
                                <Clock className="w-5 h-5 mx-auto text-orange-500 mb-1" />
                                <p className="text-gray-800 font-bold">{p.days_remaining}</p>
                                <p className="text-xs text-gray-500">Hari Lagi</p>
                            </div>
                        </div>

                        {/* === PERUBAHAN DI SINI === */}
                        <div className="space-y-3">
                            <a
                                href={`/proyek/${id}/donasi`} 
                                className="w-full block py-3.5 rounded-xl font-bold text-center text-white bg-[#00A651] hover:bg-[#009448] transition shadow-lg" 
                            >
                                Donasi Sekarang
                            </a>

                            <button className="w-full border border-gray-200 text-gray-600 py-3.5 rounded-xl font-semibold hover:bg-gray-50 transition flex justify-center items-center gap-2">
                                <Share2 size={18} /> Bagikan Proyek
                            </button>
                        </div>

                    </div>
                </div>

            </main>
        </div>
    );
}
