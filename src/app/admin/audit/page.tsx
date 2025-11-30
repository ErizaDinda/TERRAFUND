'use client';

import AdminNavbar from "@/components/Admin/AdminNavbar";
import { History, Search, Download, Filter, FileSpreadsheet, ShieldAlert, CheckCircle2, Info } from "lucide-react";

export default function AuditLogPage() {
  
  // Data Dummy Log Aktivitas
  const logs = [
    { 
      id: "LOG-0092", 
      action: "Pencairan Dana Approved", 
      user: "Admin (Anda)", 
      role: "Admin",
      target: "REQ-8820 (Water For Life)", 
      time: "10 menit lalu", 
      status: "Success" 
    },
    { 
      id: "LOG-0091", 
      action: "NGO Baru Mendaftar", 
      user: "System", 
      role: "System",
      target: "Blue Ocean Society", 
      time: "1 jam lalu", 
      status: "Info" 
    },
    { 
      id: "LOG-0090", 
      action: "Login Failed (3x Attempts)", 
      user: "Unknown IP (192.168.1.5)", 
      role: "Guest",
      target: "-", 
      time: "2 jam lalu", 
      status: "Warning" 
    },
    { 
      id: "LOG-0089", 
      action: "Smart Contract Deploy", 
      user: "Dev Team", 
      role: "Developer",
      target: "Contract v2.1 Update", 
      time: "5 jam lalu", 
      status: "Success" 
    },
    { 
      id: "LOG-0088", 
      action: "Donasi Masuk", 
      user: "0x78...99a", 
      role: "Donatur",
      target: "Project #12", 
      time: "6 jam lalu", 
      status: "Success" 
    },
  ];

  return (
    <main className="w-full pb-24 bg-gray-50 min-h-screen font-sans">
      <AdminNavbar />

      {/* --- HEADER GRADASI UNGU (Konsisten) --- */}
      <section className="w-full bg-gradient-to-r from-[#6A6AFB] to-[#8A4FFF] px-6 py-16 pb-28 text-white shadow-xl">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
             <h2 className="text-3xl font-bold flex items-center gap-3">
                <History size={32} className="text-purple-200" />
                Audit Log Sistem
             </h2>
             <p className="text-indigo-100 mt-2 text-lg">
                Rekam jejak aktivitas untuk keamanan, transparansi, dan akuntabilitas.
             </p>
          </div>
          
          {/* Tombol Export */}
          <button className="flex items-center gap-2 bg-white/10 border border-white/30 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition backdrop-blur-md shadow-lg">
             <FileSpreadsheet size={18} /> Export CSV
          </button>
        </div>
      </section>

      {/* --- CONTENT TABLE --- */}
      <section className="max-w-6xl mx-auto px-6 -mt-16">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
           
           {/* Toolbar Table */}
           <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-gray-700 font-semibold">
                 <span className="bg-purple-100 text-[#6A6AFB] px-2 py-1 rounded text-xs font-bold">50+</span>
                 Catatan Aktivitas Terakhir
              </div>
              
              <div className="flex gap-2 w-full md:w-auto">
                 <div className="relative w-full md:w-72">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Cari Log ID, User, atau Aktivitas..." 
                        className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#6A6AFB] focus:ring-2 focus:ring-purple-100 transition bg-white" 
                    />
                 </div>
                 <button className="px-3 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-100 transition flex items-center gap-2 text-sm font-medium">
                    <Filter size={16} /> Filter
                 </button>
              </div>
           </div>

           {/* Table */}
           <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                 <thead className="bg-white text-gray-500 border-b border-gray-100 uppercase text-xs tracking-wider">
                    <tr>
                       <th className="px-6 py-4 font-semibold">Log ID</th>
                       <th className="px-6 py-4 font-semibold">Aktivitas</th>
                       <th className="px-6 py-4 font-semibold">Aktor / User</th>
                       <th className="px-6 py-4 font-semibold">Target Data</th>
                       <th className="px-6 py-4 font-semibold">Waktu</th>
                       <th className="px-6 py-4 font-semibold text-center">Status</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {logs.map((log) => (
                       <tr key={log.id} className="hover:bg-gray-50 transition group">
                          {/* Log ID */}
                          <td className="px-6 py-4 font-mono text-xs text-gray-400 group-hover:text-[#6A6AFB]">
                             {log.id}
                          </td>
                          
                          {/* Aktivitas */}
                          <td className="px-6 py-4 font-medium text-gray-800">
                             {log.action}
                          </td>
                          
                          {/* User */}
                          <td className="px-6 py-4">
                             <div className="flex flex-col">
                                <span className="text-gray-700 font-medium">{log.user}</span>
                                <span className="text-[10px] text-gray-400 uppercase">{log.role}</span>
                             </div>
                          </td>
                          
                          {/* Target */}
                          <td className="px-6 py-4 text-gray-500 font-mono text-xs">
                             {log.target}
                          </td>
                          
                          {/* Waktu */}
                          <td className="px-6 py-4 text-gray-400 text-xs whitespace-nowrap">
                             {log.time}
                          </td>
                          
                          {/* Status Badge */}
                          <td className="px-6 py-4 text-center">
                             <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border
                                ${log.status === 'Success' 
                                    ? 'bg-green-50 text-green-700 border-green-200' 
                                    : log.status === 'Warning' 
                                        ? 'bg-red-50 text-red-700 border-red-200' 
                                        : 'bg-blue-50 text-blue-700 border-blue-200'}
                             `}>
                                {log.status === 'Success' && <CheckCircle2 size={10} />}
                                {log.status === 'Warning' && <ShieldAlert size={10} />}
                                {log.status === 'Info' && <Info size={10} />}
                                {log.status}
                             </span>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
           
           {/* Pagination Footer */}
           <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
              <span>Menampilkan 5 dari 128 log aktivitas</span>
              <div className="flex gap-2">
                 <button className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition shadow-sm font-medium">Previous</button>
                 <button className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 transition shadow-sm font-medium">Next</button>
              </div>
           </div>

        </div>
      </section>
    </main>
  );
}