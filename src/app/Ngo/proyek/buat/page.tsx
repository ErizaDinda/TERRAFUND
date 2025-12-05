  "use client";

  import { useState, useEffect } from "react";
  import { useRouter } from "next/navigation";
  import NgoNavbar from "@/components/Ngo/NgoNavbar";
  import { Loader2, Calendar } from "lucide-react";

  // Tipe data untuk Kategori
  interface Category {
    id: number;
    name: string;
    icon: string;
  }

  export default function CreateProjectPage() {
    const router = useRouter();
    
    // State UI
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoadingCategories, setIsLoadingCategories] = useState(true);
    
    // State Data
    const [categories, setCategories] = useState<Category[]>([]);
    const [orgId, setOrgId] = useState<number | null>(null);

    // Form State
    const [form, setForm] = useState({
      nama: "",
      categoryId: "",
      deskripsi: "",
      lokasi: "",
      targetDana: "",
      startDate: "",
      endDate: "",
    });

    // 1. FETCH KATEGORI & USER ID SAAT LOAD
    useEffect(() => {
      const initData = async () => {
        try {
          // A. Ambil User ID dari LocalStorage
          const storedUser = localStorage.getItem("currentUser");
          if (storedUser) {
            const user = JSON.parse(storedUser);
            setOrgId(user.id);
          } else {
            alert("Sesi habis, silakan login kembali.");
            router.push("/login");
            return;
          }

          // B. Fetch Kategori dari API
          const res = await fetch("http://localhost:3001/api/projects/categories");
          if (res.ok) {
            const data = await res.json();
            setCategories(data);
          } else {
            console.error("Gagal mengambil kategori");
          }
        } catch (err) {
          console.error("Error init data:", err);
        } finally {
          setIsLoadingCategories(false);
        }
      };

      initData();
    }, [router]);

    const handleChange = (e: any) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Helper: Hitung Durasi Bulan
    const calculateDuration = (start: string, end: string) => {
      if (!start || !end) return 0;
      const startDate = new Date(start);
      const endDate = new Date(end);
      
      let months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
      months -= startDate.getMonth();
      months += endDate.getMonth();
      
      return months <= 0 ? 1 : months;
    };

    // 2. SUBMIT FORM KE BACKEND
    const handleSubmit = async (e: any) => {
      e.preventDefault();
      
      const token = localStorage.getItem("authToken");
      if (!orgId || !token) {
        alert("Sesi tidak valid. Silakan login ulang.");
        return;
      }

      setIsSubmitting(true);

      try {
        // Siapkan Payload sesuai struktur Database Backend (snake_case)
        const duration = calculateDuration(form.startDate, form.endDate);

        const payload = {
          title: form.nama,
          organization_id: orgId,
          category_id: parseInt(form.categoryId),
          description: form.deskripsi,
          location: form.lokasi,
          duration_months: duration,
          target_amount: parseInt(form.targetDana),
          start_date: form.startDate,
          end_date: form.endDate,
          
          // Placeholder Image (Default)
          thumbnail: "/images/projects/default-thumb.png",
          banner_image: "/images/projects/default-banner.png"
        };

        console.log("Mengirim Payload:", payload);

        // Kirim POST ke Endpoint
        const response = await fetch("http://localhost:3001/api/projects", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // Sertakan Token
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Gagal mengajukan proyek");
        }

        const result = await response.json();
        console.log("Proyek Berhasil Dibuat:", result);

        alert("Proyek berhasil diajukan! Menunggu validasi Admin.");
        router.push("/Ngo/proyek"); 

      } catch (error: any) {
        console.error("Error creating project:", error);
        alert(`Gagal: ${error.message}`);
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <main className="w-full pb-24 bg-gray-50 min-h-screen">
        <NgoNavbar />

        {/* Header */}
        <section className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-14 text-white shadow-lg">
          <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold">Buat Proyek Baru</h2>
              <p className="mt-2 text-indigo-100">Isi informasi berikut. Proyek akan ditinjau Admin sebelum tayang.</p>
          </div>
        </section>

        {/* Form */}
        <section className="max-w-4xl mx-auto p-6 -mt-10 bg-white shadow-lg rounded-2xl border border-gray-100 z-10 relative">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">

            {/* Nama Proyek */}
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
                disabled={isSubmitting}
              />
            </div>

            {/* Kategori (Dinamis dari API) */}
            <div>
              <label className="font-semibold text-gray-700">Kategori *</label>
              <div className="relative">
                  <select
                  name="categoryId"
                  value={form.categoryId}
                  onChange={handleChange}
                  className="w-full mt-2 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-white"
                  required
                  disabled={isSubmitting || isLoadingCategories}
                  >
                  <option value="">
                      {isLoadingCategories ? "Memuat kategori..." : "Pilih kategori"}
                  </option>
                  
                  {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                      {cat.icon} {cat.name}
                      </option>
                  ))}
                  </select>
                  <div className="absolute right-4 top-[60%] -translate-y-1/2 pointer-events-none text-gray-500">▼</div>
              </div>
            </div>

            {/* Deskripsi */}
            <div>
              <label className="font-semibold text-gray-700">Deskripsi Detail *</label>
              <textarea
                name="deskripsi"
                rows={4}
                value={form.deskripsi}
                onChange={handleChange}
                className="w-full mt-2 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Ceritakan tujuan, manfaat, dan rencana eksekusi proyek..."
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Lokasi */}
            <div>
              <label className="font-semibold text-gray-700">Lokasi Pelaksanaan *</label>
              <input
                type="text"
                name="lokasi"
                value={form.lokasi}
                onChange={handleChange}
                className="w-full mt-2 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Ex: Kalimantan Timur, Indonesia"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Target & Tanggal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="font-semibold text-gray-700">Target Dana (Rp) *</label>
                <input
                  type="number"
                  name="targetDana"
                  value={form.targetDana}
                  onChange={handleChange}
                  className="w-full mt-2 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Ex: 100000000"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700 flex items-center gap-2">
                  <Calendar size={16}/> Tanggal Mulai *
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleChange}
                  className="w-full mt-2 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700 flex items-center gap-2">
                  <Calendar size={16}/> Tanggal Selesai *
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={form.endDate}
                  onChange={handleChange}
                  className="w-full mt-2 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="font-semibold text-gray-500">Estimasi Durasi</label>
                <div className="w-full mt-2 p-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-600">
                  {calculateDuration(form.startDate, form.endDate)} Bulan
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold transition shadow-md flex justify-center items-center gap-2 ${isSubmitting ? 'bg-indigo-400 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={20} /> Sedang Mengirim Data...
                </>
              ) : (
                "Ajukan Proyek"
              )}
            </button>

          </form>
        </section>
      </main>
    );
  }