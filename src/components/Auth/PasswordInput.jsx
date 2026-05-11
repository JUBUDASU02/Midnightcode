// components/auth/PasswordInput.jsx
import { useState } from "react";

export default function PasswordInput({ 
  label, 
  name, 
  register, 
  error, 
  placeholder = "••••••••",
  className = ""
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-300 ml-1">{label}</label>
      <div className="relative group">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors">
          lock
        </span>
        <input
          type={show ? "text" : "password"}
          placeholder={placeholder}
          {...register(name)}
          className={`w-full bg-primary/5 border ${error ? 'border-red-500' : 'border-primary/20'} rounded-xl py-4 pl-12 pr-12 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all ${className}`}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined">
            {show ? "visibility_off" : "visibility"}
          </span>
        </button>
      </div>
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  );
}