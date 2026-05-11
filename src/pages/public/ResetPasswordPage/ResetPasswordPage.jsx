// pages/ResetPasswordPage.jsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useParams, useNavigate } from "react-router-dom";
import PasswordInput from "../components/auth/PasswordInput";
import SubmitButton from "../components/auth/SubmitButton";
import PasswordStrength from "../components/auth/PasswordStrength";
import LeftPanel from "../components/auth/LeftPanel";

// ✅ Esquema con Zod
const resetPasswordSchema = z.object({
  password: z.string()
    .min(1, "Password is required")
    .min(12, "Minimum 12 characters")
    .regex(/[0-9]/, "Must contain a number")
    .regex(/[!@#$%^&*]/, "Must contain a symbol"),
  confirmPassword: z.string()
    .min(1, "Please confirm your password")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords must match",
  path: ["confirmPassword"]
});

export default function ResetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(resetPasswordSchema)
  });

  const password = watch("password", "");

  const onSubmit = async (data) => {
    // Limpiar error anterior
    setServerError("");
    
    try {
      console.log("Reset password with token:", token, data.password);
      
      // ✅ Simular llamada a API (reemplaza con tu API real)
      // const response = await fetch('/api/reset-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ token, password: data.password })
      // });
      
      // if (!response.ok) throw new Error('Error al resetear la contraseña');
      
      // ✅ Si todo sale bien, redirigir al login
      navigate("/login", { 
        state: { message: "Password reset successfully! Please login." }
      });
      
    } catch (error) {
      // ✅ Ahora setServerError está correctamente definido
      setServerError("Failed to reset password. Please try again.");
      console.error("Reset password error:", error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-background-dark font-display">
      <LeftPanel
        title="ECLIPSE"
        subtitle="Nightlife redefined"
        icon="flare"
        showDots={false}
        showEstablished={true}
        centerContent={
          <div className="mb-8 w-24 h-24 rounded-full bg-gradient-to-tr from-primary to-purple-400 flex items-center justify-center shadow-[0_0_20px_rgba(127,13,242,0.5)]">
            <span className="material-symbols-outlined text-5xl text-white">flare</span>
          </div>
        }
      />

      <div className="flex-1 flex items-center justify-center p-6 lg:p-20">
        <div className="w-full max-w-md bg-[#191022]/60 backdrop-blur border border-primary/20 p-8 lg:p-10 rounded-xl">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-white mb-3">Reset Password</h2>
            <p className="text-slate-400">Secure your account with a new strong password.</p>
          </div>

          {/* ✅ Mostrar error si existe */}
          {serverError && (
            <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <PasswordInput
              label="New Password"
              name="password"
              register={register}
              error={errors.password?.message}
            />
            
            <PasswordStrength password={password} />
            
            <PasswordInput
              label="Confirm Password"
              name="confirmPassword"
              register={register}
              error={errors.confirmPassword?.message}
            />
            
            <SubmitButton loading={isSubmitting} loadingText="Updating..." icon="">
              Update Password
            </SubmitButton>
          </form>

          <div className="mt-8 pt-8 border-t border-primary/10">
            <a href="/login" className="text-sm text-slate-400 hover:text-white flex justify-center gap-2">
              <span className="material-symbols-outlined text-sm">keyboard_backspace</span>
              Back to login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}