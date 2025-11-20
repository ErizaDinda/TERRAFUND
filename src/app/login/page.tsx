export default function LoginPage() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#6A6AFB] to-[#8A4FFF] p-4">
            <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-2xl">

                <div className="flex flex-col items-center mb-6">
                    <span className="text-3xl">🌍</span>
                    <h1 className="text-xl font-semibold text-gray-800 mt-2">
                        Login ke TerraFund
                    </h1>
                </div>

                <div className="mb-4">
                    <label className="block mb-1 text-gray-700">Email</label>
                    <input
                        type="email"
                        placeholder="nama@email.com"
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1 text-gray-700">Password</label>
                    <input
                        type="password"
                        placeholder="Masukkan password"
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                </div>

                <button className="w-full bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition">
                    Login
                </button>

                <div className="flex items-center my-6">
                    <div className="flex-grow h-px bg-gray-300"></div>
                    <span className="mx-3 text-gray-500">atau</span>
                    <div className="flex-grow h-px bg-gray-300"></div>
                </div>



                <p className="text-center text-sm mt-5">
                    Belum punya akun?{" "}
                    <a href="/register" className="text-green-600 font-semibold">
                        Daftar
                    </a>
                </p>


            </div>
        </main>
    );
}
