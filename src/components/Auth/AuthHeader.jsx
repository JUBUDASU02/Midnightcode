// components/auth/AuthHeader.jsx
import { Link } from "react-router-dom";

export default function AuthHeader({ 
  showBackButton = true, 
  backUrl = "/login",
  backText = "Back to Login",
  logoText = "Eclipse",
  logoIcon = "auto_awesome"
}) {
  return (
    <header className="flex items-center justify-between mb-20">
      <div className="flex md:hidden items-center gap-2 text-primary">
        <span className="material-symbols-outlined text-3xl">{logoIcon}</span>
        <span className="font-bold text-xl uppercase tracking-widest">{logoText}</span>
      </div>

      {showBackButton && (
        <Link to={backUrl} className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors group">
          <span className="text-sm font-medium">{backText}</span>
          <span className="material-symbols-outlined text-lg group-hover:translate-x-1/2 transition-transform">
            arrow_forward
          </span>
        </Link>
      )}
    </header>
  );
}