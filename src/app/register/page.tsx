"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";
import { motion } from "framer-motion";

// --- Simulasi Komponen UI ---
interface CardProps { children: React.ReactNode; className?: string; }
interface CardHeaderProps { children: React.ReactNode; }
interface CardTitleProps { children: React.ReactNode; className?: string; }
interface CardContentProps { children: React.ReactNode; }
interface ButtonProps { children: React.ReactNode; className?: string; onClick?: () => void; type?: 'button' | 'submit'; disabled?: boolean; }
interface InputProps { placeholder?: string; type?: string; value: string; onChange: (e: ChangeEvent<HTMLInputElement>) => void; name: string; }
interface LabelProps { children: React.ReactNode; }

const Card: React.FC<CardProps> = ({ children, className }) => <div className={`bg-white rounded-xl ${className || ''}`}>{children}</div>;
const CardHeader: React.FC<CardHeaderProps> = ({ children }) => <div className="p-6">{children}</div>;
const CardTitle: React.FC<CardTitleProps> = ({ children, className }) => <h1 className={`text-xl font-bold ${className || ''}`}>{children}</h1>;
const CardContent: React.FC<CardContentProps> = ({ children }) => <div className="p-6 pt-0">{children}</div>;
const Button: React.FC<ButtonProps> = ({ children, className, onClick, type = 'button', disabled = false }) => (
    <button 
        type={type} 
        onClick={onClick} 
        disabled={disabled}
        className={`w-full py-2 px-4 rounded-lg text-white font-medium transition-colors ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'} ${className || ''}`}
    >
        {children}
    </button>
);
const Input: React.FC<InputProps> = ({ placeholder, type = 'text', value, onChange, name }) => (
    <input 
        type={type} 
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder} 
        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        required
    />
);
const Label: React.FC<LabelProps> = ({ children }) => <label className="text-sm font-medium text-gray-700">{children}</label>;
// --- End Sim UI ---


export default function RegisterPage() {
  const REGISTER_ENDPOINT = "http://localhost:3001/api/register";

  const [role, setRole] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // popup sukses
  const [showPopup, setShowPopup] = useState(false);

  const roles = [
    { id: "donatur", icon: "❤️", title: "Donatur", desc: "Berdonasi untuk proyek sosial" },
    { id: "relawan", icon: "🤝", title: "Relawan", desc: "Ikut aksi sosial dan dapatkan token" },
    { id: "ngo", icon: "🏢", title: "NGO", desc: "Buat dan kelola proyek" },
  ];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!role) {
      setError("Pilih tipe akun (role) terlebih dahulu.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    const payload = {
      ...formData,
      role: role,
    };

    try {
      const response = await fetch(REGISTER_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.status === "Sukses") {
        setSuccess(`Pendaftaran berhasil sebagai ${role}!`);
        setShowPopup(true); // tampilkan popup sukses

        // Simpan login
        if (result.user_id) {
          localStorage.setItem("terraFundUserId", result.user_id.toString());
        }
        if (result.role) {
          localStorage.setItem("terraFundUserRole", result.role);
        }

        // Redirect otomatis
        setTimeout(() => {
          window.location.href = "/login";
        }, 1800);

      } else {
        setError(result.message || "Pendaftaran gagal. Periksa input Anda.");
      }
    } catch (err) {
      console.error("Registration failed:", err);
      setError("Gagal terhubung ke server BE. Pastikan server berjalan.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-6 relative">
      
      {/* POPUP SUKSES */}
      {showPopup && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        >
          <div className="bg-white p-6 rounded-2xl shadow-xl text-center max-w-sm">
            <h2 className="text-2xl font-bold text-green-600 mb-2">Berhasil!</h2>
            <p className="text-gray-700 mb-4">
              Akun Anda berhasil didaftarkan sebagai <b>{role}</b>.
            </p>

            <div className="animate-spin mx-auto mb-3 h-8 w-8 border-4 border-green-500 border-t-transparent rounded-full"></div>

            <p className="text-gray-500 text-sm">
              Mengarahkan ke dashboard...
            </p>
          </div>
        </motion.div>
      )}

      {/* CARD FORM */}
      <Card className="w-full max-w-3xl p-6 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-extrabold text-gray-800">
            Daftar ke TerraFund
          </CardTitle>
          <p className="text-center text-gray-500 mt-1">
            Pilih tipe akun Anda untuk mulai berkontribusi.
          </p>
        </CardHeader>

        <CardContent>
          
          {/* ROLE SELECTION */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            {roles.map((r) => (
              <motion.div
                whileHover={{ scale: 1.04 }}
                key={r.id}
                onClick={() => {
                    setRole(r.id);
                    setError(null);
                }}
                className={`
                  cursor-pointer border rounded-2xl p-6 text-center transition-all shadow-md
                  hover:shadow-xl bg-white
                  ${role === r.id ? "border-green-500 ring-4 ring-green-200 scale-[1.02]" : "border-gray-200"}
                `}
              >
                <div className="text-5xl mb-3">{r.icon}</div>
                <h3 className="font-bold text-lg text-gray-800">{r.title}</h3>
                <p className="text-sm text-gray-500">{r.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* FORM */}
          {role && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >

              {error && (
                <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm font-medium">
                    {error}
                </div>
              )}
              {success && (
                <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm font-medium">
                    {success}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div>
                  <Label>Nama Lengkap</Label>
                  <Input 
                    placeholder="Masukkan nama lengkap" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                  />
                </div>

                <div>
                  <Label>Email</Label>
                  <Input 
                    type="email" 
                    placeholder="nama@email.com" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                  />
                </div>

                <div>
                  <Label>Password</Label>
                  <Input 
                    type="password" 
                    placeholder="Minimal 8 karakter" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleInputChange} 
                  />
                </div>

                <div>
                  <Label>No. Telepon</Label>
                  <Input 
                    type="tel" 
                    placeholder="+62 812-3456-7890" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleInputChange} 
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                  disabled={loading}
                >
                  {loading ? "Mendaftar..." : `Daftar sebagai ${role?.toUpperCase()}`}
                </Button>
              </form>

              <p className="text-center text-sm text-gray-500 mt-4">
                Sudah punya akun?{" "}
                <a href="/login" className="text-green-600 font-bold hover:underline">
                  Login di sini
                </a>
              </p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
