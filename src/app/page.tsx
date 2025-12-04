"use client";

import React from "react";

// Helper untuk format Rupiah
const formatRupiah = (val: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(val);

export default function HomePage() {
  return (
    <main className="w-full">

      {/* NAVBAR */}
      <nav className="w-full flex items-center justify-between py-4 px-6 bg-white shadow-md relative z-50">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌍</span>
          <h1 className="text-xl font-semibold text-green-600">TerraFund</h1>
        </div>

        {/* Menu */}
        <div className="flex items-center gap-4">
          <a
            href="/"
            className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-green-100 transition-colors font-medium text-gray-700"
          >
            Home
          </a>

          <a
            href="/login"
            className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-green-100 transition-colors font-medium text-gray-700"
          >
            Login
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
                href="/register" 
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

          <div className="bg-white rounded-xl p-6 shadow-xl text-center border-t-4 border-[#6A6AFB]">
            <span className="text-4xl">🔗</span>
            <h4 className="font-bold text-green-600 mt-4">Transparansi Blockchain</h4>
            <p className="text-gray-600 mt-2">
              Setiap donasi tercatat secara on-chain dan dapat diverifikasi publik.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-xl text-center border-t-4 border-[#8A4FFF]">
            <span className="text-4xl">💰</span>
            <h4 className="font-bold text-green-600 mt-4">Reward Token (TTK)</h4>
            <p className="text-gray-600 mt-2">
              Relawan mendapatkan TerraToken dari aksi sosial.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-xl text-center border-t-4 border-[#00A651]">
            <span className="text-4xl">🛍️</span>
            <h4 className="font-bold text-green-600 mt-4">Eco Marketplace</h4>
            <p className="text-gray-600 mt-2">
              Tukar token dengan merchandise ramah lingkungan.
            </p>
          </div>

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
          className="mt-8 inline-block bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg"
        >
          Mulai Sekarang
        </a>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

          <div>
            <h4 className="text-xl font-semibold text-white">TerraFund</h4>
            <p className="mt-2 text-sm">
              Platform donasi transparan berbasis blockchain untuk masa depan yang lebih baik.
            </p>
          </div>

          <div>
            <h5 className="text-white font-semibold mb-3">Menu</h5>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-white transition">Home</a></li>
              <li><a href="/proyek" className="hover:text-white transition">Proyek</a></li>
              <li><a href="/tentang" className="hover:text-white transition">Tentang</a></li>
              <li><a href="/kontak" className="hover:text-white transition">Kontak</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-semibold mb-3">Bantuan</h5>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition">Cara Donasi</a></li>
              <li><a href="#" className="hover:text-white transition">Kebijakan Privasi</a></li>
              <li><a href="#" className="hover:text-white transition">Syarat & Ketentuan</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-semibold mb-3">Kontak</h5>
            <ul className="space-y-2 text-sm">
              <li>📧 support@terrafund.id</li>
              <li>📞 +62 812-3456-7890</li>
              <li>📍 Jakarta, Indonesia</li>
            </ul>
          </div>

        </div>

        <div className="text-center mt-10 text-gray-500 text-sm">
          © 2024 TerraFund. All rights reserved.
        </div>
      </footer>

    </main>
  );
}
