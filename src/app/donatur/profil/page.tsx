"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DonaturNavbar from "@/components/donatur/DonaturNavbar";

interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  address: string;
}

export default function ProfilPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("authToken");
      const userStr = localStorage.getItem("currentUser");

      if (!token || !userStr) {
        router.push("/login");
        return;
      }

      const userData = JSON.parse(userStr);
      try {
        const response = await fetch(`http://localhost:3001/api/donatur/${userData.id}/profil`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error(`Gagal memuat data profil: ${response.status} ${response.statusText}`);
        }

        const data: UserProfile = await response.json();
        setUser(data);
      } catch (err) {
        console.error(err);
        setError("Tidak bisa memuat data profil. Periksa token atau koneksi backend.");
      }
    };

    fetchUserProfile();
  }, [router]);

  if (error) {
    return <p className="text-red-600 text-center mt-10">{error}</p>;
  }

  if (!user) {
    return <p className="text-center mt-10">Memuat profil...</p>;
  }

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <main className="w-full min-h-screen bg-gray-50 pb-20">
      <DonaturNavbar />

      {/* HEADER */}
      <section className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold">Profil Donatur</h1>
          <p className="mt-2 text-white/80 text-sm md:text-base">
            Informasi akun kamu secara lengkap dan ringkas.
          </p>
        </div>
      </section>

      {/* PROFIL CARD */}
      <section className="max-w-3xl mx-auto px-6 -mt-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 flex flex-col md:flex-row items-center gap-8 border border-gray-100">
          {/* Avatar */}
          <div className="w-28 h-28 rounded-full bg-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
            {initials}
          </div>

          {/* Info User */}
          <div className="flex-1 w-full">
            <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>

            <div className="mt-4 space-y-3 text-gray-600">
              <div className="flex items-center gap-3">
                <span className="text-purple-600 text-lg">📧</span>
                <span className="font-medium">{user.email}</span>
              </div>
              {user.phone && (
                <div className="flex items-center gap-3">
                  <span className="text-purple-600 text-lg">📞</span>
                  <span className="font-medium">{user.phone}</span>
                </div>
              )}
              {user.address && (
                <div className="flex items-center gap-3">
                  <span className="text-purple-600 text-lg">📍</span>
                  <span className="font-medium">{user.address}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
