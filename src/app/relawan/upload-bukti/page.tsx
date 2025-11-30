"use client";

import { useState } from "react";
import { UploadCloud, Image as ImageIcon, CheckCircle } from "lucide-react";

export default function UploadBuktiPage() {
  const [selectedMission, setSelectedMission] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const missions = [
    {
      id: "1",
      title: "Penanaman Pohon Mahoni",
      reward: "80 TTK",
    },
    {
      id: "2",
      title: "Bersih Sungai Surabaya",
      reward: "120 TTK",
    },
    {
      id: "3",
      title: "Edukasi Daur Ulang",
      reward: "60 TTK",
    },
  ];

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;

    // Validasi ukuran file (< 5 MB)
    if (f.size > 5 * 1024 * 1024) {
      alert("Ukuran file maksimal 5MB.");
      return;
    }

    // Validasi format file
    const allowed = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowed.includes(f.type)) {
      alert("Format harus JPG atau PNG.");
      return;
    }

    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  function handleSubmit() {
    if (!selectedMission || !file) {
      alert("Lengkapi semua data terlebih dahulu.");
      return;
    }

    setUploading(true);

    setTimeout(() => {
      setUploading(false);
      setSuccess(true);
    }, 1500);
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-800 mb-2">Upload Bukti Misi</h1>
      <p className="text-gray-500 mb-8">
        Unggah foto sebagai bukti bahwa kamu telah menyelesaikan misi relawan.
      </p>

      {/* Final Success */}
      {success && (
        <div className="bg-white p-8 rounded-xl shadow text-center space-y-4">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
          <h2 className="text-2xl font-semibold text-green-600">Upload Berhasil!</h2>
          <p className="text-gray-600">
            Bukti kamu sedang dalam proses verifikasi. Token TTK akan diberikan setelah bukti disetujui.
          </p>
        </div>
      )}

      {!success && (
        <div className="space-y-6">

          {/* Mission Selector */}
          <div className="bg-white p-6 rounded-xl shadow">
            <label className="text-gray-700 font-medium">Pilih Misi</label>
            <select
              value={selectedMission}
              onChange={(e) => setSelectedMission(e.target.value)}
              className="w-full mt-2 p-3 border rounded-lg"
            >
              <option value="">-- Pilih Misi yang Telah Kamu Ikuti --</option>
              {missions.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.title} ({m.reward})
                </option>
              ))}
            </select>
          </div>

          {/* Upload Box */}
          <div className="bg-white p-6 rounded-xl shadow text-center">

            {!preview ? (
              <label className="cursor-pointer flex flex-col items-center space-y-3 py-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                  <UploadCloud className="w-10 h-10 text-blue-600" />
                </div>

                <div>
                  <p className="font-medium text-blue-600">Pilih Foto Bukti</p>
                  <p className="text-gray-500 text-sm">Format: JPG / PNG (max 5MB)</p>
                </div>

                <input type="file" className="hidden" onChange={handleFile} />
              </label>
            ) : (
              <div className="space-y-4">
                <img
                  src={preview}
                  alt="preview"
                  className="w-full max-h-80 object-cover rounded-lg shadow"
                />
                <button
                  onClick={() => {
                    setPreview(null);
                    setFile(null);
                  }}
                  className="text-sm text-red-500 underline"
                >
                  Ganti Foto
                </button>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              onClick={handleSubmit}
              disabled={uploading}
              className={`px-6 py-3 rounded-lg text-white font-semibold transition ${
                uploading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {uploading ? "Meng-upload..." : "Kirim Bukti"}
            </button>
          </div>

          {/* Upload Progress */}
          {uploading && (
            <div className="mt-4 w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div className="h-full w-full bg-blue-500 animate-pulse"></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}