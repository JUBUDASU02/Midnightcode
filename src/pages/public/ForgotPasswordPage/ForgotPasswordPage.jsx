// pages/ForgotPasswordPage.jsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { forgotPasswordRequest } from "../../../services/authService"; // ✅ Importar servicio
import AuthLayout from "../../../components/Auth/AuthLayout";
import LeftPanel from "../../../components/Auth/LeftPanel";
import RightPanel from "../../../components/Auth/RightPanel";
import AuthHeader from "../../../components/Auth/AuthHeader";
import AuthFooter from "../../../components/Auth/AuthFooter";
import FormInput from "../../../components/Auth/FormInput";
import SubmitButton from "../../../components/Auth/SubmitButton";

const forgotPasswordSchema = z.object({
  email: z.string()
    .min(1, "El correo es requerido")
    .email("Formato de correo inválido")
});

export default function ForgotPasswordPage() {
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema)
  });

  const onSubmit = async (data) => {
    setServerError("");
    setSuccessMessage("");
    setLoading(true);
    
    try {
      const response = await forgotPasswordRequest(data.email);
      setSuccessMessage(response.message || "Correo de recuperación enviado. Revisa tu bandeja de entrada.");
      
      // Redirigir después de 3 segundos
      setTimeout(() => {
        navigate("/login", { 
          state: { message: "Revisa tu correo para restablecer tu contraseña" }
        });
      }, 3000);
    } catch (error) {
      setServerError(error.message || "Error al enviar el correo de recuperación");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <LeftPanel
        title="Eclipse"
        subtitle="Reconnect with the rhythm. Reset your access to the city's most exclusive beats."
        backgroundImage="https://lh3.googleusercontent.com/aida-public/AB6AXuDbCWdIi07fC21qGp_MK1QdyOPX7qp3IFpLmjCvebBWP1Vv0hPDSuN-3hJWnV_KXqnE9ouzdC08xR8ZR4au4vObp3TViedAgNuVbv2K4h1-fWFj5LIlyhmZCH3lHkAEJt9HOCPHDexasDVAPoYDjqqDOWPGomV09J148xNvOk-6Xfju4lcrVHYJ9g2i90B0dvCX9mDMbjRPtgu6vbTT7RdvJLEnaf-RVh-9k1Zwab5293K9zEDqq6-BHtEOMS3ZQA39sWC2eDcXX-rI"
      />

      <RightPanel>
        <AuthHeader backUrl="/login" backText="Volver al Login" />

        <main className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
          <div className="mb-10">
            <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6 border border-primary/20">
              <span className="material-symbols-outlined text-3xl text-primary">lock_reset</span>
            </div>
            <h2 className="text-4xl font-bold text-slate-100 mb-4 tracking-tight">¿Olvidaste tu contraseña?</h2>
            <p className="text-slate-400 text-lg">Ingresa tu correo y te enviaremos un enlace de recuperación.</p>
          </div>

          {successMessage && (
            <div className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-sm">
              {successMessage}
            </div>
          )}

          {serverError && (
            <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormInput
              label="Correo electrónico"
              name="email"
              type="email"
              placeholder="dj@eclipse-club.com"
              register={register}
              error={errors.email?.message}
              icon="mail"
            />

            <SubmitButton loading={loading} loadingText="Enviando..." icon="send">
              Enviar enlace de recuperación
            </SubmitButton>
          </form>

          <div className="mt-12 p-6 rounded-xl glass-panel">
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-primary">info</span>
              <p className="text-sm text-slate-400 leading-relaxed">
                Si no ves el correo en 5 minutos, revisa tu carpeta de spam.
              </p>
            </div>
          </div>
        </main>

        <AuthFooter />
      </RightPanel>
    </AuthLayout>
  );
}