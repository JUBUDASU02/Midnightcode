import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import publicApi from "../../../services/publicApi";

export default function Hero() {
  // parallax offset
  const [offset, setOffset] = useState(0);
  // countdown
  const [countdown, setCountdown] = useState(null); // { label, days, hours, mins, secs }
  // open status
  const [statusBar, setStatusBar] = useState({ open: false, text: "" });

  // Parallax
  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY * 0.5);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Open status
  useEffect(() => {
    const DAYS = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
    const OPEN_DAYS = [3,4,5,6,0]; // Wed=3, Thu=4, Fri=5, Sat=6, Sun=0
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    const isOpenDay = OPEN_DAYS.includes(day);
    const isOpenHour = hour >= 22 || hour < 5;
    if (isOpenDay && isOpenHour) {
      setStatusBar({ open: true, text: `Abierto esta noche · ${DAYS[day]} · Puertas 10PM` });
    } else {
      // Find next open day
      let nextDay = (day + 1) % 7;
      let daysAhead = 1;
      while (!OPEN_DAYS.includes(nextDay)) { nextDay = (nextDay + 1) % 7; daysAhead++; }
      setStatusBar({ open: false, text: `Abrimos el ${DAYS[nextDay]}${daysAhead === 1 ? " mañana" : ""}` });
    }
  }, []);

  // Countdown
  useEffect(() => {
    let timer;
    publicApi.get("/eventos").then(({ data }) => {
      if (!data.success || !data.data?.length) return;
      const now = new Date();
      const upcoming = data.data
        .filter(e => new Date(e.fecha) > now)
        .sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
      if (!upcoming.length) return;
      const next = upcoming[0];
      const target = new Date(next.fecha);
      const tick = () => {
        const diff = target - new Date();
        if (diff <= 0) { setCountdown(null); return; }
        const days = Math.floor(diff / 86400000);
        const hours = Math.floor((diff % 86400000) / 3600000);
        const mins  = Math.floor((diff % 3600000) / 60000);
        const secs  = Math.floor((diff % 60000) / 1000);
        setCountdown({ label: next.nombre, days, hours, mins, secs });
      };
      tick();
      timer = setInterval(tick, 1000);
    }).catch(() => {});
    return () => clearInterval(timer);
  }, []);

  const bars = Array.from({ length: 28 });

  return (
    <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background with parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvyU3ZUiG_yO08zTeWovuNZvrMsmOC3-hfKEyqjIZaaow73PJCKxT3cyWQxRD-sI05ldZMEkEQsXrx8XvP7MXtfuV49a3dDAdYOoWedvyx14jQto9zzdIktxteVuiyuTYBVbBO-gIstc6LRUSG1EMJ6tDIz9CWKQkv4goX8JKzhtGrbj04eCLcT7_viTgqoHb3yH2QLe8XrqVdHxjEhFFJYb2aDko1QmMo51fMxQ_GEuvT0BT8TSzAKKY_TYlfM34hBzhPizGM"
          className="w-full h-full object-cover opacity-70 scale-110"
          style={{ transform: `scale(1.1) translateY(${offset * 0.3}px)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/30 to-transparent" />
        <div className="absolute inset-0 bg-primary/5 mix-blend-color-dodge" />
      </div>

      {/* Open status bar */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 z-20">
        <div className={`flex items-center gap-2 px-5 py-2 rounded-full glass border text-xs font-bold uppercase tracking-widest ${statusBar.open ? "border-green-400/30 text-green-400" : "border-red-400/30 text-red-400"}`}>
          <span className={`w-2 h-2 rounded-full ${statusBar.open ? "bg-green-400 status-dot" : "bg-red-400"}`} />
          {statusBar.text}
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-5xl">
        <span className="inline-block px-4 py-1 rounded-full border border-primary/40 text-primary text-xs font-bold uppercase tracking-[0.3em] mb-6 glass">
          El Eclipse de la Vida Nocturna
        </span>

        <h1 className="text-6xl md:text-9xl font-black text-white leading-none tracking-tighter mb-8 italic uppercase">
          SOBRECARGA{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400 text-glow">
            NEON
          </span>
        </h1>

        <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-6 font-light leading-relaxed">
          Entra a un universo donde la energía, la música y el lujo se fusionan.
          Descubre el pulso eléctrico de la noche en el santuario más exclusivo de la ciudad.
        </p>

        {/* Countdown */}
        {countdown && (
          <div className="flex justify-center gap-4 mb-8">
            <div className="glass border border-primary/20 px-3 py-2 rounded-xl text-center min-w-[64px]">
              <p className="text-2xl font-black text-primary font-mono">{String(countdown.days).padStart(2,"0")}</p>
              <p className="text-[9px] text-slate-500 uppercase tracking-widest">Días</p>
            </div>
            <div className="glass border border-primary/20 px-3 py-2 rounded-xl text-center min-w-[64px]">
              <p className="text-2xl font-black text-primary font-mono">{String(countdown.hours).padStart(2,"0")}</p>
              <p className="text-[9px] text-slate-500 uppercase tracking-widest">Horas</p>
            </div>
            <div className="glass border border-primary/20 px-3 py-2 rounded-xl text-center min-w-[64px]">
              <p className="text-2xl font-black text-primary font-mono">{String(countdown.mins).padStart(2,"0")}</p>
              <p className="text-[9px] text-slate-500 uppercase tracking-widest">Min</p>
            </div>
            <div className="glass border border-primary/20 px-3 py-2 rounded-xl text-center min-w-[64px]">
              <p className="text-2xl font-black text-primary font-mono">{String(countdown.secs).padStart(2,"0")}</p>
              <p className="text-[9px] text-slate-500 uppercase tracking-widest">Seg</p>
            </div>
          </div>
        )}
        {countdown && (
          <p className="text-xs text-slate-500 font-mono uppercase tracking-widest mb-6">
            Próximo evento: {countdown.label}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/register">
            <button className="bg-primary text-white px-10 py-4 rounded-xl font-black text-lg neon-glow uppercase hover:translate-y-[-2px] transition-all">
              Reservar VIP
            </button>
          </Link>
          <Link to="/register">
            <button className="glass text-white px-10 py-4 rounded-xl font-black text-lg uppercase hover:bg-primary/20 transition-all border border-white/10">
              Pedir Canción
            </button>
          </Link>
        </div>
      </div>

      {/* Audio visualizer */}
      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-[3px] h-20 z-10 px-4 opacity-60">
        {bars.map((_, i) => (
          <div
            key={i}
            className="flex-1 max-w-[8px] rounded-t-full bar-anim"
            style={{
              animationDelay: `${i * 0.08}s`,
              background: i % 3 === 0 ? "#BF00FF" : i % 3 === 1 ? "#FF00FF" : "rgba(255,255,255,0.3)",
              minHeight: "8px",
            }}
          />
        ))}
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 z-20">
        <p className="text-[10px] uppercase tracking-[0.5em]">Desliza para sumergirte</p>
        <span className="material-symbols-outlined animate-bounce">keyboard_double_arrow_down</span>
      </div>
    </section>
  );
}
