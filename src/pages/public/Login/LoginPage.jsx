// pages/LoginPage.jsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import FormInput from "../components/auth/FormInput";
import PasswordInput from "../components/auth/PasswordInput";
import SubmitButton from "../components/auth/SubmitButton";
import LeftPanel from "../components/auth/LeftPanel";

// ✅ Esquema con Zod
const loginSchema = z.object({
  email: z.string()
    .min(1, "El correo es requerido")
    .email("Correo inválido"),
  password: z.string()
    .min(1, "La contraseña es requerida")
    .min(6, "Mínimo 6 caracteres")
});

export default function LoginPage() {
  const { login, authError, clearError, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data) => {
    clearError();
    const result = await login({ 
      email: data.email, 
      password: data.password 
    });
    
    if (result.success) {
      const from = location.state?.from?.pathname;
      let dest = "/dashboard";
      
      if (result.role === "admin") dest = "/admin";
      else if (result.role === "dj") dest = "/dj";
      else if (result.role === "empleado") dest = "/empleado";
      
      navigate(from || dest, { replace: true });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full overflow-hidden">
      <LeftPanel
        title="NOCTURNA"
        subtitle="Step into a world where the music never stops and the night is always young."
        icon=""
        customBrand={
          <div className="size-12 text-primary">
            <svg viewBox="0 0 48 48">
              <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="currentColor" />
            </svg>
          </div>
        }
      />

      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 lg:p-24 relative bg-background-light dark:bg-background-dark">
        {/* Mobile logo */}
        <div className="lg:hidden absolute top-10 left-10 flex items-center gap-3">
          <div className="size-8 text-primary">
            <svg viewBox="0 0 48 48">
              <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="currentColor" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold">NOCTURNA</h2>
        </div>

        <div className="w-full max-w-md glass-panel p-8 sm:p-10 rounded-xl shadow-2xl">
          <div className="mb-10">
            <h3 className="text-3xl text-white font-bold mb-2">Bienvenido de nuevo</h3>
            <p className="text-slate-400">Ingresa tus credenciales para acceder al portal.</p>
          </div>

          {authError && (
            <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {authError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormInput
              label="Correo electrónico"
              name="email"
              type="email"
              placeholder="nombre@club.com"
              register={register}
              error={errors.email?.message}
              icon="mail"
            />

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-white text-sm">Contraseña</label>
                <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <PasswordInput
                name="password"
                register={register}
                error={errors.password?.message}
              />
            </div>

            <SubmitButton loading={loading} loadingText="Ingresando..." icon="arrow_forward">
              Entrar
            </SubmitButton>
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
}