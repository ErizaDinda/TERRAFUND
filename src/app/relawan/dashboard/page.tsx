"use client";

import RelawanNavbar from "@/components/relawan/RelawanNavbar";
import { FaLeaf, FaHandsHelping, FaClock } from "react-icons/fa";

export default function DashboardRelawan() {
  return (
    <main className="w-full min-h-screen pb-20 bg-gray-50">
      <RelawanNavbar />

      <section className="max-w-6xl mx-auto px-6 pt-28">
        <h2 className="text-2xl font-bold text-purple-700 mb-6">
          Dashboard Relawan
        </h2>

        {/* Statistik */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">
            <FaHandsHelping className="text-purple-600 text-3xl" />
            <div>
              <p className="text-gray-600 text-sm">Total Kegiatan</p>
              <p className="text-xl font-bold">12</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">
            <FaLeaf className="text-green-600 text-3xl" />
            <div>
              <p className="text-gray-600 text-sm">Aksi Lingkungan</p>
              <p className="text-xl font-bold">7</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">
            <FaClock className="text-blue-600 text-3xl" />
            <div>
              <p className="text-gray-600 text-sm">Total Jam</p>
              <p className="text-xl font-bold">58 jam</p>
            </div>
          </div>
        </div>

        {/* Kegiatan Terbaru */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-10">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Kegiatan Terbaru
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left text-gray-600 border-b">
                  <th className="py-3">Kegiatan</th>
                  <th className="py-3">Tanggal</th>
                  <th className="py-3">Lokasi</th>
                  <th className="py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    nama: "Bersih Sungai Ciliwung",
                    tanggal: "18 Jan 2025",
                    lokasi: "Jakarta Selatan",
                    status: "Selesai",
                  },
                  {
                    nama: "Penanaman 300 Bibit Mangrove",
                    tanggal: "10 Jan 2025",
                    lokasi: "Karawang",
                    status: "Selesai",
                  },
                  {
                    nama: "Aksi Edukasi Sampah Plastik",
                    tanggal: "05 Jan 2025",
                    lokasi: "Cirebon",
                    status: "Dalam Progres",
                  },
                ].map((k, i) => (
                  <tr
                    key={i}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="py-4 font-medium">{k.nama}</td>
                    <td className="py-4">{k.tanggal}</td>
                    <td className="py-4">{k.lokasi}</td>
                    <td className="py-4">
                      <span
                        className={`px-3 py-1 rounded-lg text-sm ${
                          k.status === "Selesai"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {k.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Progress Proyek */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Progress Proyek Anda
          </h3>

          <div className="space-y-5">
            {[
              {
                nama: "Rehabilitasi Hutan Kalimantan",
                progress: 78,
              },
              {
                nama: "Aksi Pantai Bersih Anyer",
                progress: 52,
              },
            ].map((p, i) => (
              <div key={i}>
                <p className="font-medium mb-1">{p.nama}</p>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-purple-600 h-3 rounded-full"
                    style={{ width: `${p.progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {p.progress}% selesai
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
