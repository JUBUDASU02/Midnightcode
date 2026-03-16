export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-white/5 bg-background-dark" id="footer">

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">

        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-2xl">
            flare
          </span>

          <a href="#hero">
          <h2 className="text-lg font-black text-white uppercase italic cursor-pointer">
            MidNight Code
          </h2>
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-8 text-slate-500 text-sm font-bold uppercase tracking-widest">

          <a className="hover:text-primary transition-colors cursor-pointer">Instagram</a>
          <a className="hover:text-primary transition-colors cursor-pointer">Spotify</a>
          <a className="hover:text-primary transition-colors cursor-pointer">Terms</a>
          <a className="hover:text-primary transition-colors cursor-pointer">Privacy</a>

        </div>

        <p className="text-slate-600 text-xs">
          © 2026 MidNight Code
        </p>

      </div>
    </footer>
  )
}
