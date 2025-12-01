"use client";

import Navbar from "@/components/Navbar"; // Pastikan path import benar
import { 
  MapPin, 
  Calendar, 
  Target, 
  Users, 
  Clock, 
  Share2, 
  Leaf, 
  ChevronRight,
  ShieldCheck 
} from "lucide-react";

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  
  // Format Rupiah Helper
  const formatRupiah = (val: number) => 
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(val);

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      <Navbar />

      {/* Content Container */}
      <main className="px-6 py-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN - Detail Proyek */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Banner Image / Illustration */}
          <div className="bg-gradient-to-br from-[#6A6AFB] to-[#8A4FFF] rounded-2xl w-full h-80 flex flex-col justify-center items-center text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-white/5 backdrop-blur-[2px]"></div>
            <Leaf size={80} className="drop-shadow-lg relative z-10" />
            <span className="mt-4 font-bold text-lg relative z-10 bg-white/20 px-4 py-1 rounded-full border border-white/30 backdrop-blur-md">
                Kategori: Lingkungan
            </span>
          </div>

          {/* Judul & Organisasi */}
          <div>
             <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                Reboisasi Hutan Kalimantan
             </h1>
             <div className="flex items-center gap-2 mt-3 text-gray-600">
                <ShieldCheck size={20} className="text-[#00A651]" /> 
                <span className="font-medium">Diselenggarakan oleh</span>
                <span className="font-bold text-[#6A6AFB] bg-blue-50 px-2 py-0.5 rounded">Green Earth Foundation</span>
             </div>
          </div>

          {/* Deskripsi */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="font-bold text-xl text-gray-800 mb-4 border-l-4 border-[#00A651] pl-3">
              Tentang Proyek
            </h2>
            <div className="text-gray-600 space-y-4 leading-relaxed">
               <p>
                 Hutan Kalimantan adalah paru-paru dunia yang sedang kritis. Program reboisasi ini bertujuan untuk menanam <strong>100.000 pohon</strong> endemik di area seluas 50 hektar yang mengalami deforestasi parah akibat kebakaran hutan tahun lalu.
               </p>
               <p>
                 Kami tidak hanya menanam, tetapi juga melibatkan masyarakat adat lokal dalam proses pembibitan, penanaman, hingga perawatan pohon selama 3 tahun pertama untuk memastikan tingkat kelangsungan hidup pohon di atas 85%.
               </p>
               <p>
                 Setiap donasi Anda akan dikonversi menjadi bibit pohon yang dipantau menggunakan teknologi GPS dan dicatat dalam Smart Contract TerraFund untuk transparansi mutlak.
               </p>
            </div>
          </div>

          {/* Lokasi & Detail */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="font-bold text-xl text-gray-800 mb-6 border-l-4 border-[#6A6AFB] pl-3">
              Informasi Detail
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-3 rounded-xl text-orange-600">
                     <MapPin size={24} />
                  </div>
                  <div>
                     <p className="text-sm text-gray-500 font-medium">Lokasi Penanaman</p>
                     <p className="text-gray-800 font-bold">Kutai Kartanegara, Kalimantan Timur</p>
                  </div>
               </div>
               
               <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                     <Calendar size={24} />
                  </div>
                  <div>
                     <p className="text-sm text-gray-500 font-medium">Estimasi Durasi</p>
                     <p className="text-gray-800 font-bold">12 Bulan (Jan - Des 2025)</p>
                  </div>
               </div>

               <div className="flex items-start gap-4">
                  <div className="bg-purple-100 p-3 rounded-xl text-purple-600">
                     <Target size={24} />
                  </div>
                  <div>
                     <p className="text-sm text-gray-500 font-medium">Target Dampak</p>
                     <p className="text-gray-800 font-bold">100.000 Pohon Tertanam</p>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - Widget Donasi (Sticky) */}
        <div className="lg:col-span-1">
           <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 sticky top-24">
              <h3 className="font-bold text-lg text-gray-800 mb-1">Target Donasi</h3>
              
              <div className="mt-4 mb-6">
                 <p className="text-[#00A651] text-3xl font-extrabold">{formatRupiah(65000000)}</p>
                 <p className="text-gray-400 text-sm mt-1">
                    dari target <span className="font-medium text-gray-600">{formatRupiah(100000000)}</span>
                 </p>
                 
                 {/* Progress Bar */}
                 <div className="w-full bg-gray-100 h-3 rounded-full mt-3 overflow-hidden">
                    <div className="bg-[#00A651] h-full w-[65%] rounded-full shadow-sm"></div>
                 </div>
                 <p className="text-right text-xs text-[#00A651] font-bold mt-1">65% Tercapai</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                 <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <Users className="w-5 h-5 mx-auto text-indigo-500 mb-1" />
                    <p className="text-gray-800 font-bold">234</p>
                    <p className="text-xs text-gray-500">Donatur</p>
                 </div>
                 <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <Clock className="w-5 h-5 mx-auto text-orange-500 mb-1" />
                    <p className="text-gray-800 font-bold">45</p>
                    <p className="text-xs text-gray-500">Hari Lagi</p>
                 </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                 <a
                    // PERBAIKAN SYNTAX DI SINI (Gunakan Backtick)
                    href={`/donatur/donasi/bayar/${params.id}`} 
                    className="w-full block bg-[#00A651] hover:bg-[#009448] text-white py-3.5 rounded-xl font-bold text-center transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                 >
                    Donasi Sekarang
                 </a>

                 <button className="w-full border border-gray-200 text-gray-600 py-3.5 rounded-xl font-semibold hover:bg-gray-50 transition flex justify-center items-center gap-2">
                    <Share2 size={18} /> Bagikan Proyek
                 </button>
              </div>

              {/* Trust Badge */}
              <div className="mt-6 flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                 <ShieldCheck size={20} className="text-blue-600 mt-0.5 shrink-0" />
                 <p className="text-xs text-blue-700 leading-relaxed">
                    <strong>Donasi Aman.</strong> Dana disimpan dalam Smart Contract dan hanya cair jika NGO memberikan bukti laporan valid.
                 </p>
              </div>

           </div>
        </div>

      </main>
    </div>
  );
}