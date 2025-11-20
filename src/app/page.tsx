export default function HomePage() {
  return (
    <main className="w-full">

      {/* NAVBAR */}
      <nav className="w-full flex items-center justify-between py-4 px-6 bg-white shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌍</span>
          <h1 className="text-xl font-semibold text-green-600">TerraFund</h1>
        </div>

        <div className="flex items-center gap-6 text-gray-700 font-medium">
          <a href="/" className="hover:text-green-600">Home</a>
          <a href="/proyek" className="hover:text-green-600">Proyek</a>
          <a href="/tentang" className="hover:text-green-600">Tentang</a>
          <a href="/login" className="hover:text-green-600">Login</a>
          <a href="/donasi"
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
            Donasi Sekarang
          </a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="w-full bg-gradient-to-br from-[#6A6AFB] to-[#8A4FFF] px-6 py-20 text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* Text */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Transparansi Donasi Berbasis Blockchain
            </h2>
            <p className="mt-4 text-lg text-gray-200">
              Bangun aksi sosial dan lingkungan yang lebih akuntabel dan berdampak.
            </p>

            <div className="flex gap-4 mt-6">
              <a
                href="/donasi"
                className="bg-green-500 px-5 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
              >
                Donasi Sekarang
              </a>
              <a
                href="/register"
                className="border border-white px-5 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition"
              >
                Jadi Relawan
              </a>
            </div>
          </div>

          {/* Image Placeholder */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl h-72 flex items-center justify-center shadow-lg">
            <span className="text-6xl">🌳</span>
          </div>

        </div>
      </section>

      {/* FITUR UTAMA */}
      <section className="py-20 px-6 bg-gray-50">
        <h3 className="text-3xl font-bold text-center mb-12">Fitur Utama</h3>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="bg-white rounded-xl p-6 shadow text-center">
            <span className="text-4xl">🔗</span>
            <h4 className="font-bold text-green-600 mt-4">Transparansi Blockchain</h4>
            <p className="text-gray-600 mt-2">
              Setiap donasi tercatat secara on-chain dan dapat diverifikasi publik.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow text-center">
            <span className="text-4xl">🌑</span>
            <h4 className="font-bold text-green-600 mt-4">Reward Token (TTK)</h4>
            <p className="text-gray-600 mt-2">
              Relawan mendapatkan TerraToken dari aksi sosial.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow text-center">
            <span className="text-4xl">🛒</span>
            <h4 className="font-bold text-green-600 mt-4">Eco Marketplace</h4>
            <p className="text-gray-600 mt-2">
              Tukar token dengan merchandise ramah lingkungan.
            </p>
          </div>

        </div>
      </section>

      {/* PROYEK BERJALAN */}
      <section className="py-20 px-6">
        <h3 className="text-3xl font-bold text-center mb-12">
          Proyek Sosial Sedang Berjalan
        </h3>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Card Proyek */}
          {[
            {
              title: "Reboisasi Hutan Kalimantan",
              org: "Green Earth Foundation",
              raised: 65000000,
              target: 100000000,
              icon: "🌱",
            },
            {
              title: "Air Bersih untuk Desa",
              org: "Water for Life",
              raised: 21000000,
              target: 50000000,
              icon: "💧",
            },
            {
              title: "Perpustakaan Digital Anak",
              org: "Education Hub",
              raised: 40000000,
              target: 50000000,
              icon: "📚",
            },
          ].map((p, i) => (
            <div key={i} className="bg-white rounded-xl shadow overflow-hidden">
              <div className="h-40 bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-6xl">
                {p.icon}
              </div>

              <div className="p-5">
                <h4 className="text-lg font-bold">{p.title}</h4>
                <p className="text-sm text-gray-600">{p.org}</p>

                <div className="mt-4">
                  <p className="text-green-600 font-semibold">
                    Rp {p.raised.toLocaleString("id-ID")}
                  </p>
                  <p className="text-gray-500 text-sm">
                    / Rp {p.target.toLocaleString("id-ID")}
                  </p>
                </div>

                <a
                  href={`/proyek/${i + 1}`}
                  className="mt-4 block w-full bg-green-500 text-white py-2 rounded-lg text-center font-medium hover:bg-green-600 transition"
                >
                  Lihat Detail
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AJAKAN AKSI */}
      <section className="bg-green-600 text-white py-20 px-6 text-center">
        <h3 className="text-3xl font-bold">
          Ikut membangun masa depan yang lebih hijau bersama TerraFund
        </h3>
        <p className="mt-4 text-white/90">
          Mari bergabung dalam gerakan transparansi dan akuntabilitas donasi
        </p>

        <a
          href="/register"
          className="mt-8 inline-block bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Mulai Sekarang
        </a>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

          <div>
            <h4 className="text-xl font-semibold text-white">TerraFund</h4>
            <p className="mt-2">
              Platform donasi transparan berbasis blockchain untuk masa depan yang lebih baik.
            </p>
            <div className="flex gap-4 mt-3 text-xl">
              <span>🐦</span>
              <span>📘</span>
              <span>📸</span>
              <span>💼</span>
            </div>
          </div>

          <div>
            <h5 className="text-white font-semibold mb-3">Menu</h5>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/proyek" className="hover:text-white">Proyek</a></li>
              <li><a href="/tentang" className="hover:text-white">Tentang</a></li>
              <li><a href="/kontak" className="hover:text-white">Kontak</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-semibold mb-3">Bantuan</h5>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">FAQ</a></li>
              <li><a href="#" className="hover:text-white">Cara Donasi</a></li>
              <li><a href="#" className="hover:text-white">Kebijakan Privasi</a></li>
              <li><a href="#" className="hover:text-white">Syarat & Ketentuan</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-semibold mb-3">Kontak</h5>
            <ul className="space-y-2">
              <li>📧 support@terrafund.id</li>
              <li>📞 +62 812-3456-7890</li>
              <li>📍 Jakarta, Indonesia</li>
            </ul>
          </div>

        </div>

        <div className="text-center mt-10 text-gray-500">
          © 2024 TerraFund. All rights reserved.
        </div>
      </footer>

    </main>
  );
}