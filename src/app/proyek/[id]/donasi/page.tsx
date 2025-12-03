"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar"; // ← PERUBAHAN SATU-SATUNYA

// Asumsi komponen UI ini tersedia (Simulasi)
const Input: React.FC<{ placeholder?: string; type?: string; className?: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; }> = ({ placeholder, type = 'text', className, value, onChange }) => (
    <input 
        type={type} 
        value={value}
        onChange={onChange}
        placeholder={placeholder} 
        className={`w-full mt-2 px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-xl font-bold ${className || ''}`}
        required
    />
);

const Button: React.FC<{ children: React.ReactNode; className?: string; }> = ({ children, className }) => (
    <button className={`w-full py-2 px-4 rounded-lg text-white font-medium transition-colors ${className || ''}`}>
        {children}
    </button>
);

const Select: React.FC<{ children: React.ReactNode, defaultValue: string }> = ({ children, defaultValue }) => (
    <select className="w-full mt-2 px-3 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-500">
        {children}
    </select>
);

const SelectTrigger: React.FC<{ children: React.ReactNode, className?: string }> = ({ children }) => <div>{children}</div>;
const SelectValue: React.FC<{ placeholder: string }> = ({ placeholder }) => <option disabled>{placeholder}</option>;
const SelectContent: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;
const SelectItem: React.FC<{ value: string, children: React.ReactNode }> = ({ value, children }) => <option value={value}>{children}</option>;

import { FaLeaf } from "react-icons/fa";

export default function DonasiPage({ params }: { params: { id: string } }) {
    const projectId = params.id;
    const [amount, setAmount] = useState("50000");

    const quickAmounts = [20000, 50000, 100000];
    
    const handleDonasiSubmit = () => {
        console.log(`Donasi Rp ${amount} untuk Proyek ID: ${projectId}`);
        alert(`Redirecting ke halaman pembayaran untuk Proyek ID ${projectId} sebesar Rp ${amount}.`);
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-400 to-purple-500">
            {/* Navbar */}
            <Navbar />

            <div className="flex justify-center items-center py-20 px-4">
                <div className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-xl">
                    
                    <div className="text-center mb-6">
                        <div className="flex justify-center mb-2">
                            <FaLeaf className="text-green-600 text-3xl" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800">Donasi untuk Proyek</h1>
                        <p className="text-gray-600">Proyek ID: {projectId} (Reboisasi Hutan Kalimantan)</p>
                    </div>

                    <div className="mb-4">
                        <label className="font-medium text-gray-700">Nominal Donasi (Rp)</label>
                        <Input
                            type="number"
                            className="mt-2"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />

                        <div className="flex gap-3 mt-3 flex-wrap">
                            {quickAmounts.map((value) => (
                                <button
                                    key={value}
                                    className={`px-4 py-2 border rounded-lg hover:bg-green-50 transition text-sm font-medium ${
                                        Number(amount) === value 
                                        ? 'bg-green-500 text-white border-green-600'
                                        : 'border-green-500 text-green-600'
                                    }`}
                                    onClick={() => setAmount(String(value))}
                                >
                                    Rp {value.toLocaleString()}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="font-medium text-gray-700">Metode Pembayaran</label>

                        <Select defaultValue="midtrans">
                            <SelectTrigger className="mt-2">
                                <SelectValue placeholder="Pilih metode" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="midtrans">Midtrans (Credit/Debit Card)</SelectItem>
                                <SelectItem value="gopay">GoPay</SelectItem>
                                <SelectItem value="bank">Transfer Bank</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button className="w-full bg-green-500 hover:bg-green-600 text-white py-6 text-lg font-semibold">
                        Lanjut Pembayaran →
                    </Button>

                    <div className="bg-green-50 border border-green-200 mt-6 p-4 rounded-lg">
                        <p className="font-semibold text-gray-700 flex items-center gap-2">
                            🧾 Blockchain Transparency
                        </p>
                        <p className="text-gray-600 text-sm mt-1">
                            Setiap donasi akan dicatat secara otomatis di blockchain Polygon untuk transparansi penuh.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
