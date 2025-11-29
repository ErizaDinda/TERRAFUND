"use client";

import DonaturNavbar from "@/components/donatur/DonaturNavbar";

export default function ProfilPage() {
  return (
    <main className="w-full min-h-screen pb-20 bg-gray-50">
      <DonaturNavbar />

      <section className="max-w-4xl mx-auto px-6 pt-28">
        <h2 className="text-2xl font-bold text-purple-700 mb-6">
          Profil Saya
        </h2>

        <div className="bg-white rounded-xl shadow-md p-6">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-gray-600 text-sm">Nama Lengkap</label>
              <input
                type="text"
                className="w-full mt-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-400"
                defaultValue="Nama Donatur"
              />
            </div>

            <div>
              <label className="text-gray-600 text-sm">Email</label>
              <input
                type="email"
                className="w-full mt-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-400"
                defaultValue="donatur@email.com"
              />
            </div>

            <div>
              <label className="text-gray-600 text-sm">Nomor Telepon</label>
              <input
                type="text"
                className="w-full mt-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-400"
                defaultValue="08123456789"
              />
            </div>

            <div>
              <label className="text-gray-600 text-sm">Alamat</label>
              <input
                type="text"
                className="w-full mt-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-400"
                defaultValue="Jl. Contoh No. 123"
              />
            </div>
          </form>

          <div className="mt-6 flex justify-end">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl">
              Simpan Perubahan
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
