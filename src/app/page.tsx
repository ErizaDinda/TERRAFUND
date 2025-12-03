"use client";

import React, { useState, useEffect, useCallback } from "react";

// --- INTERFACE SESUAI RESPONS BACKEND ---
interface Project {
    id: number | string; 
    title: string;
    organization_name: string;
    current_amount: number;
    target_amount: number;
    icon?: string; 
    progress_percentage?: number;
}
// ---------------------------------

// Helper untuk format Rupiah
const formatRupiah = (val: number) => 
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(val);

export default function HomePage() {
    const PROJECT_LIST_ENDPOINT = "http://localhost:3001/api/projects";
    
    // State untuk data proyek (hanya 3 yang akan ditampilkan di Home)
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(PROJECT_LIST_ENDPOINT);
            if (!response.ok) {
                console.error("Gagal memuat data proyek dari API.");
                // Fallback ke array kosong jika fetch gagal
                setProjects([]);
                return;
            }
            const result = await response.json();
            
            if (Array.isArray(result)) {
                // Proses data dan hitung persentase
                const processedProjects = result.slice(0, 3).map((p: any) => ({ // Ambil hanya 3 proyek teratas
                    id: p.id,
                    title: p.title,
                    organization_name: p.organization_name,
                    current_amount: p.current_amount || 0,
                    target_amount: p.target_amount || 0,
                    progress_percentage: p.target_amount > 0 
                        ? Math.round((p.current_amount / p.target_amount) * 100) 
                        : 0,
                    // Tambahkan icon placeholder berdasarkan kategori
                    icon: p.category_name === 'Lingkungan' ? '🌱' : (p.category_name === 'Pendidikan' ? '📚' : '💡')
                }));
                setProjects(processedProjects);
            }
            
        } catch (err) {
            console.error("Fetch Error:", err);
            setProjects([]); // Pastikan state bersih jika ada error jaringan
        } finally {
            setLoading(false);
        }
    }, [PROJECT_LIST_ENDPOINT]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Data placeholder untuk saat loading
    const placeholderProjects = Array(3).fill({
        id: 'placeholder', title: 'Memuat Proyek...', organization_name: '...', icon: '...', 
        progress_percentage: 0, current_amount: 0, target_amount: 100000000
    });
    
    const displayProjects = loading ? placeholderProjects : projects;


  return (
    <main className="w-full">

      {/* NAVBAR */}
      <nav className="w-full flex items-center justify-between py-4 px-6 bg-white shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌍</span>
          <h1 className="text-xl font-semibold text-green-600">TerraFund</h1>
        </div>

        <div className="flex items-center gap-6 text-gray-700 font-medium">
          <a href="/" className="hover:text-green-600">Home</a>
          <a href="/proyek" className="hover:text-green-600">Proyek</a>
          <a href="/login" className="hover:text-green-600">Login</a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="w-full bg-gradient-to-br from-[#6A6AFB] to-[#8A4FFF] px-6 py-20 text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* Text */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Transparansi Donasi Berbasis Blockchain
            </h2>
            <p className="mt-4 text-lg text-gray-200">
              Bangun aksi sosial dan lingkungan yang lebih akuntabel dan berdampak.
            </p>

            <div className="flex gap-4 mt-6">
              {/* PERUBAHAN: Tombol Donasi Sekarang diarahkan ke /register */}
              <a
                href="/register" 
                className="bg-green-500 px-5 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
              >
                Donasi Sekarang
              </a>
              <a
                href="/register"
                className="border border-white px-5 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition"
              >
                Jadi Relawan
              </a>
            </div>
          </div>

          {/* Image Placeholder */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl h-72 flex items-center justify-center shadow-lg">
            <span className="text-6xl">🌳</span>
          </div>

        </div>
      </section>

      {/* FITUR UTAMA */}
      <section className="py-20 px-6 bg-gray-50">
        <h3 className="text-3xl font-bold text-center mb-12">Fitur Utama</h3>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="bg-white rounded-xl p-6 shadow-xl text-center border-t-4 border-[#6A6AFB]">
            <span className="text-4xl">🔗</span>
            <h4 className="font-bold text-green-600 mt-4">Transparansi Blockchain</h4>
            <p className="text-gray-600 mt-2">
              Setiap donasi tercatat secara on-chain dan dapat diverifikasi publik.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-xl text-center border-t-4 border-[#8A4FFF]">
            <span className="text-4xl">💰</span>
            <h4 className="font-bold text-green-600 mt-4">Reward Token (TTK)</h4>
            <p className="text-gray-600 mt-2">
              Relawan mendapatkan TerraToken dari aksi sosial.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-xl text-center border-t-4 border-[#00A651]">
            <span className="text-4xl">🛍️</span>
            <h4 className="font-bold text-green-600 mt-4">Eco Marketplace</h4>
            <p className="text-gray-600 mt-2">
              Tukar token dengan merchandise ramah lingkungan.
            </p>
          </div>

        </div>
      </section>

      {/* PROYEK BERJALAN - INTEGRASI BACKEND */}
      <section className="py-20 px-6">
        <h3 className="text-3xl font-bold text-center mb-12">
          Proyek Sosial Sedang Berjalan
        </h3>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Card Proyek yang di-loop dari data API */}
          {displayProjects.map((p, i) => (
            <div 
                key={p.id === 'placeholder' ? i : p.id} 
                className={`bg-white rounded-xl shadow-xl overflow-hidden transform transition-all border border-gray-100 ${loading ? 'opacity-60 animate-pulse pointer-events-none' : 'hover:scale-[1.02]'}`}
            >
              <div className="h-40 bg-gradient-to-br from-purple-600 to-indigo-500 flex items-center justify-center text-6xl text-white">
                {p.icon || '🛠️'}
              </div>

              <div className="p-5">
                <h4 className={`text-lg font-bold text-gray-800 ${loading ? 'h-5 bg-gray-200 w-3/4 mb-2 rounded' : ''}`}>
                    {!loading && p.title}
                </h4>
                <p className={`text-sm text-gray-500 ${loading ? 'h-4 bg-gray-100 w-1/2 rounded' : ''}`}>
                    {!loading && p.organization_name}
                </p>

                <div className="mt-4">
                  
                  {/* Progress Bar */}
                   <div className="w-full h-2 bg-gray-200 rounded-full mb-2">
                        <div 
                            className="h-full bg-green-500 rounded-full" 
                            style={{ width: `${p.progress_percentage || 0}%` }}
                        ></div>
                    </div>

                  <p className="text-green-600 font-semibold">
                    {!loading && formatRupiah(p.current_amount)}
                  </p>
                  <p className="text-gray-500 text-sm">
                    / {!loading && formatRupiah(p.target_amount)}
                  </p>
                </div>

                {/* Tombol Lihat Detail mengarah ke halaman detail proyek */}
                <a
                  href={loading ? '#' : `/proyek/${p.id}`}
                  className="mt-4 block w-full bg-green-500 text-white py-2 rounded-lg text-center font-medium hover:bg-green-600 transition"
                >
                  Lihat Detail
                </a>
              </div>
            </div>
          ))}
          
          {/* Tombol Lihat Semua Proyek */}
          {!loading && (
             <div className="md:col-span-3 text-center pt-4">
                <a href="/proyek" className="text-purple-600 font-bold hover:text-purple-700 transition flex items-center justify-center gap-2">
                    Lihat Semua Proyek →
                </a>
             </div>
          )}
        </div>
      </section>

      {/* AJAKAN AKSI */}
      <section className="bg-green-600 text-white py-20 px-6 text-center">
        <h3 className="text-3xl font-bold">
          Ikut membangun masa depan yang lebih hijau bersama TerraFund
        </h3>
        <p className="mt-4 text-white/90">
          Mari bergabung dalam gerakan transparansi dan akuntabilitas donasi
        </p>

        <a
          href="/register"
          className="mt-8 inline-block bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg"
        >
          Mulai Sekarang
        </a>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

          <div>
            <h4 className="text-xl font-semibold text-white">TerraFund</h4>
            <p className="mt-2 text-sm">
              Platform donasi transparan berbasis blockchain untuk masa depan yang lebih baik.
            </p>
            <div className="flex gap-4 mt-3 text-xl">
              <a href="#" className="hover:text-white transition">🐦</a>
              <a href="#" className="hover:text-white transition">📘</a>
              <a href="#" className="hover:text-white transition">📸</a>
              <a href="#" className="hover:text-white transition">💼</a>
            </div>
          </div>

          <div>
            <h5 className="text-white font-semibold mb-3">Menu</h5>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-white transition">Home</a></li>
              <li><a href="/proyek" className="hover:text-white transition">Proyek</a></li>
              <li><a href="/tentang" className="hover:text-white transition">Tentang</a></li>
              <li><a href="/kontak" className="hover:text-white transition">Kontak</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-semibold mb-3">Bantuan</h5>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition">Cara Donasi</a></li>
              <li><a href="#" className="hover:text-white transition">Kebijakan Privasi</a></li>
              <li><a href="#" className="hover:text-white transition">Syarat & Ketentuan</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-semibold mb-3">Kontak</h5>
            <ul className="space-y-2 text-sm">
              <li>📧 support@terrafund.id</li>
              <li>📞 +62 812-3456-7890</li>
              <li>📍 Jakarta, Indonesia</li>
            </ul>
          </div>

        </div>

        <div className="text-center mt-10 text-gray-500 text-sm">
          © 2024 TerraFund. All rights reserved.
        </div>
      </footer>

    </main>
  );
}