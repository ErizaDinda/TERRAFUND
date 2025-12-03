"use client"; // Wajib di Next.js App Router karena menggunakan Hooks (useState, useRouter)

import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation'; // Hook navigasi bawaan Next.js

// --- Definisi Tipe Data ---

interface UserData {
    id: number;
    name: string;
    email: string;
    role: 'donatur' | 'relawan' | 'admin' | string; // Mendefinisikan role yang mungkin
    phone: string | null;
    wallet_address: string;
    level: number;
    xp: number;
}

interface LoginSuccessResponse {
    status: 'Sukses';
    message: string;
    token: string;
    user: UserData;
}

interface LoginErrorResponse {
    status: 'Gagal';
    message: string;
}

// --- Komponen Utama ---

export default function LoginPage() {
    // State untuk input dan UI
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false); 

    // Hook navigasi Next.js
    const router = useRouter();

    /**
     * Menangani submit form login dan melakukan fetch ke backend.
     * Setelah sukses, navigasi dilakukan berdasarkan peran pengguna (role).
     */
    const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault(); 
        setIsLoading(true);
        setError(''); 

        const loginPayload = {
            email: email,
            password: password,
        };

        try {
            const response = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginPayload),
            });

            // Pastikan kita mendapatkan respons JSON dari server
            const data = await response.json();

            // Cek status HTTP dan status dari data respons
            if (response.ok && data.status === 'Sukses') {
                const successData = data as LoginSuccessResponse;
                
                // 1. Simpan data otentikasi
                localStorage.setItem('authToken', successData.token);
                localStorage.setItem('currentUser', JSON.stringify(successData.user)); 

                // 2. Tentukan jalur navigasi berdasarkan Role
                const userRole = successData.user.role.toLowerCase(); 
                let redirectPath: string;

                switch (userRole) {
                    case 'donatur':
                        redirectPath = '/donatur'; // Contoh: /donatur
                        break;
                    case 'relawan':
                        redirectPath = '/relawan'; // Contoh: /relawan
                        break;
                    case 'admin':
                        redirectPath = '/admin/dashboard'; // Contoh: /admin/dashboard
                        break;
                    default:
                        // Jalur default/fallback jika role tidak dikenal
                        redirectPath = '/dashboard'; 
                        break;
                }

                // 3. Navigasi menggunakan Next.js Router
                router.push(redirectPath);

            } else {
                // Login gagal: Ambil pesan error dari backend atau pesan default
                const errorMessage = data.message || 'Login gagal. Periksa email dan password Anda.';
                setError(errorMessage);
            }

        } catch (err) {
            // Tangani error jaringan
            console.error('Network Error:', err);
            setError('Terjadi kesalahan koneksi. Server tidak merespons. Pastikan backend berjalan.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="pt-20 min-h-screen flex items-center justify-center bg-gradient-to-br from-[#6A6AFB] to-[#8A4FFF] p-4">
            <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-2xl">
                <div className="flex flex-col items-center mb-6">
                    <span className="text-3xl">🌍</span>
                    <h1 className="text-xl font-semibold text-gray-800 mt-2">
                        Login ke TerraFund
                    </h1>
                </div>

                <form onSubmit={handleLogin}> 
                    <div className="mb-4">
                        <label className="block mb-1 text-gray-700">Email</label>
                        <input
                            type="email"
                            placeholder="nama@email.com"
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                            value={email}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} 
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block mb-1 text-gray-700">Password</label>
                        <input
                            type="password"
                            placeholder="Masukkan password"
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                            value={password}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} 
                            required
                        />
                    </div>
                    
                    {/* Pesan Error */}
                    {error && (
                        <p className="text-red-500 text-sm mb-4 bg-red-100 p-2 rounded-lg border border-red-300">
                            {error}
                        </p>
                    )}

                    {/* Tombol Login */}
                    <button 
                        type="submit"
                        className={`w-full text-white py-2 rounded-lg font-medium transition ${
                            isLoading 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-green-500 hover:bg-green-600'
                        }`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                {/* SVG Loading Spinner */}
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Sedang Memproses...
                            </div>
                        ) : 'Login'}
                    </button>
                </form>

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