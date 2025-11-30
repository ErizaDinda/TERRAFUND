"use client";

import DonaturNavbar from "@/components/donatur/DonaturNavbar";

export default function RiwayatTransaksiPage() {
  return (
    <main className="w-full min-h-screen pb-20 bg-gray-50">
      <DonaturNavbar />

      <section className="max-w-6xl mx-auto px-6 pt-28">
        <h2 className="text-2xl font-bold text-purple-700 mb-6">
          Riwayat Transaksi
        </h2>

        <div className="bg-white rounded-xl shadow-md p-6 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left text-gray-600 border-b">
                <th className="py-3">ID Transaksi</th>
                <th className="py-3">Tanggal</th>
                <th className="py-3">Nominal</th>
                <th className="py-3">Tipe</th>
                <th className="py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  id: "#TX42121",
                  tanggal: "12 Jan 2025",
                  nominal: "Rp 500.000",
                  tipe: "Donasi",
                  status: "Selesai",
                },
                {
                  id: "#TX42111",
                  tanggal: "10 Jan 2025",
                  nominal: "350 TTK",
                  tipe: "Reward",
                  status: "Berhasil",
                },
              ].map((t, i) => (
                <tr
                  key={i}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-4 font-medium">{t.id}</td>
                  <td className="py-4">{t.tanggal}</td>
                  <td className="py-4 font-semibold">{t.nominal}</td>
                  <td className="py-4">{t.tipe}</td>
                  <td className="py-4">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm">
                      {t.status}
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
