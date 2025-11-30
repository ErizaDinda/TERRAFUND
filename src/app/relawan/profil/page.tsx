"use client";


import RelawanNavbar from "@/components/Relawan/RelawanNavbar";
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
            <RelawanNavbar />

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

        
      </div>
    </div>
  );
}
