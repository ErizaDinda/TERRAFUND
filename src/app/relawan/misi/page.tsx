"use client";

import { MapPin, Trophy } from "lucide-react";

export default function MisiPage() {
  const missions = [
    {
      title: "Penanaman Pohon Mahoni",
      location: "Bandung",
      reward: "80 TTK",
    },
    {
      title: "Bersih-Bersih Sungai",
      location: "Surabaya",
      reward: "120 TTK",
    },
    {
      title: "Edukasi Daur Ulang",
      location: "Jakarta",
      reward: "60 TTK",
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-1 text-slate-800">Misi Relawan</h1>
      <p className="text-gray-500 mb-8">
        Pilih dan ikuti misi sosial untuk dapatkan token TTK.
      </p>

      <div className="space-y-4">
        {missions.map((m, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-lg shadow flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg font-semibold">{m.title}</h2>
              <p className="text-gray-600 flex items-center gap-1 text-sm">
                <MapPin className="w-4 h-4" /> {m.location}
              </p>
            </div>

            <div className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full font-medium text-sm flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              {m.reward}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}