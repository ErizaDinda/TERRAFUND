"use client";

import DonaturNavbar from "@/components/donatur/DonaturNavbar";

export default function DonaturDashboard() {
    return (
        <main className="w-full pb-20 bg-gray-50">

            {/* NAVBAR KHUSUS DONATUR */}
            <DonaturNavbar />

            {/* HERO */}
            <section className="w-full bg-gradient-to-br from-[#6A6AFB] to-[#8A4FFF] px-6 py-16 text-white">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold">Selamat Datang, Donatur!</h2>
                    <p className="text-white/80 mt-2">
                        Terima kasih telah berkontribusi untuk bumi yang lebih hijau.
                    </p>
                </div>
            </section>


            {/* STATISTIK */}
            <section className="max-w-6xl mx-auto px-6 -mt-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {[
                        {
                            title: "Total Donasi",
                            value: "Rp 12.500.000",
                            icon: "💰",
                            color: "from-green-400 to-green-600"
                        },
                        {
                            title: "Jumlah Proyek",
                            value: "7 Proyek",
                            icon: "📦",
                            color: "from-purple-400 to-purple-600"
                        },
                        {
                            title: "Token Reward",
                            value: "350 TTK",
                            icon: "🎁",
                            color: "from-blue-400 to-blue-600"
                        },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="bg-white shadow-md rounded-xl p-6 flex items-center gap-4 hover:shadow-xl transition"
                        >
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

            {/* PROYEK */}
            <section className="max-w-6xl mx-auto px-6 mt-14">
                <h3 className="text-2xl font-bold text-purple-700 mb-6">
                    Proyek yang Kamu Dukung
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { title: "Reboisasi Hutan Kalimantan", org: "Green Earth", icon: "🌱" },
                        { title: "Air Bersih untuk Desa", org: "Water For Life", icon: "💧" },
                        { title: "Perpustakaan Anak", org: "EduCare", icon: "📚" },
                    ].map((p, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden"
                        >
                            <div className="h-36 bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-6xl">
                                {p.icon}
                            </div>

                            <div className="p-5">
                                <h4 className="text-lg font-bold">{p.title}</h4>
                                <p className="text-sm text-gray-600">{p.org}</p>

                                <a
                                    href={`/proyek/${i + 1}`}
                                    className="mt-4 block bg-green-500 text-white py-2 rounded-lg text-center hover:bg-green-600 transition font-medium"
                                >
                                    Lihat Detail
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </main>
    );
}
