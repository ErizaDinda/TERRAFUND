'use client';

import RelawanNavbar from '@/components/relawan/RelawanNavbar';

// Import icons yang dibutuhkan
import { DollarSign, Check, Hourglass, Trophy } from 'lucide-react';

export default function RelawanDashboard() {
  const relawanStats = [
    {
      title: 'Token Terkumpul',
      value: '1.250 TTK',
      icon: '💰',
      color: 'from-green-400 to-green-600',
    },
    {
      title: 'Misi Selesai',
      value: '15 Misi',
      icon: '✅',
      color: 'from-purple-400 to-purple-600',
    },
    {
      title: 'Misi Aktif',
      value: '3 Proyek',
      icon: '⏳',
      color: 'from-blue-400 to-blue-600',
    },
    {
      title: 'Level Relawan',
      value: 'Gold',
      icon: '🏆',
      color: 'from-yellow-500 to-orange-500',
    },
  ];

  const relawanMissions = [
    { title: 'Penanaman Pohon Mangrove', org: 'Green Earth', icon: '🌱', link: '/misi/1' },
    { title: 'Bersih-bersih Pantai Kuta', org: 'Ocean Care', icon: '💧', link: '/misi/2' },
    { title: 'Edukasi Lingkungan SD', org: 'EduCare', icon: '📚', link: '/misi/3' },
  ];

  return (
    <main className="w-full pb-20 bg-gray-50">
      <RelawanNavbar />

      <section className="w-full bg-gradient-to-br from-[#6A6AFB] to-[#8A4FFF] px-6 py-16 text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold">Selamat Datang, Relawan!</h2>
          <p className="text-white/80 mt-2">
            Terima kasih telah berkontribusi tenaga dan waktu untuk bumi yang lebih hijau.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 -mt-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {relawanStats.map((item, i) => (
            <div key={i} className="bg-white shadow-md rounded-xl p-6 flex items-center gap-4 hover:shadow-xl transition">
              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-3xl text-white shadow`}
              >
                {item.icon}
              </div>

              <div>
                <p className="text-gray-500 text-sm">{item.title}</p>
                <p className="text-xl font-bold text-gray-800">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 mt-14">
        <h3 className="text-2xl font-bold text-purple-700 mb-6">Misi yang Kamu Ikuti</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relawanMissions.map((p, i) => (
            <div key={i} className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden">
              <div className="h-36 bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-6xl">
                {p.icon}
              </div>

              <div className="p-5">
                <h4 className="text-lg font-bold">{p.title}</h4>
                <p className="text-sm text-gray-600">{p.org}</p>

                <a
                  href={p.link}
                  className="mt-4 block bg-green-500 text-white py-2 rounded-lg text-center hover:bg-green-600 transition font-medium"
                >
                  Lihat Detail Misi
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
