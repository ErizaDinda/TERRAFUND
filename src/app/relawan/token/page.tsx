'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RelawanNavbar from "@/components/relawan/RelawanNavbar";
import { DollarSign, Clock, TrendingUp, TrendingDown, Loader2 } from "lucide-react";
import Link from "next/link";

// Interface disesuaikan dengan response GET /api/relawan/:userId/wallet
interface Transaction {
    id: number;
    description: string;
    amount: number;
    created_at: string;
}

interface WalletData {
    total_ttk: string;
    transactions: Transaction[];
}

// Helper: Format Rupiah (untuk TTK)
const formatTTK = (num: string | number) => 
    new Intl.NumberFormat('id-ID', { maximumFractionDigits: 0 }).format(Number(num));

// Helper: Format Tanggal
const formatDateTime = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
    });
};


export default function RelawanWalletPage() {
    const router = useRouter();
    const [walletData, setWalletData] = useState<WalletData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [userName, setUserName] = useState("Relawan");

    // 1. FETCH DATA WALLET
    useEffect(() => {
        const fetchWallet = async () => {
            try {
                const storedUser = localStorage.getItem("currentUser");
                const token = localStorage.getItem("authToken");

                if (!storedUser || !token) {
                    router.push("/login");
                    return;
                }

                const userObj = JSON.parse(storedUser);
                const userId = userObj.id;
                setUserName(userObj.name || "Relawan");

                // Endpoint: GET /api/relawan/:userId/wallet
                const ENDPOINT = `http://localhost:3001/api/relawan/${userId}/wallet`;

                const response = await fetch(ENDPOINT, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Gagal mengambil data wallet.");
                }

                const data: WalletData = await response.json(); // Data Wallet
                setWalletData(data);

            } catch (err: any) {
                console.error("Error fetching wallet:", err);
                setError(err.message || "Terjadi kesalahan saat memuat data wallet.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchWallet();
    }, [router]);

    // UI Loading dan Error
    if (isLoading) {
        return (
            <main className="w-full min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="animate-spin text-green-600 w-10 h-10" />
                <p className="ml-3 text-gray-600">Memuat data TTK wallet...</p>
            </main>
        );
    }

    if (error || !walletData) {
        return (
             <main className="w-full min-h-screen bg-gray-50">
                <RelawanNavbar />
                <div className="max-w-4xl mx-auto p-6 mt-10 text-center bg-white border border-red-200 rounded-xl">
                    <h3 className="text-xl font-bold text-red-600">Error!</h3>
                    <p className="text-gray-600 mt-2">{error || "Data wallet tidak ditemukan."}</p>
                </div>
            </main>
        );
    }
    
    const { total_ttk, transactions } = walletData;

    return (
        <main className="w-full pb-24 bg-gray-50 min-h-screen">
            <RelawanNavbar />

            {/* --- HEADER --- */}
            <section className="w-full bg-gradient-to-r from-green-600 to-teal-700 px-6 py-16 text-white shadow-lg">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold">Wallet TTK Anda</h2>
                    <p className="text-sm text-green-100 mt-1">Daftar Token Tanda Kontribusi (TTK) dan riwayat transaksi.</p>
                </div>
            </section>
            
            {/* --- MAIN CONTENT --- */}
            <section className="max-w-4xl mx-auto px-6 -mt-12">

                {/* Saldo Utama Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center mb-8">
                    <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-3" />
                    <p className="text-lg text-gray-500 font-medium">Saldo TTK Saat Ini</p>
                    <h1 className="text-6xl font-extrabold text-gray-800 mt-1">
                        {formatTTK(total_ttk)}
                    </h1>
                </div>

                {/* Riwayat Transaksi */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <h3 className="text-xl font-bold text-gray-800 p-6 border-b border-gray-100 flex items-center gap-2">
                        <Clock size={20} className="text-indigo-500" /> Riwayat Transaksi Terbaru
                    </h3>
                    
                    {transactions.length === 0 ? (
                        <p className="text-center text-gray-500 py-10 text-sm">Belum ada riwayat transaksi TTK.</p>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {transactions.map((tx) => {
                                // Determine transaction type (based on amount sign)
                                const isIncome = tx.amount > 0;
                                const amountDisplay = formatTTK(Math.abs(tx.amount));
                                
                                return (
                                    <div key={tx.id} className="flex justify-between items-center p-4 hover:bg-gray-50 transition">
                                        <div className="flex items-center gap-4">
                                            <div className={`p-2 rounded-full ${isIncome ? 'bg-green-100' : 'bg-red-100'} shrink-0`}>
                                                {isIncome ? <TrendingUp size={20} className="text-green-600" /> : <TrendingDown size={20} className="text-red-600" />}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-800 text-sm line-clamp-1">{tx.description || `Transaksi #${tx.id}`}</p>
                                                <p className="text-xs text-gray-400 mt-0.5">{formatDateTime(tx.created_at)}</p>
                                            </div>
                                        </div>
                                        <span className={`text-lg font-bold ${isIncome ? 'text-green-600' : 'text-red-600'}`}>
                                            {isIncome ? '+' : '-'} {amountDisplay} TTK
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Footer Link */}
                <div className="text-center mt-8">
                    <Link href="/relawan/transaksi" className="text-indigo-600 text-sm font-semibold hover:underline">
                        Lihat Semua Riwayat Transaksi
                    </Link>
                </div>
            </section>
        </main>
    );
}