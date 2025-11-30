"use client";

import { 
  Globe, LogOut, Coins, TrendingUp, TrendingDown, Clock 
} from "lucide-react";
import RelawanNavbar from "@/components/relawan/RelawanNavbar";

export default function TokenRelawan() {

  const totalToken = 1250;

  const transactions = [
    { id: 1, type: "Reward dari Misi", amount: 150, positive: true, date: "18 Nov 2024", detail: "Penanaman Mangrove" },
    { id: 2, type: "Reward dari Misi", amount: 120, positive: true, date: "15 Nov 2024", detail: "Bersih Pantai" },
    { id: 3, type: "Konversi Voucher", amount: 200, positive: false, date: "12 Nov 2024", detail: "Voucher Minimarket" },
    { id: 4, type: "Reward dari Misi", amount: 100, positive: true, date: "10 Nov 2024", detail: "Edukasi Lingkungan" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

            {/* NAVBAR */}
            <RelawanNavbar />

      {/* HEADER */}
      <div className="w-full bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 pb-20 pt-10 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Wallet Token</h1>
          <p className="text-indigo-100 mt-2">Lihat saldo dan riwayat transaksi TTK kamu.</p>
        </div>
      </div>

      {/* MAIN */}
      <div className="max-w-5xl mx-auto px-6 -mt-20 pb-20">

        {/* CARD SALDO */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-lg font-semibold text-gray-700">Total Token</h2>

          <div className="flex items-center justify-between mt-4">
            <div>
              <p className="text-4xl font-extrabold text-gray-800">{totalToken.toLocaleString()} TTK</p>
              <p className="text-gray-500 text-sm mt-1">≈ Rp {(totalToken * 1000).toLocaleString('id-ID')}</p>
            </div>

            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
              <Coins className="w-8 h-8 text-purple-600" />
            </div>
          </div>

          <button className="mt-6 px-5 py-3 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow transition">
            Konversi Token
          </button>
        </div>

        {/* RIWAYAT */}
        <h3 className="text-2xl font-bold text-gray-800 mt-10 mb-4">Riwayat Transaksi</h3>

        <div className="bg-white rounded-2xl shadow divide-y">
          {transactions.map((tx) => (
            <div key={tx.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition">

              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center 
                  ${tx.positive ? "bg-green-100" : "bg-red-100"}`}>
                  {tx.positive ? (
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  ) : (
                    <TrendingDown className="w-6 h-6 text-red-600" />
                  )}
                </div>

                <div>
                  <p className="font-semibold text-gray-800">{tx.type}</p>
                  <p className="text-gray-600 text-sm">{tx.detail}</p>

                  <p className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                    <Clock className="w-3 h-3" /> {tx.date}
                  </p>
                </div>
              </div>

              <p className={`text-lg font-bold ${tx.positive ? "text-green-600" : "text-red-600"}`}>
                {tx.positive ? "+" : "-"}{tx.amount} TTK
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
