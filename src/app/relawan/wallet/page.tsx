"use client";

import { ArrowDown, ArrowUp, DollarSign } from "lucide-react";

export default function WalletPage() {
  const history = [
    {
      title: "Reward: Penanaman Pohon",
      amount: "+100 TTK",
      type: "income",
      date: "18 Nov 2024",
    },
    {
      title: "Reward: Bersih Pantai",
      amount: "+75 TTK",
      type: "income",
      date: "16 Nov 2024",
    },
    {
      title: "Penukaran Token ke Rupiah",
      amount: "-50 TTK",
      type: "expense",
      date: "10 Nov 2024",
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-1 text-slate-800">Wallet (TTK)</h1>
      <p className="text-gray-500 mb-8">Lihat saldo dan riwayat transaksi tokenmu.</p>

      {/* Balance Card */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-yellow-200 rounded-full flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-yellow-700" />
          </div>
          <div>
            <p className="text-gray-600">Total Saldo</p>
            <h2 className="text-3xl font-bold text-green-500">1,250 TTK</h2>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-bold">Riwayat Transaksi</h2>
        </div>

        <div className="divide-y">
          {history.map((item, i) => (
            <div key={i} className="px-6 py-4 flex justify-between items-center">
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-gray-500 text-sm">{item.date}</p>
              </div>

              <div className="flex items-center gap-2 text-sm font-semibold">
                {item.type === "income" ? (
                  <ArrowUp className="w-4 h-4 text-green-600" />
                ) : (
                  <ArrowDown className="w-4 h-4 text-red-600" />
                )}

                <span
                  className={
                    item.type === "income" ? "text-green-600" : "text-red-600"
                  }
                >
                  {item.amount}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}