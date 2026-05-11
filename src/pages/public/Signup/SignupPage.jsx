// pages/RegisterPage.jsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import FormInput from "../components/auth/FormInput";
import PasswordInput from "../components/auth/PasswordInput";
import SubmitButton from "../components/auth/SubmitButton";
import GlassCard from "../components/auth/GlassCard";
import SocialProof from "../components/auth/SocialProof";

// ✅ Esquema con Zod
const registerSchema = z.object({
  name: z.string()
    .min(1, "El nombre es requerido")
    .min(2, "Mínimo 2 caracteres"),
  email: z.string()
    .min(1, "El correo es requerido")
    .email("Correo inválido"),
  password: z.string()
    .min(1, "La contraseña es requerida")
    .min(6, "Mínimo 6 caracteres"),
  confirmPassword: z.string()
    .min(1, "Confirma tu contraseña"),
  terms: z.boolean()
    .refine(val => val === true, "Debes aceptar los términos")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"]
});

export default function RegisterPage() {
  const { register: authRegister, authError, clearError, loading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data) => {
    clearError();
    const result = await authRegister({
      name: data.name,
      email: data.email,
      password: data.password,
    });
    
    if (result.success) {
      navigate("/dashboard", { replace: true });
    }
  };

  return (
    <div className="relative flex min-h-screen w-full overflow-hidden bg-background-dark text-slate-100 font-display">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-center items-center px-12 overflow-hidden border-r border-primary/10">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/20 via-transparent to-black" />
        <div className="relative z-10 flex flex-col items-start max-w-md">
          <div className="flex items-center gap-3 mb-12">
            <span className="material-symbols-outlined text-primary text-4xl">diamond</span>
            <span className="text-3xl font-bold uppercase">Elite Nightlife</span>
          </div>
          <h1 className="text-6xl xl:text-8xl font-black leading-none tracking-tight mb-6 uppercase">
            Únete a la <br />
            <span className="text-primary text-glow">Élite</span>
          </h1>
          <p className="text-xl text-slate-400 font-medium max-w-sm mb-8">
            Acceso exclusivo a los mejores eventos y experiencias VIP de la ciudad.
          </p>
          <SocialProof count="2,000" text="miembros esta semana" />
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-3xl">diamond</span>
              <span className="text-2xl font-bold uppercase">Elite</span>
            </div>
          </div>

          <GlassCard>
            <h2 className="text-3xl font-bold mb-2">Crear cuenta</h2>
            <p className="text-slate-400 mb-8">Ingresa tus datos para solicitar tu pase digital.</p>

            {authError && (
              <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                {authError}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <FormInput
                label="Nombre completo"
                name="name"
                placeholder="John Doe"
                register={register}
                error={errors.name?.message}
                icon="person"
              />

              <FormInput
                label="Correo electrónico"
                name="email"
                type="email"
                placeholder="nombre@ejemplo.com"
                register={register}
                error={errors.email?.message}
                icon="mail"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <PasswordInput
                  label="Contraseña"
                  name="password"
                  register={register}
                  error={errors.password?.message}
                  placeholder="••••••"
                />
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 ml-1">Confirmar</label>
                  <input
                    type="password"
                    placeholder="••••••"
                    {...register("confirmPassword")}
                    className={`w-full bg-primary/5 border ${errors.confirmPassword ? 'border-red-500' : 'border-primary/20'} rounded-xl py-4 px-4 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all`}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-400 text-sm">{errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-2 pt-2">
                <input
                  type="checkbox"
                  {...register("terms")}
                  className="size-4 rounded border-primary/30 bg-primary/10 text-primary mt-0.5"
                />
                <label className="text-xs text-slate-400">
                  Acepto los{" "}
                  <a href="#" className="text-primary hover:underline">Términos de Servicio</a>
                  {" "}y la{" "}
                  <a href="#" className="text-primary hover:underline">Política de Privacidad</a>
                </label>
              </div>
              {errors.terms && (
                <p className="text-red-400 text-xs">{errors.terms.message}</p>
              )}

              <SubmitButton loading={loading} loadingText="Creando cuenta..." icon="">
                Obtener mi Pase
              </SubmitButton>
            </form>

            <p className="mt-8 text-center text-sm text-slate-400">
              ¿Ya tienes cuenta?{" "}
              <Link to="/login" className="text-primary font-bold hover:underline">
                Inicia sesión
              </Link>
            </p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}