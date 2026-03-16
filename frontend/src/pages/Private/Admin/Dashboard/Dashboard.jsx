import React, { useEffect } from 'react';

const NeonOverloadDashboard = () => {
  useEffect(() => {
    // Script de consola original (puedes eliminarlo si no lo necesitas)
    console.log("NEON OVERLOAD Dashboard initialized. System state: CHIMBA.");
  }, []);

  return (
    <div className="flex h-screen bg-black w-full overflow-hidden" data-purpose="dashboard-wrapper">
      {/* Sidebar Navigation */}
      <aside className="w-24 lg:w-64 bg-deep-charcoal border-r border-gray-800 flex flex-col items-center lg:items-start py-8 transition-all duration-300" data-purpose="sidebar">
        {/* Brand Identity */}
        <div className="px-6 mb-12 flex items-center gap-3">
          <div className="w-10 h-10 bg-neon-purple rounded-lg flex items-center justify-center shadow-neon-glow animate-pulse-neon">
            <span className="font-orbitron font-black text-black text-xl">N</span>
          </div>
          <h1 className="hidden lg:block font-orbitron font-black text-xl tracking-tighter text-white">
            <span className="text-neon-purple">NEON</span> OVERLOAD
          </h1>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 w-full px-4 space-y-4">
          <a href="#" className="flex items-center gap-4 p-3 rounded-xl bg-gradient-to-r from-neon-purple/20 to-transparent border-l-4 border-neon-purple text-neon-purple transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
            <span className="hidden lg:block font-bold">Dashboard</span>
          </a>
          {/* Repite para los otros enlaces con los mismos cambios de atributos */}
          <a href="#" className="flex items-center gap-4 p-3 rounded-xl text-gray-500 hover:text-white hover:bg-white/5 transition-all neon-border-hover">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
            <span className="hidden lg:block font-bold">Users</span>
          </a>
          {/* ... resto de enlaces (Inventory, Reservations, Music, Sales, Parking) con la misma conversión */}
          <a href="#" className="flex items-center gap-4 p-3 rounded-xl text-gray-500 hover:text-white hover:bg-white/5 transition-all neon-border-hover">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
            <span className="hidden lg:block font-bold">Inventory</span>
          </a>
          <a href="#" className="flex items-center gap-4 p-3 rounded-xl text-gray-500 hover:text-white hover:bg-white/5 transition-all neon-border-hover">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
            <span className="hidden lg:block font-bold">Reservations</span>
          </a>
          <a href="#" className="flex items-center gap-4 p-3 rounded-xl text-gray-500 hover:text-white hover:bg-white/5 transition-all neon-border-hover">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
            <span className="hidden lg:block font-bold">Music</span>
          </a>
          <a href="#" className="flex items-center gap-4 p-3 rounded-xl text-gray-500 hover:text-white hover:bg-white/5 transition-all neon-border-hover">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
            <span className="hidden lg:block font-bold">Sales</span>
          </a>
          <a href="#" className="flex items-center gap-4 p-3 rounded-xl text-gray-500 hover:text-white hover:bg-white/5 transition-all neon-border-hover">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M5 10l7-7m0 0l7 7m-7-7v18" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
            <span className="hidden lg:block font-bold">Parking</span>
          </a>
        </nav>

        {/* User Profile Status */}
        <div className="p-6 border-t border-gray-800 w-full">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <img
                alt="Admin"
                className="rounded-full border border-neon-magenta"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNZUx-hVVGfw7EXKtHbQOzed0SRmNFHme_FpE_jN5i8FmGrkqi1CpJk4C63H6gyGaws_KmOnwzBCnpVkwJ0n5oD1D2uL1haDaNoMnPU0vHqGx-lxo3k2na3ZS0FkekZXMQgPkRzM6fAk15oJhPxM9hLH7qEfQVUXI4GUXTC5sTzFnmpoIfZPgE8AGkcOHM3s_MhYp7w4X3Rbv5hxMpPVWjm65gSqjaryvgcuD1ex3HciQ4e7lMfOtcSnGMiEl_EmymGkBo1diXFnNs"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
            </div>
            <div className="hidden lg:block">
              <p className="text-sm font-bold text-white">System Admin</p>
              <p className="text-xs text-neon-magenta uppercase tracking-widest">Level 10</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8 relative" data-purpose="main-content">
        {/* Top Header */}
        <header className="flex justify-between items-end mb-10" data-purpose="dashboard-header">
          <div>
            <h2 className="font-orbitron font-black text-4xl text-white tracking-widest uppercase">Dashboard</h2>
            <p className="text-gray-400 font-medium uppercase tracking-widest text-sm mt-1">
              Live Operational Environment <span className="text-neon-purple animate-pulse">●</span>
            </p>
          </div>
          <div className="flex gap-4">
            <div className="glass-panel px-6 py-3 rounded-xl border border-neon-purple/30 shadow-neon-glow flex items-center gap-3">
              <span className="text-neon-purple text-xs font-bold uppercase tracking-widest">Status:</span>
              <span className="text-white font-bold">OPTIMIZED</span>
            </div>
          </div>
        </header>

        {/* Hero Section Pulse */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8" data-purpose="hero-pulse">
          <div className="xl:col-span-2 glass-panel rounded-3xl p-8 relative overflow-hidden border-2 border-neon-purple/20">
            <div className="flex justify-between items-start relative z-10">
              <div>
                <h3 className="font-orbitron text-xl font-bold text-white mb-2">LIVE NIGHTLIFE PULSE</h3>
                <p className="text-gray-400 text-sm">Real-time venue acoustics & crowd energy levels</p>
              </div>
              <div className="text-right">
                <span className="text-3xl font-orbitron font-black text-neon-purple">
                  128 <small className="text-xs">BPM</small>
                </span>
              </div>
            </div>
            {/* Waveform Visualizer */}
            <div className="mt-12 h-32 flex items-end gap-1.5 justify-center" data-purpose="waveform-container">
              <div className="w-2 bg-neon-purple rounded-full bar-anim h-[40%]" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 bg-neon-magenta rounded-full bar-anim h-[60%]" style={{ animationDelay: '0.3s' }}></div>
              <div className="w-2 bg-neon-purple rounded-full bar-anim h-[30%]" style={{ animationDelay: '0.5s' }}></div>
              <div className="w-2 bg-white rounded-full bar-anim h-[90%]" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 bg-neon-purple rounded-full bar-anim h-[50%]" style={{ animationDelay: '0.4s' }}></div>
              <div className="w-2 bg-neon-magenta rounded-full bar-anim h-[75%]" style={{ animationDelay: '0.7s' }}></div>
              <div className="w-2 bg-neon-purple rounded-full bar-anim h-[45%]" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 bg-neon-purple rounded-full bar-anim h-[40%]" style={{ animationDelay: '0.9s' }}></div>
              <div className="w-2 bg-white rounded-full bar-anim h-[20%]" style={{ animationDelay: '0.3s' }}></div>
              <div className="w-2 bg-neon-purple rounded-full bar-anim h-[100%]" style={{ animationDelay: '0.6s' }}></div>
              <div className="w-2 bg-neon-magenta rounded-full bar-anim h-[60%]" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 bg-neon-purple rounded-full bar-anim h-[35%]" style={{ animationDelay: '0.8s' }}></div>
            </div>
            <div className="mt-8 flex justify-between border-t border-white/10 pt-6">
              <div className="text-center">
                <p className="text-xs text-gray-500 font-bold uppercase">Sub-Bass</p>
                <p className="text-white font-orbitron">98%</p>
              </div>
              <div className="text-center border-x border-white/10 px-8">
                <p className="text-xs text-gray-500 font-bold uppercase">Crowd Noise</p>
                <p className="text-white font-orbitron">82db</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 font-bold uppercase">Peak Expectancy</p>
                <p className="text-neon-magenta font-orbitron">02:30 AM</p>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-neon-purple/5 blur-[100px] rounded-full"></div>
          </div>

          {/* Metric Cards */}
          <div className="flex flex-col gap-6" data-purpose="key-metrics">
            <div className="glass-panel p-6 rounded-2xl border-l-4 border-neon-purple hover:scale-[1.02] transition-transform duration-300">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Nightly Revenue</span>
                <div className="p-2 bg-neon-purple/20 rounded-lg">
                  <svg className="w-5 h-5 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h4 className="text-3xl font-orbitron font-black text-white">$42,105.00</h4>
              <div className="mt-2 text-green-400 text-xs font-bold">+12.4% vs Last Friday</div>
            </div>
            <div className="glass-panel p-6 rounded-2xl border-l-4 border-neon-magenta hover:scale-[1.02] transition-transform duration-300 shadow-magenta-glow">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">VIP Saturation</span>
                <div className="p-2 bg-neon-magenta/20 rounded-lg">
                  <svg className="w-5 h-5 text-neon-magenta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" />
                  </svg>
                </div>
              </div>
              <h4 className="text-3xl font-orbitron font-black text-white">88%</h4>
              <div className="w-full bg-white/10 h-1.5 mt-4 rounded-full overflow-hidden">
                <div className="bg-neon-magenta h-full" style={{ width: '88%' }}></div>
              </div>
            </div>
            <div className="glass-panel p-6 rounded-2xl border-l-4 border-white hover:scale-[1.02] transition-transform duration-300">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Active Guests</span>
                <div className="p-2 bg-white/20 rounded-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <h4 className="text-3xl font-orbitron font-black text-white">1,248</h4>
              <div className="mt-2 text-neon-purple text-xs font-bold uppercase tracking-widest">Capacity: 1,500</div>
            </div>
          </div>
        </section>

        {/* Interactive Floor Map & VIP Orders */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8" data-purpose="floor-and-orders">
          {/* Live Floor Map */}
          <div className="glass-panel rounded-3xl p-8 border border-white/10" data-purpose="live-floor-map">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-orbitron text-xl font-bold text-white uppercase tracking-wider">Tactical Floor Map</h3>
              <div className="flex gap-2">
                <span className="flex items-center gap-1.5 text-[10px] text-gray-400">
                  <span className="w-2 h-2 rounded-full bg-neon-purple"></span> VIP
                </span>
                <span className="flex items-center gap-1.5 text-[10px] text-gray-400">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span> BAR
                </span>
                <span className="flex items-center gap-1.5 text-[10px] text-gray-400">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span> DANGER
                </span>
              </div>
            </div>
            <div className="aspect-square w-full relative border border-dashed border-white/20 rounded-2xl flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-10">
                <div className="border border-white/10 col-span-12 row-span-12"></div>
              </div>
              <div className="relative w-4/5 h-4/5 border-2 border-neon-purple/40 rounded-3xl flex flex-col p-4">
                <div className="h-1/4 w-full border border-green-500/50 bg-green-500/10 rounded-xl mb-4 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-green-500">MAIN BAR</span>
                </div>
                <div className="flex-1 w-full border border-neon-purple bg-neon-purple/5 rounded-full relative flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle,_#BF00FF33_0%,_transparent_70%)] animate-pulse"></div>
                  <span className="text-xs font-black text-neon-purple tracking-widest z-10">CORE DANCE FLOOR</span>
                </div>
                <div className="mt-4 flex gap-4 h-1/5">
                  <div className="flex-1 border border-neon-magenta/50 bg-neon-magenta/10 rounded-lg flex items-center justify-center">
                    <span className="text-[8px] text-neon-magenta">VIP-A</span>
                  </div>
                  <div className="flex-1 border border-neon-magenta/50 bg-neon-magenta/10 rounded-lg flex items-center justify-center">
                    <span className="text-[8px] text-neon-magenta">VIP-B</span>
                  </div>
                  <div className="flex-1 border border-neon-magenta/50 bg-neon-magenta/10 rounded-lg flex items-center justify-center">
                    <span className="text-[8px] text-neon-magenta">VIP-C</span>
                  </div>
                </div>
              </div>
              <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-red-500 rounded-full shadow-[0_0_10px_#ef4444] animate-ping"></div>
              <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-neon-purple rounded-full shadow-neon-glow"></div>
              <div className="absolute top-1/2 left-1/2 w-4 h-4 border-2 border-white rounded-full flex items-center justify-center">
                <div className="w-1 h-1 bg-white rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Recent High-Value Orders */}
          <div className="glass-panel rounded-3xl p-8 border border-white/10 flex flex-col" data-purpose="high-value-orders">
            <h3 className="font-orbitron text-xl font-bold text-white mb-6 uppercase tracking-wider">Recent High-Value Orders</h3>
            <div className="space-y-4 flex-1 overflow-y-auto pr-2">
              {/* Order Item 1 */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-neon-purple transition-all group">
                <div className="relative">
                  <img
                    alt="VIP Guest"
                    className="w-12 h-12 rounded-full border-2 border-neon-purple"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDELPpfOfW4vTTrrp0OFPd-c77HV0p7MpZzX82Av_BPQ_ELAmgm8IVjj4hIj0X9WyvAKp55inyCHzzVlfuMIxi2Qr8Pu9TJAC41AFSpxGslyfNkOke7O6-J3jq47gA38t3hRW7raAzdkJvvUfQ6P9u76w2uPG89UWkriL288SgDhITjL7cs3fOU7jphZ4YicpJ3_wltPhe5Zd9ev8dnAUKqaNvZ4L5s-QMPjuFwoIgab7AhYXW1l6-RL3zwbSgXRQyojBZAO-Kabdbr"
                  />
                  <span className="absolute -top-1 -right-1 bg-neon-purple text-black text-[8px] font-black px-1.5 py-0.5 rounded-full">VIP</span>
                </div>
                <div className="flex-1">
                  <h5 className="text-white font-bold">Dom Pérignon Luminous x3</h5>
                  <p className="text-xs text-gray-500 tracking-wider">
                    Ordered by <span className="text-neon-purple uppercase">A. Volkov</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-neon-purple font-orbitron font-bold text-lg">$2,850</p>
                  <p className="text-[10px] text-gray-400">2 mins ago</p>
                </div>
              </div>
              {/* Order Item 2 */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-neon-purple transition-all group">
                <div className="relative">
                  <img
                    alt="VIP Guest"
                    className="w-12 h-12 rounded-full border-2 border-neon-magenta"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6zD-KxFFlozVEo5_dfcQ7zstCpiDC5vkl76TLQG45pUxm63mghDNl8gxGFW5QdpNc9SEl4sgal2lxaTwgTzRdLa0gppG5lqLPLKeHr1rko7yZelQypi4m_fBvNWseAR5_KLHeYIRZPXkiDBxP0nCXvd2KMOUJ7_hTtsOtyzqDDdOTzXHI-PNBGPNyv1ueWvAvZOWtHSVb62Gii27_tD6Bq2w9iqzNw0ld9lDVpruDp9O5VFo4J0AhgL1t_haqbNkHlkYl8sJCfRs2"
                  />
                  <span className="absolute -top-1 -right-1 bg-neon-magenta text-black text-[8px] font-black px-1.5 py-0.5 rounded-full">ELITE</span>
                </div>
                <div className="flex-1">
                  <h5 className="text-white font-bold">Ace of Spades Gold</h5>
                  <p className="text-xs text-gray-500 tracking-wider">
                    Ordered by <span className="text-neon-magenta uppercase">Bianca S.</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-neon-magenta font-orbitron font-bold text-lg">$1,100</p>
                  <p className="text-[10px] text-gray-400">8 mins ago</p>
                </div>
              </div>
              {/* Order Item 3 */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-neon-purple transition-all group">
                <div className="relative">
                  <img
                    alt="VIP Guest"
                    className="w-12 h-12 rounded-full border-2 border-white"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnySei8Hn8EoCzYS5sbzTUGRlOClzYJuQqp_rkrpl0eSMB6M0bRnB3uVwiDHddrD8Sdeff0tQ2ggN0EAj-fXHadHiQJTYhpvFBEWv89Ax8pTR1nS3NCsaAriuvKDoZtzXG-nzXdK8SENZKt-McCOwAWt8coRs9jWXSrhx9ctgfil00XEpLAw_7a0XcgYZKUPzO_WDi8ikU-l25JFnHkaBa5O19ngw8E4gYcj9QjXCNkVNdtSyoVvXZkir3rEjKoci0foB7fO55JL9-"
                  />
                </div>
                <div className="flex-1">
                  <h5 className="text-white font-bold">The Overload Platters x5</h5>
                  <p className="text-xs text-gray-500 tracking-wider">
                    Ordered by <span className="text-white uppercase">Table #42</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-white font-orbitron font-bold text-lg">$750</p>
                  <p className="text-[10px] text-gray-400">12 mins ago</p>
                </div>
              </div>
              {/* Order Item 4 */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-neon-purple transition-all group">
                <div className="relative">
                  <img
                    alt="VIP Guest"
                    className="w-12 h-12 rounded-full border-2 border-neon-purple"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5AFcfoJcvAK9xe9OLZSVfvlYC2PoWRY1rf6dkyrlNfMGX1-VzoqJEIrVzxfdJoIYBRskU15FQMbmbyanS3V8l4dFQgBm8cUNIuHeOFeA2O9DIG4ECdnAhqQtYa42AYyMb_4EvPkD3z4kXL44unKqZ0n-jxSc4QMHdmAJCH75MksOjLlQGb9Nnj42m9xkzhXRsmgkRbSgyzV4m8osNp6NJVMWYiZXnbC86tZmPQgDcChqfMvo5nOvSPLtUlDC3YGLJG22OvVg-Gib-"
                  />
                </div>
                <div className="flex-1">
                  <h5 className="text-white font-bold">Macallan 25 Year Glass</h5>
                  <p className="text-xs text-gray-500 tracking-wider">
                    Ordered by <span className="text-neon-purple uppercase">Markus J.</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-neon-purple font-orbitron font-bold text-lg">$350</p>
                  <p className="text-[10px] text-gray-400">15 mins ago</p>
                </div>
              </div>
            </div>
            <button className="mt-6 w-full py-3 rounded-xl bg-neon-purple text-black font-black uppercase tracking-widest hover:bg-neon-magenta transition-colors shadow-neon-glow">
              View All Transactions
            </button>
          </div>
        </section>

        {/* Bottom Bar Security / Audio */}
        <footer className="flex justify-between items-center glass-panel px-6 py-4 rounded-2xl border border-white/10" data-purpose="bottom-status-bar">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Security: Optimal</span>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4 text-neon-purple" fill="currentColor" viewBox="0 0 20 20">
                <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" />
              </svg>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Network: encrypted</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-[8px] text-gray-500 font-black uppercase">Current Track</p>
              <p className="text-xs text-white font-bold tracking-widest">TECHNO_OVERLOAD_V4.MP3</p>
            </div>
            <button className="w-8 h-8 rounded-full border border-neon-purple flex items-center justify-center text-neon-purple hover:bg-neon-purple hover:text-black transition-all">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default NeonOverloadDashboard;