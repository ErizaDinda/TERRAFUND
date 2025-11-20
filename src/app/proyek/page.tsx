"use client";

import Link from "next/link";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";


export default function ProjectList() {
  const [category, setCategory] = useState("all");

  const projects = [
    { id: 1, title: "Reboisasi Hutan Kalimantan", icon: "🌱", ngo: "Green Earth Foundation", progress: 65, raised: 65000000, target: 100000000 },
    { id: 2, title: "Air Bersih untuk Desa", icon: "💧", ngo: "Water for Life", progress: 42, raised: 21000000, target: 50000000 },
    { id: 3, title: "Perpustakaan Digital Anak", icon: "📚", ngo: "Education Hub", progress: 80, raised: 40000000, target: 50000000 },
  ];

  return (
    <div className="w-full">
      <Navbar />

      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-16 px-6">
        <h1 className="text-4xl font-bold mb-2">Proyek Sosial & Lingkungan</h1>
        <p className="opacity-90 text-lg">Temukan proyek yang ingin Anda dukung</p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-12 px-6">
        {projects.map((p) => (
          <Card key={p.id} className="shadow-lg rounded-2xl overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-6xl text-white">
              {p.icon}
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-1">{p.title}</h3>
              <p className="text-gray-500 text-sm mb-4">🏢 {p.ngo}</p>

              <div className="w-full h-2 bg-gray-200 rounded-full mb-2">
                <div className="h-full bg-green-500 rounded-full" style={{ width: `${p.progress}%` }}></div>
              </div>

              <div className="flex justify-between text-sm mb-4">
                <span className="text-green-600 font-bold">Rp {p.raised.toLocaleString()}</span>
                <span className="text-gray-600">/ Rp {p.target.toLocaleString()}</span>
              </div>

              <Link href={`/proyek/${p.id}`}>
                <Button className="w-full">Lihat Detail</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
