// pages/ResetPasswordPage.jsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useParams, useNavigate, Link } from "react-router-dom";
import { resetPasswordRequest } from "../../../services/authService";
import PasswordInput from "../../../components/Auth/PasswordInput";
import SubmitButton from "../../../components/Auth/SubmitButton";
import PasswordStrength from "../../../components/Auth/PasswordStrength";
import LeftPanel from "../../../components/Auth/LeftPanel";


const resetPasswordSchema = z.object({
  password: z.string()
    .min(1, "La contraseña es requerida")
    .min(8, "Mínimo 8 caracteres")
    .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
    .regex(/[0-9]/, "Debe contener al menos un número")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Debe contener al menos un símbolo"),
  confirmPassword: z.string()
    .min(1, "Por favor confirma tu contraseña")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"]
});

export default function ResetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(resetPasswordSchema)
  });

  const password = watch("password", "");

  const onSubmit = async (data) => {
    setServerError("");
    setSuccessMessage("");
    setLoading(true);
    
    try {
      const response = await resetPasswordRequest(token, data.password);
      setSuccessMessage(response.message || "Contraseña restablecida exitosamente");
      
      setTimeout(() => {
        navigate("/login", { 
          state: { 
            message: "¡Contraseña restablecida exitosamente! Ahora puedes iniciar sesión con tu nueva contraseña." 
          }
        });
      }, 2000);
    } catch (error) {
      setServerError(error.message || "Error al restablecer la contraseña. El enlace puede haber expirado.");
      console.error("Reset password error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen h-screen w-full overflow-hidden bg-background-dark">
      {/* Left Panel con imagen */}
      <LeftPanel
        title="ECLIPSE"
        subtitle="Nightlife redefined. Secure your account with a new password."
        icon="flare"
        backgroundImage="https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1600"
        showDots={true}
        showEstablished={true}
      />

      {/* Right Panel - Formulario */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="md:hidden flex justify-center mb-8">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-3xl">flare</span>
              <h2 className="text-2xl font-bold text-white">ECLIPSE</h2>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 sm:p-10 rounded-2xl shadow-2xl">
            <div className="mb-8 text-center md:text-left">
              <div className="flex justify-center md:justify-start mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-purple-400 flex items-center justify-center shadow-lg">
                  <span className="material-symbols-outlined text-3xl text-white">lock_reset</span>
                </div>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Restablecer Contraseña</h2>
              <p className="text-slate-400">Protege tu cuenta con una nueva contraseña segura.</p>
            </div>

            {/* Mensaje de éxito */}
            {successMessage && (
              <div className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-sm">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  <span>{successMessage}</span>
                </div>
                <p className="text-xs mt-2 text-green-400/80">Redirigiendo al login...</p>
              </div>
            )}

            {/* Mensaje de error */}
            {serverError && (
              <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">error</span>
                  <span>{serverError}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <PasswordInput
                label="Nueva Contraseña"
                name="password"
                register={register}
                error={errors.password?.message}
                placeholder="Ingresa tu nueva contraseña"
              />
              
              {/* Indicador de fortaleza de contraseña */}
              {password && !errors.password && (
                <PasswordStrength password={password} />
              )}
              
              <PasswordInput
                label="Confirmar Contraseña"
                name="confirmPassword"
                register={register}
                error={errors.confirmPassword?.message}
                placeholder="Repite tu nueva contraseña"
              />
              
              <SubmitButton 
                loading={loading} 
                loadingText="Actualizando contraseña..." 
                icon="lock_reset"
              >
                Actualizar Contraseña
              </SubmitButton>
            </form>

            <div className="mt-8 pt-6 border-t border-white/10">
              <Link 
                to="/login" 
                className="text-sm text-slate-400 hover:text-white flex justify-center gap-2 transition-colors"
              >
                <span className="material-symbols-outlined text-sm">keyboard_backspace</span>
                Volver al inicio de sesión
              </Link>
            </div>

            {/* Información de seguridad */}
            <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/10">
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-primary text-sm">security</span>
                <div className="text-xs text-slate-400">
                  <p className="mb-1">Tu contraseña debe contener:</p>
                  <ul className="list-disc list-inside space-y-0.5">
                    <li>Mínimo 8 caracteres</li>
                    <li>Al menos una letra mayúscula</li>
                    <li>Al menos un número</li>
                    <li>Al menos un símbolo especial</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <footer className="mt-8 text-center text-xs text-slate-500">
            <p>ECLIPSE Nightclub • Est. 2024</p>
          </footer>
        </div>
      </div>
    </div>
  );
}