"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  const [role, setRole] = useState<string | null>(null);

  const roles = [
    { id: "donatur", icon: "❤️", title: "Donatur", desc: "Berdonasi untuk proyek sosial" },
    { id: "relawan", icon: "🤝", title: "Relawan", desc: "Ikut aksi sosial dan dapatkan token" },
    { id: "ngo", icon: "🏢", title: "NGO", desc: "Buat dan kelola proyek" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-6">
      <Card className="w-full max-w-2xl p-6 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Daftar ke TerraFund
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Pilih tipe akun Anda
          </p>
        </CardHeader>

        <CardContent>
          {/* ROLE SELECTION */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {roles.map((r) => (
              <motion.div
                whileHover={{ scale: 1.03 }}
                key={r.id}
                onClick={() => setRole(r.id)}
                className={`cursor-pointer border rounded-xl p-4 text-center transition-all 
                  ${role === r.id ? "border-green-500 bg-green-50" : "hover:bg-gray-100"}
                `}
              >
                <div className="text-4xl mb-2">{r.icon}</div>
                <h3 className="font-semibold">{r.title}</h3>
                <p className="text-sm text-muted-foreground">{r.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* FORM MUNCUL SETELAH PILIH ROLE */}
          {role && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div>
                <Label>Nama Lengkap</Label>
                <Input placeholder="Masukkan nama lengkap" />
              </div>

              <div>
                <Label>Email</Label>
                <Input type="email" placeholder="nama@email.com" />
              </div>

              <div>
                <Label>Password</Label>
                <Input type="password" placeholder="Minimal 8 karakter" />
              </div>

              <div>
                <Label>No. Telepon</Label>
                <Input type="tel" placeholder="+62 812-3456-7890" />
              </div>

              {/* NGO DOCUMENT */}
              {role === "ngo" && (
                <div>
                  <Label>Dokumen Legal NGO (PDF)</Label>
                  <Input type="file" accept=".pdf" className="cursor-pointer" />
                </div>
              )}

              <Button className="w-full">Daftar Sekarang</Button>

              <p className="text-center text-sm text-muted-foreground">
                Sudah punya akun?{" "}
                <a href="/login" className="text-green-600 font-semibold">
                  Login
                </a>
              </p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
