"use client";

import React, { useState, useEffect } from "react";
import DonaturNavbar from "@/components/donatur/DonaturNavbar"; // Navbar resmi

interface Donation {
  kode: string;
  proyek: string;
  tanggal: string; // Bisa juga Date atau Timestamp
  nominal: number;
  organisasi: string;
  keterangan: string;
  status: "Selesai" | "Tertunda" | "Gagal";
}

export default function DonasiSayaPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const API_BASE_URL = "http://localhost:3001/api/donatur";

  // Helper format Rupiah
  const formatRupiah = (amount: number) =>
    `Rp ${amount.toLocaleString("id-ID")}`;

  // Helper untuk warna status
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Selesai":
        return "bg-green-100 text-green-700";
      case "Tertunda":
        return "bg-yellow-100 text-yellow-700";
      case "Gagal":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Ambil token dan userId dari localStorage
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedUserId = localStorage.getItem("userId") || "15";

    if (token) {
      setAuthToken(token);
      setUserId(storedUserId);
    } else {
      setError("Token otentikasi tidak ditemukan. Silakan login.");
      setIsLoading(false);
    }
  }, []);

  // Fetch data donasi setelah token & userId siap
  useEffect(() => {
    if (!authToken || !userId) return;

    const fetchDonations = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_BASE_URL}/${userId}/donasi`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(
            `Gagal memuat data donasi: ${response.status} ${response.statusText}`
          );
        }

        const rawData = await response.json();
        const mappedDonations: Donation[] = rawData.map((d: any) => ({
          kode: d.donationCode || d.kode,
          proyek: d.projectName || d.proyek,
          tanggal: d.date || d.tanggal,
          nominal: Number(d.amount) || d.nominal,
          organisasi: d.organizationName || d.organisasi,
          keterangan: d.description || d.keterangan || "-",
          status: d.status || "Tertunda",
        }));

        setDonations(mappedDonations);
      } catch (err: any) {
        console.error(err);
        setError(
          err.message || "Tidak bisa memuat data donasi. Periksa backend."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchDonations();
  }, [authToken, userId]);

  return (
    <main className="w-full min-h-screen pb-20 bg-gray-50">
      <DonaturNavbar />

      {/* HEADER */}
      <section className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-semibold">Donasi Saya</h1>
          <p className="text-white/80 mt-2">
            Riwayat kontribusi kamu untuk berbagai program lingkungan.
          </p>
          <p className="text-xs text-white/60 mt-2">
            ID Pengguna: {userId || "Token tidak ada"}
          </p>
        </div>
      </section>

      {/* LIST DONASI */}
      <section className="max-w-6xl mx-auto px-6 -mt-12">
        {isLoading && (
          <div className="p-6 bg-white rounded-2xl shadow-md border border-gray-100">
            <p className="text-gray-600 text-center">Memuat data donasi...</p>
          </div>
        )}

        {error && !isLoading && (
          <div className="p-6 bg-red-50 border border-red-300 rounded-2xl shadow-md text-red-700">
            <p className="font-bold">Error Memuat Donasi</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        )}

        {!isLoading && !error && donations.length === 0 && (
          <div className="p-10 bg-white rounded-2xl shadow-md border border-gray-100 text-center text-gray-600">
            <span className="text-4xl block mb-3">🌱</span>
            <p className="font-semibold">Belum ada riwayat donasi.</p>
            <p className="text-sm mt-1">
              Ayo mulai kontribusi pertamamu sekarang!
            </p>
          </div>
        )}

        {!isLoading &&
          !error &&
          donations.length > 0 &&
          donations.map((d, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition duration-200"
            >
              <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                <span className="text-xs font-semibold bg-purple-100 text-purple-700 px-3 py-1 rounded-lg">
                  {d.kode}
                </span>
                <span className="text-gray-500 text-sm">Diajukan: {d.tanggal}</span>
              </div>

              <h3 className="text-lg font-bold text-gray-800">{d.proyek}</h3>

              <p className="text-sm text-gray-600 mt-1">
                <span className="font-semibold">{d.organisasi}</span> • {d.keterangan}
              </p>

              <div className="flex items-center gap-4 mt-4 flex-wrap">
                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-xl text-sm font-semibold">
                  {formatRupiah(d.nominal)}
                </span>

                <span
                  className={`px-4 py-2 rounded-xl text-xs font-semibold ${getStatusStyle(
                    d.status
                  )}`}
                >
                  {d.status}
                </span>

                <button className="text-sm text-gray-600 hover:text-purple-700 transition ml-auto md:ml-0">
                  Cek Detail
                </button>
              </div>
            </div>
          ))}
      </section>
    </main>
  );
}
