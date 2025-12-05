'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RelawanNavbar from "@/components/relawan/RelawanNavbar";
import { Hourglass, CheckCircle, XCircle, Clock, Loader2, ListChecks } from "lucide-react";
import Link from "next/link";

// Interface disesuaikan dengan exports.getVerificationStatus di relawancontroller.js
interface VerificationStatus {
    title: string;
    start_date: string;
    verification_status: 'pending' | 'approved' | 'rejected';
    completed_at: string | null;
    joined_at: string;
}

export default function RelawanVerificationPage() {
    const router = useRouter();
    const [verificationList, setVerificationList] = useState<VerificationStatus[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Helper: Format Tanggal
    const formatDate = (dateString: string | null) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric', month: 'long', year: 'numeric'
        });
    };
    
    // Helper: Menentukan tampilan badge status
    const getStatusBadge = (status: string) => {
        if (status === 'approved') {
            return <span className="text-sm font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700 flex items-center gap-2"><CheckCircle size={14} /> Disetujui</span>;
        } else if (status === 'rejected') {
            return <span className="text-sm font-semibold px-3 py-1 rounded-full bg-red-100 text-red-700 flex items-center gap-2"><XCircle size={14} /> Ditolak</span>;
        } else {
            return <span className="text-sm font-semibold px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 flex items-center gap-2"><Hourglass size={14} /> Menunggu</span>;
        }
    };

    // 1. FETCH STATUS VERIFIKASI
    useEffect(() => {
        const fetchVerification = async () => {
            try {
                const storedUser = localStorage.getItem("currentUser");
                const token = localStorage.getItem("authToken");

                if (!storedUser || !token) {
                    router.push("/login");
                    return;
                }

                const userObj = JSON.parse(storedUser);
                const userId = userObj.id;

                // Endpoint: GET /api/relawan/:userId/verifikasi
                const ENDPOINT = `http://localhost:3001/api/relawan/${userId}/verifikasi`;

                const response = await fetch(ENDPOINT, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Gagal mengambil status verifikasi.");
                }

                const data: VerificationStatus[] = await response.json(); // Data Verifikasi
                setVerificationList(data);

            } catch (err: any) {
                console.error("Error fetching verification:", err);
                setError(err.message || "Terjadi kesalahan saat memuat data.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchVerification();
    }, [router]);

    // UI Loading dan Error
    if (isLoading) {
        return (
            <main className="w-full min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="animate-spin text-indigo-600 w-10 h-10" />
                <p className="ml-3 text-gray-600">Memuat status verifikasi...</p>
            </main>
        );
    }

    if (error) {
        return (
             <main className="w-full min-h-screen bg-gray-50">
                <RelawanNavbar />
                <div className="max-w-4xl mx-auto p-6 mt-10 text-center bg-white border border-red-200 rounded-xl">
                    <h3 className="text-xl font-bold text-red-600">Error!</h3>
                    <p className="text-gray-600 mt-2">{error}</p>
                </div>
            </main>
        );
    }
    
    return (
        <main className="w-full pb-24 bg-gray-50 min-h-screen">
            <RelawanNavbar />

            {/* --- HEADER --- */}
            <section className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-16 text-white shadow-lg">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold">Status Verifikasi Misi</h2>
                    <p className="text-indigo-100 mt-1">Pantau status laporan kontribusi yang telah Anda ajukan.</p>
                </div>
            </section>
            
            {/* --- VERIFICATION LIST TABLE --- */}
            <section className="max-w-6xl mx-auto px-6 mt-8">
                <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
                    
                    {verificationList.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            <ListChecks size={40} className="mx-auto mb-3 text-gray-400"/>
                            <p className="font-semibold">Anda belum memiliki riwayat verifikasi misi.</p>
                            <Link href="/relawan/misi" className="text-indigo-600 text-sm mt-2 block">
                                Mulai cari misi untuk berkontribusi.
                            </Link>
                        </div>
                    ) : (
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Misi Proyek</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tgl Bergabung</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tgl Selesai (Klaim)</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status Verifikasi</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {verificationList.map((v, index) => (
                                    <tr key={v.title + index} className="hover:bg-gray-50 transition">
                                        
                                        {/* Misi Proyek */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900 line-clamp-1">{v.title}</div>
                                            <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                                <Clock size={12} /> Proyek dimulai: {formatDate(v.start_date)}
                                            </div>
                                        </td>
                                        
                                        {/* Tgl Bergabung */}
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {formatDate(v.joined_at)}
                                        </td>
                                        
                                        {/* Tgl Selesai (Klaim) */}
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {formatDate(v.completed_at)}
                                        </td>

                                        {/* Status */}
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            {getStatusBadge(v.verification_status)}
                                        </td>

                                        {/* Aksi */}
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button className="text-indigo-600 hover:text-indigo-900 px-3 py-1 border border-indigo-100 rounded-lg text-xs">
                                                Detail
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                </div>
            </section>
        </main>
    );
}