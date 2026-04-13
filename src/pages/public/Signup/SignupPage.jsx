// src/pages/auth/RegisterPage.jsx
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

// ✅ Schema con documento de identidad y teléfono
const schema = yup.object({
  name: yup.string().min(2, "Mínimo 2 caracteres").required("El nombre es requerido"),
  email: yup.string().email("Correo inválido").required("El correo es requerido"),
  documentId: yup
    .string()
    .min(6, "Mínimo 6 caracteres")
    .max(20, "Máximo 20 caracteres")
    .matches(/^[0-9]+$/, "Solo números permitidos")
    .required("El documento de identidad es requerido"),
  telefono: yup
    .string()
    .min(10, "Mínimo 10 caracteres")  // ✅ Corregido: mínimo 10
    .max(15, "Máximo 15 caracteres")
    .matches(/^[0-9]+$/, "Solo números permitidos")
    .required("El teléfono es requerido"),
  password: yup.string().min(6, "Mínimo 6 caracteres").required("La contraseña es requerida"),
  confirmPassword: yup.string()
    .oneOf([yup.ref("password")], "Las contraseñas no coinciden")
    .required("Confirma tu contraseña"),
  terms: yup.boolean().oneOf([true], "Debes aceptar los términos"),
});

export default function RegisterPage() {
  const [showPass, setShowPass] = useState(false);
  const { register: authRegister, authError, clearError, loading } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    clearError();
    const result = await authRegister({
      name: data.name,
      email: data.email,
      telefono: data.telefono,      // ✅ Enviar teléfono
      documentId: data.documentId,
      password: data.password,
    });
    
    if (result.success) {
      const dest =
        result.role === "admin" ? "/admin" :
        result.role === "dj" ? "/dj" :
        result.role === "empleado" ? "/empleado" :
        "/dashboard";
      navigate(dest, { replace: true });
    }
  };

  return (
    <div className="relative flex min-h-screen w-full overflow-hidden bg-background-dark text-slate-100 font-display">
      {/* LEFT SIDE - Igual */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-center items-center px-12 overflow-hidden border-r border-primary/10">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/20 via-transparent to-black" />
        <div className="relative z-10 flex flex-col items-start max-w-md">
          <div className="flex items-center gap-3 mb-12">
            <span className="material-symbols-outlined text-primary text-4xl">diamond</span>
            <span className="text-3xl font-bold uppercase">NOCTURNA</span>
          </div>
          <h1 className="text-6xl xl:text-8xl font-black leading-none tracking-tight mb-6 uppercase">
            Únete a la <br />
            <span className="text-primary text-glow">Élite</span>
          </h1>
          <p className="text-xl text-slate-400 font-medium max-w-sm mb-8">
            Acceso exclusivo a los mejores eventos y experiencias VIP de la ciudad.
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <div className="flex -space-x-3">
              {[3, 5, 7].map((n) => (
                <img key={n} className="size-10 rounded-full border-2 border-background-dark" src={`https://i.pravatar.cc/100?img=${n}`} alt="" />
              ))}
            </div>
            <span className="text-sm font-medium">+2,000 miembros esta semana</span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-3xl">diamond</span>
              <span className="text-2xl font-bold uppercase">NOCTURNA</span>
            </div>
          </div>

          <div className="glass p-8 sm:p-10 rounded-xl shadow-2xl relative overflow-hidden">
            <div className="absolute -top-10 -right-10 size-40 bg-primary/20 blur-3xl rounded-full" />
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-2">Crear cuenta</h2>
              <p className="text-slate-400 mb-8">Ingresa tus datos para solicitar tu pase digital.</p>

              {authError && (
                <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                  {authError}
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Nombre completo */}
                <div className="space-y-2">
                  <label className="text-sm text-slate-300 ml-1">Nombre completo</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">person</span>
                    <input
                      type="text"
                      placeholder="John Doe"
                      {...register("name")}
                      className="w-full pl-12 pr-4 py-4 bg-primary/5 border border-primary/20 rounded-xl text-slate-100 placeholder:text-slate-600 outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                </div>

                {/* Correo electrónico */}
                <div className="space-y-2">
                  <label className="text-sm text-slate-300 ml-1">Correo electrónico</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">mail</span>
                    <input
                      type="email"
                      placeholder="nombre@ejemplo.com"
                      {...register("email")}
                      className="w-full pl-12 pr-4 py-4 bg-primary/5 border border-primary/20 rounded-xl text-slate-100 placeholder:text-slate-600 outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                </div>

                {/* Documento de identidad */}
                <div className="space-y-2">
                  <label className="text-sm text-slate-300 ml-1">Documento de identidad</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">badge</span>
                    <input
                      type="text"
                      placeholder="1234567890"
                      {...register("documentId")}
                      className="w-full pl-12 pr-4 py-4 bg-primary/5 border border-primary/20 rounded-xl text-slate-100 placeholder:text-slate-600 outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  {errors.documentId && <p className="text-red-400 text-xs mt-1">{errors.documentId.message}</p>}
                </div>

                {/* ✅ Teléfono - CORREGIDO el error del mensaje */}
                <div className="space-y-2">
                  <label className="text-sm text-slate-300 ml-1">Teléfono</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">call</span>
                    <input
                      type="text"
                      placeholder="3001234567"
                      {...register("telefono")}
                      className="w-full pl-12 pr-4 py-4 bg-primary/5 border border-primary/20 rounded-xl text-slate-100 placeholder:text-slate-600 outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  {errors.telefono && <p className="text-red-400 text-xs mt-1">{errors.telefono.message}</p>}
                </div>

                {/* Contraseñas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-slate-300 ml-1">Contraseña</label>
                    <div className="relative">
                      <input
                        type={showPass ? "text" : "password"}
                        placeholder="••••••"
                        {...register("password")}
                        className="w-full px-4 py-4 bg-primary/5 border border-primary/20 rounded-xl text-slate-100 outline-none pr-12 focus:ring-2 focus:ring-primary"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-primary"
                      >
                        <span className="material-symbols-outlined text-sm">
                          {showPass ? "visibility_off" : "visibility"}
                        </span>
                      </button>
                    </div>
                    {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-slate-300 ml-1">Confirmar</label>
                    <input
                      type="password"
                      placeholder="••••••"
                      {...register("confirmPassword")}
                      className="w-full px-4 py-4 bg-primary/5 border border-primary/20 rounded-xl text-slate-100 outline-none focus:ring-2 focus:ring-primary"
                    />
                    {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword.message}</p>}
                  </div>
                </div>

                {/* Términos */}
                <div className="flex items-start gap-2 pt-2">
                  <input
                    type="checkbox"
                    {...register("terms")}
                    className="size-4 rounded border-primary/30 bg-primary/10 text-primary mt-0.5 focus:ring-primary"
                  />
                  <label className="text-xs text-slate-400">
                    Acepto los{" "}
                    <a href="#" className="text-primary hover:underline">Términos de Servicio</a>
                    {" "}y la{" "}
                    <a href="#" className="text-primary hover:underline">Política de Privacidad</a>
                  </label>
                </div>
                {errors.terms && <p className="text-red-400 text-xs mt-1">{errors.terms.message}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary/90 disabled:opacity-60 text-white font-bold py-4 rounded-xl neon-glow flex items-center justify-center gap-2 transition-all"
                >
                  {loading ? "Creando cuenta..." : "Obtener mi Pase"}
                </button>
              </form>

              <p className="mt-8 text-center text-sm text-slate-400">
                ¿Ya tienes cuenta?{" "}
                <Link to="/login" className="text-primary font-bold hover:underline">
                  Inicia sesión
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}