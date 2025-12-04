"use client";

import React, { useState, useEffect } from "react";
import DonaturNavbar from "@/components/donatur/DonaturNavbar";

interface Project {
  id: number;
  title: string;
  organization: string;
  icon: string;
}

interface Donation {
  kode: string;
  proyek: string;
  nominal: number;
  status: string;
}

export default function DonaturDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [totalDonasi, setTotalDonasi] = useState<number>(0);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [isLoadingDonasi, setIsLoadingDonasi] = useState(true);
  const [errorProjects, setErrorProjects] = useState<string | null>(null);
  const [errorDonasi, setErrorDonasi] = useState<string | null>(null);

  const API_PROJECTS_URL = "http://localhost:3001/api/projects";
  const API_DONASI_BASE_URL = "http://localhost:3001/api/donatur";

  // Ambil user ID dan token dari localStorage
  const token = localStorage.getItem("authToken");
  const currentUserStr = localStorage.getItem("currentUser");
  const userId = currentUserStr ? JSON.parse(currentUserStr).id : null;

  // --- Fetch proyek ---
  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoadingProjects(true);
      setErrorProjects(null);
      try {
        const res = await fetch(API_PROJECTS_URL);
        if (!res.ok) throw new Error(`Gagal load proyek: ${res.statusText}`);
        const data = await res.json();
        const processedProjects: Project[] = data.map((p: any) => ({
          id: p.id,
          title: p.title,
          organization: p.organization || p.org || "Organisasi Rahasia",
          icon: p.icon || "🌳",
        }));
        setProjects(processedProjects);
      } catch (err: any) {
        console.error(err);
        setErrorProjects(err.message);
      } finally {
        setIsLoadingProjects(false);
      }
    };
    fetchProjects();
  }, []);

  // --- Fetch donasi ---
  useEffect(() => {
    if (!token || !userId) {
      setErrorDonasi("Token atau User ID tidak ditemukan.");
      setIsLoadingDonasi(false);
      return;
    }

    const fetchDonasi = async () => {
      setIsLoadingDonasi(true);
      setErrorDonasi(null);
      try {
        const res = await fetch(`${API_DONASI_BASE_URL}/${userId}/donasi`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error(`Gagal load donasi: ${res.statusText}`);
        const data = await res.json();

        const mappedDonasi: Donation[] = data.map((d: any) => ({
          kode: d.donationCode || d.kode,
          proyek: d.projectName || d.proyek,
          nominal: Number(d.amount || d.nominal || 0),
          status: d.status || "Tertunda",
        }));

        setDonations(mappedDonasi);

        // Hitung total donasi
        const total = mappedDonasi.reduce((sum, d) => sum + d.nominal, 0);
        setTotalDonasi(total);

        // Debug: tampilkan array donasi di console
        console.log("Donasi user:", mappedDonasi);
        console.log("Total donasi:", total);
      } catch (err: any) {
        console.error(err);
        setErrorDonasi(err.message);
      } finally {
        setIsLoadingDonasi(false);
      }
    };

    fetchDonasi();
  }, [token, userId]);

  const statsData = [
    {
      title: "Total Donasi",
      value: `Rp ${totalDonasi.toLocaleString("id-ID")}`,
      icon: "💰",
      color: "from-green-400 to-green-600",
    },
    {
      title: "Jumlah Proyek",
      value: `${projects.length} Proyek`,
      icon: "📦",
      color: "from-purple-400 to-purple-600",
    },
  ];

  return (
    <main className="w-full min-h-screen pb-20 bg-gray-50">
      <DonaturNavbar />

      {/* HERO */}
      <section className="w-full bg-gradient-to-br from-[#6A6AFB] to-[#8A4FFF] px-6 py-16 text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold">Selamat Datang, Donatur!</h2>
          <p className="text-white/80 mt-2">
            Terima kasih telah berkontribusi untuk bumi yang lebih hijau.
          </p>
        </div>
      </section>

      {/* STATISTIK */}
      <section className="max-w-6xl mx-auto px-6 -mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {statsData.map((item, i) => (
            <div
              key={i}
              className="bg-white shadow-md rounded-xl p-6 flex items-center gap-4 hover:shadow-xl transition"
            >
              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-3xl text-white shadow`}
              >
                {item.icon}
              </div>

              <div>
                <p className="text-gray-500 text-sm">{item.title}</p>
                <p className="text-xl font-bold text-gray-800">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROYEK */}
      <section className="max-w-6xl mx-auto px-6 mt-14">
        <h3 className="text-2xl font-bold text-purple-700 mb-6">
          Proyek yang Kamu Dukung
        </h3>

        {isLoadingProjects && (
          <div className="text-center p-8 bg-white rounded-xl shadow">
            <p className="text-gray-600">Memuat data proyek...</p>
          </div>
        )}

        {errorProjects && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-sm mb-4">
            <p className="font-bold">Error Proyek!</p>
            <p>{errorProjects}</p>
          </div>
        )}

        {!isLoadingProjects && projects.length === 0 && (
          <div className="text-center p-8 bg-yellow-50 border-yellow-300 border rounded-xl">
            <p className="text-yellow-700 font-medium">
              Belum ada proyek yang kamu dukung saat ini.
            </p>
          </div>
        )}

        {!isLoadingProjects && projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden"
              >
                <div className="h-36 bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-6xl">
                  {p.icon}
                </div>

                <div className="p-5">
                  <h4 className="text-lg font-bold">{p.title}</h4>
                  <p className="text-sm text-gray-600">Oleh: {p.organization}</p>

                  <a
                    href={`/proyek/${p.id}`}
                    className="mt-4 block bg-green-500 text-white py-2 rounded-lg text-center hover:bg-green-600 transition font-medium"
                  >
                    Lihat Detail
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
