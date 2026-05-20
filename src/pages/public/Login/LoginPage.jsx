// pages/LoginPage.jsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth, roleRedirect } from "../../../context/AuthContext";
import FormInput from "../../../components/Auth/FormInput";
import PasswordInput from "../../../components/Auth/PasswordInput";
import SubmitButton from "../../../components/Auth/SubmitButton";
import LeftPanel from "../../../components/Auth/LeftPanel";

const loginSchema = z.object({
  email: z.string()
    .min(1, "El correo es requerido")
    .email("Correo inválido"),
  password: z.string()
    .min(1, "La contraseña es requerida")
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
      const redirectPath = roleRedirect(result.role);
      navigate(from || redirectPath, { replace: true });
    }
  };

  return (
    
    <div className="flex flex-col md:flex-row min-h-screen h-screen w-full overflow-hidden bg-background-dark">
      {/* Left Panel con imagen */}
      <LeftPanel
        title="NOCTURNA"
        subtitle="Step into a world where the music never stops and the night is always young."
        icon="auto_awesome"
        backgroundImage="https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1600"
        showDots={true}
        showEstablished={true}
      />

      {/* Right Panel - Formulario de login */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="md:hidden flex justify-center mb-8">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-3xl">auto_awesome</span>
              <h2 className="text-2xl font-bold text-white">NOCTURNA</h2>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 sm:p-10 rounded-2xl shadow-2xl">
            <div className="mb-8">
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
                  placeholder="Ingresa tu contraseña"
                />
              </div>

              <SubmitButton loading={loading} loadingText="Ingresando..." icon="arrow_forward">
                Entrar
              </SubmitButton>
            </form>

            <p className="mt-8 text-center text-sm text-slate-400">
              ¿No tienes cuenta?{" "}
              <Link to="/register" className="text-primary font-bold hover:underline">
                Regístrate
              </Link>
            </p>
          </div>

          <footer className="mt-8 text-center text-xs text-slate-500 flex justify-center gap-6">
            <a href="#" className="hover:text-primary transition-colors">Privacidad</a>
            <a href="#" className="hover:text-primary transition-colors">Términos</a>
          </footer>
        </div>
      </div>
    </div>
  );
}