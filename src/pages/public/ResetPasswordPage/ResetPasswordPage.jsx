// src/pages/auth/ResetPasswordPage.jsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const schema = yup.object({
  password: yup
    .string()
    .required("La contraseña es requerida")
    .min(12, "Mínimo 12 caracteres")
    .matches(/[0-9]/, "Debe contener un número")
    .matches(/[!@#$%^&*]/, "Debe contener un símbolo"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Las contraseñas no coinciden")
    .required("Confirma tu contraseña"),
});

export default function ResetPasswordPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  
  const { resetPassword, loading, authError, clearError } = useAuth();
  const navigate = useNavigate();
  const { token } = useParams(); // Obtener token de la URL: /reset-password/:token

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const password = watch("password", "");

  const onSubmit = async (data) => {
    clearError();
    const result = await resetPassword(token, data.password);
    
    if (result.success) {
      setIsSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col lg:flex-row min-h-screen bg-background-dark font-display">
        <LeftVisual />
        <div className="flex-1 flex items-center justify-center p-6 lg:p-20">
          <div className="w-full max-w-md bg-[#191022]/60 backdrop-blur border border-primary/20 p-8 lg:p-10 rounded-xl text-center">
            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-4xl text-green-500">
                check_circle
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">
              ¡Contraseña actualizada!
            </h2>
            <p className="text-slate-400 mb-6">
              Tu contraseña ha sido cambiada exitosamente.
              Serás redirigido al login...
            </p>
            <Link
              to="/login"
              className="inline-block bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-lg transition"
            >
              Ir al login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-background-dark font-display">
      <LeftVisual />
      <div className="flex-1 flex items-center justify-center p-6 lg:p-20">
        <div className="w-full max-w-md bg-[#191022]/60 backdrop-blur border border-primary/20 p-8 lg:p-10 rounded-xl">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-white mb-3">
              Nueva Contraseña
            </h2>
            <p className="text-slate-400">
              Asegura tu cuenta con una contraseña segura.
            </p>
          </div>

          {authError && (
            <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {authError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <PasswordInput
              label="Nueva Contraseña"
              name="password"
              register={register}
              error={errors.password}
              show={showPassword}
              setShow={setShowPassword}
            />

            <PasswordStrength password={password} />

            <PasswordInput
              label="Confirmar Contraseña"
              name="confirmPassword"
              register={register}
              error={errors.confirmPassword}
              show={showConfirm}
              setShow={setShowConfirm}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 disabled:opacity-60 text-white font-bold py-4 rounded-lg transition transform hover:scale-[1.02]"
            >
              {loading ? "Actualizando..." : "Actualizar Contraseña"}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-primary/10">
            <Link to="/login" className="text-sm text-slate-400 hover:text-white flex justify-center gap-2">
              <span className="material-symbols-outlined text-sm">
                keyboard_backspace
              </span>
              Volver al login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componentes auxiliares
function LeftVisual() {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative bg-black items-center justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[100px]" />
      </div>
      <div className="relative z-10 flex flex-col items-center text-center p-12">
        <div className="mb-8 w-24 h-24 rounded-full bg-gradient-to-tr from-primary to-purple-400 flex items-center justify-center shadow-[0_0_20px_rgba(127,13,242,0.5)]">
          <span className="material-symbols-outlined text-5xl text-white">flare</span>
        </div>
        <h1 className="text-6xl font-bold italic text-white">NOCTURNA</h1>
        <p className="text-primary tracking-[0.3em] uppercase">Nightlife redefined</p>
      </div>
      <div className="absolute bottom-10 left-10 text-slate-400 text-sm tracking-widest">
        EST. 2024 • PREMIUM EXPERIENCE
      </div>
    </div>
  );
}

function PasswordInput({ label, name, register, error, show, setShow }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-300">{label}</label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          {...register(name)}
          placeholder="••••••••"
          className="w-full bg-background-dark/50 border border-primary/30 rounded-lg py-4 px-4 text-white focus:ring-2 focus:ring-primary outline-none"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-primary"
        >
          <span className="material-symbols-outlined">{show ? "visibility_off" : "visibility"}</span>
        </button>
      </div>
      {error && <p className="text-xs text-red-400">{error.message}</p>}
    </div>
  );
}

function PasswordStrength({ password }) {
  const checks = [
    password.length >= 12,
    /[0-9]/.test(password),
    /[!@#$%^&*]/.test(password),
  ];
  const strength = checks.filter(Boolean).length;
  const labels = ["Débil", "Media", "Fuerte", "Muy Fuerte"];
  const label = labels[strength] || "Débil";

  return (
    <div className="space-y-3">
      <div className="flex justify-between text-xs uppercase">
        <span className="text-slate-400">Seguridad</span>
        <span className="text-primary">{label}</span>
      </div>
      <div className="flex gap-1.5 h-1.5 w-full">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`flex-1 rounded-full ${
              i < strength ? "bg-primary shadow-[0_0_10px_rgba(127,13,242,0.6)]" : "bg-primary/20"
            }`}
          />
        ))}
      </div>
      <p className="text-[10px] text-slate-500">
        Mínimo 12 caracteres, un número y un símbolo.
      </p>
    </div>
  );
}