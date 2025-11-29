"use client";

import Image from "next/image";
import { useState } from "react";
import { Camera, CheckCircle, ShieldCheck, ChevronRight } from "lucide-react";

export default function ProfilPage() {
  const [photo, setPhoto] = useState("/default-profile.png");

  function handlePhoto(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPhoto(url);
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-800">Profil Relawan</h1>
      <p className="text-gray-500 mb-8">Kelola informasi pribadi dan status akun Anda.</p>

      {/* Profile Card */}
      <div className="bg-white p-6 rounded-2xl shadow mb-8">
        <div className="flex items-center gap-6">
          <div className="relative w-28 h-28">
            <Image
              src={photo}
              alt="profile"
              width={112}
              height={112}
              className="rounded-full object-cover w-28 h-28 border-4 border-blue-600 shadow"
            />

            <label className="absolute bottom-1 right-1 bg-blue-600 p-2 rounded-full cursor-pointer shadow">
              <Camera className="w-4 h-4 text-white" />
              <input type="file" className="hidden" onChange={handlePhoto} />
            </label>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-slate-800">Fiony Safa Ananda</h2>
            <p className="text-gray-500">Relawan Ekosistem Hijau</p>

            {/* Status Verifikasi */}
            <div className="flex items-center gap-2 mt-2 text-green-600 font-medium">
              <ShieldCheck className="w-5 h-5" />
              Akun Terverifikasi
            </div>
          </div>
        </div>

        {/* XP Level Progress */}
        <div className="mt-6">
          <p className="text-sm text-gray-500 mb-1">Level 7 – 3,200 XP</p>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full" style={{ width: "72%" }}></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">Menuju Level 8 (2.1k XP lagi)</p>
        </div>
      </div>

      {/* Stats Card */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-5 rounded-xl shadow text-center">
          <h3 className="text-xl font-bold text-slate-800">12</h3>
          <p className="text-gray-500 text-sm">Misi Selesai</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow text-center">
          <h3 className="text-xl font-bold text-slate-800">480</h3>
          <p className="text-gray-500 text-sm">Total TTK</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow text-center">
          <h3 className="text-xl font-bold text-slate-800">36 Jam</h3>
          <p className="text-gray-500 text-sm">Waktu Relawan</p>
        </div>
      </div>

      {/* Personal Info */}
      <div className="bg-white p-6 rounded-2xl shadow mb-8">
        <h3 className="text-lg font-semibold mb-4 text-slate-800">Informasi Pribadi</h3>

        <div className="space-y-3">
          <div>
            <p className="text-gray-500 text-sm">Email</p>
            <p className="font-medium">fionysafa@gmail.com</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Nomor Telepon</p>
            <p className="font-medium">+62 812 3456 7890</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Tanggal Lahir</p>
            <p className="font-medium">16 Februari 2003</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Alamat</p>
            <p className="font-medium">Gresik, Jawa Timur</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <button className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-xl">
          Edit Profil
        </button>

        <button className="w-full bg-gray-200 hover:bg-gray-300 transition text-slate-700 font-semibold py-3 rounded-xl">
          Ganti Kata Sandi
        </button>
      </div>

      {/* Logout */}
      <button className="w-full mt-6 text-red-500 font-semibold py-3 rounded-xl bg-white shadow hover:bg-red-50">
        Keluar Akun
      </button>
    </div>
  );
}