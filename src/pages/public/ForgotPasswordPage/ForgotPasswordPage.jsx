// src/pages/auth/ForgotPasswordPage.jsx
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const schema = yup.object({
  email: yup
    .string()
    .email("Correo inválido")
    .required("El correo es requerido"),
});

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { forgotPassword, loading, authError, clearError } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    clearError();
    const result = await forgotPassword(data.email);
    
    if (result.success) {
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-background-light dark:bg-background-dark min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full glass-panel p-8 rounded-xl text-center">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-4xl text-primary">
              mail
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">
            ¡Revisa tu correo!
          </h2>
          <p className="text-slate-400 mb-6">
            Te hemos enviado un enlace para restablecer tu contraseña.
            Si no lo recibes en unos minutos, revisa tu carpeta de spam.
          </p>
          <Link
            to="/login"
            className="inline-block bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-lg transition"
          >
            Volver al inicio de sesión
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex items-center justify-center p-0 md:p-6 overflow-hidden">
      <div className="relative w-full max-w-6xl h-full md:h-[800px] flex flex-col md:flex-row overflow-hidden rounded-none md:rounded-xl shadow-2xl bg-background-dark">
        
        {/* LEFT PANEL */}
        <div className="hidden md:flex relative w-1/2 h-full overflow-hidden bg-background-dark">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-background-dark to-black z-10"></div>
          <div
            className="absolute inset-0 opacity-60 bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1574096079513-d8254e2b9c37?q=80&w=2070&auto=format&fit=crop)",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center z-20 p-12">
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-primary">
                <span className="material-symbols-outlined text-5xl">
                  auto_awesome
                </span>
                <h1 className="text-4xl font-bold tracking-tighter uppercase">
                  Nocturna
                </h1>
              </div>
              <p className="text-slate-300 text-xl max-w-md font-light leading-relaxed">
                Reconecta con el ritmo. Restablece tu acceso a los mejores
                eventos de la ciudad.
              </p>
            </div>
          </div>
          <div className="absolute bottom-10 left-10 z-20 flex gap-4">
            <div className="w-12 h-1 bg-primary rounded-full"></div>
            <div className="w-12 h-1 bg-primary/20 rounded-full"></div>
            <div className="w-12 h-1 bg-primary/20 rounded-full"></div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-full md:w-1/2 h-full flex flex-col p-8 md:p-16 relative bg-background-dark">
          
          {/* HEADER */}
          <header className="flex items-center justify-between mb-20">
            <div className="flex md:hidden items-center gap-2 text-primary">
              <span className="material-symbols-outlined text-3xl">auto_awesome</span>
              <span className="font-bold text-xl uppercase tracking-widest">Nocturna</span>
            </div>
            <Link to="/login" className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors group">
              <span className="text-sm font-medium">Volver al login</span>
              <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </Link>
          </header>

          {/* FORM AREA */}
          <main className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
            <div className="mb-10">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6 border border-primary/20">
                <span className="material-symbols-outlined text-3xl text-primary">
                  lock_reset
                </span>
              </div>
              <h2 className="text-4xl font-bold text-slate-100 mb-4 tracking-tight">
                ¿Olvidaste tu contraseña?
              </h2>
              <p className="text-slate-400 text-lg">
                Ingresa tu correo y te enviaremos un enlace de recuperación.
              </p>
            </div>

            {/* ERROR */}
            {authError && (
              <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                {authError}
              </div>
            )}

            {/* FORM */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">
                  Correo electrónico
                </label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors">
                    mail
                  </span>
                  <input
                    type="email"
                    placeholder="dj@nocturna-club.com"
                    {...register("email")}
                    className="w-full bg-primary/5 border border-primary/20 rounded-xl py-4 pl-12 pr-4 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-400 text-sm">{errors.email.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 disabled:opacity-60 text-white font-bold py-4 rounded-xl shadow-lg neon-glow transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {loading ? (
                  "Enviando..."
                ) : (
                  <>
                    <span>Enviar enlace</span>
                    <span className="material-symbols-outlined text-xl">send</span>
                  </>
                )}
              </button>
            </form>

            {/* INFO BOX */}
            <div className="mt-12 p-6 rounded-xl glass-panel">
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary">info</span>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Si no ves el correo en 5 minutos, revisa tu carpeta de spam.
                </p>
              </div>
            </div>
          </main>

          {/* FOOTER */}
          <footer className="mt-auto pt-8 flex justify-center gap-6 text-slate-600 text-xs uppercase tracking-widest">
            <a href="#" className="hover:text-primary transition-colors">Privacidad</a>
            <a href="#" className="hover:text-primary transition-colors">Términos</a>
            <a href="#" className="hover:text-primary transition-colors">Soporte</a>
          </footer>
        </div>

        {/* BACKGROUND BLOBS */}
        <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[40%] w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
      </div>
    </div>
  );
}