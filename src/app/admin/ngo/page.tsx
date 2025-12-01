"use client";

import AdminNavbar from "@/components/Admin/AdminNavbar";
import { CheckCircle, XCircle, MoreHorizontal, Search, HandCoins } from "lucide-react";

export default function KelolaProyekPage() {

  const projectList = [
    {
      id: 1,
      name: "Reforest Bali 2024",
      totalDonation: 12500000,
      status: "Pending",
    },
    {
      id: 2,
      name: "Clean River Movement",
      totalDonation: 9800000,
      status: "Diterima",
    },
    {
      id: 3,
      name: "Save Orangutan Habitat",
      totalDonation: 4500000,
      status: "Ditolak",
    },
  ];

  return (
    <main className="w-full pb-24 bg-gray-50 min-h-screen font-sans">
      <AdminNavbar />

      {/* HEADER */}
      <section className="w-full bg-gradient-to-r from-[#6A6AFB] to-[#8A4FFF] px-6 py-16 pb-28 text-white shadow-xl">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-3xl font-bold">Kelola Proyek</h2>
            <p className="text-indigo-100 mt-2">
              Admin dapat mengelola proyek dan melihat total donasi yang terkumpul.
            </p>
          </div>

          {/* SEARCH BAR */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Cari nama proyek..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white text-gray-700 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#00A651] shadow-lg transition"
            />
          </div>
        </div>
      </section>

      {/* LIST PROYEK */}
      <section className="max-w-6xl mx-auto px-6 -mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {projectList.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition duration-300 group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-indigo-50 rounded-xl text-[#6A6AFB]">
                  <HandCoins size={24} />
                </div>

                {/* STATUS */}
                {p.status === "Diterima" && (
                  <span className="bg-green-100 text-[#00A651] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-green-200">
                    <CheckCircle size={12} /> Diterima
                  </span>
                )}

                {p.status === "Ditolak" && (
                  <span className="bg-red-100 text-red-600 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-red-200">
                    <XCircle size={12} /> Ditolak
                  </span>
                )}

                {p.status === "Pending" && (
                  <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-3 py-1 rounded-full animate-pulse border border-yellow-200">
                    Pending
                  </span>
                )}
              </div>

              {/* JUDUL PROYEK */}
              <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-[#6A6AFB] transition">
                {p.name}
              </h3>

              {/* TOTAL DONASI */}
              <p className="text-sm text-gray-600 mt-3">
                Total Donasi:
                <span className="font-bold text-green-600 ml-1">
                  Rp {p.totalDonation.toLocaleString()}
                </span>
              </p>

              {/* BUTTONS */}
              <div className="mt-6 pt-4 border-t border-gray-100 flex gap-3">

                <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl text-sm font-semibold transition shadow-md">
                  Terima
                </button>

                <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-xl text-sm font-semibold transition shadow-md">
                  Tolak
                </button>

                {/* TOMBOL TITIK TIGA → PERGI KE DETAIL */}
                <button
                  onClick={() => window.location.href = `/admin/proyek/${p.id}`}
                  className="p-2.5 border border-gray-200 rounded-xl text-gray-400 hover:text-red-500 hover:border-red-200 transition bg-white"
                >
                  <MoreHorizontal size={18} />
                </button>

              </div>
            </div>
          ))}

        </div>
      </section>
    </main>
  );
}
