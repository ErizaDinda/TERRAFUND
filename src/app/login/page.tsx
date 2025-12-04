"use client"; // Wajib di Next.js App Router karena menggunakan Hooks (useState)

import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';

// --- Definisi Tipe Data untuk Respons Backend ---
interface UserData {
    id: number;
    name: string;
    email: string;
    role: 'donatur' | 'relawan' | 'admin' | string;
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

// --- Komponen Utama ---
export default function LoginPage() {
    const router = useRouter();

    // State untuk input dan UI
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false); 

    // --- Handle Login ---
    const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault(); 
        setIsLoading(true);
        setError(''); 

        const loginPayload = { email, password };
        const API_URL = 'http://localhost:3001/api/login';

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginPayload),
            });

            const data = await response.json();

            if (response.ok && data.status === 'Sukses') {
                const successData = data as LoginSuccessResponse;

                if (!successData.token) {
                    setError('Login sukses, tetapi token tidak ditemukan.');
                    setIsLoading(false);
                    return;
                }

                // Simpan token & user di localStorage
                localStorage.setItem('authToken', successData.token);
                localStorage.setItem('currentUser', JSON.stringify(successData.user));

                // Tentukan path berdasarkan role
                const userRole = successData.user.role.toLowerCase();
                let path = '/dashboard';
                if (userRole === 'donatur') path = '/donatur';
                else if (userRole === 'relawan') path = '/relawan';
                else if (userRole === 'admin') path = '/admin/dashboard';

                // Redirect ke dashboard nyata
                router.push(path);

            } else {
                const errorMessage = data.message || 'Login gagal. Periksa email & password.';
                setError(errorMessage);
            }
        } catch (err) {
            console.error('Network Error:', err);
            setError('Terjadi kesalahan koneksi. Pastikan backend berjalan.');
        } finally {
            setIsLoading(false);
        }
    };

    // --- Form Login ---
    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#6A6AFB] to-[#8A4FFF] p-4">
            <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-2xl">
                <div className="flex flex-col items-center mb-6">
                    <span className="text-4xl text-green-600">🌳</span>
                    <h1 className="text-2xl font-bold text-gray-800 mt-2">Login ke TerraFund</h1>
                    <p className="text-gray-500 text-sm mt-1">Berkontribusi untuk bumi yang lebih baik.</p>
                </div>

                <form onSubmit={handleLogin}> 
                    <div className="mb-4">
                        <label className="block mb-1 text-gray-700 font-medium">Email</label>
                        <input
                            type="email"
                            placeholder="nama@email.com"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-400 transition duration-150"
                            value={email}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} 
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block mb-1 text-gray-700 font-medium">Password</label>
                        <input
                            type="password"
                            placeholder="Masukkan password"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-400 transition duration-150"
                            value={password}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} 
                            required
                        />
                    </div>

                    {error && (
                        <p className="text-red-600 text-sm mb-4 bg-red-50 p-3 rounded-lg border border-red-300">
                            {error}
                        </p>
                    )}

                    <button 
                        type="submit"
                        className={`w-full text-white py-3 rounded-xl font-bold transition duration-200 shadow-md ${
                            isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 hover:shadow-lg'
                        }`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Sedang Memproses...' : 'Login'}
                    </button>
                </form>
            </div>
        </main>
    );
}
