"use client";

import { CheckCircle, Clock } from "lucide-react";

export default function VerifikasiPage() {
  const verifikasiList = [
    {
      title: "Penanaman Pohon Mangrove",
      date: "18 Nov 2024",
      status: "Verified",
      color: "text-green-600",
      bg: "bg-green-100",
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
    },
    {
      title: "Bersih-bersih Pantai Kuta",
      date: "16 Nov 2024",
      status: "Pending",
      color: "text-yellow-600",
      bg: "bg-yellow-100",
      icon: <Clock className="w-5 h-5 text-yellow-600" />,
    },
    {
      title: "Edukasi Lingkungan Sekolah",
      date: "14 Nov 2024",
      status: "Verified",
      color: "text-green-600",
      bg: "bg-green-100",
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-1">Status Verifikasi</h1>
      <p className="text-gray-500 mb-8">
        Lihat perkembangan verifikasi dari misi-misi yang telah kamu ikuti.
      </p>

      <div className="space-y-4">
        {verifikasiList.map((item, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-lg shadow flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-gray-500 text-sm">{item.date}</p>
            </div>

            <div
              className={`px-3 py-1 flex items-center gap-2 rounded-full text-sm font-medium ${item.bg} ${item.color}`}
            >
              {item.icon}
              {item.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}