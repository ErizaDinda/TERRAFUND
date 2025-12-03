'use client';

import { useState } from 'react';
import NgoNavbar from "@/components/Ngo/NgoNavbar"; // Pastikan path ini sesuai
import { 
  Users, 
  Clock, 
  UserPlus, 
  Search, 
  Filter, 
  CheckCircle, 
  XCircle, 
  FileImage,
  ExternalLink
} from "lucide-react";

export default function NgoRelawanPage() {
  // State untuk Tab (Solusi agar UI tidak berantakan)
  const [activeTab, setActiveTab] = useState<'directory' | 'validation'>('validation');

  // --- DATA DUMMY ---

  // 1. Data Relawan (Tampilan Lama)
  const volunteers = [
    { id: 1, name: "Ayu Pramesti", role: "Koordinator Lapangan", project: "Reboisasi Hutan", status: "Aktif", initial: "AP", color: "bg-emerald-500" },
    { id: 2, name: "Bima Saputra", role: "Teknisi Air Bersih", project: "Air Bersih Desa", status: "Aktif", initial: "BS", color: "bg-blue-500" },
    { id: 3, name: "Clara Lestari", role: "Fasilitator Edukasi", project: "Perpustakaan Digital", status: "Cuti", initial: "CL", color: "bg-purple-500" },
  ];

  // 2. Data Validasi (FITUR BARU: Flow Cek Bukti)
  const pendingValidations = [
    { 
      id: 1, 
      volunteer: "Dani Hermawan", 
      project: "Reboisasi Hutan Kalimantan", 
      mission: "Menanam 50 Bibit Pohon", 
      date: "10 Menit yang lalu",
      proofUrl: "/placeholder-proof.jpg" 
    },
    { 
      id: 2, 
      volunteer: "Eka Yuliani", 
      project: "Air Bersih untuk Desa", 
      mission: "Instalasi Pipa RW 05", 
      date: "1 Jam yang lalu",
      proofUrl: "/placeholder-proof.jpg" 
    },
  ];

  return (
    <main className="w-full pb-24 bg-gray-50 min-h-screen">
      <NgoNavbar />

      {/* --- HEADER (Tampilan Tetap Sama) --- */}
      <section className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-12 text-white shadow-lg">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold">Manajemen Relawan</h2>
            <p className="text-white/90 mt-2">Pantau profil, kinerja, dan validasi misi pahlawan lingkungan Anda.</p>
          </div>
          <button className="mt-4 md:mt-0 bg-white/20 backdrop-blur-sm border border-white/30 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-white hover:text-indigo-600 transition">
            Unduh Laporan CSV
          </button>
        </div>
      </section>

      {/* --- STATS (Tampilan Tetap Sama) --- */}
      <section className="max-w-6xl mx-auto px-6 -mt-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-full text-blue-600"><Users size={24} /></div>
            <div><p className="text-gray-500 text-sm">Total Relawan</p><h3 className="text-2xl font-bold">340 Orang</h3></div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-full text-purple-600"><Clock size={24} /></div>
            <div><p className="text-gray-500 text-sm">Total Jam Kontribusi</p><h3 className="text-2xl font-bold">12.450 Jam</h3></div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-full text-green-600"><UserPlus size={24} /></div>
            <div><p className="text-gray-500 text-sm">Relawan Baru</p><h3 className="text-2xl font-bold">+18 Orang</h3></div>
          </div>
        </div>
      </section>

      {/* --- NAVIGATION TABS (Simple Switcher) --- */}
      <section className="max-w-6xl mx-auto px-6 mb-6">
        <div className="flex gap-4 border-b border-gray-200">
            <button 
                onClick={() => setActiveTab('directory')}
                className={`pb-3 px-1 text-sm font-semibold transition ${activeTab === 'directory' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
                Daftar Semua Relawan
            </button>
            <button 
                onClick={() => setActiveTab('validation')}
                className={`pb-3 px-1 text-sm font-semibold transition flex items-center gap-2 ${activeTab === 'validation' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
                Validasi Misi
                {/* Badge Notifikasi */}
                <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{pendingValidations.length}</span>
            </button>
        </div>
      </section>

      {/* --- MAIN CONTENT (Berubah sesuai Tab) --- */}
      <section className="max-w-6xl mx-auto px-6">
        
        {/* TAB 1: VALIDASI MISI (Fitur Baru) */}
        {activeTab === 'validation' && (
            <div className="space-y-4">
                {pendingValidations.map((item) => (
                    <div key={item.id} className="bg-white rounded-xl p-6 shadow-sm border border-indigo-100 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                        
                        {/* Info Relawan & Misi */}
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-bold text-lg text-gray-800">{item.volunteer}</h4>
                                <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{item.date}</span>
                            </div>
                            <p className="text-gray-600 text-sm">Mengerjakan: <span className="font-semibold text-indigo-600">{item.mission}</span></p>
                            <p className="text-gray-400 text-xs mt-1">Proyek: {item.project}</p>
                        </div>

                        {/* Bukti Foto (Preview) */}
                        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition group">
                            <div className="bg-indigo-100 p-2 rounded text-indigo-600">
                                <FileImage size={20} />
                            </div>
                            <div className="text-left">
                                <p className="text-xs font-semibold text-gray-700">Bukti_Kegiatan.jpg</p>
                                <p className="text-[10px] text-gray-500 group-hover:text-indigo-500 flex items-center gap-1">
                                    Klik untuk memperbesar <ExternalLink size={8} />
                                </p>
                            </div>
                        </div>

                        {/* Action Buttons (Flow Utama) */}
                        <div className="flex gap-3">
                            <button className="flex items-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-50 transition">
                                <XCircle size={18} />
                                Tolak
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 shadow-md hover:shadow-lg transition">
                                <CheckCircle size={18} />
                                Approve & Cairkan Token
                            </button>
                        </div>

                    </div>
                ))}
                
                {pendingValidations.length === 0 && (
                    <div className="text-center py-12 text-gray-400 bg-white rounded-xl border border-dashed border-gray-300">
                        <CheckCircle className="mx-auto mb-3 text-green-400" size={40} />
                        <p>Semua laporan sudah divalidasi!</p>
                    </div>
                )}
            </div>
        )}

        {/* TAB 2: DAFTAR RELAWAN (Tampilan Lama Anda) */}
        {activeTab === 'directory' && (
            <>
                {/* Search Bar Lama */}
                <div className="flex gap-4 mb-6">
                    <div className="flex-1 bg-white border border-gray-200 rounded-lg flex items-center px-4 py-2.5 shadow-sm">
                        <Search className="text-gray-400 mr-3" size={20} />
                        <input type="text" placeholder="Cari nama, email, atau lokasi..." className="w-full outline-none text-sm text-gray-700" />
                    </div>
                    <button className="bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-semibold text-gray-600 flex items-center gap-2 shadow-sm hover:bg-gray-50">
                        <Filter size={18} /> Filter
                    </button>
                </div>

                {/* Grid Card Lama */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {volunteers.map((vol) => (
                        <div key={vol.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center hover:shadow-md transition">
                            <div className="w-full flex justify-end mb-2">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${vol.status === 'Aktif' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                                    {vol.status.toUpperCase()}
                                </span>
                            </div>
                            <div className={`w-20 h-20 rounded-full ${vol.color} flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-lg`}>
                                {vol.initial}
                            </div>
                            <h3 className="text-lg font-bold text-gray-800">{vol.name}</h3>
                            <p className="text-indigo-600 text-sm font-medium mb-4">{vol.role}</p>
                            
                            <div className="w-full bg-gray-50 rounded-lg p-3 mb-4 text-left">
                                <p className="text-xs text-gray-400">Proyek Saat Ini</p>
                                <p className="text-sm font-semibold text-gray-700 truncate">{vol.project}</p>
                            </div>

                            <button className="w-full border border-green-600 text-green-600 py-2 rounded-lg text-sm font-semibold hover:bg-green-50 transition">
                                Lihat Profil Lengkap
                            </button>
                        </div>
                    ))}
                </div>
            </>
        )}

      </section>
    </main>
  );
}