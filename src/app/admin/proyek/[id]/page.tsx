"use client";

import { useParams } from "next/navigation";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";

export default function DetailProyekPage() {
  const { id } = useParams();

  // DATA DUMMY (nanti tinggal diganti dari API)
  const project = {
    id,
    name: "Reforest Bali 2024",
    totalDonation: 12500000,
    status: "Pending",
    uploadedProof: "/dummy/bukti_penggunaan_dana.png",
  };

  return (
    <main className="max-w-3xl mx-auto p-6 font-sans">

      {/* BACK BUTTON */}
      <button
        onClick={() => history.back()}
        className="flex items-center gap-2 text-gray-600 mb-6 hover:text-black transition"
      >
        <ArrowLeft size={18} /> Kembali
      </button>

      {/* TITLE */}
      <h1 className="text-2xl font-bold mb-4">{project.name}</h1>

      {/* INFO BOX */}
      <div className="space-y-3 text-gray-700 mb-8 p-4 bg-white border rounded-xl shadow-sm">

        <div>
          <span className="font-semibold">ID Proyek:</span>
          <p className="text-gray-600">{project.id}</p>
        </div>

        <div>
          <span className="font-semibold">Total Donasi:</span>
          <p className="text-gray-600">
            Rp {project.totalDonation.toLocaleString()}
          </p>
        </div>

        <div>
          <span className="font-semibold">Status:</span>
          <p className="text-gray-600">{project.status}</p>
        </div>

      </div>

      {/* BUKTI BOX */}
      <div className="p-6 border rounded-xl bg-white shadow-sm mb-8">
        <h2 className="text-lg font-semibold mb-3">Bukti Penggunaan Dana</h2>

        <p className="text-gray-500 text-sm mb-4">
          Bukti yang diunggah oleh NGO terkait penggunaan dana proyek.
        </p>

        <img
          src={project.uploadedProof}
          alt="Bukti penggunaan dana"
          className="rounded-lg border max-h-[400px] object-contain w-full"
        />
      </div>

      {/* TOMBOL AKSI */}
      <div className="flex gap-3 pb-10">

        <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition shadow-md">
          <CheckCircle size={18} /> Terima
        </button>

        <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition shadow-md">
          <XCircle size={18} /> Tolak
        </button>

      </div>

    </main>
  );
}
