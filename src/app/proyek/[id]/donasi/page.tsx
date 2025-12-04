// src/app/proyek/[id]/donasi/page.tsx

"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { FaLeaf } from "react-icons/fa";

export default function DonasiPage({ params }: { params: { id: string } | any }) {
  
  // FIX PROMISE: Menggunakan React.use() untuk membuka params, seperti yang diminta konsol.
  const unwrappedParams = React.use(params as any); 
  const idFromParams = unwrappedParams.id;
  
  // FIX NAN: Validasi string ID secara ketat sebelum konversi.
  const idString = 
      (idFromParams && typeof idFromParams === 'string' && !idFromParams.includes('[id]')) 
      ? idFromParams 
      : '';
      
  const projectId = Number(idString); 

  const [amount, setAmount] = useState("50000");
  const [isLoading, setIsLoading] = useState(false);

  const quickAmounts = [20000, 50000, 100000];
  
  // Validasi: Jika NaN (dari string placeholder) atau 0/null, tampilkan error.
  if (isNaN(projectId) || projectId <= 0) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-400 to-purple-500">
            <Navbar />
            <div className="flex justify-center items-center py-20 px-4">
                <div className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-xl">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">⚠️ ID Proyek Tidak Valid</h1>
                    <p className="text-gray-600">Mohon kembali ke halaman detail proyek atau periksa URL Anda. (ID yang Diterima: {idFromParams || 'Kosong'})</p>
                </div>
            </div>
        </div>
    );
  }

  const handleDonasiSubmit = async () => {
    const token = localStorage.getItem("authToken");
    const userStr = localStorage.getItem("currentUser");

    if (!token || !userStr) {
      alert("Silakan login terlebih dahulu sebelum melakukan donasi.");
      return;
    }

    const userData = JSON.parse(userStr);

    console.log({
    user_id: userData?.id,
    project_id: projectId, // Sekarang dijamin angka yang valid
    name: userData?.name,
    email: userData?.email,
    amount: Number(amount)
  });


    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3001/api/donate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          user_id: userData.id,
          project_id: projectId,
          name: userData.name,
          email: userData.email,
          amount: Number(amount)
        })
      });

      const data = await response.json();

      if (data.status === "Sukses" && data.redirect_url) {
        // Redirect ke Midtrans Snap
        window.location.href = data.redirect_url;
      } else {
        alert("Gagal melakukan donasi. Silakan coba lagi.");
      }
    } catch (err: any) {
      console.error(err);
      alert("Terjadi error saat melakukan donasi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 to-purple-500">
      <Navbar />

      <div className="flex justify-center items-center py-20 px-4">
        <div className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-xl">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-2">
              <FaLeaf className="text-green-600 text-3xl" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Donasi untuk Proyek</h1>
            <p className="text-gray-600">Proyek ID: {projectId} (Reboisasi Hutan Kalimantan)</p>
          </div>

          <div className="mb-4">
            <label className="font-medium text-gray-700">Nominal Donasi (Rp)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full mt-2 px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-xl font-bold"
            />

            <div className="flex gap-3 mt-3 flex-wrap">
              {quickAmounts.map((value) => (
                <button
                  key={value}
                  className={`px-4 py-2 border rounded-lg hover:bg-green-50 transition text-sm font-medium ${
                    Number(amount) === value
                      ? "bg-green-500 text-white border-green-600"
                      : "border-green-500 text-green-600"
                  }`}
                  onClick={() => setAmount(String(value))}
                >
                  Rp {value.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleDonasiSubmit}
            disabled={isLoading}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-6 text-lg font-semibold rounded-lg transition"
          >
            {isLoading ? "Memproses..." : "Lanjut Pembayaran →"}
          </button>

          <div className="bg-green-50 border border-green-200 mt-6 p-4 rounded-lg">
            <p className="font-semibold text-gray-700 flex items-center gap-2">
              🧾 Blockchain Transparency
            </p>
            <p className="text-gray-600 text-sm mt-1">
              Setiap donasi akan dicatat secara otomatis di blockchain Polygon untuk transparansi penuh.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}