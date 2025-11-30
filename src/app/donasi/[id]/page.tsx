"use client";

import Navbar from "@/components/Navbar";
import { useState } from "react";
import { FaLeaf, FaFire, FaShareAlt } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// --- BAGIAN PENTING BLOCKCHAIN ---
import { ethers } from "ethers";
// Pastikan path ini benar (../../config)
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../../config"; 

export default function DonasiPage() {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // --- LOGIKA DONASI (PERBAIKAN FINAL) ---
  const handleDonate = async () => {
    // 1. Validasi Input
    if (!amount) return alert("Isi jumlah donasi dulu!");
    if (!method) return alert("Pilih metode pembayaran!");

    // 2. Jika pilih Crypto
    if (method === "crypto") {
      try {
        // Cek MetaMask
        if (!(window as any).ethereum) {
          return alert("MetaMask tidak ditemukan! Tolong install MetaMask.");
        }

        setIsLoading(true);

        // --- A. PAKSA PINDAH NETWORK KE AMOY (PENTING) ---
        const chainId = '0x13882'; // 80002 (Amoy) dalam Hex
        try {
          await (window as any).ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId }],
          });
        } catch (switchError: any) {
          // Kalau jaringan belum ada, tambahkan otomatis
          if (switchError.code === 4902) {
            try {
              await (window as any).ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId,
                    chainName: 'Polygon Amoy Testnet',
                    rpcUrls: ['https://rpc.ankr.com/polygon_amoy'],
                    nativeCurrency: {
                      name: 'POL',
                      symbol: 'POL',
                      decimals: 18,
                    },
                    blockExplorerUrls: ['https://amoy.polygonscan.com/'],
                  },
                ],
              });
            } catch (addError) {
              console.error("Gagal tambah network:", addError);
              throw new Error("Gagal menambahkan jaringan Polygon Amoy.");
            }
          } else {
            console.error("Gagal ganti network:", switchError);
            throw new Error("Gagal mengganti jaringan. Cek MetaMask Anda.");
          }
        }

        // --- B. SETUP PROVIDER SETELAH GANTI NETWORK ---
        // Kita inisialisasi ulang provider biar dia sadar sudah pindah jaringan
        const provider = new ethers.BrowserProvider((window as any).ethereum);
        const signer = await provider.getSigner();
        
        // Cek ulang apakah benar-benar sudah di Amoy (80002)
        const network = await provider.getNetwork();
        if (network.chainId !== BigInt(80002)) {
           throw new Error("Jaringan salah! Pastikan MetaMask Anda terhubung ke Polygon Amoy.");
        }

        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

        // --- C. KIRIM TRANSAKSI ---
        const tx = await contract.donate("Reboisasi-Kalimantan", {
          value: ethers.parseEther("0.00001"), // Nominal kecil biar murah
          gasLimit: 500000 // Paksa gas limit biar gak error estimasi
        });

        console.log("Hash Transaksi:", tx.hash);
        alert("🔗 Koneksi Berhasil! Sedang memproses transaksi...");

        // Tunggu sampai sukses
        await tx.wait();

        alert("✅ SUKSES! Donasi kamu tercatat permanen di Blockchain Polygon! 🎉");
        
      } catch (error: any) {
        console.error("Error Donasi:", error);
        alert("Gagal: " + (error.reason || error.message || "Transaksi dibatalkan"));
      } finally {
        setIsLoading(false);
      }
    } else {
      // Logika Non-Crypto
      alert(`Terima kasih! Donasi Rp ${amount} via ${method} berhasil dicatat (Simulasi).`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="px-8 py-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* KIRI - INFO */}
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-r from-indigo-400 to-purple-500 rounded-xl w-full h-64 flex justify-center items-center">
            <FaLeaf className="text-white text-6xl" />
          </div>
          <h1 className="mt-6 text-3xl font-bold text-gray-800">Donasi untuk Reboisasi Hutan Kalimantan</h1>
          <p className="text-gray-600 mt-1 flex items-center gap-2">
            <FaLeaf className="text-green-600" /> Green Earth Foundation
          </p>
          <div className="bg-white p-6 rounded-xl shadow-md mt-6">
            <h2 className="font-semibold text-lg flex items-center gap-2">
              <FaFire className="text-red-500" /> Mengapa Proyek Ini Penting?
            </h2>
            <p className="text-gray-600 mt-3 leading-relaxed">
              Dengan berdonasi, Anda membantu menanam kembali pohon-pohon yang hilang.
              (Transaksi Crypto akan tercatat transparan di Blockchain).
            </p>
          </div>
        </div>

        {/* KANAN - FORM */}
        <div className="bg-white p-6 rounded-xl shadow-md h-fit">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-4">
            🌱 Formulir Donasi
          </h3>

          <label className="text-gray-700 font-medium">Jumlah Donasi (Rp)</label>
          <Input
            type="number"
            placeholder="Contoh: 50000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-2"
          />

          <label className="text-gray-700 font-medium mt-4 block">Metode Pembayaran</label>
          <Select onValueChange={setMethod}>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Pilih metode pembayaran" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="crypto">🔗 Crypto (Polygon Blockchain)</SelectItem>
              <div className="h-px bg-gray-200 my-1"></div>
              <SelectItem value="bank">Transfer Bank</SelectItem>
              <SelectItem value="ewallet">E-Wallet (OVO, Dana, GoPay)</SelectItem>
              <SelectItem value="cc">Kartu Kredit</SelectItem>
            </SelectContent>
          </Select>

          <Button 
            onClick={handleDonate}
            disabled={isLoading}
            className={`w-full mt-6 text-white transition
              ${method === 'crypto' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-green-600 hover:bg-green-700'}
            `}
          >
            {isLoading ? "Memproses..." : method === 'crypto' ? "Konfirmasi Donasi (Web3)" : "Konfirmasi Donasi"}
          </Button>

          <Button
            variant="outline"
            className="w-full mt-3 border-green-600 text-green-600 hover:bg-green-50 flex gap-2"
          >
            <FaShareAlt /> Bagikan Proyek
          </Button>
        </div>

      </main>
    </div>
  );
}