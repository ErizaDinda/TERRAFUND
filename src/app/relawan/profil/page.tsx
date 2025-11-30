"use client";

import {
  Globe,
  LogOut,
  Mail,
  Phone,
  MapPin,
  Trophy,
  CheckCircle,
  Star,
  User,
} from "lucide-react";

export default function ProfilRelawan() {
  const user = {
    name: "Fiony Safa",
    email: "fiony@example.com",
    phone: "0812-3456-7890",
    address: "Surabaya, Jawa Timur",
    level: "Gold",
    missionsCompleted: 15,
    tokens: 1250,
    photo:
      "https://ui-avatars.com/api/?name=Fiony+Safa&background=6D28D9&color=fff&size=200&rounded=true",
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* NAVBAR */}
      <nav className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center">

          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer">
            <Globe className="w-8 h-8 text-green-500" />
            <span className="text-2xl font-bold text-green-600 tracking-tight">
              TerraFund
            </span>
          </div>

          {/* Menu */}
          <div className="hidden md:flex items-center space-x-8 ml-auto">
            <a
              href="/relawan/dashboard"
              className="text-gray-600 font-medium hover:text-green-600"
            >
              Dashboard
            </a>
            <a
              href="/relawan/misi-saya"
              className="text-gray-600 font-medium hover:text-green-600"
            >
              Misi Saya
            </a>
            <a
              href="/relawan/riwayat"
              className="text-gray-600 font-medium hover:text-green-600"
            >
              Riwayat
            </a>
            <a
              href="/relawan/profil"
              className="text-purple-600 font-bold"
            >
              Profil
            </a>
          </div>

          {/* Logout */}
          <button className="hidden md:flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full font-semibold text-sm hover:bg-red-200 transition ml-6">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </nav>

      {/* HEADER UNGU */}
      <div className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 pb-32 pt-12 px-6">
        <div className="max-w-7xl mx-auto">
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
                {user.phone}
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                {user.address}
              </p>
            </div>

            <button className="mt-6 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow transition">
              Edit Profil
            </button>
          </div>
        </div>

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

          <div className="bg-white rounded-xl p-6 shadow-md flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-gray-500 text-xs uppercase font-semibold">Level Relawan</p>
              <p className="text-xl font-bold text-gray-800">{user.level}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-gray-500 text-xs uppercase font-semibold">Misi Selesai</p>
              <p className="text-xl font-bold text-gray-800">{user.missionsCompleted} Misi</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
              <User className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-gray-500 text-xs uppercase font-semibold">Token Reward</p>
              <p className="text-xl font-bold text-gray-800">{user.tokens} TTK</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
