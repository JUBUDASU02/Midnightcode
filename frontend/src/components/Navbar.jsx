import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="flex items-center justify-between border-b border-border-dark py-3 px-4">
      
      <div className="flex items-center gap-3 text-white">
        <div className="text-yellow-500">
          <span className="material-symbols-outlined">bolt</span>
        </div>
        <h2 className="text-lg font-bold">MidNightCode</h2>
      </div>

      <nav className="flex items-center gap-8">
        <Link to="/" className="hover:text-yellow-500">Home</Link>
        <Link to="/nosotros" className="hover:text-yellow-500">Nosotros</Link>
        <Link to="/contacto" className="hover:text-yellow-500">Contacto</Link>

        <Link
          to="/login"
          className="bg-yellow-500 text-black px-4 py-2 rounded-full font-bold"
        >
          Iniciar
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;