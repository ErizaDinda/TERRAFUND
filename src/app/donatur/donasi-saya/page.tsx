"use client";

import DonaturNavbar from "@/components/donatur/DonaturNavbar";

export default function DonasiSayaPage() {
  const donasi = [
    {
      kode: "DN-001",
      proyek: "Reboisasi Hutan Kalimantan",
      tanggal: "12 Jan 2025",
      nominal: "Rp 500.000",
      organisasi: "Green Earth Foundation",
      keterangan: "Termin 2 • Penanaman 5000 Bibit",
      status: "Selesai",
    },
    {
      kode: "DN-002",
      proyek: "Air Bersih untuk Desa",
      tanggal: "5 Jan 2025",
      nominal: "Rp 300.000",
      organisasi: "Water For Life",
      keterangan: "Termin 1 • Pembelian Material Pipa",
      status: "Selesai",
    },
  ];

  return (
    <main className="w-full min-h-screen pb-20 bg-gray-50">
      <DonaturNavbar />

      {/* HEADER UNGU */}
      <section className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-semibold">Donasi Saya</h1>
          <p className="text-white/80 mt-2">
            Riwayat kontribusi kamu untuk berbagai program lingkungan.
          </p>
        </div>
      </section>

      {/* LIST DONASI */}
      <section className="max-w-6xl mx-auto px-6 -mt-12">
        <div className="space-y-6">
          {donasi.map((d, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md p-6 border border-gray-100"
            >
              {/* HEADER */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold bg-purple-100 text-purple-700 px-3 py-1 rounded-lg">
                  {d.kode}
                </span>
                <span className="text-gray-500 text-sm">Diajukan: {d.tanggal}</span>
              </div>

              {/* TITLE */}
              <h3 className="text-lg font-bold text-gray-800">
                {d.proyek}
              </h3>

              {/* ORGANISASI */}
              <p className="text-sm text-gray-600 mt-1">
                <span className="font-semibold">{d.organisasi}</span> • {d.keterangan}
              </p>

              {/* FOOTER */}
              <div className="flex items-center gap-4 mt-4">
                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-xl text-sm font-semibold">
                  {d.nominal}
                </span>

                <button className="text-sm text-gray-600 hover:text-purple-700 transition">
                  Cek Detail
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
