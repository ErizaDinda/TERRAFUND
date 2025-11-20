"use client";

import Navbar from "@/components/Navbar";
import { useState } from "react";
import { FaLeaf, FaFire, FaClock, FaShareAlt } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function DonasiPage() {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("");

  return (
    <div className="min-h-screen bg-gray-50">

      {/* NAVBAR GLOBAL */}
      <Navbar />

      {/* CONTENT */}
      <main className="px-8 py-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LEFT – INFO PROYEK */}
        <div className="lg:col-span-2">
          
          {/* Banner */}
          <div className="bg-gradient-to-r from-indigo-400 to-purple-500 rounded-xl w-full h-64 flex justify-center items-center">
            <FaLeaf className="text-white text-6xl" />
          </div>

          <h1 className="mt-6 text-3xl font-bold text-gray-800">
            Donasi untuk Reboisasi Hutan Kalimantan
          </h1>

          <p className="text-gray-600 mt-1 flex items-center gap-2">
            <FaLeaf className="text-green-600" /> Green Earth Foundation
          </p>

          {/* DESKRIPSI */}
          <div className="bg-white p-6 rounded-xl shadow-md mt-6">
            <h2 className="font-semibold text-lg flex items-center gap-2">
              <FaFire className="text-red-500" /> Mengapa Proyek Ini Penting?
            </h2>

            <p className="text-gray-600 mt-3 leading-relaxed">
              Dengan berdonasi, Anda membantu menanam kembali pohon-pohon yang hilang akibat 
              deforestasi di Kalimantan. Setiap kontribusi Anda akan berkontribusi langsung 
              pada keberlanjutan lingkungan.
            </p>
          </div>

        </div>

        {/* RIGHT – FORM DONASI */}
        <div className="bg-white p-6 rounded-xl shadow-md h-fit">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-4">
            🌱 Formulir Donasi
          </h3>

          {/* INPUT JUMLAH DONASI */}
          <label className="text-gray-700 font-medium">Jumlah Donasi (Rp)</label>
          <Input
            type="number"
            placeholder="Contoh: 50000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-2"
          />

          {/* METODE PEMBAYARAN */}
          <label className="text-gray-700 font-medium mt-4 block">Metode Pembayaran</label>
          <Select onValueChange={setMethod}>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Pilih metode pembayaran" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bank">Transfer Bank</SelectItem>
              <SelectItem value="ewallet">E-Wallet (OVO, Dana, GoPay)</SelectItem>
              <SelectItem value="cc">Kartu Kredit</SelectItem>
            </SelectContent>
          </Select>

          {/* BUTTON DONASI */}
          <Button className="w-full mt-6 bg-green-600 text-white hover:bg-green-700">
            Konfirmasi Donasi
          </Button>

          {/* BUTTON SHARE */}
          <Button
            variant="outline"
            className="w-full mt-3 border-green-600 text-green-600 hover:bg-green-50 flex gap-2"
          >
            <FaShareAlt /> Bagikan Proyek
          </Button>
        </div>

      </main>
    </div>
  );
}
