"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { FaLeaf } from "react-icons/fa";

export default function DonasiPage() {
  const [amount, setAmount] = useState("50000");

  const quickAmounts = [20000, 50000, 100000];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 to-purple-500">
      {/* Navbar */}
      <Navbar />

      {/* Wrapper */}
      <div className="flex justify-center items-center py-20 px-4">
        <div className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-xl">
          
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-2">
              <FaLeaf className="text-green-600 text-3xl" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Donasi untuk Proyek</h1>
            <p className="text-gray-600">Reboisasi Hutan Kalimantan</p>
          </div>

          {/* Nominal Donasi */}
          <div className="mb-4">
            <label className="font-medium text-gray-700">Nominal Donasi (Rp)</label>
            <Input
              type="number"
              className="mt-2"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            {/* Quick Buttons */}
            <div className="flex gap-3 mt-3">
              {quickAmounts.map((value) => (
                <button
                  key={value}
                  className="px-4 py-2 border border-green-500 text-green-600 rounded-lg hover:bg-green-50 transition"
                  onClick={() => setAmount(String(value))}
                >
                  Rp {value.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          {/* Metode Pembayaran */}
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

          {/* Button */}
          <Button className="w-full bg-green-500 hover:bg-green-600 text-white py-6 text-lg font-semibold">
            Lanjut Pembayaran →
          </Button>

          {/* Blockchain Transparency */}
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
