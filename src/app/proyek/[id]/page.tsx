"use client";

import Navbar from "@/components/Navbar";

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Content */}
      <main className="px-8 py-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left - Banner dan Detail Proyek */}
        <div className="lg:col-span-2">
          {/* Banner */}
          <div className="bg-gradient-to-r from-indigo-400 to-purple-500 rounded-xl w-full h-72 flex justify-center items-center">
            <span className="text-white text-7xl">🌳</span>
          </div>

          <h1 className="mt-6 text-3xl font-bold text-gray-800">
            Reboisasi Hutan Kalimantan
          </h1>
          <p className="text-gray-600 mt-1 flex items-center gap-2">
            🌱 <span className="text-green-600">Green Earth Foundation</span>
          </p>

          {/* Deskripsi */}
          <div className="bg-white p-6 rounded-xl shadow-md mt-6">
            <h2 className="font-semibold text-lg flex items-center gap-2">
              🔥 Deskripsi Proyek
            </h2>
            <p className="text-gray-600 mt-3 leading-relaxed">
              Program reboisasi ini bertujuan untuk menanam 100.000 pohon di area hutan Kalimantan
              yang mengalami deforestasi. Kami akan melibatkan masyarakat lokal dalam proses
              penanaman dan perawatan pohon.
            </p>
            <p className="text-gray-600 mt-3 leading-relaxed">
              Setiap pohon yang ditanam akan dipantau menggunakan GPS dan blockchain untuk memastikan
              transparansi dan akuntabilitas program.
            </p>
          </div>

          {/* Detail */}
          <div className="bg-white p-6 rounded-xl shadow-md mt-6">
            <h2 className="font-semibold text-lg flex items-center gap-2">
              📍 Detail
            </h2>
            <div className="grid grid-cols-2 gap-4 mt-4 text-gray-700">
              <p><strong>Lokasi:</strong> Kalimantan Timur, Indonesia</p>
              <p><strong>Kategori:</strong> Lingkungan</p>
              <p><strong>Durasi:</strong> 12 Bulan</p>
              <p><strong>Target Pohon:</strong> 100.000 Pohon</p>
            </div>
          </div>
        </div>

        {/* Right - Progress Donasi */}
        <div className="bg-white p-6 rounded-xl shadow-md h-fit">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-4">
            🔥 Progress Donasi
          </h3>

          <p className="text-green-600 text-2xl font-bold">Rp 65.000.000</p>
          <p className="text-gray-500 text-sm">dari Rp 100.000.000</p>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
            <div className="bg-green-500 h-full w-2/3 rounded-full"></div>
          </div>

          <div className="flex justify-between mt-3 text-gray-600 text-sm">
            <p>🧍 Donatur: <span className="font-semibold">234 orang</span></p>
            <p>⏳ Tersisa: 45 hari</p>
          </div>

          {/* Tombol Donasi */}
          <a
            href={'/donasi/${params.id}'}
            className="w-full mt-6 block bg-green-500 text-white py-3 rounded-lg font-semibold text-center hover:bg-green-600 transition"
          >
            🌱 Donasi Sekarang
          </a>

          <button className="w-full mt-3 border border-green-500 text-green-600 py-3 rounded-lg font-semibold hover:bg-green-50 transition flex gap-2 justify-center items-center">
            🔗 Bagikan Proyek
          </button>
        </div>

      </main>
    </div>
  );
}
