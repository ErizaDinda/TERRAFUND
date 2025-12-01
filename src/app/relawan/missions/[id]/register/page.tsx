"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Send } from "lucide-react";

export default function RegisterMission() {
  const { id } = useParams();
  const router = useRouter();
  const [motivation, setMotivation] = useState("");

  const handleSubmit = () => {
    if (!motivation.trim()) {
      alert("Motivasi tidak boleh kosong!");
      return;
    }

    alert(`Pendaftaran misi ${id} berhasil!\nMotivasi: ${motivation}`);
    router.push("/relawan/missions");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">

      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-700 mb-6 hover:text-indigo-600"
      >
        <ArrowLeft size={20} />
        Kembali
      </button>

      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-lg border">
        <h1 className="text-2xl font-bold text-gray-800 mb-3">
          Daftar Misi #{id}
        </h1>
        <p className="text-gray-600 mb-6">
          Jelaskan motivasi Anda mengikuti misi ini.
        </p>

        <textarea
          value={motivation}
          onChange={(e) => setMotivation(e.target.value)}
          className="w-full h-40 border border-gray-300 rounded-xl p-3 text-gray-700 outline-none focus:ring-2 focus:ring-indigo-300"
          placeholder="Tulis motivasi Anda di sini..."
        />

        <button
          onClick={handleSubmit}
          className="mt-6 w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
        >
          Kirim Pendaftaran
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
