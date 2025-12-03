"use client";
// Tambahkan Loader2 ke import jika belum ada
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Send, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function RegisterMissionPage() {
  const { id } = useParams();
  const router = useRouter();
  const [motivation, setMotivation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Simulasi data misi yang diikuti
  const missionTitle = "Penanaman Pohon Mangrove";
  const missionId = id as string;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!motivation.trim()) {
      alert("Motivasi tidak boleh kosong!");
      return;
    }

    setIsSubmitting(true);

    // --- SIMULASI API POST REQUEST KE BACKEND ---
    setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        
        // Logika nyata: Kirim data motivasi ke backend untuk mencatat pendaftaran user di misi ini.
        
        // Setelah berhasil, arahkan kembali setelah beberapa detik
        setTimeout(() => {
            router.push("/relawan/"); // Arahkan ke daftar misi yang sudah diikuti
        }, 3000); 

    }, 1500); // Simulasi loading 1.5 detik
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center font-sans px-4 py-12">

      <div className="max-w-xl w-full bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 md:p-10">
        
        {isSuccess ? (
            /* TAMPILAN SUKSES */
            <div className="text-center py-10">
                <CheckCircle size={64} className="text-[#00A651] mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Pendaftaran Berhasil!</h1>
                <p className="text-lg text-gray-600">Anda berhasil mendaftar untuk misi {missionTitle}.</p>
                <p className="text-sm text-gray-500 mt-4">Anda akan diarahkan ke halaman misi yang diikuti...</p>
                <Link href="/relawan/" className="mt-6 inline-flex items-center gap-2 text-[#6A6AFB] hover:underline font-semibold">
                    Atau klik di sini jika tidak teralihkan.
                </Link>
            </div>
        ) : (
            /* TAMPILAN FORM */
            <>
                {/* Back Button */}
                <Link
                    href={`/proyek/${missionId}`} // Kembali ke halaman detail proyek
                    className="flex items-center gap-2 text-gray-700 mb-6 hover:text-[#6A6AFB] transition font-medium"
                >
                    <ArrowLeft size={18} />
                    Kembali ke Detail Proyek
                </Link>

                <h1 className="text-3xl font-bold text-gray-800 mb-1">
                    Daftar Misi: {missionTitle}
                </h1>
                <p className="text-gray-600 mb-8">
                    Isi formulir singkat di bawah ini untuk mengonfirmasi pendaftaran Anda.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Field Teks Motivasi */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Motivasi Bergabung <span className="text-red-500">*</span></label>
                        <textarea
                            value={motivation}
                            onChange={(e) => setMotivation(e.target.value)}
                            className="w-full h-32 border border-gray-300 rounded-xl p-4 text-gray-700 outline-none focus:ring-2 focus:ring-[#6A6AFB] transition bg-gray-50 resize-none"
                            placeholder="Contoh: Saya ingin berkontribusi dalam konservasi ekosistem pesisir..."
                            required
                            disabled={isSubmitting}
                        />
                    </div>
                    
                    {/* Konfirmasi Persyaratan */}
                    <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-100 rounded-xl">
                        <input type="checkbox" id="terms" required className="mt-1 w-4 h-4 text-[#00A651] bg-gray-100 border-gray-300 rounded focus:ring-[#00A651]" disabled={isSubmitting} />
                        <label htmlFor="terms" className="text-xs text-gray-600">
                            Saya mengonfirmasi bahwa saya siap mengikuti semua instruksi dan jadwal yang ditetapkan oleh Green Earth NGO
                        </label>
                    </div>


                    {/* Tombol Kirim */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`mt-6 w-full py-3.5 font-bold rounded-xl shadow-lg transition flex items-center justify-center gap-2 
                            ${isSubmitting ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white transform hover:scale-[1.01]'}
                        `}
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 size={20} className="animate-spin" /> Sedang Mendaftar...
                            </>
                        ) : (
                            <>
                                Kirim Pendaftaran
                                <Send size={18} />
                            </>
                        )}
                    </button>
                </form>
            </>
        )}
    </div>
  </div>
  );
}

