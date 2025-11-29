"use client";

import DonaturNavbar from "@/components/donatur/DonaturNavbar";

export default function DonasiSayaPage() {
  return (
    <main className="w-full min-h-screen pb-20 bg-gray-50">
      <DonaturNavbar />

      <section className="max-w-6xl mx-auto px-6 pt-28">
        <h2 className="text-2xl font-bold text-purple-700 mb-6">
          Donasi Saya
        </h2>

        <div className="bg-white rounded-xl shadow-md p-6 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left text-gray-600 border-b">
                <th className="py-3">Proyek</th>
                <th className="py-3">Tanggal</th>
                <th className="py-3">Nominal</th>
                <th className="py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  proyek: "Reboisasi Hutan Kalimantan",
                  tanggal: "12 Jan 2025",
                  nominal: "Rp 500.000",
                  status: "Selesai",
                },
                {
                  proyek: "Air Bersih untuk Desa",
                  tanggal: "5 Jan 2025",
                  nominal: "Rp 300.000",
                  status: "Selesai",
                },
              ].map((d, i) => (
                <tr
                  key={i}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-4 font-medium">{d.proyek}</td>
                  <td className="py-4">{d.tanggal}</td>
                  <td className="py-4 font-semibold">{d.nominal}</td>
                  <td className="py-4">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm">
                      {d.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
