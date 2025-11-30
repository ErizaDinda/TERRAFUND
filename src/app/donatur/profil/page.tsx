"use client";

import DonaturNavbar from "@/components/donatur/DonaturNavbar";

export default function ProfilPage() {
    const user = {
        name: "Nama Donatur",
        email: "donatur@example.com",
        phone: "0812-3456-7890",
        address: "Jl. Contoh No. 123",
    };

    const initials = user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();

    return (
        <main className="w-full min-h-screen pb-20 bg-gray-50">
            <DonaturNavbar />

            <section className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-16 px-6">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl font-semibold -mt-4">Profil Donatur</h1>
                    <p className="text-white/80 mt-1 -mt-1">
                        Kelola informasi pribadi dan detail akun kamu.
                    </p>

                </div>
            </section>

            <section className="max-w-4xl mx-auto px-6 -mt-14 mb-10">
                <div className="bg-white rounded-2xl shadow-xl p-8 flex items-center gap-8 relative z-10">

                    {/* AVATAR */}
                    <div className="w-28 h-28 rounded-full bg-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                        {initials}
                    </div>

                    {/* INFORMASI */}
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>

                        <div className="mt-4 space-y-2 text-gray-600">
                            <div className="flex items-center gap-2">
                                📧 <span>{user.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                📞 <span>{user.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                📍 <span>{user.address}</span>
                            </div>
                        </div>

                        <button className="mt-6 px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                            Edit Profil
                        </button>
                    </div>
                </div>
            </section>

        </main>
    );
}
