<<<<<<< HEAD
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

// ✅ BUG-03 FIX: LoginPage conectado a useAuth — onSubmit llama login() real

const schema = yup.object({
  email:    yup.string().email("Correo inválido").required("El correo es requerido"),
  password: yup.string().min(6, "Mínimo 6 caracteres").required("La contraseña es requerida"),
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { login, authError, clearError, loading } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    clearError();
    const result = await login({ email: data.email, password: data.password });
    if (result.success) {
      const from = location.state?.from?.pathname;
      const dest =
        result.role === "admin"    ? "/admin"    :
        result.role === "dj"       ? "/dj"       :
        result.role === "empleado" ? "/empleado" :
        "/dashboard";
      navigate(from || dest, { replace: true });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full overflow-hidden">

      {/* LEFT PANEL */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-background-dark items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]" />
        </div>
        <div className="relative z-10 flex flex-col items-center text-center px-12">
          <div className="mb-8 flex items-center gap-4 text-white">
            <div className="size-12 text-primary">
              <svg viewBox="0 0 48 48">
                <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="currentColor"/>
              </svg>
            </div>
            <h1 className="text-white text-6xl font-bold tracking-[-0.05em]">NOCTURNA</h1>
          </div>
          <p className="text-slate-400 text-xl max-w-md leading-relaxed">
            Step into a world where the music never stops and the night is always young.
          </p>
          {/* Credenciales demo visibles */}
          <div className="mt-8 p-4 rounded-xl bg-primary/10 border border-primary/20 text-left w-full max-w-sm">
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">Demo credentials</p>
            <p className="text-slate-300 text-sm">User: <span className="text-white font-mono">user@neon.com</span> / <span className="text-white font-mono">password123</span></p>
            <p className="text-slate-300 text-sm">Admin: <span className="text-white font-mono">admin@neon.com</span> / <span className="text-white font-mono">admin123</span></p>
            <p className="text-slate-300 text-sm">DJ: <span className="text-white font-mono">dj@neon.com</span> / <span className="text-white font-mono">dj123</span></p>
          </div>
        </div>
        <div className="absolute bottom-10 left-10 flex gap-4">
          <div className="w-12 h-1 bg-primary rounded-full" />
          <div className="w-12 h-1 bg-white/10 rounded-full" />
          <div className="w-12 h-1 bg-white/10 rounded-full" />
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 lg:p-24 relative bg-background-light dark:bg-background-dark">

        {/* Mobile logo */}
        <div className="lg:hidden absolute top-10 left-10 flex items-center gap-3">
          <div className="size-8 text-primary">
            <svg viewBox="0 0 48 48">
              <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="currentColor"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold">NOCTURNA</h2>
        </div>

        <div className="w-full max-w-md glass-panel p-8 sm:p-10 rounded-xl shadow-2xl">
          <div className="mb-10">
            <h3 className="text-3xl text-white font-bold mb-2">Bienvenido de nuevo</h3>
            <p className="text-slate-400">Ingresa tus credenciales para acceder al portal.</p>
          </div>

          {/* Error de auth */}
          {authError && (
            <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {authError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            <div>
              <label className="text-sm text-white mb-2 block">Correo electrónico</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">mail</span>
                <input
                  type="email"
                  placeholder="nombre@club.com"
                  {...register("email")}
                  className="w-full pl-12 pr-4 py-4 rounded-lg bg-white/5 border border-primary/30 text-white focus:ring-primary outline-none"
                />
              </div>
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-white text-sm">Contraseña</label>
                <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">lock</span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password")}
                  className="w-full pl-12 pr-12 py-4 rounded-lg bg-white/5 border border-primary/30 text-white outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary"
                >
                  <span className="material-symbols-outlined">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 bg-primary hover:bg-primary/90 disabled:opacity-60 text-white rounded-lg font-bold text-lg shadow-lg neon-glow flex items-center justify-center gap-2"
            >
              {loading ? "Ingresando..." : "Entrar"}
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>

          </form>

          <p className="mt-10 text-center text-sm text-slate-500">
            ¿No tienes cuenta?{" "}
            <Link to="/register" className="text-primary font-bold hover:underline">
              Regístrate
            </Link>
          </p>
        </div>

        <footer className="absolute bottom-8 text-xs text-slate-500 flex gap-6">
          <a href="#" className="hover:text-primary">Privacidad</a>
          <a href="#" className="hover:text-primary">Términos</a>
        </footer>
      </div>
    </div>
  );
=======
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import AuthFooter from "../../../components/Layout/AuthFooter"

const schema = yup.object({
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),

  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("Password is required")
})

export default function LoginPage(){

const {
  register,
  handleSubmit,
  formState:{errors}
} = useForm({
  resolver: yupResolver(schema)
})

const onSubmit = (data)=>{
  console.log("LOGIN DATA",data)
}

return(

<div className="flex flex-col lg:flex-row min-h-screen w-full bg-background-light dark:bg-background-dark font-display">

{/* LEFT PANEL */}

<div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-background-dark">

<div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-background-dark to-black z-10"/>

<div
className="absolute inset-0 opacity-60 bg-cover bg-center"
style={{
backgroundImage:
"url('https://lh3.googleusercontent.com/aida-public/LOGIN_IMAGE_URL')"
}}
/>

</div>

{/* RIGHT PANEL */}

<div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 lg:p-24 relative">

<div className="w-full max-w-md bg-[#1a1023]/60 backdrop-blur border border-primary/20 p-10 rounded-xl shadow-2xl">

<h3 className="text-3xl font-bold mb-6">Welcome Back</h3>

<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

{/* EMAIL */}

<div>

<input
type="email"
placeholder="name@email.com"
{...register("email")}
className="w-full px-4 py-4 rounded-lg bg-background-dark/50 border border-primary/30 text-white"
/>

{errors.email && (
<p className="text-red-400 text-xs">
{errors.email.message}
</p>
)}

</div>

{/* PASSWORD */}

<div>

<input
type="password"
placeholder="••••••••"
{...register("password")}
className="w-full px-4 py-4 rounded-lg bg-background-dark/50 border border-primary/30 text-white"
/>

{errors.password && (
<p className="text-red-400 text-xs">
{errors.password.message}
</p>
)}

</div>

<button
type="submit"
className="w-full py-4 bg-primary text-white rounded-lg font-bold"
>
Enter the Night
</button>

</form>

</div>

<AuthFooter/>

</div>

</div>

)

>>>>>>> b4ef4ea (featu:Home)
}
