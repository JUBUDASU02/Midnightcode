import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-primary/10">

      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-3xl">
            flare
          </span>

          <h2 className="text-xl font-black tracking-tighter text-white uppercase italic">
            Neon Overload
          </h2>
        </div>

        <div className="hidden md:flex items-center gap-10">

          <a className="text-sm font-semibold hover:text-primary transition-colors uppercase tracking-widest">
            Experience
          </a>

          <a className="text-sm font-semibold hover:text-primary transition-colors uppercase tracking-widest">
            Menu
          </a>

          <a className="text-sm font-semibold hover:text-primary transition-colors uppercase tracking-widest">
            Live Acts
          </a>

          <a className="text-sm font-semibold hover:text-primary transition-colors uppercase tracking-widest">
            Location
          </a>

          <Link
            to="/login"
            className="bg-primary hover:bg-primary/80 text-white px-6 py-2 rounded-full font-bold text-sm transition-all neon-glow uppercase tracking-wider"
          >
            Login
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
