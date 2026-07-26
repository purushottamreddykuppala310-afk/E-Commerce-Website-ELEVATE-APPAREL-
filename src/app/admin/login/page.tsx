'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LayoutDashboard, Lock, ShieldCheck, KeyRound, Terminal } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AdminLoginPage() {
  const router = useRouter();
  const { adminLogin } = useAuth();

  const [adminId, setAdminId] = useState('DEV-MASTER-9901');
  const [password, setPassword] = useState('admin123');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminId.trim() || !password.trim()) {
      setErrorMsg('Developer Admin ID and Secret Key are required.');
      return;
    }

    await adminLogin(adminId, password);
    router.push('/admin');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-slate-950">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-2xl text-white">
        
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
            <Terminal className="w-7 h-7" />
          </div>
          <span className="inline-block px-3 py-1 bg-amber-400/20 text-amber-300 font-extrabold text-[10px] rounded-full uppercase tracking-wider border border-amber-400/30">
            DEVELOPER & MASTER ADMIN PORTAL
          </span>
          <h2 className="text-2xl font-black uppercase tracking-wider text-white">RESTRICTED ACCESS</h2>
          <p className="text-xs text-slate-400">Authorized Developers & Store Administrators Only</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Developer Admin ID</label>
            <div className="relative mt-1">
              <KeyRound className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                placeholder="DEV-MASTER-9901"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Master Developer Secret Key</label>
            <div className="relative mt-1">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {errorMsg && <p className="text-xs text-rose-400 font-semibold text-center">{errorMsg}</p>}

          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-lg transition uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" /> AUTHORIZE DEVELOPER SESSION
          </button>
        </form>

        <div className="bg-slate-950 border border-slate-800/80 p-3.5 rounded-xl text-[11px] text-slate-400 space-y-1">
          <p className="font-bold text-amber-400 flex items-center gap-1">
            🔑 Developer Credentials:
          </p>
          <p>• Admin ID: <code className="text-white bg-slate-900 px-1.5 py-0.5 rounded font-mono">DEV-MASTER-9901</code></p>
          <p>• Password: <code className="text-white bg-slate-900 px-1.5 py-0.5 rounded font-mono">admin123</code></p>
        </div>

      </div>
    </div>
  );
}
