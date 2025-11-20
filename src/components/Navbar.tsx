"use client";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between py-4 px-6 bg-white shadow-sm">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🌍</span>
        <h1 className="text-xl font-semibold text-green-600">TerraFund</h1>
      </div>

      <div className="flex items-center gap-6 text-gray-700 font-medium">
        <a href="/" className="hover:text-green-600">Home</a>
        <a href="/proyek" className="hover:text-green-600">Proyek</a>

        {/* 👇 INI YANG BARU */}
        <a href="/#tentang" className="hover:text-green-600">Tentang</a>

        <a href="/login" className="hover:text-green-600">Login</a>
        <a
          href="/donasi/1"
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          Donasi Sekarang
        </a>
      </div>
    </nav>
  );
}
