export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">

      <div className="absolute inset-0 z-0">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvyU3ZUiG_yO08zTeWovuNZvrMsmOC3-hfKEyqjIZaaow73PJCKxT3cyWQxRD-sI05ldZMEkEQsXrx8XvP7MXtfuV49a3dDAdYOoWedvyx14jQto9zzdIktxteVuiyuTYBVbBO-gIstc6LRUSG1EMJ6tDIz9CWKQkv4goX8JKzhtGrbj04eCLcT7_viTgqoHb3yH2QLe8XrqVdHxjEhFFJYb2aDko1QmMo51fMxQ_GEuvT0BT8TSzAKKY_TYlfM34hBzhPizGM"
          className="w-full h-full object-cover opacity-70 scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/30 to-transparent"></div>
        <div className="absolute inset-0 bg-primary/5 mix-blend-color-dodge"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl">

        <span className="inline-block px-4 py-1 rounded-full border border-primary/40 text-primary text-xs font-bold uppercase tracking-[0.3em] mb-6 glass">
          The Eclipse of Nightlife
        </span>

        <h1 className="text-6xl md:text-9xl font-black text-white leading-none tracking-tighter mb-8 italic uppercase">
          NEON{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400 text-glow">
            OVERLOAD
          </span>
        </h1>

        <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed">
          Step into a world where high-energy meets ultra-luxury. Experience
          the deep pulse of electric purple in the city's most exclusive sanctuary.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">

          <button className="bg-primary text-white px-10 py-4 rounded-xl font-black text-lg neon-glow uppercase hover:translate-y-[-2px] transition-all">
            Request VIP Access
          </button>

          <button className="glass text-white px-10 py-4 rounded-xl font-black text-lg uppercase hover:bg-primary/20 transition-all border border-white/10">
            Watch Teaser
          </button>

        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <p className="text-[10px] uppercase tracking-[0.5em]">
          Scroll to Immerse
        </p>

        <span className="material-symbols-outlined animate-bounce">
          keyboard_double_arrow_down
        </span>
      </div>
    </section>
  )
}
