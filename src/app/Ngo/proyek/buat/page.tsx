"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import NgoNavbar from "@/components/Ngo/NgoNavbar";

export default function CreateProjectPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    nama: "",
    kategori: "",
    deskripsi: "",
    lokasi: "",
    targetRelawan: "",
    targetDana: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    
    console.log("Data proyek baru:", form);

    // FIX FLOW: Pesan disesuaikan, tidak langsung 'Berhasil Dibuat' tapi 'Diajukan'
    alert("Proyek berhasil diajukan! Menunggu persetujuan Admin sebelum ditayangkan.");

    router.push("/Ngo/proyek"); 
  };

  return (
    <main className="w-full pb-24 bg-gray-50 min-h-screen">
      <NgoNavbar />

      {/* Header */}
      <section className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-14 text-white shadow-lg">
        <h2 className="text-3xl font-bold">Buat Proyek Baru</h2>
        <p className="mt-2 text-indigo-100">Isi informasi berikut. Proyek akan ditinjau Admin sebelum tayang.</p>
      </section>

      {/* Form */}
      <section className="max-w-4xl mx-auto p-6 -mt-10 bg-white shadow-lg rounded-2xl border border-gray-100">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">

          <div>
            <label className="font-semibold text-gray-700">Nama Proyek *</label>
            <input
              type="text"
              name="nama"
              value={form.nama}
              onChange={handleChange}
              className="w-full mt-2 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Ex: Reboisasi Hutan Kalimantan"
              required
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700">Kategori *</label>
            <select
              name="kategori"
              value={form.kategori}
              onChange={handleChange}
              className="w-full mt-2 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Pilih kategori</option>
              <option value="Penghijauan">Penghijauan 🌱</option>
              <option value="Proyek Air">Proyek Air 💧</option>
              <option value="Edukasi">Edukasi 📚</option>
              <option value="Lingkungan">Lingkungan ♻️</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-gray-700">Deskripsi *</label>
            <textarea
              name="deskripsi"
              rows={4}
              value={form.deskripsi}
              onChange={handleChange}
              className="w-full mt-2 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Ceritakan tujuan dan manfaat proyek..."
              required
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700">Lokasi *</label>
            <input
              type="text"
              name="lokasi"
              value={form.lokasi}
              onChange={handleChange}
              className="w-full mt-2 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Ex: Kalimantan Timur"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-semibold text-gray-700">Target Relawan *</label>
              <input
                type="number"
                name="targetRelawan"
                value={form.targetRelawan}
                onChange={handleChange}
                className="w-full mt-2 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Ex: 100"
                required
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700">Target Dana *</label>
              <input
                type="number"
                name="targetDana"
                value={form.targetDana}
                onChange={handleChange}
                className="w-full mt-2 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Ex: 250000000"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold transition shadow-md"
          >
            Ajukan Proyek
          </button>

        </form>
      </section>
    </main>
  );
}