"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";

// IMPORT KOMPONEN ASLI (tidak mengubah desain)
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

// --- Interface dari BE ---
interface Project {
    id: number;
    title: string;
    slug: string;
    current_amount: number;
    target_amount: number;
    thumbnail: string;
    organization_name: string;
    category_name: string;
    progress_percentage?: number;
    icon?: string;
}

export default function ProjectList() {
    const PROJECT_LIST_ENDPOINT = "http://localhost:3001/api/projects";

    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [category, setCategory] = useState("all");

    const formatRupiah = (val: number) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
        }).format(val);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(PROJECT_LIST_ENDPOINT);
            if (!response.ok) throw new Error("Gagal fetch proyek");

            const result = await response.json();

            if (Array.isArray(result)) {
                const processedProjects = result.map((p) => ({
                    ...p,
                    progress_percentage:
                        p.target_amount > 0
                            ? Math.round((p.current_amount / p.target_amount) * 100)
                            : 0,
                    icon:
                        p.category_name === "Lingkungan"
                            ? "🌱"
                            : p.category_name === "Pendidikan"
                            ? "📚"
                            : "💡",
                }));

                setProjects(processedProjects);
            } else {
                throw new Error("Format data salah");
            }
        } catch (err) {
            setError("Gagal memuat proyek dari server");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const placeholderProjects = Array(3).fill({
        id: "placeholder",
        title: "Memuat Proyek...",
        organization_name: "...",
        icon: "⏳",
        progress_percentage: 0,
        current_amount: 0,
        target_amount: 0,
    });

    const displayProjects = loading ? placeholderProjects : projects;

    return (
        <div className="w-full min-h-screen">
            <Navbar />

            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-16 px-6">
                <h1 className="text-4xl font-bold mb-2">Proyek Sosial & Lingkungan</h1>
                <p className="opacity-90 text-lg">Temukan proyek yang ingin Anda dukung</p>
            </div>

            {error && (
                <div className="max-w-6xl mx-auto px-6 py-4 mt-6 text-red-700 bg-red-100 border border-red-300 rounded-lg">
                    {error}
                </div>
            )}

            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-12 px-6">
                {loading && (
                    <p className="col-span-full text-center text-gray-500">
                        Memuat data proyek...
                    </p>
                )}

                {displayProjects.map((p, idx) => (
                    <Card
                        key={p.id === "placeholder" ? idx : p.id}
                        className={`shadow-xl rounded-2xl overflow-hidden transform transition-all ${
                            loading ? "opacity-50 animate-pulse" : "hover:scale-[1.02]"
                        }`}
                    >
                        <div className="h-48 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-6xl text-white">
                            {p.icon}
                        </div>

                        <CardContent className="p-6">
                            <h3 className="text-xl font-bold mb-1 text-gray-800">{p.title}</h3>
                            <p className="text-gray-500 text-sm mb-4">🏢 {p.organization_name}</p>

                            <div className="w-full h-2 bg-gray-200 rounded-full mb-2">
                                <div
                                    className="h-full bg-green-500 rounded-full"
                                    style={{ width: `${p.progress_percentage}%` }}
                                ></div>
                            </div>

                            <div className="flex justify-between text-sm mb-4">
                                <span className="text-green-600 font-bold">
                                    {formatRupiah(p.current_amount)}
                                </span>
                                <span className="text-gray-600">
                                    / {formatRupiah(p.target_amount)}
                                </span>
                            </div>

                            <Link href={loading ? "#" : `/proyek/${p.id}`}>
                                <Button className="w-full">Lihat Detail</Button>
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
