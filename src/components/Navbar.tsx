"use client";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between py-4 px-6 bg-white shadow-md relative z-50">

      <div className="flex items-center gap-2">
        <span className="text-2xl">🌍</span>
        <h1 className="text-xl font-semibold text-green-600">TerraFund</h1>
      </div>

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
  );
}
