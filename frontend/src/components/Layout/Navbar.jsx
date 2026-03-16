import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-primary/10" id="navbar">

      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-3xl">
            flare
          </span>

          <a href="#footer">
          <h2 className="text-xl font-black tracking-tighter text-white uppercase italic cursor-pointer">
            MidNight Code
          </h2>
          </a>
        </div>

        <div className="hidden md:flex items-center gap-10">

          <a
          href="#experience"
           className="text-sm font-semibold hover:text-primary transition-colors uppercase tracking-widest cursor-pointer">
            Experiencia
          </a>

          <a
          href="#menu"
           className="text-sm font-semibold hover:text-primary transition-colors uppercase tracking-widest cursor-pointer">
            Menu
          </a>

          <a
          href="#live-acts"
           className="text-sm font-semibold hover:text-primary transition-colors uppercase tracking-widest cursor-pointer">
            Live Acts
          </a>

          <a
          href="#location"
          className="text-sm font-semibold hover:text-primary transition-colors uppercase tracking-widest cursor-pointer">
            Ubicación
          </a>
          <Link to={"/register"}>
          <button className="text-sm font-semibold hover:text-primary transition-colors uppercase tracking-widest">
            Registro
          </button>
          </Link>

          <Link to="/login">
          <button className="bg-primary hover:bg-primary/80 text-white px-6 py-2 rounded-full font-bold text-sm transition-all neon-glow uppercase tracking-wider">
          Inicio Sesión
          </button>
          </Link>

        </div>

        <div className="md:hidden">
          <span className="material-symbols-outlined text-white">
            menu
          </span>
        </div>

      </div>

    </nav>
  )
}
