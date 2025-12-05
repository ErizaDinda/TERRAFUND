"use client";

import { useState, useEffect } from "react";
import AdminNavbar from "@/components/Admin/AdminNavbar";
import { 
  CheckCircle, 
  XCircle, 
  MoreHorizontal, 
  Search, 
  HandCoins, 
  FileText, 
  Building2,
  AlertCircle,
  X,
  Coins,
  AlertTriangle,
  ShieldCheck,
  Wallet,
  Loader2
} from "lucide-react";

export default function KelolaProyekPage() {
  
  // STATE TAB
  const [activeTab, setActiveTab] = useState<'proposals' | 'withdrawals'>('proposals'); // Default ke proposals agar langsung terlihat datanya

  // 1. STATE DATA PROYEK (PROPOSALS)
  const [proposals, setProposals] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 2. STATE DATA PENCAIRAN (WITHDRAWALS) - Masih statis/dummy untuk contoh
  const [withdrawals, setWithdrawals] = useState([
    {
      id: 101,
      name: "Air Bersih Sumbawa",
      ngo: "Dompet Sosial",
      amount: 45000000,
      milestone: "Tahap 2: Pemasangan Pipa",
      status: "Menunggu Validasi",
      date: "Baru saja",
      rejectReason: ""
    }
  ]);

  // STATE MODAL
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<string | null>(null); // approve_proyek, reject_proyek, reject_wd
  const [selectedItem, setSelectedItem] = useState<any>(null);
  
  // TOKEN (ambil dari localStorage)
const [token, setToken] = useState("");

useEffect(() => {
  const savedToken = localStorage.getItem("authToken");
  if (savedToken) {
    console.log("Token ditemukan:", savedToken); 
    setToken(savedToken);
  } else {
    console.log("Tidak ada token");
  }
}, []);

useEffect(() => {
  if (!token) return;

  const fetchProposals = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:3001/api/admin/projects/pending", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) {
        console.error("Gagal mengambil data proposal", response.status);
        return;
      }

      const result = await response.json();

      const formattedProposals = result.data.map((item : any) => ({
        id: item.id,
        name: item.title,
        ngo: item.organization_name,
        target: item.target_amount,
        status: item.status,
        date: item.created_at
            ? new Date(item.created_at).toLocaleDateString("id-ID")
            : "Baru saja",
        tokenReward: item.token_reward ?? 0,
        rejectReason: ""
      }));

      setProposals(formattedProposals);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchProposals();
}, [token]);  // 🔥 fetch setelah token ada

  // Inputs
  const [tokenInput, setTokenInput] = useState("");
  const [rejectReasonInput, setRejectReasonInput] = useState("");

  // --- FETCH DATA DARI API ---
  useEffect(() => {
    const fetchProposals = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:3001/api/admin/projects/pending", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if(token) {
          console.log("ada token:", token)
        } else {
          console.log('gaada token')
        }
        if (!response.ok) {
           console.error("Gagal mengambil data proposal");
           return;
        }

        const data = await response.json();

        // Mapping Data Backend ke Format UI Admin
        const formattedProposals = data.map((item: any) => ({
          id: item.id,
          name: item.title,
          ngo: item.organization_name,
          target: item.target_amount,
          status: item.status,
          date: item.created_at
              ? new Date(item.created_at).toLocaleDateString("id-ID")
              : "Baru saja",
          tokenReward: item.token_reward ?? 0,
          rejectReason: ""
        }));

        setProposals(formattedProposals);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProposals();
  }, []);

  // --- ACTION: INSTANT APPROVE (Tanpa Modal) ---
  const handleDirectApproveWD = (id: number) => {
    setWithdrawals(withdrawals.map(w => 
        w.id === id ? { ...w, status: "Dicairkan" } : w
    ));
  };

  // --- ACTION: OPEN MODAL (Untuk Proyek & Reject) ---
  const openModal = (type: string, item: any) => {
    setSelectedItem(item);
    setModalType(type);
    setTokenInput(""); 
    setRejectReasonInput("");
    setIsModalOpen(true);
  };

  // --- SUBMIT LOGIC (MODAL) ---
  const handleSubmitModal = () => {
    // 1. APPROVE PROYEK (Butuh Input Token)
    if (modalType === 'approve_proyek') {
      if (!tokenInput || parseInt(tokenInput) <= 0) { 
        alert("Token harus diisi!"); 
        return; 
      }
    
      // --- UPDATE UI LOKAL ---
      setProposals(proposals.map(p =>
        p.id === selectedItem.id ? { ...p, status: "Approved", tokenReward: parseInt(tokenInput) } : p
      ));
    
      // --- SEND TO BACKEND ---
      fetch(`http://localhost:3001/api/admin/projects/${selectedItem.id}/verify`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // kalau pakai auth
        },
        body: JSON.stringify({
          action: "approve",
          token_reward: parseInt(tokenInput)
        })
      })
      
      .then(res => res.json())
      .then(data => console.log("SUCCESS APPROVE:", data))
      .catch(err => console.error("ERROR:", err));
    }
    // 2. REJECT (Butuh Alasan)
    else if (modalType === 'reject_proyek') {
        if (!rejectReasonInput.trim()) { alert("Alasan wajib diisi!"); return; }
        if (!rejectReasonInput.trim()) { 
          alert("Alasan wajib diisi!"); 
          return; 
        }
      
        // --- UPDATE UI LOKAL ---
        setProposals(proposals.map(p =>
          p.id === selectedItem.id ? { ...p, status: "Rejected", rejectReason: rejectReasonInput } : p
        ));
      
        // --- SEND TO BACKEND ---
        fetch(`http://localhost:3001/api/admin/projects/${selectedItem.id}/verify`, {
          method: "PUT",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            action: "reject"
          })
        })
        .then(res => res.json())
        .then(data => console.log("SUCCESS REJECT:", data))
        .catch(err => console.error("ERROR:", err));
    }
    else if (modalType === 'reject_wd') {
        if (!rejectReasonInput.trim()) { alert("Alasan wajib diisi!"); return; }
        setWithdrawals(withdrawals.map(w => w.id === selectedItem.id ? { ...w, status: "Ditolak", rejectReason: rejectReasonInput } : w));
    }

    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
        setSelectedItem(null);
        setModalType(null);
    }, 200);
  };

  return (
    <main className="w-full pb-24 bg-gray-50 min-h-screen font-sans relative">
      <AdminNavbar />

      {/* HEADER */}
      <section className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-16 pb-28 text-white shadow-lg">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-3xl font-bold">Kelola Proyek</h2>
            <p className="text-indigo-100 mt-2">Validasi proposal proyek baru dan setujui pencairan dana NGO.</p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" placeholder="Cari nama proyek..." className="w-full pl-10 pr-4 py-3 rounded-xl bg-white text-gray-700 outline-none shadow-lg focus:ring-2 focus:ring-green-400 transition" />
          </div>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <section className="max-w-6xl mx-auto px-6 -mt-20">
        
        {/* TABS */}
        <div className="bg-white rounded-xl p-2 shadow-sm border border-gray-100 mb-6 flex gap-2">
            <button onClick={() => setActiveTab('proposals')} className={`flex-1 py-3 text-sm font-bold rounded-lg transition flex items-center justify-center gap-2 ${activeTab === 'proposals' ? 'bg-indigo-50 text-[#6A6AFB] border border-indigo-100' : 'text-gray-500 hover:bg-gray-50'}`}>
                Approval Proyek Baru <span className="bg-[#6A6AFB] text-white text-xs py-0.5 px-2 rounded-full">{isLoading ? "..." : proposals.length}</span>
            </button>
            <button onClick={() => setActiveTab('withdrawals')} className={`flex-1 py-3 text-sm font-bold rounded-lg transition flex items-center justify-center gap-2 ${activeTab === 'withdrawals' ? 'bg-orange-50 text-orange-600 border border-orange-100' : 'text-gray-500 hover:bg-gray-50'}`}>
                Validasi Pencairan (LPJ) <span className="bg-orange-500 text-white text-xs py-0.5 px-2 rounded-full">{withdrawals.filter(w => w.status === 'Menunggu Validasi').length}</span>
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* === TAB 1: PROPOSALS (From API) === */}
          {activeTab === 'proposals' && (
            isLoading ? (
                <div className="col-span-full flex justify-center py-20">
                    <Loader2 className="animate-spin text-indigo-600 w-10 h-10" />
                </div>
            ) : proposals.length === 0 ? (
                <div className="col-span-full text-center py-20 text-gray-500">Tidak ada proposal proyek baru.</div>
            ) : (
                proposals.map((p) => {
                    /* Styling Card */
                    let cardStyle = "border-gray-100 hover:shadow-lg";
                    let iconBg = "bg-indigo-50 text-[#6A6AFB]";
                    
                    // Normalisasi status dari API ke lowercase untuk pengecekan
                    const status = p.status.toLowerCase();

                    if (status === 'approved' || status === 'aktif') { cardStyle = "border-green-200 bg-green-50/30"; iconBg = "bg-green-100 text-green-600"; }
                    else if (status === 'rejected') { cardStyle = "border-red-200 bg-red-50/30 opacity-80"; iconBg = "bg-red-100 text-red-600"; }

                    return (
                        <div key={p.id} className={`bg-white rounded-2xl shadow-sm border p-6 transition duration-300 group ${cardStyle}`}>
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl ${iconBg}`}><Building2 size={24} /></div>
                            {(status === 'pending' || status === 'menunggu') && <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-3 py-1 rounded-full border border-yellow-200 animate-pulse">Submitted</span>}
                            {(status === 'approved' || status === 'aktif') && <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-green-200"><CheckCircle size={12}/> Published</span>}
                            {status === 'rejected' && <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-red-200"><XCircle size={12}/> Ditolak</span>}
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1" title={p.name}>{p.name}</h3>
                        <p className="text-xs text-gray-400 mb-3">Oleh: {p.ngo}</p>
                        <p className="text-sm text-gray-600">Target: <span className="font-bold text-gray-800">Rp {p.target.toLocaleString('id-ID')}</span></p>

                        {/* Feedback UI */}
                        {(status === 'approved' || status === 'aktif') && <div className="mt-3 bg-white p-2 rounded-lg border border-green-200 flex items-center gap-2 shadow-sm"><div className="bg-yellow-100 p-1.5 rounded-full text-yellow-600"><Coins size={14}/></div><p className="text-xs text-green-800 font-bold">{p.tokenReward} Token Reward</p></div>}
                        {status === 'rejected' && <div className="mt-3 bg-white p-2 rounded-lg border border-red-200 shadow-sm"><p className="text-[10px] text-red-500 font-bold mb-1">ALASAN DITOLAK:</p><p className="text-xs text-gray-600 italic">"{p.rejectReason || 'Tidak ada alasan'}"</p></div>}

                        <div className="mt-6 pt-4 border-t border-gray-100 flex gap-3">
                            {(status === 'submitted' || status === 'menunggu') ? (
                                <>
                                    <button onClick={() => openModal('approve_proyek', p)} className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl text-sm font-semibold transition shadow-md hover:shadow-lg transform active:scale-95">Terima</button>
                                    <button onClick={() => openModal('reject_proyek', p)} className="flex-1 bg-white border border-red-200 text-red-600 hover:bg-red-50 py-2.5 rounded-xl text-sm font-semibold transition">Tolak</button>
                                </>
                            ) : (
                                <button disabled className="w-full bg-gray-100 text-gray-400 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 cursor-not-allowed">
                                    {(status === 'approved' || status === 'aktif') ? <CheckCircle size={16}/> : <XCircle size={16}/>} Selesai
                                </button>
                            )}
                        </div>
                        </div>
                    )
                })
            )
          )}

          {/* === TAB 2: WITHDRAWALS (Updated: Instant Action) === */}
          {activeTab === 'withdrawals' && withdrawals.map((w) => {
             /* Styling Card */
             let wdStyle = "border-orange-100 hover:shadow-lg";
             let wdIconBg = "bg-orange-50 text-orange-600";
             // Ganti styling kalau sudah cair
             if (w.status === 'Dicairkan') { wdStyle = "border-blue-200 bg-blue-50/30"; wdIconBg = "bg-blue-100 text-blue-600"; }
             else if (w.status === 'Ditolak') { wdStyle = "border-red-200 bg-red-50/30 opacity-80"; wdIconBg = "bg-red-100 text-red-600"; }

             return (
                <div key={w.id} className={`bg-white rounded-2xl shadow-sm border p-6 transition duration-300 group ${wdStyle}`}>
                    <div className="flex justify-between items-start mb-4">
                        <div className={`p-3 rounded-xl ${wdIconBg}`}><HandCoins size={24} /></div>
                        {w.status === 'Menunggu Validasi' && <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-orange-200"><AlertCircle size={12}/> Butuh Validasi</span>}
                        {w.status === 'Dicairkan' && <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-blue-200"><CheckCircle size={12}/> Dicairkan</span>}
                        {w.status === 'Ditolak' && <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-red-200"><XCircle size={12}/> Ditolak</span>}
                    </div>

                    <h3 className="text-lg font-bold text-gray-800 mb-1">{w.name}</h3>
                    <p className="text-xs text-gray-400 mb-3">Oleh: {w.ngo}</p>
                    
                    <div className="bg-white/60 rounded-lg p-3 border border-gray-100 mb-2 shadow-sm">
                        <p className="text-xs text-gray-500">Nilai Pencairan:</p>
                        <p className={`font-bold text-lg ${w.status === 'Ditolak' ? 'text-gray-500 line-through' : 'text-gray-800'}`}>Rp {w.amount.toLocaleString()}</p>
                        <p className="text-[10px] text-gray-400 mt-1">Keperluan: <span className="text-gray-600">{w.milestone}</span></p>
                    </div>

                    {w.status === 'Ditolak' && (
                        <div className="mt-3 bg-white p-2 rounded-lg border border-red-200 shadow-sm">
                            <p className="text-[10px] text-red-500 font-bold mb-1">ALASAN DITOLAK:</p>
                            <p className="text-xs text-gray-600 italic">"{w.rejectReason}"</p>
                        </div>
                    )}

                    <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-2">
                        <button className="w-full text-indigo-600 text-xs font-bold flex items-center justify-center gap-1 hover:underline py-1">
                            <FileText size={14}/> Lihat Dokumen LPJ
                        </button>
                        
                        {w.status === 'Menunggu Validasi' ? (
                            <div className="flex gap-2 mt-1">
                                {/* --- INSTANT BUTTON (Klik Langsung Berubah) --- */}
                                <button 
                                    onClick={() => handleDirectApproveWD(w.id)} 
                                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-indigo-200 text-white py-2.5 rounded-xl text-sm font-semibold transition shadow-md flex items-center justify-center gap-2 transform active:scale-95"
                                >
                                    <Wallet size={16}/> Cairkan
                                </button>
                                
                                {/* Tombol Tolak Tetap Pakai Modal (Kalo gak mau cairin) */}
                                <button onClick={() => openModal('reject_wd', w)} className="px-4 border border-red-200 text-red-600 hover:bg-red-50 rounded-xl text-sm font-semibold transition">
                                    Tolak
                                </button>
                            </div>
                        ) : (
                            // KONDISI SETELAH DIKLIK
                            <button disabled className="w-full bg-gray-100 text-gray-400 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 cursor-not-allowed mt-1">
                                {w.status === 'Dicairkan' ? <CheckCircle size={16}/> : <XCircle size={16}/>}
                                {w.status === 'Dicairkan' ? 'Dana Telah Cair' : 'Permintaan Ditolak'}
                            </button>
                        )}
                    </div>
                </div>
             )
          })}
        </div>
      </section>

      {/* ============================================== */}
      {/* POPUP MODAL (Hanya untuk Proyek & Reject)      */}
      {/* ============================================== */}
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity duration-300" onClick={closeModal}></div>

          <div className="relative bg-white rounded-[32px] shadow-2xl w-full max-w-[420px] p-8 transform transition-all duration-300 scale-100 border border-gray-100">
            <button onClick={closeModal} className="absolute top-5 right-5 p-2 bg-gray-50 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"><X size={20} /></button>

            {/* --- KONTEN MODAL: APPROVE PROYEK --- */}
            {modalType === 'approve_proyek' && (
                <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6 ring-8 ring-green-50/50">
                        <div className="bg-gradient-to-br from-green-400 to-emerald-600 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-200"><ShieldCheck size={24} /></div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Verifikasi Proyek</h3>
                    <p className="text-gray-500 mt-2 text-sm leading-relaxed">Anda akan menyetujui proyek <br/><span className="font-bold text-gray-800">"{selectedItem.name}"</span>.</p>
                    <div className="w-full mt-6 mb-2 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                        <label className="text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-2 block text-left">Set Token Reward</label>
                        <div className="flex items-center gap-3">
                            <Coins className="text-yellow-500" size={24} />
                            <input type="number" value={tokenInput} autoFocus onChange={(e) => setTokenInput(e.target.value)} className="w-full bg-transparent text-2xl font-bold text-gray-800 outline-none placeholder:text-gray-300" placeholder="0"/>
                        </div>
                    </div>
                    <button onClick={handleSubmitModal} className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-4 rounded-2xl shadow-xl hover:shadow-2xl transition transform active:scale-[0.98]">Konfirmasi & Setujui</button>
                </div>
            )}

            {/* --- KONTEN MODAL: TOLAK (REJECT) --- */}
            {(modalType === 'reject_proyek' || modalType === 'reject_wd') && (
                <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6 ring-8 ring-red-50/50">
                        <div className="bg-gradient-to-br from-red-500 to-rose-600 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg shadow-red-200"><AlertTriangle size={24} /></div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Tolak Permintaan?</h3>
                    <p className="text-gray-500 mt-2 text-sm">Tindakan ini tidak dapat dibatalkan. <br/>Harap berikan alasan yang jelas.</p>
                    <div className="w-full mt-6 mb-6">
                        <textarea value={rejectReasonInput} onChange={(e) => setRejectReasonInput(e.target.value)} autoFocus className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-800 text-sm focus:ring-2 focus:ring-red-200 focus:border-red-400 outline-none resize-none h-32 transition" placeholder="Tulis alasan penolakan di sini..."/>
                    </div>
                    <div className="flex w-full gap-3">
                        <button onClick={closeModal} className="flex-1 py-3.5 rounded-2xl font-bold text-gray-500 hover:bg-gray-50 transition">Batal</button>
                        <button onClick={handleSubmitModal} className="flex-[2] bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-red-200 transition transform active:scale-[0.98]">Tolak Permintaan</button>
                    </div>
                </div>
            )}

          </div>
        </div>
      )}
    </main>
  );
}